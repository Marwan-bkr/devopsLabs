# ============================================================
# 🔥 NETTOYAGE COMPLET ET FORCÉ
# ============================================================

#!/bin/bash

set -x  # Mode debug pour voir toutes les commandes

echo "============================================================"
echo "🔥 DESTRUCTION COMPLÈTE DE TOUTES LES TRACES"
echo "============================================================"

# 1. Détruire via Vagrant
echo "1️⃣ Destruction via Vagrant..."
vagrant destroy -f gitlab_server 2>/dev/null || true
vagrant global-status --prune

# 2. Trouver et détruire la VM dans libvirt
echo ""
echo "2️⃣ Recherche des VMs libvirt correspondantes..."
VM_NAMES=$(virsh --connect qemu:///session list --all --name | grep -E "gitlab|rocky10" || true)

if [ -n "$VM_NAMES" ]; then
    echo "🗑️  VMs trouvées à détruire:"
    echo "$VM_NAMES"
    
    echo "$VM_NAMES" | while read vm; do
        if [ -n "$vm" ]; then
            echo "   Destruction de: $vm"
            virsh --connect qemu:///session destroy "$vm" 2>/dev/null || true
            virsh --connect qemu:///session undefine "$vm" --remove-all-storage 2>/dev/null || true
        fi
    done
else
    echo "✅ Aucune VM à détruire"
fi

# 3. Rechercher et supprimer TOUS les disques liés
echo ""
echo "3️⃣ Recherche et suppression des disques..."

SEARCH_PATHS=(
    "$HOME/.local/share/libvirt/images"
    "/var/lib/libvirt/images"
    "/opt/homebrew/var/lib/libvirt/images"
    "$(pwd)/.vagrant/machines/gitlab_server/libvirt"
)

for path in "${SEARCH_PATHS[@]}"; do
    if [ -d "$path" ]; then
        echo "📁 Recherche dans: $path"
        
        # Trouver tous les fichiers liés à notre VM
        find "$path" -type f \( -name "*gitlab*" -o -name "*rocky10*" -o -name "*owndl*" \) 2>/dev/null | while read disk; do
            echo "   🗑️  Suppression: $disk"
            rm -f "$disk"
        done
    fi
done

# 4. Nettoyer le répertoire .vagrant
echo ""
echo "4️⃣ Nettoyage du répertoire .vagrant..."
rm -rf .vagrant/

# 5. Nettoyer les volumes libvirt
echo ""
echo "5️⃣ Nettoyage des volumes dans les pools libvirt..."
POOLS=$(virsh --connect qemu:///session pool-list --all --name 2>/dev/null || true)

if [ -n "$POOLS" ]; then
    echo "$POOLS" | while read pool; do
        if [ -n "$pool" ]; then
            echo "   Pool: $pool"
            VOLUMES=$(virsh --connect qemu:///session vol-list "$pool" 2>/dev/null | grep -E "gitlab|rocky10|owndl" | awk '{print $1}' || true)
            
            if [ -n "$VOLUMES" ]; then
                echo "$VOLUMES" | while read vol; do
                    if [ -n "$vol" ]; then
                        echo "      🗑️  Volume: $vol"
                        virsh --connect qemu:///session vol-delete --pool "$pool" "$vol" 2>/dev/null || true
                    fi
                done
            fi
        fi
    done
fi

# 6. Vérification finale
echo ""
echo "============================================================"
echo "✅ VÉRIFICATION FINALE"
echo "============================================================"

echo "📋 VMs restantes:"
virsh --connect qemu:///session list --all

echo ""
echo "💾 Recherche de fichiers résiduels:"
for path in "${SEARCH_PATHS[@]}"; do
    if [ -d "$path" ]; then
        REMAINING=$(find "$path" -type f \( -name "*gitlab*" -o -name "*rocky10*" -o -name "*owndl*" \) 2>/dev/null || true)
        if [ -n "$REMAINING" ]; then
            echo "⚠️  Fichiers restants dans $path:"
            echo "$REMAINING"
        fi
    fi
done

echo ""
echo "============================================================"
echo "🎯 NETTOYAGE TERMINÉ!"
echo "============================================================"
echo ""
echo "🚀 Vous pouvez maintenant lancer:"
echo "   vagrant up gitlab_server --provider=libvirt"
echo ""


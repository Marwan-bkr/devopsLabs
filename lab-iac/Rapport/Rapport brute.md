une analyse précise de ce que je fais

## Before starting

This lab was intentionally made on macOS in the way to deal with the complexity of compatibility, knowing that would take more skills and time. Indeed, many files, commands and tools were perfectly suited for Windows. A work of research, adaptation and developing IT skills was thus learned in a context of real application. We worked on this lab without being sure at 100% it was realisable in the given time frame. We may say this compatibility load is extra work that we hope you will consider.

install vagrant 

install qemu

vagrant add red hat 9

bug : solution : `vagrant plugin install vagrant-qemu`

## Part 1. Imperative - Using Vagrant with Shell Provisioner

### 1. Prepare a virtual environment

redhat only with libvirt

i search other iso

finally switch to libvirt

libvirt deprecated so back to vmware and searching the good ISO

for Qemu : vagrant box add ppggff/centos-7-aarch64-2009-4K

updating vagrantfile

identify that centos is provided by virtualbox

error to securely store password so install samba

enable SMB in file sharing settings

```sh
sudo launchctl enable system/com.apple.smbd
```

### 2. Create a virtual machine (VM)

finally it work

PHOTO

### 3. Check that everything is ok by connecting to the VM via SSH

### 4. Play with different commands for Shell Provisioner

![](/Users/marwan/Library/Application%20Support/marktext/images/f5bae10abf6087b2dddc5c0799b022a13cd02082.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/4bd2e3f009641a60be8fa1991af4e7e9dfbc10f4.png)

## Part 2. Declarative - GitLab installation using Vagrant and Ansible Provisioner

### 1. Prepare a virtual environment

vagrant box add bento/rockylinux-9 with vmware

```sh
vagrant plugin install vagrant-vmware-desktop
```

because of error , reinstall with .pkg vagrant vmware utility. and if it run

wrong box to now 

![](/Users/marwan/Library/Application%20Support/marktext/images/cb65d7a9b545c660c17253b88356e67f5b7bc1bc.png)

```sh
vagrant init generic/rocky9 --box-version 4.2.12
```

No version available. i download it by my own in [Rocky Linux Repository](https://dl.rockylinux.org/pub/rocky/9/images/)

vagrant box add rockylinux/9-arm64 Rocky-9-Vagrant-VMware.latest.aarch64.box

don't find arm64 box that works so switch to dl iso thus using qemu

i tried several provider, rewrite Vargantfile and finally set the right configuration

it works with [Rocky-9-Vagrant-Libvirt.latest.aarch64.box](https://download.rockylinux.org/pub/rocky/9/images/aarch64/Rocky-9-Vagrant-Libvirt.latest.aarch64.box "Rocky-9-Vagrant-Libvirt.latest.aarch64.box")

### 2. Create and provision a virtual machine (VM)

Except a little detail the vm size was too small for gitlab so :

i tried to find the location of the *.qcow2*

then i destroy the vm, set disk_size in Vagrantfile and up again

rm .vagrant

![](/Users/marwan/Library/Application%20Support/marktext/images/db48a4113b236dfac7bb4731e871ce282f285dc0.png)

the current problem is the size of the vm but setting it in Vagrantfile is not enough. vagrant don't listen to it and i don't know why. I have huge difficulties to setting with simple code the size of the VM. The .box has hard coded 8.9G so i had to extend virtual disk to desire physical disk size that i set too.

find the location of the disk

resize it : qemu-img resize "/path/lab-iac/lab/part-2/.vagrant/machines/gitlab_server/qemu/vq_jKzXaz76l2s/linked-box.img" +50G

vagrant up 

### 3. Test the installation

![](/Users/marwan/Library/Application%20Support/marktext/images/e80fb1c29d0611d3cea1a2931867e57b3a7175c8.png)

### 4. Instructions for updating playbooks

## Part 3. Declarative - Configure a health check for GitLab

![](/Users/marwan/Library/Application%20Support/marktext/images/565f7b5682b250529714f96e4c63590adba654ed.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/42d0cec6ab575a771b437750f5216337ce93a003.png)

## Bonus task

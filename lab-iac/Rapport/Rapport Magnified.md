This lab was intentionally made on macOS in the way to deal with the complexity of compatibility, knowing that would take more skills and time. Indeed, many files, commands and tools were perfectly suited for Windows. A work of research, adaptation and developing IT skills was thus learned in a context of real application. We worked on this lab without being sure at 100% it was realisable in the given time frame. We may say this compatibility load is extra work that we hope you will consider.

## Before starting

The goal was : get GitLab running in a Vagrant VM on my Apple Silicon Mac. The first steps were standard:

- I installed **Vagrant**.
- I installed **QEMU**, knowing that ARM64 support would be crucial.

I immediately hit my first specific "bug" – Vagrant wasn't communicating with QEMU properly. The solution, thankfully, was a quick Google search away: `vagrant plugin install vagrant-qemu`. This was my first lesson in the ecosystem's specific requirements.

## Part 1. Imperative - Using Vagrant with Shell Provisioner

### 1. Prepare a virtual environment

My initial approach was imperative, focusing on getting *any* VM up and running with a shell provisioner. This was where the "provider merry-go-round" truly began.

I started by looking for a "Red Hat 9" box, thinking `libvirt` would be the way to go for my ARM64 architecture. However, finding a readily available, *working* ARM64 Red Hat 9 box for `libvirt` proved elusive. I spent time searching for "other ISOs," which quickly devolved into a frustrating cycle of downloads and compatibility checks.

At one point, I even thought `libvirt` might be deprecated or too complex for my needs, so I considered switching to VMware. This meant another search for a "good ISO" and figuring out VMware-specific Vagrant configurations. This detour didn't last long, as I pivoted back to QEMU when I found what looked like a promising ARM64 CentOS box: `vagrant box add ppggff/centos-7-aarch64-2009-4K`.

Even after getting a box, I encountered another unexpected hiccup: an "error to securely store password" when trying to set up shared folders. This led me down a rabbit hole of `samba` installation and enabling SMB on my macOS host using `sudo launchctl enable system/com.apple.smbd`. It felt like a minor side quest, but essential for host-guest communication.My goal was clear: get GitLab running in a Vagrant VM on my Apple Silicon Mac. The first steps were standard:

- I installed **Vagrant**.
- I installed **QEMU**, knowing that ARM64 support would be crucial.

I immediately hit my first specific "bug" – Vagrant wasn't communicating with QEMU properly. The solution, thankfully, was a quick Google search away: `vagrant plugin install vagrant-qemu`. This was my first lesson in the ecosystem's specific requirements.

Finally, after all that wrestling, I managed to get a basic CentOS 7 VM up and running. The screenshot of my terminal confirming SSH connectivity was a moment of genuine relief – "finally it work"! I could then use simple shell provisioners to experiment, confirming the VM was indeed functional and ready for basic commands. The images I captured showed me confidently running commands inside the VM, a small victory.

### 2. Create a virtual machine (VM)

![](/Users/marwan/Library/Application%20Support/marktext/images/f5bae10abf6087b2dddc5c0799b022a13cd02082.png)

### 3. Check that everything is ok by connecting to the VM via SSH

### 4. Play with different commands for Shell Provisioner

![](/Users/marwan/Library/Application%20Support/marktext/images/4bd2e3f009641a60be8fa1991af4e7e9dfbc10f4.png)

## Part 2. Declarative - GitLab installation using Vagrant and Ansible Provisioner

### 1. Prepare a virtual environment

With the basics understood, my next step was to move to a declarative setup for GitLab using Ansible. This meant finding a more modern, supported box.

My first attempt here was with `bento/rockylinux-9` and the `vmware` provider. This led to installing `vagrant plugin install vagrant-vmware-desktop`. But yet again, I ran into errors. The experience pushed me to reinstall the Vagrant VMware utility via its `.pkg` installer, hoping it would resolve the underlying issues.

The "wrong box" problem reappeared. I tried `vagrant init generic/rocky9 --box-version 4.2.12`, only to find "No version available." This frustration led me to manually download a Rocky Linux ARM64 image directly from the [Rocky Linux Repository](https://dl.rockylinux.org/pub/rocky/9/images/) and then add it with `vagrant box add rockylinux/9-arm64 Rocky-9-Vagrant-VMware.latest.aarch64.box`.

However, the pattern continued: I simply couldn't find a stable, working ARM64 box that played nicely with VMware on my Apple Silicon. It was a disheartening realization.

**The Pivotal Moment:** Recognizing the futility of the VMware path, I made a firm decision: "don't find arm64 box that works so switch to dl iso thus using qemu." This was the turning point where I committed fully to the `libvirt` provider with QEMU, the setup that initially seemed promising but was sidetracked. After many more iterations of "tried several provider, rewrite Vargantfile and finally set the right configuration," I finally landed on `Rocky-9-Vagrant-Libvirt.latest.aarch64.box` as my stable base.

**The GitLab Install and the Persistent Disk Problem**

With a stable VM and Ansible ready to go, I initiated the GitLab installation. This is where I encountered my most significant and persistent challenge: the VM's disk size.

I had tried to be proactive, setting `libvirt.machine_virtual_size = 50` in my `Vagrantfile` to ensure a 50GB disk for GitLab. But GitLab's installation kept failing, screaming: "installing package gitlab-ee-18.8.4-ee.0.el9.aarch64 needs 1222MB more space on the / filesystem."

This was incredibly frustrating because I *knew* I had allocated a 50GB virtual disk. The core problem was that "vagrant don't listen to it" in terms of automatically expanding the root filesystem *inside* the VM. The `.box` itself had a hardcoded default size (around 8.9GB), and while the virtual disk file was larger, the operating system within wasn't using that extra space.

My attempts to fix this initially involved manual intervention:

- I tried to "find the location of the *.qcow2*" disk image.
- Then I'd `destroy the vm`, set `disk_size` in the `Vagrantfile`, and try to `up again`.
- I even resorted to manually resizing the `qcow2` image directly using `qemu-img resize "/path/lab-iac/lab/part-2/.vagrant/machines/gitlab_server/qemu/vq_jKzXaz76l2s/linked-box.img" +50G` and then `vagrant up`. While `rm .vagrant` and recreating the VM was part of the troubleshooting, the underlying 
  issue remained. The image I captured of the disk layout (the `lsblk` output) constantly reminded me that the internal filesystem wasn't expanding.

![](/Users/marwan/Library/Application%20Support/marktext/images/cb65d7a9b545c660c17253b88356e67f5b7bc1bc.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/db48a4113b236dfac7bb4731e871ce282f285dc0.png)

### 3. Test the installation

![](/Users/marwan/Library/Application%20Support/marktext/images/e80fb1c29d0611d3cea1a2931867e57b3a7175c8.png)

### 4. Instructions for updating playbooks

## Part 3. Declarative - Configure a health check for GitLab

Once the disk resizing script was in place and executed successfully, the Ansible provisioner finally completed without disk space errors. Seeing the GitLab installation succeed (and the screenshot of the GitLab login page) was immensely satisfying, a true reward after the numerous hurdles.

From there, it was about proving the setup worked. I could then move on to refining the Ansible playbooks and tackling subsequent tasks, like configuring health checks for GitLab, confident that the underlying infrastructure was stable.

My journey highlights that while Vagrant offers incredible power for VM management, working with specific architectures like Apple Silicon and navigating the nuances of different providers and box configurations often requires significant perseverance and a deep dive into the underlying virtualization mechanisms. The disk resizing challenge was a particularly memorable lesson in not just *allocating* resources, but ensuring the guest OS *uses* them.

![](/Users/marwan/Library/Application%20Support/marktext/images/565f7b5682b250529714f96e4c63590adba654ed.png)

![](/Users/marwan/Library/Application%20Support/marktext/images/42d0cec6ab575a771b437750f5216337ce93a003.png)

## Bonus task

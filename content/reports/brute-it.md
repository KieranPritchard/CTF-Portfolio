---
title: "Brute It"
slug: "brute-it"
category: "password-cracking"
description: "A Linux box involving credential brute-forcing, SSH key passphrase cracking, and sudo misconfiguration privilege escalation"
date: "2026-10-31"
---

# Challenge Setup

## Tools Used:

- **Nmap** — service and version enumeration
- **Hydra** — brute-forcing login credentials
- **John the Ripper** — cracking the SSH key passphrase and the password hash

## Environment:

- TryHackMe hosted target machine (Ubuntu)
- Kali Linux (attacker machine)

> Disclaimer: Only perform tests on machines you have permission to.

# Initial Recon

My first step in any ethical hacking challenge is to scan with Nmap. I ran a `-sV` scan to find out what was running on the machine and to fingerprint the OS.

```
nmap -sV <target-ip>
```

This showed three services running: SSH and Apache for the web server. The scan also identified the OS as Ubuntu.

# Exploitation / Solution

## 1. Finding the Username

Looking at the source code of the web page, I discovered the username was `admin`.

## 2. Brute-Forcing the Password

With a username in hand, I used Hydra to brute-force the login. I ran into a few issues along the way — a typo in the password field of my Hydra command, and a hidden redirect on the login form that I had to account for. After debugging both, I successfully found the password.

```
hydra -l admin -P rockyou.txt <target-ip> http-post-form "/admin:user=^USER^&pass=^PASS^:Invalid credentials"
```

## 3. Logging In and Finding the First Flag

I logged in using the credentials I found. This gave me the first flag: a download link for a private SSH key.

## 4. Downloading the Private Key

I downloaded the key, intending to come back to cracking it later.

## 5. Cracking the Private Key Passphrase

Using John the Ripper, I cracked the private key's passphrase, which allowed me to access the machine over SSH.

```
ssh2john id_rsa > id_rsa.hash
john id_rsa.hash --wordlist=rockyou.txt
```

## 6. Gaining the User Flag

I logged in as `john` using the private key and the cracked passphrase, which got me the user flag.

```
ssh -i id_rsa john@<target-ip>
```

## 7. Privilege Escalation

Checking my sudo permissions, I found that `/bin/cat` could be run with sudo without a password. I used this to read `/etc/passwd` and saved the output to my machine, then cracked it with John the Ripper. This allowed me to log in as admin.

```
sudo cat /etc/passwd
```

I saved the relevant entry to a file on my machine and ran it through John the Ripper, which cracked it like a normal password hash.

# Flag

```
User Flag: [hidden]
Root Flag: [hidden]
```

# Tools Used

- **Nmap** — identified open services (SSH, Apache) and the target OS
- **Hydra** — brute-forced the web login credentials
- **John the Ripper** — cracked the SSH private key passphrase and the password hash recovered via the sudo misconfiguration

# Notes / Lessons Learned

- Checking page source early can reveal usernames or other hints that save time later in the attack chain.
- Brute-forcing web logins often has hidden quirks (redirects, failure-string detection) that need to be accounted for in your Hydra command — don't assume a straightforward setup.
- SSH keys protected by a passphrase aren't automatically safe; a weak passphrase is just as crackable as a weak password.
- Misconfigured sudo permissions on seemingly harmless binaries (like `cat`) can be enough to fully compromise a box — always check `sudo -l` during privilege escalation.

<carousel>
<img src="/images/brute-it/brute-it_1.jpeg">
<img src="/images/brute-it/brute-it_2.jpeg">
<img src="/images/brute-it/brute-it_3.jpeg">
<img src="/images/brute-it/brute-it_4.jpeg">
<img src="/images/brute-it/brute-it_5.jpeg">
<img src="/images/brute-it/brute-it_6.jpeg">
<img src="/images/brute-it/brute-it_7.jpeg">
</carousel>
---
title: "Agent Sudo"
slug: "agent-sudo"
category: "linux"
description: "Exploit a Linux machine in this beginner level challenge."
date: "2025-01-05"
---

# Challenge Setup

## Tools Used:

- **Nmap** — Port scanning & service enumeration
- **Gobuster** — Directory enumeration
- **Burp Suite** — Intercepting and modifying HTTP requests
- **Hydra** — Brute forcing login credentials
- **Steghide** — Extracting hidden data from images
- **John the Ripper** — Cracking password-protected archives
- **scp** — Securely copying files from remote host to local machine

## Environment:

- TryHackMe hosted target machine
- Kali Linux (attacker machine)

# Initial Recon

I deployed the machine to get its IP address, then ran an Nmap scan against it. Three services were open: FTP on port 21, SSH on port 22, and Apache on port 80.

```
nmap -sV -p- <target-ip>
```

# Exploitation / Solution

## 1. First Look Through The Website

The webpage on port 80 displayed a message from a character called "Agent R." With nothing else to go on, I ran Gobuster against the site to enumerate hidden directories, but it didn't turn up anything useful.

```
gobuster dir -u http://<target-ip> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

The challenge hinted at impersonating a different agent, so I used Burp Suite to intercept a request to the site and edit the `User-Agent` header. Since the page referred to "Agent R," I guessed the agents were named after letters of the alphabet — giving me at most 26 values to try rather than an open-ended guess.

After a few attempts, one response came back with a different header pointing to a PHP page I hadn't found through Gobuster. That page revealed Agent C's real name — Chris — along with a note that he needed to change his password.

## 2. Finding Credentials

With a confirmed username, I used Hydra against the FTP service with the username `chris` and the `rockyou.txt` wordlist:

```
hydra -l chris -P /usr/share/wordlists/rockyou.txt ftp://<target-ip>
```

This cracked the password as `crystal`. Logging into FTP with those credentials, I downloaded three files.

One was a text file referencing steganography, which pointed me toward a hidden zip archive embedded inside one of the photos. I extracted the hash from the password-protected zip using `zip2john`, then cracked it with John the Ripper:

```
zip2john hidden.zip > zip.hash
john --wordlist=/usr/share/wordlists/rockyou.txt zip.hash
```

That cracked to the password `alien`. Inside the archive was a base64-encoded string, which I decoded to get `area51`. That turned out to be the Steghide passphrase, which I used to extract a hidden file from the image containing Agent J's name and password:

```
steghide extract -sf photo.jpg -p area51
```

## 3. Accessing the Remote Machine

I used those credentials to log in over SSH and quickly located the user flag. There was also a photo file on the box, which I pulled across to my Kali VM with `scp`:

```
scp chris@<target-ip>:/path/to/photo.jpg .
```

The image turned out to be a (fake) photo of the Roswell alien autopsy.

Checking `sudo -l` showed the user had limited sudo rights. GTFOBins didn't have anything applicable for the binaries listed, so I searched Exploit-DB instead and found a match: **CVE-2019-14287**, a sudo vulnerability affecting versions before 1.8.28. It allows a user with `sudo` rights restricted via a "deny this user" rule (`!root`) to bypass that restriction by specifying a user ID of `-1` or `4294967295`, which sudo incorrectly resolves to root.

```
sudo -u#-1 /bin/bash
```

That dropped me into a root shell, where I found the final flag.

# Flag

```
User Flag: b03d975e8c92a7c04146cfa7a5a313c7
Root Flag: b53a02f55b57d4439e3341834d70c062
```

# Tools Used

- **Nmap** — Network scanning and service enumeration
- **Gobuster** — Directory brute forcing
- **Burp Suite** — Intercepting/modifying HTTP requests
- **Hydra** — Brute-forcing login credentials
- **Steghide** — Extracting hidden data from images
- **John the Ripper** — Cracking password-protected archives
- **scp** — Transferring files securely
- **Exploit-DB** — Finding privilege escalation exploits

# Notes / Lessons Learned

- Always check HTTP headers — sometimes the key is hidden in plain sight.
- Steganography is a common technique in CTFs; always inspect images for hidden files.
- Brute force attacks can be efficient if the username is known and the password list is well-targeted.
- Privilege escalation often comes down to misconfigurations and known CVEs, not just kernel exploits — checking `sudo -l` and cross-referencing GTFOBins and Exploit-DB should be routine steps.

<carousel>
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_1.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_2.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_3.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_4.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_5.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_6.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_7.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_8.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_9.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_10.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_11.png">
<img src="/images/agent-sudo/Agent_Sudo_Screenshot_12.png">
</carousel>
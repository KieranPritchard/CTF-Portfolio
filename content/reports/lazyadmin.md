---
title: "LazyAdmin"
slug: "lazyadmin"
category: "web-application"
description: "Exploit a misconfigured web application to gain access to the target, escalate privileges, and capture the flags."
date: "2025-05-15"
---

#  Challenge Description
Exploit a misconfigured web application to gain access to the target, escalate privileges, and capture the flags.

# ️ Files Provided

None

#  Challenge Setup

### Tools Used:
- Nmap — Port scanning and service enumeration.
- Gobuster — Directory brute-forcing to discover hidden files/folders.
- CrackStation — Online hash cracking to recover plaintext passwords.
### Environment:

TryHackMe hosted VM — Accessed via the provided IP address.

###  Initial Recon
Started the target machine on TryHackMe.
Ran an nmap service scan and found:
- Port 22/tcp — OpenSSH
- Port 80/tcp — HTTP web service
Visited the site in a browser — a simple default Apache welcome page was displayed. 
Ran gobuster against the IP and found a directory named /content. Navigated to /content and discovered a page for a CMS called SweetRice.

# ️ Exploitation / Solution
## 1. Enumerating SweetRice

Ran gobuster again on /content and discovered 6 different subpaths.
In /content/images, found a sitemap file — saved for later.
In /content/as, found files with varying version numbers. The latest file contained a version number 1.5.1.
Searched online for “SweetRice 1.5.1 exploit” and found several potential vulnerabilities.
One exploit mentioned backup file disclosure, which could leak credentials.

## 2. Finding Credentials

The exploit pointed to a backup database file.
Downloaded it and opened it — found entries for username admin and a hashed password.
Sent the hash to CrackStation and recovered the password: Password123.

## 3. Admin Dashboard Access

Logged into the SweetRice admin dashboard with admin:Password123.
Explored the dashboard and found a Media Center upload function.

## 4. Gaining a Shell

Crafted a PHP reverse shell and uploaded it via the Media Center.
Discovered that the CMS allowed multiple file extensions for uploads.
Triggered the reverse shell by visiting the uploaded file’s URL.
Connected back to my listener — initial shell obtained.

## 5. Post-Exploitation & Privilege Escalation
Enumerated the file system and found a script that referenced another file containing a command to run with elevated privileges.
Edited the script to execute my own command, saved it, and triggered it.
This granted me root-level access.

#  Flags
```
User Flag: THM{63e5bce9271952aad1113b6f1ac28a07}
Root Flag: THM{6637f41d0177b6f37cb20d775124699f}
```

#  Tools Used

- Nmap — Port scanning and service detection.
- Gobuster — Directory brute-forcing.
- CrackStation — Hash cracking.

#  Notes / Lessons Learned
- Always check for CMS version leaks — they often lead to known exploits.
- Backup files are a goldmine for credentials.
- Even “basic” upload functions can allow arbitrary code execution if file type checks are weak.
- Editing scripts that run with elevated privileges is a simple but powerful privilege escalation method.

#  Images
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


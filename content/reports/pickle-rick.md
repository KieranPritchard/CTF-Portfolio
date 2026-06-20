---
title: "Pickle Rick"
slug: "pickle-rick"
category: "web-application"
description: "A fun Rick and Morty–themed CTF where the objective is to collect three secret ingredients to help turn Rick back into a human."
date: "2025-08-01"
---

# Challenge Setup

## Tools Used:

* **Nmap** — For initial host discovery, port scanning, and service enumeration.
* **Gobuster** — Directory and file brute forcing.
* **Browser Developer Tools** — Inspecting HTML comments and discovering hidden credentials.
* **GTFOBins** — Identifying `sudo` or restricted-shell bypass methods.
* **sudo** — Used to escalate privileges due to misconfigurations.
* **Linux CLI Utilities** (`tac`, `ls`, `sudo -l`, etc.) — Navigating the filesystem and reading files when primary commands were blocked.

## Environment:

- TryHackMe hosted target machine
- Kali Linux (attacker machine)

# Initial Recon

After deploying the machine and obtaining the target IP, I performed an **Nmap** scan. The scan revealed two open services:

* **SSH** on port `22`
* **Apache Web Server** on port `80`

# ️Exploitation / Solution

## 1. Initial Enumeration

I started by running Gobuster with the common.txt wordlist from SecLists.
Visiting the web interface revealed a page telling me to find a username and password.

## 2. Discovering Credentials

Inspecting the page source exposed a username hidden in an HTML comment.
A quick check of robots.txt revealed another string possibly being a password.
An attempt to log in via SSH using these credentials failed, so I continued enumeration.

## 3. Further Directory Busting

Running Gobuster again with file extension enumeration uncovered more files, including: "portal.php" accessing this page led to a login portal.

## 4. Portal Access & Command Injection

Using the discovered credentials, I successfully logged into the portal.
The interface allowed command execution, which I verified by running whoami.
Although the "cat" command was disabled, I continued exploring the filesystem.

## 5. Privilege Escalation Attempts

Using "sudo -l", I saw that certain commands could be executed with sudo without requiring a password.
Some GTFOBins escalation attempts didn’t work, but I found a workaround: replacing "cat" with "tac", which functioned normally.

This allowed me to extract the first ingredient.

## 6. Collecting All Ingredients

Navigating to "/home", I found directories for "rick" and "ubuntu".
Inside the "rick" directory, a folder named "second_ingredient" contained the second item.
Again using tac, I read its contents.
Finally, leveraging my sudo permissions, I accessed the "/root" directory and obtained the third ingredient.

## 7. Completion

After retrieving all three ingredients, the challenge was successfully completed.

# Flag

```
Flag One: mr. meeseek hair
Flag Two: 1 jerry tear
Flag Three: fleeb juice
```

# Tools Used

* **Nmap** — For initial host discovery, port scanning, and service enumeration.
* **Gobuster** — Directory and file brute forcing.
* **Browser Developer Tools** — Inspecting HTML comments and discovering hidden credentials.
* **GTFOBins** — Identifying `sudo` or restricted-shell bypass methods.
* **sudo** — Used to escalate privileges due to misconfigurations.
* **Linux CLI Utilities** (`tac`, `ls`, `sudo -l`, etc.) — Navigating the filesystem and reading files when primary commands were blocked.

# Notes / Lessons Learned

- If a command is blocked, try alternatives—utilities like tac, head, or less can bypass restrictions.
- Inspect everything: page source, comments, and simple files often contain direct hints.



<carousel>
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_1.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_2.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_3.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_4.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_5.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_6.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_7.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_8.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_9.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_10.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_11.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_12.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_13.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_14.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_15.png">
<img src="/images/pickle-rick/Pickle_Rick_Screenshot_16.png">
</carousel>

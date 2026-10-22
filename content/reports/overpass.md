---
title: "Overpass"
slug: "overpass"
category: "linux"
description: "Exploit a Linux machine running a vulnerable login portal in this beginner level challenge."
date: "2026-10-15"
---

# Challenge Setup

## Tools Used:

- **Nmap** — Port scanning & service enumeration
- **Gobuster** — Directory enumeration
- **ssh2john / John the Ripper** — Converting and cracking the RSA private key passphrase
- **SSH** — Remote access using the cracked key
- **GhostGate** — Custom HTTP server tool, used to stage LinPEAS for enumeration
- **LinPEAS** — Automated privilege escalation enumeration
- **cat /etc/cron.d/** — Listing scheduled cron jobs
- **/etc/hosts** — Redirecting a hostname to my attacking machine
- **Reverse shell payload** — Delivered via the hijacked cron job

## Environment:

- TryHackMe hosted target machine
- Kali Linux (attacker machine)

> Disclaimer: Only perform tests on machines you have permission to.

# Initial Recon

My first step in any ethical hacking challenge is to scan with Nmap. This helps me identify running services.

```
nmap -sV -p- <target-ip>
```

Only two services were open: HTTP and SSH.

# Exploitation / Solution

## 1. Enumerating the Web Server

If an HTTP server is active, I open it in a new tab to inspect its content and code. Then I use Gobuster to uncover hidden pages like admin panels and secret logins.

```
gobuster dir -u http://<target-ip> -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
```

This turned up a couple of extra pages beyond the main site, including a login form worth a closer look.

## 2. Spotting a Logic Flaw in the Login

Before focusing on a vulnerability, I inspect the website's code for any logical flaws or unclean inputs that can be exploited. In this case, the login function set a session cookie as a fallback path if the main authentication check failed — meaning a failed login attempt could still leave the browser holding a valid session cookie. I set this cookie manually using the logic visible in the page's code to force myself into an authenticated session.

## 3. Reaching the Admin Area

Using that logic bug, I gained access to the admin area, which contained an RSA private key.

## 4. Cracking the Private Key Passphrase

I converted the private key to a hash format John the Ripper could recognise, then cracked the passphrase:

```
ssh2john id_rsa > id_rsa.hash
john --wordlist=/usr/share/wordlists/rockyou.txt id_rsa.hash
```

This cracked the passphrase as `james13`.

## 5. Logging in Over SSH

Based on a message left in the admin page alongside the private key and passphrase, I was able to log in to the test environment over SSH using the key.

```
ssh -i id_rsa <username>@<target-ip>
```

I confirmed which user I was logged in as and located the user flag, which I have hidden so people can find it themselves.

## 6. Privilege Escalation

I used my custom HTTP server tool, GhostGate, to stage LinPEAS, then pulled it onto the target with `curl` and ran it. LinPEAS flagged several possible escalation paths via kernel exploits, but for a beginner-level box that felt like overkill — a quick search confirmed there was a simpler intended route.

I listed the machine's scheduled jobs with:

```
cat /etc/cron.d/<job-name>
```

This showed a cron job pointing at a hostname I could control. I edited `/etc/hosts` on the target to point that hostname at my own attacking machine, then used GhostGate to serve a reverse shell payload in place of the expected build script. When the cron job next ran, it pulled and executed my payload instead, giving me a root shell and the final flag.

# Flag

```
User Flag: [hidden]
Root Flag: [hidden]
```

# Tools Used

- **Nmap** — Network scanning and service enumeration
- **Gobuster** — Directory brute forcing
- **ssh2john / John the Ripper** — Cracking the RSA key passphrase
- **SSH** — Remote access
- **GhostGate** — Staging LinPEAS and later a reverse shell payload
- **LinPEAS** — Privilege escalation enumeration
- **cat /etc/cron.d/** — Cron job enumeration
- **/etc/hosts** — Hostname hijack for the cron job

# Notes / Lessons Learned

- Authentication logic flaws, like a fallback path on login failure, can be just as dangerous as missing authentication entirely — always read the code, not just test the login form.
- Private keys found on a server are worth cracking even without an obvious SSH username, especially when paired with a hint elsewhere on the site.
- Automated tools like LinPEAS are great for enumeration, but the flashiest finding (a kernel exploit) isn't always the intended path — check cron jobs and file permissions first, especially on beginner boxes.
- Hijacking a cron job via a controllable hostname is a simple, reliable way to escalate when you can get a payload into its execution path.

<carousel>
<img src="/images/overpass/overpass_1.jpeg">
<img src="/images/overpass/overpass_2.jpeg">
<img src="/images/overpass/overpass_3.jpeg">
<img src="/images/overpass/overpass_4.jpeg">
<img src="/images/overpass/overpass_5.jpeg">
<img src="/images/overpass/overpass_6.jpeg">
<img src="/images/overpass/overpass_7.jpeg">
</carousel>
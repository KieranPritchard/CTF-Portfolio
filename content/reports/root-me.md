---
title: "Root Me"
slug: "root-me"
category: "linux"
description: "The goal of this challenge is to exploit a vulnerable web application to gain an initial foothold and escalate privileges to obtain user and root flags. The machine tests your understanding of file up"
date: "2025-08-27"
---

#  Challenge Description

The goal of this challenge is to exploit a vulnerable web application to gain an initial foothold and escalate privileges to obtain user and root flags. The machine tests your understanding of file upload vulnerabilities, reverse shells, and Linux privilege escalation techniques.

# ️ Files Provided

- No downloadable files were provided. The challenge was conducted entirely on a deployed TryHackMe machine.

#  Challenge Setup

## **Tools Used:**

- **Nmap** — for port scanning and service detection
- **Gobuster** — for directory brute-forcing
- **Netcat** — for catching the reverse shell
- **Searchsploit / GTFObins** — for privilege escalation research

## **Environment:**

- Kali Linux (VM)
- Deployed machine IP

#  Initial Recon

I first loaded my kali linux vm and found the room on try hack me, I deployed the machine on try hack me to get ip address. I then used the ip address with nmap to scan for services. I found three things from this scan. firstly, i found that there was ssh on port 22; secondly, i found http on port 80 (signalling a web page is accessible); finally, I found the machine uses apache 2.4.29. These allowed me to start answering the questions on the challenge. Moving on, I used gobuster to search for any webpages to access. I then found a page called “panel” and “uploads”

# ️ Exploitation / Solution

## Step 1:

- The page called panel features a file upload function on it.
- The question says to upload a file to get a reverse shell, the hint gave me more information mentioning about file upload bypasses and php reverse shells.
- I then looked in kali linux for a default php reverse shell and found one.
- I copied this to my documents and then uploaded it to the page.
- I then go an error for the .php file, I then researched about other php file types.
- Using a list i found i kept trying different php file types and checking the uploads page to see if i got one file type that works alongside netcat.
- I found one and got access to the system.

## Step 2:

- After i had got the shell i then gathered basic info like “whoami”, which returned “www-data”.
- The next question i had me go after a file called user.txt, i used the find command to look for it and found it at “/var/www/user.txt”
- I then used the cat command on it and got a flag.

## Step 3:

- Based on the question for privailage escalation i went and used the search command to find SUID files that can be exploited for this to happen.
- To do this i used my notes on linux privailge escalation to assist with this to help me do this.
- I found there was a python file to use. so, using gtfoblins i inputed a python command to allow me to escalate to root user.
- I used whoami to check if i did become a root user and i did. Following on, I then accessed the root folder and got the final flag.

#  Flag

```
Flag 1: THM{y0u_g0t_a_sh3ll}
Flag 2: THM{pr1v1l3g3_3sc4l4t10n}
```

#  Tools Used

- **Nmap** — Port/service discovery
- **Gobuster** — Directory enumeration
- **Netcat** — Listener for reverse shell
- **GTFObins** — Privilege escalation via known binary exploits

#  Notes / Lessons Learned

- How to bypass file upload restrictions using alternate PHP extensions.
- Practical use of reverse shells and basic post-exploitation.
- SUID-based privilege escalation using Python and GTFOBins.
- Importance of recon and methodical enumeration.



<carousel>
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_1.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_2.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_3.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_4.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_5.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_6.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_7.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_8.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_9.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_10.png)
![Screenshot of the challenge soloution](/images/root-me/RootMe_Screenshot_11.png)
</carousel>

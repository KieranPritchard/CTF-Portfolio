---
title: "OSINT Investigation: Tracking a Phishing Campaign"
slug: "osint-phishing-campaign"
category: "osint"
description: "Using open-source intelligence techniques to trace the infrastructure behind a phishing campaign targeting a fictional organisation."
date: "2024-04-22"
---

## Overview

This OSINT challenge required tracing a phishing email back to its source infrastructure, identifying the threat actor's hosting setup, and recovering the flag hidden in the campaign's infrastructure.

## Starting Point

A phishing email was provided with the following headers:

```
From: support@secure-banking-update.com
Return-Path: <bounce@mail.suspicious-host.xyz>
Received: from mail.suspicious-host.xyz (185.234.xx.xx)
```

## Domain Investigation

### WHOIS Lookup

```bash
whois secure-banking-update.com
```

Key findings:
- **Registrar**: NameCheap
- **Registration Date**: 2024-04-15 (7 days before the email)
- **Registrant**: Privacy-protected

### DNS Records

```bash
dig secure-banking-update.com ANY
```

- **A Record**: `185.234.xx.xx`
- **MX Record**: `mail.suspicious-host.xyz`
- **TXT Record**: Contained a base64-encoded string

## Infrastructure Mapping

Using Shodan to investigate the IP:

```bash
shodan host 185.234.xx.xx
```

The server was running:
- Nginx 1.18 on port 80
- A GoPhish instance on port 3333
- SSH on port 22

### Certificate Transparency

Searching crt.sh revealed additional subdomains:
- `admin.secure-banking-update.com`
- `staging.secure-banking-update.com`

## Flag Recovery

The base64 string in the TXT record decoded to a partial flag. The second half was found in the HTML source of the staging subdomain's login page, embedded in a comment.

## Tools Used

- WHOIS / dig
- Shodan
- crt.sh
- Wayback Machine
- CyberChef (for decoding)

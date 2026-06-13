---
title: "RSA Weak Key Factorisation"
slug: "rsa-weak-key"
category: "cryptography"
description: "Breaking an RSA encryption scheme by factorising a weak public key modulus using known mathematical attacks."
date: "2024-06-30"
---

## Overview

This cryptography challenge provided an RSA public key and a ciphertext. The public key used a modulus that was vulnerable to factorisation due to the primes being too close together.

## Given Information

```
Public Key (n): 0x00b3510a...  (309 digits)
Public Exponent (e): 65537
Ciphertext (c): 0x7a4f2e...
```

## Analysis

### Key Size Assessment

```python
from Crypto.PublicKey import RSA

key = RSA.import_key(open("public.pem").read())
print(f"Key size: {key.size_in_bits()} bits")
print(f"n = {key.n}")
print(f"e = {key.e}")
```

The key was 1024-bit — weak by modern standards but not trivially factorisable. However, further analysis revealed the primes were suspiciously close together.

## Fermat's Factorisation

Since p and q were close, Fermat's method was applicable:

```python
import gmpy2

def fermat_factor(n):
    a = gmpy2.isqrt(n) + 1
    b2 = a * a - n
    while not gmpy2.is_square(b2):
        a += 1
        b2 = a * a - n
    b = gmpy2.isqrt(b2)
    return int(a - b), int(a + b)

p, q = fermat_factor(n)
print(f"p = {p}")
print(f"q = {q}")
```

The factorisation completed in under a second.

## Decryption

```python
from Crypto.Util.number import inverse, long_to_bytes

phi = (p - 1) * (q - 1)
d = inverse(e, phi)
plaintext = pow(c, d, n)
flag = long_to_bytes(plaintext)
print(flag.decode())
```

## Key Takeaways

- RSA keys must use primes that are sufficiently far apart
- 1024-bit RSA is deprecated — use 2048-bit minimum
- Always use well-tested key generation libraries
- Fermat's factorisation is effective when |p - q| is small

## Tools Used

- Python 3
- PyCryptodome
- gmpy2
- OpenSSL

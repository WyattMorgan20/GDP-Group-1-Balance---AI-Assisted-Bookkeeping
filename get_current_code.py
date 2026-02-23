#!/usr/bin/env python3
"""
Generate current valid TOTP codes RIGHT NOW
"""
import pyotp
import time

secret = "YQ6TBG6P4L5IP5L5KB6PQXVHGGC5G47PTNG2DVFMPLA7KGHVRUIA===="

totp = pyotp.TOTP(secret)

print("=" * 60)
print("CURRENT VALID TOTP CODES (RIGHT NOW)")
print("=" * 60)

now = int(time.time())

# Show the current code and the next one coming up
print(f"\nCURRENT CODE (valid for ~30 seconds): {totp.now()}")
print(f"\nCodes in the time window:")
print("-" * 60)

for offset in [-30, 0, 30]:
    timestamp = now + offset
    code = totp.at(timestamp)
    seconds_from_now = timestamp - now
    
    if seconds_from_now == 0:
        label = "RIGHT NOW (CURRENT)"
    elif seconds_from_now > 0:
        label = f"In ~{seconds_from_now}s (NEXT)"
    else:
        label = f"{-seconds_from_now}s ago (EXPIRED)"
    
    print(f"  {label:35} {code}")

print("\n" + "=" * 60)
print("Try the CURRENT code immediately!")
print("=" * 60)

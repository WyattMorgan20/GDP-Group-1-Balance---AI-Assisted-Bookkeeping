#!/usr/bin/env python3
"""
Test the latest secret and codes
"""
import pyotp
import time

secret = "CJBNC5JHW6LVUUQ6MH7DVS46WHSVNJXLIOIX3TZPKRYM4WGGBTKA===="
codes_tried = ["349582", "208649"]

print("=" * 60)
print("Testing Latest Secret")
print("=" * 60)
print(f"Secret: {secret}\n")
print(f"Codes you just tried: {', '.join(codes_tried)}\n")

try:
    totp = pyotp.TOTP(secret)
    
    now = int(time.time())
    
    print("Generated codes in nearby windows:")
    print("-" * 60)
    
    matches = []
    for offset in [-90, -60, -30, 0, 30, 60, 90]:
        timestamp = now + offset
        code = totp.at(timestamp)
        seconds_from_now = timestamp - now
        
        match_indicator = ""
        if code in codes_tried:
            match_indicator = " ← YOU TRIED THIS!"
            matches.append(code)
        
        if seconds_from_now == 0:
            label = "RIGHT NOW"
        elif seconds_from_now > 0:
            label = f"+{seconds_from_now}s"
        else:
            label = f"{seconds_from_now}s"
        
        print(f"  {label:10} {code}{match_indicator}")
    
    print("\n" + "=" * 60)
    if matches:
        print(f"✓ Found {len(matches)} code(s): {matches}")
        print("The codes match! The secret is correct.")
    else:
        print("✗ NONE of your codes match!")
        print("The authenticator still has a different secret than the server.")
    print("=" * 60)
    
except Exception as e:
    print(f"✗ ERROR: {e}")

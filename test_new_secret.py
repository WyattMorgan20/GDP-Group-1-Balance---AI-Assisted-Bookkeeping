#!/usr/bin/env python3
"""
Test the new secret and codes
"""
import pyotp
import time

secret = "GFMJSV3TDYAXXFSEAP3XBE6XS6ARKZLKBL72XWYA2EZS5S4LCGRA===="
codes_tried = ["761503", "471499", "874626", "525082"]

print("=" * 60)
print("Testing New Secret and Codes")
print("=" * 60)
print(f"Secret: {secret}\n")
print(f"Codes you tried: {', '.join(codes_tried)}\n")

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
        print(f"✓ Found {len(matches)} code(s) you tried: {matches}")
        print("The codes are VALID for the secret.")
        print("The problem is NOT with the codes or secret encoding.")
    else:
        print("✗ NONE of your codes match what pyotp generates!")
        print("This means either:")
        print("  1. You copied the wrong secret")
        print("  2. The authenticator app has a different secret than the server")
        print("  3. The QR code was corrupted")
    print("=" * 60)
    
except Exception as e:
    print(f"✗ ERROR: {e}")

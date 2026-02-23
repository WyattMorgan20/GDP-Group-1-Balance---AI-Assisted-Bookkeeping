#!/usr/bin/env python3
"""
Test the actual secret from the app
"""
import pyotp
import time

# The secret from the app
secret = "YQ6TBG6P4L5IP5L5KB6PQXVHGGC5G47PTNG2DVFMPLA7KGHVRUIA===="
user_code = "881507"

print("=" * 60)
print("Testing Actual Secret from App")
print("=" * 60)
print(f"Secret: {secret}")
print(f"User entered code: {user_code}\n")

try:
    totp = pyotp.TOTP(secret)
    
    # Generate codes for the current window and nearby windows
    now = int(time.time())
    
    print("Generated codes in nearby time windows:")
    print("-" * 60)
    
    match_found = False
    for offset in [-60, -30, 0, 30, 60]:
        timestamp = now + offset
        code = totp.at(timestamp)
        seconds_from_now = timestamp - now
        
        if seconds_from_now == 0:
            label = "RIGHT NOW →"
        elif seconds_from_now > 0:
            label = f"In {seconds_from_now}s →"
        else:
            label = f"{-seconds_from_now}s ago →"
        
        match_indicator = " ← MATCHES USER CODE!" if code == user_code else ""
        print(f"  {label:20} {code}{match_indicator}")
        
        if code == user_code:
            match_found = True
    
    print("\n" + "=" * 60)
    if match_found:
        print("✓ SUCCESS! The code MATCHES. Backend verification should work.")
    else:
        print("✗ Code does NOT match any window. Possible issues:")
        print("  1. The app isn't sending this exact secret to verification")
        print("  2. The phone clock is >60 seconds off from server")
        print("  3. The secret is being modified during storage/retrieval")
    print("=" * 60)
    
except Exception as e:
    print(f"✗ ERROR: {e}")

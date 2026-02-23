#!/usr/bin/env python3
"""
Test the latest secret SXOXUP56AMCA7CWAFB5QRBIGZPGFIBOEJQXGMEZRB4SR56UEKLOQ====
and code 494351
"""
import pyotp
import time

secret = "SXOXUP56AMCA7CWAFB5QRBIGZPGFIBOEJQXGMEZRB4SR56UEKLOQ===="
user_code = "494351"

print("=" * 60)
print("Testing Secret vs User Code")
print("=" * 60)
print(f"Secret: {secret}")
print(f"User entered code: {user_code}\n")

try:
    totp = pyotp.TOTP(secret)
    
    now = int(time.time())
    
    print("Generated codes in nearby windows:")
    print("-" * 60)
    
    match_found = False
    for offset in [-90, -60, -30, 0, 30, 60, 90]:
        timestamp = now + offset
        code = totp.at(timestamp)
        seconds_from_now = timestamp - now
        
        match_indicator = ""
        if code == user_code:
            match_indicator = " ← MATCHES USER CODE!"
            match_found = True
        
        if seconds_from_now == 0:
            label = "RIGHT NOW"
        elif seconds_from_now > 0:
            label = f"+{seconds_from_now}s"
        else:
            label = f"{seconds_from_now}s"
        
        print(f"  {label:10} {code}{match_indicator}")
    
    print("\n" + "=" * 60)
    if match_found:
        print("✓ Code MATCHES! Secret and authenticator are in sync.")
    else:
        print("✗ Code does NOT match any window.")
        print("The authenticator and server have different secrets.")
    print("=" * 60)
    
except Exception as e:
    print(f"✗ ERROR: {e}")

#!/usr/bin/env python3
"""
Test a specific TOTP secret to debug verification issues
"""
import pyotp
import time

# The actual secret from the app
secret = "BCYFH2MSOT6Z6CWLQRROSZ4DQZLCUNPSZNEBWZNRGTFD46R2ZC2A===="

print("=" * 60)
print("TOTP Secret Verification Test")
print("=" * 60)
print(f"Secret: {secret}\n")

try:
    totp = pyotp.TOTP(secret)
    print("✓ Secret is VALID Base32\n")
    
    # Generate a few codes with timestamps
    print("Current and nearby TOTP codes:")
    print("-" * 60)
    
    now = int(time.time())
    
    # Show codes for windows around current time (to account for time skew)
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
        
        print(f"  {label:20} {code}")
    
    print("\n" + "=" * 60)
    print("✓ If your authenticator app shows a code from the list above,")
    print("  the secret and pyotp work correctly.")
    print("  The issue is likely in the verification code on the backend.")
    print("=" * 60)
    
except Exception as e:
    print(f"✗ ERROR: {e}")
    print("The secret is invalid!")

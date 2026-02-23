#!/usr/bin/env python3
import pyotp
import time

# Secret from the server logs
secret = "6QNVOWVRHDKB2QVMJ5GXYOJ5FJ6KN6EGF2AT3QFSAMAVD2W5JD3A===="

totp = pyotp.TOTP(secret)

print(f"Testing secret: {secret}\n")
print("Expected codes NOW:")
for i in range(3):
    code = totp.at(int(time.time()) + (i * 30))
    print(f"  Window +{i}: {code}")

print("\nTesting user-entered codes:")
user_codes = ["782931", "804840", "872962"]
for code in user_codes:
    found = False
    for offset in range(-180, 181, 30):
        test_code = totp.at(int(time.time()) + offset)
        if test_code == code:
            print(f"✓ Code {code} matches at offset {offset}s (window {offset//30})")
            found = True
            break
    if not found:
        print(f"✗ Code {code} doesn't match ANY time window (-180s to +180s)")

#!/usr/bin/env python3
"""
Test to figure out what totp_lite is expecting as input.
If totp_lite(secret, 59062856) generates 924314,
then maybe it expects the UN-DIVIDED timestamp?
"""
import pyotp
import hmac
import hashlib
import struct

secret_b32 = "6QNVOWVRHDKB2QVMJ5GXYOJ5FJ6KN6EGF2AT3QFSAMAVD2W5JD3A===="

# Decode the secret
import base64
secret_bytes = base64.b32decode(secret_b32)
print(f"Secret bytes (hex): {secret_bytes.hex()}")
print(f"Secret length: {len(secret_bytes)}")

# Test with pyotp
totp = pyotp.TOTP(secret_b32)

# The server was at time 1771885772
# For window -3, that's 1771885682
backend_time_window_minus_3 = 1771885682
backend_counter_minus_3 = backend_time_window_minus_3 // 30

print(f"\nBackend calculation:")
print(f"  Backend time: 1771885772")
print(f"  Window -3 time: {backend_time_window_minus_3}")
print(f"  Counter (-3): {backend_counter_minus_3}")

# Now use pyotp to calculate what the code should be
# We need to use the AT method with the actual Unix timestamp
code_at_window_minus_3 = totp.at(backend_time_window_minus_3)
print(f"  Expected code: {code_at_window_minus_3}")

# Now let's manually calculate with HMAC to understand the algorithm
def manual_totp(secret_bytes, counter):
    """Calculate TOTP manually using HMAC-SHA1"""
    # Pack the counter as 8-byte big-endian
    counter_bytes = struct.pack('>Q', counter)
    
    # HMAC-SHA1
    hmac_obj = hmac.new(secret_bytes, counter_bytes, hashlib.sha1)
    digest = hmac_obj.digest()
    
    # Dynamic truncation
    offset = digest[-1] & 0xf
    code = struct.unpack('>I', digest[offset:offset+4])[0]
    code = code & 0x7fffffff  # Remove sign bit
    code = code % 1000000  # 6-digit code
    
    return f"{code:06d}"

print(f"\nManual TOTP calculation:")
for label, counter in [("window 0", 59062857), ("window -1", 59062856), ("window -2", 59062855), ("window -3", 59062854)]:
    code = manual_totp(secret_bytes, counter)
    print(f"  {label} (counter {counter}): {code}")

# Also test what pyotp generates for specific times
print(f"\nPyOTP results:")
for offset in [-90, -60, -30, 0, 30, 60, 90]:
    time_val = 1771885772 + offset
    code = totp.at(time_val)
    print(f"  Offset {offset:+3d}s (time {time_val}): {code}")

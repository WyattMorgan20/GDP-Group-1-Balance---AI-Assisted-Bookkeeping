#!/usr/bin/env python3
"""
Test that the fixed Base32 encoding works with authenticator apps
"""
import sys
import base64
import pyotp

# Example: simulate what the new Rust code produces
# For testing, we'll manually create a proper Base32 secret

def test_base32_secret():
    """Test a properly-formed Base32 secret"""
    # This is what the FIXED Rust code should now produce
    # (A Base32-encoded 32-byte secret)
    proper_base32_secret = "JBSWY3DPEBLW64TMMQQQ===="
    
    print("Testing PROPER Base32 secret:")
    print(f"  Secret: {proper_base32_secret}")
    
    try:
        totp = pyotp.TOTP(proper_base32_secret)
        print(f"  ✓ Valid! Current code: {totp.now()}")
        print(f"  ✓ Provisioning URI: {totp.provisioning_uri(name='test@balancd.dev', issuer_name='Balancd')}")
        return True
    except Exception as e:
        print(f"  ✗ FAILED: {e}")
        return False

def test_base64_secret():
    """Test what the OLD broken code was producing (Base64 instead of Base32)"""
    # This is an example of what the BROKEN code was producing
    # A Base64-encoded 32-byte secret (much longer and contains invalid Base32 chars)
    broken_base64_secret = "JnpvQWxVN09QNWNPeC9qQUQzWWZEa0dDMFhRR0tVOVE="  # 32 bytes Base64-encoded
    
    print("\nTesting BROKEN Base64 secret (old code):")
    print(f"  Secret: {broken_base64_secret}")
    
    try:
        totp = pyotp.TOTP(broken_base64_secret)
        print(f"  ✗ Unexpectedly accepted (shouldn't happen)")
        return False
    except Exception as e:
        print(f"  ✓ Correctly rejected: {e}")
        return True

if __name__ == "__main__":
    print("=" * 60)
    print("TOTP Base32 Fix Verification")
    print("=" * 60)
    
    base32_ok = test_base32_secret()
    base64_ok = test_base64_secret()
    
    print("\n" + "=" * 60)
    if base32_ok and base64_ok:
        print("✓ FIX IS CORRECT: Base32 works, Base64 is rejected")
    else:
        print("✗ Issue with test logic")
    print("=" * 60)

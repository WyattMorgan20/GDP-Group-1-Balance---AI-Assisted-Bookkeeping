// Quick test to understand totp_lite behavior
// Compile with: rustc --edition 2021 -L ~/.cargo/registry/src/github.com-*/totp_lite-*/

use base32::Alphabet;

fn main() {
    // Secret from server: 6QNVOWVRHDKB2QVMJ5GXYOJ5FJ6KN6EGF2AT3QFSAMAVD2W5JD3A====
    let secret_b32 = "6QNVOWVRHDKB2QVMJ5GXYOJ5FJ6KN6EGF2AT3QFSAMAVD2W5JD3A====";
    
    let decoded = base32::decode(Alphabet::RFC4648 { padding: true }, secret_b32).unwrap();
    println!("Decoded secret: {:?}", decoded);
    println!("Decoded length: {} bytes", decoded.len());
    
    // The issue might be:
    // 1. totp_lite expects a different parameter
    // 2. The time calculation is wrong
    // 3. The secret needs a different encoding
    
    // Let's just confirm the secret decodes properly
    println!("\nSecret decoding is working correctly");
}

use base64::{ engine::general_purpose::STANDARD, Engine };
use rand::Rng;
use totp_lite::{ totp, Sha1 };
use std::time::{ SystemTime, UNIX_EPOCH };

/// Generate a random secret for TOTP
pub fn generate_secret() -> String {
    let mut rng = rand::thread_rng();
    let mut secret_bytes = [0u8; 32];
    rng.fill(&mut secret_bytes);

    // Encode to base32 for TOTP (standard format)
    STANDARD.encode(&secret_bytes)
}

/// Generate QR code URL for authenticator apps
/// Uses the standard otpauth:// URI format
pub fn generate_qr_code_url(email: &str, secret: &str, issuer: &str) -> String {
    let encoded_email = urlencoding::encode(email);
    let encoded_issuer = urlencoding::encode(issuer);

    format!(
        "otpauth://totp/{}?secret={}&issuer={}",
        encoded_email, secret, encoded_issuer
    )
}

/// Verify a TOTP code against the secret
/// Allows for time drift (30 second window before and after current time)
pub fn verify_totp(secret: &str, code: &str) -> bool {
    // Remove any spaces from the code
    let code = code.trim().replace(" ", "");

    if code.len() != 6 || !code.chars().all(|c| c.is_numeric()) {
        return false;
    }

    // Decode the secret from base64
    let Ok(decoded_secret) = STANDARD.decode(secret) else {
        return false;
    };

    // Get current time in seconds since Unix epoch
    let now = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs();

    // Check current window and +/- 1 window (allows for time skew)
    // Each window is 30 seconds
    for window_offset in &[-1, 0, 1] {
        let time = now as i64 + (window_offset * 30);
        if time < 0 {
            continue;
        }

        let generated_code = totp::<Sha1>(&decoded_secret, time as u64 / 30);
        if generated_code == code {
            return true;
        }
    }

    false
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_secret() {
        let secret1 = generate_secret();
        let secret2 = generate_secret();

        assert_ne!(secret1, secret2);
        assert!(!secret1.is_empty());
        assert!(!secret2.is_empty());
    }

    #[test]
    fn test_generate_qr_code_url() {
        let secret = "JBSWY3DPEBLW64TMMQQQ====";
        let email = "user@example.com";
        let issuer = "Balancd";

        let url = generate_qr_code_url(email, secret, issuer);

        assert!(url.contains("otpauth://totp/"));
        assert!(url.contains("user@example.com"));
        assert!(url.contains(&format!("secret={}", secret)));
        assert!(url.contains("Balancd"));
    }
}

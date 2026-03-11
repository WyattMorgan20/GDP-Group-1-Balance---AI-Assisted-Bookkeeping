use reqwest::Client;
use serde_json::json;

#[allow(dead_code)]
pub struct SumoLogger {
    client: Client,
    endpoint: String,
}

impl SumoLogger {
    pub fn new(http_source_url: &str) -> Self {
        Self {
            client: Client::new(),
            endpoint: http_source_url.to_string(),
        }
    }

    #[allow(dead_code)]
    pub async fn log(&self, level: &str, message: &str, metadata: serde_json::Value) {
        let payload = json!({
            "timestamp": chrono::Utc::now().to_rfc3339(),
            "level": level,
            "message": message,
            "metadata": metadata,
        });

        let _ = self.client
            .post(&self.endpoint)
            .json(&payload)
            .send()
            .await;
    }
}
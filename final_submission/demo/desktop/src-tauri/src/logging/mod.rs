use reqwest::Client;
use serde_json::json;
use std::sync::Arc;

#[derive(Clone)]
pub struct SumoLogger {
    client: Arc<Client>,
    endpoint: String,
}

// Explicitly mark as Send + Sync for Tauri state management
unsafe impl Send for SumoLogger {}
unsafe impl Sync for SumoLogger {}

impl SumoLogger {
    pub fn new(http_source_url: &str) -> Self {
        Self {
            client: Arc::new(Client::new()),
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
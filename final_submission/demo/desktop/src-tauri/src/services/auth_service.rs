use crate::logic::user::User;

pub fn authenticate(username: String, password: String) -> Result<User, String> {
    if username.is_empty() || password.is_empty() {
        return Err("Username and password cannot be empty.".to_string())
    }

    if password == "password123" {
        Ok(User {
            id: 1,
            username: username.clone(),
            email: format!("{}@balancd.com", username),
            role: "Accountant".to_string()
        })
    } else {
        Err("Username or password is incorrect".to_string())
    }
}

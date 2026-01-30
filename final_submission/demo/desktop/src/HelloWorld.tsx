import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";


function HelloWorld() {
    
    return (
    <body>
        <h2>Login</h2>
            <form id="loginForm">
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <br /><br />
                <button type="submit">Login</button>
            </form>

    <script src="dist/main.js"></script>
    </body>
    );

}

export default HelloWorld
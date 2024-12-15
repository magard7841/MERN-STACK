import React, { useState } from "react";

const LoginForm = () => {
    const styles = {
        container: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f7f9fc",
            fontFamily: "'Arial', sans-serif",
        },
        formContainer: {
            backgroundColor: "#fff",
            padding: "30px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
        },
        inputField: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "16px",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
        },
        buttonHover: {
            backgroundColor: "#0056b3",
        },
        link: {
            color: "#007bff",
            textDecoration: "none",
            marginTop: "10px",
            display: "inline-block",
        },
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(data.message);
                // Store token in localStorage (if needed)
                localStorage.setItem("token", data.token);
            } else {
                const error = await response.json();
                setMessage(error.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setMessage("An error occurred. Please try again.");
        }
    };
    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.inputField}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.inputField}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                    >
                        Sign In
                    </button>
                </form>
                {message && <p>{message}</p>}
                <a href="/signup" style={styles.link}>
                    Don't have an account? Sign Up
                </a>
            </div>
        </div>
    );
};

export default LoginForm;

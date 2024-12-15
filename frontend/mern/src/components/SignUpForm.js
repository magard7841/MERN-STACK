import React, { useState } from "react";

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:5000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }

            // Handle success (e.g., show a success message, redirect user, etc.)
            const data = await response.json();
            console.log(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
        },
        buttonHover: {
            backgroundColor: "#218838",
        },
        link: {
            color: "#007bff",
            textDecoration: "none",
            marginTop: "10px",
            display: "inline-block",
        },
        error: {
            color: "red",
            textAlign: "center",
            marginTop: "10px",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        style={styles.inputField}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.inputField}
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.inputField}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
                {error && <p style={styles.error}>{error}</p>}
                <a href="/" style={styles.link}>
                    Already have an account? Login
                </a>
            </div>
        </div>
    );
};

export default SignupForm;

// ===============================
// Elements
// ===============================

const form = document.getElementById("registerForm");

const nameInput = document.getElementById("name");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

const confirmPasswordInput = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");

// ===============================
// Show / Hide Password
// ===============================

togglePassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        togglePassword.classList.replace("fa-eye", "fa-eye-slash");

    }

    else {

        passwordInput.type = "password";

        togglePassword.classList.replace("fa-eye-slash", "fa-eye");

    }

});

// ===============================
// Register User
// ===============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = nameInput.value.trim();

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    const confirmPassword = confirmPasswordInput.value;

    // ===============================
    // Validation
    // ===============================

    if (name === "" || email === "" || password === "") {

        alert("সব তথ্য পূরণ করুন।");

        return;

    }

    if (password !== confirmPassword) {

        alert("❌ দুইটি Password মিলছে না।");

        return;

    }

    // ===============================
    // Send Data to Flask
    // ===============================

    try {

        const response = await fetch("http://127.0.0.1:5000/register", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                name: name,

                email: email,

                password: password

            })

        });

        const result = await response.json();

        if (response.ok) {

            alert("🎉 Registration Successful!");

            form.reset();

            window.location.href = "login.html";

        }

        else {

            alert("❌ " + result.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("❌ Server Error!");

    }

});
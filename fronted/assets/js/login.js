// ===============================
// Elements
// ===============================

const form = document.getElementById("loginForm");

const emailInput = document.getElementById("email");

const passwordInput = document.getElementById("password");

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
// Login
// ===============================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email = emailInput.value.trim();

    const password = passwordInput.value;

    // ===========================
    // Validation
    // ===========================

    if (email === "" || password === "") {

        alert("সব তথ্য পূরণ করুন।");

        return;

    }

    try {

        const response = await fetch("http://127.0.0.1:5000/login", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                email: email,

                password: password

            })

        });

        const result = await response.json();

        console.log(result);

        if (response.ok && result.success) {

            // ===========================
            // Save User
            // ===========================

            localStorage.setItem(

                "user",

                JSON.stringify(result.user)

            );

            alert("🎉 Login Successful!");

            window.location.href = "index.html";

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
// =====================================
// Elements
// =====================================

const nameElement = document.getElementById("name");
const emailElement = document.getElementById("email");
const reviewsContainer = document.getElementById("reviews-container");
const logoutBtn = document.getElementById("logoutBtn");

// =====================================
// Check Login
// =====================================

const currentUser = JSON.parse(localStorage.getItem("user"));

if (!currentUser) {

    alert("অনুগ্রহ করে প্রথমে Login করুন।");

    window.location.href = "login.html";

}

// =====================================
// Load User Information
// =====================================

async function loadProfile() {

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/user/${currentUser.email}`
        );

        const user = await response.json();

        nameElement.innerText = user.name;

        emailElement.innerText = user.email;

    }

    catch (error) {

        console.log(error);

    }

}

// =====================================
// Load My Reviews
// =====================================

async function loadMyReviews() {

    try {

        const response = await fetch(
            `http://127.0.0.1:5000/user-reviews/${currentUser.email}`
        );

        const reviews = await response.json();

        reviewsContainer.innerHTML = "";

        if (reviews.length === 0) {

            reviewsContainer.innerHTML = `

                <h3 style="text-align:center;">

                    এখনো কোনো Review লিখেননি।

                </h3>

            `;

            return;

        }

        reviews.forEach(review => {

            reviewsContainer.innerHTML += `

                <div class="review-card">

                    <h3 class="book">

                        📖 ${review.title}

                    </h3>

                    <div class="rating">

                        ⭐ ${review.rating}/5

                    </div>

                    <p>

                        ${review.comment}

                    </p>

                </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =====================================
// Logout
// =====================================

logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("user");

    alert("Logout Successful");

    window.location.href = "login.html";

});

// =====================================
// Start
// =====================================

loadProfile();
loadMyReviews();
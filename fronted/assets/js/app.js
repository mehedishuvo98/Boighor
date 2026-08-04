console.log("✅ app.js Loaded");

// =====================================
// Navbar
// =====================================

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("userName");
const adminBtn = document.getElementById("adminBtn");

// =====================================
// Login Check
// =====================================

const currentUser = JSON.parse(localStorage.getItem("user"));

if (currentUser) {

    if (loginBtn)
        loginBtn.style.display = "none";

    if (registerBtn)
        registerBtn.style.display = "none";

    if (logoutBtn)
        logoutBtn.style.display = "inline-block";

    if (userName) {

        userName.style.display = "inline-block";

        userName.innerHTML = `
            <a href="profile.html" class="profile-link">
                👤 ${currentUser.name}
            </a>
        `;
    }

    // ==========================
    // Only Admin দেখতে পাবে
    // ==========================

    if (currentUser.role === "admin") {

        if (adminBtn) {

            adminBtn.style.display = "inline-block";

        }

    }

}

// =====================================
// Logout
// =====================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("user");

        alert("Logout Successful");

        window.location.href = "index.html";

    });

}

// =====================================
// Featured Books
// =====================================

const bookGrid = document.querySelector(".book-grid");

async function loadFeaturedBooks() {

    if (!bookGrid) return;

    try {

        const response =
            await fetch("http://127.0.0.1:5000/books");

        const books =
            await response.json();

        bookGrid.innerHTML = "";

        books.slice(0, 3).forEach(book => {

            bookGrid.innerHTML += `

            <div class="book-card">

                <img src="${book.image}" alt="${book.title}">

                <div class="book-content">

                    <span class="category">

                        ${book.category}

                    </span>

                    <h3>

                        ${book.title}

                    </h3>

                    <p>

                        ${book.author}

                    </p>

                    <div class="rating">

                        ⭐ ${book.rating}

                    </div>

                    <a
                        href="book-details.html?id=${book.id}"
                        class="details-btn">

                        বিস্তারিত দেখুন

                    </a>

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =====================================
// Latest Reviews
// =====================================

const reviewGrid = document.querySelector(".review-grid");

async function loadLatestReviews() {

    if (!reviewGrid) return;

    try {

        const response =
            await fetch("http://127.0.0.1:5000/latest-reviews");

        const reviews =
            await response.json();

        reviewGrid.innerHTML = "";

        reviews.forEach(review => {

            reviewGrid.innerHTML += `

            <div class="review-card">

                <img src="https://i.pravatar.cc/100?u=${review.id}">

                <h3>

                    ${review.reviewer}

                </h3>

                <small>

                    ${review.title}

                </small>

                <p>

                    "${review.comment}"

                </p>

                <div>

                    ⭐ ${review.rating}

                </div>

            </div>

            `;

        });

    }

    catch (error) {

        console.log(error);

    }

}

// =====================================
// Newsletter
// =====================================

const newsletterBtn =
    document.querySelector(".newsletter button");

if (newsletterBtn) {

    newsletterBtn.addEventListener("click", () => {

        const email =
            document.querySelector(".newsletter input").value;

        if (email === "") {

            alert("ইমেইল লিখুন");

            return;

        }

        alert("ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।");

        document.querySelector(".newsletter input").value = "";

    });

}

// =====================================
// Start
// =====================================

loadFeaturedBooks();
loadLatestReviews();
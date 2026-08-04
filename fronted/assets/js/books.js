console.log("✅ books.js Loaded");

// ===============================
// Elements
// ===============================

const booksContainer = document.getElementById("books-container");
const searchInput = document.getElementById("search");
const filterButtons = document.querySelectorAll(".filter-btn");

// সব বই এখানে থাকবে
let allBooks = [];

// বর্তমান Filter
let currentCategory = "All";

// ===============================
// Load Books
// ===============================

async function loadBooks() {

    try {

        console.log("📚 Fetching books...");

        const response = await fetch("http://127.0.0.1:5000/books");

        if (!response.ok) {

            throw new Error("API Error");

        }

        allBooks = await response.json();

        console.log("✅ Books Received:", allBooks);

        applyFilters();

    }

    catch (error) {

        console.error("❌ Error:", error);

        booksContainer.innerHTML = `

            <h2 style="text-align:center;color:red;">

                ❌ বই লোড করা যায়নি।

            </h2>

        `;

    }

}

// ===============================
// Display Books
// ===============================

function displayBooks(books) {

    booksContainer.innerHTML = "";

    if (books.length === 0) {

        booksContainer.innerHTML = `

            <h2 style="text-align:center;width:100%;padding:50px;">

                😥 কোন বই পাওয়া যায়নি।

            </h2>

        `;

        return;

    }

    books.forEach(book => {

        booksContainer.innerHTML += `

        <div class="book-card">

            <img src="${book.image}" alt="${book.title}">

            <div class="book-info">

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

                <button
                    class="details-btn"
                    data-id="${book.id}">

                    বিস্তারিত দেখুন

                </button>

            </div>

        </div>

        `;

    });

    // Details Button

    document.querySelectorAll(".details-btn").forEach(button => {

        button.addEventListener("click", function () {

            const id = this.dataset.id;

            console.log("👉 Book ID =", id);

            window.location.href = `book-details.html?id=${id}`;

        });

    });

}

// ===============================
// Apply Search + Category
// ===============================

function applyFilters() {

    let filteredBooks = [...allBooks];

    // Category Filter

    if (currentCategory !== "All") {

        filteredBooks = filteredBooks.filter(book =>

            book.category.toLowerCase() === currentCategory.toLowerCase()

        );

    }

    // Search Filter

    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword !== "") {

        filteredBooks = filteredBooks.filter(book =>

            book.title.toLowerCase().includes(keyword) ||

            book.author.toLowerCase().includes(keyword) ||

            book.category.toLowerCase().includes(keyword)

        );

    }

    displayBooks(filteredBooks);

}

// ===============================
// Live Search
// ===============================

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        applyFilters();

    });

}

// ===============================
// Category Filter
// ===============================

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        this.classList.add("active");

        currentCategory = this.dataset.category;

        console.log("Category:", currentCategory);

        applyFilters();

    });

});

// ===============================
// Start
// ===============================

loadBooks();
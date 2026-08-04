// =======================================
// Get Book ID from URL
// =======================================

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("Book ID:", id);

if (!id) {
    alert("Book ID পাওয়া যায়নি!");
    throw new Error("No Book ID Found");
}


// =======================================
// Load Book Details
// =======================================

async function loadBook() {

    try {

        const response = await fetch(`http://127.0.0.1:5000/book/${id}`);

        if (!response.ok) {
            throw new Error("Book not found");
        }

        const book = await response.json();

        document.querySelector(".book-image img").src = book.image;
        document.querySelector(".book-image img").alt = book.title;

        document.querySelector(".category").innerText = book.category;
        document.querySelector(".book-info h1").innerText = book.title;
        document.querySelector(".book-info h3").innerText = book.author;
        document.querySelector(".rating span").innerText = `${book.rating} Rating`;
        document.querySelector(".book-info p").innerText = book.description;

    }

    catch (error) {

        console.error("Book Error:", error);

    }

}


// =======================================
// Load Reviews
// =======================================

async function loadReviews() {

    try {

        const response = await fetch(`http://127.0.0.1:5000/reviews/${id}`);

        if (!response.ok) {
            throw new Error("Review Not Found");
        }

        const reviews = await response.json();

        console.log("Reviews:", reviews);

        const container = document.getElementById("reviews-container");

        container.innerHTML = "";

        if (reviews.length === 0) {

            container.innerHTML = `
                <p style="text-align:center">
                    এখনও কোন রিভিউ নেই।
                </p>
            `;

            return;
        }

        reviews.forEach(review => {

            container.innerHTML += `

                <div class="review-card">

                    <img src="https://i.pravatar.cc/80?u=${review.id}" alt="User">

                    <div>

                        <h3>${review.reviewer}</h3>

                        <h4>⭐ ${review.rating}/5</h4>

                        <p>${review.comment}</p>

                        <small>${review.created_at}</small>

                    </div>

                </div>

            `;

        });

    }

    catch (error) {

        console.error("Review Error:", error);

    }

}


// =======================================
// Review Button
// =======================================

const reviewBtn = document.querySelector(".review-btn");

reviewBtn.addEventListener("click", () => {

    document.querySelector(".add-review").scrollIntoView({

        behavior: "smooth"

    });

});


// =======================================
// Submit Review
// =======================================

const form = document.querySelector("#review-form");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const reviewer = document.getElementById("reviewer").value.trim();

    const email = document.getElementById("email").value.trim();

    const rating = document.getElementById("rating").value;

    const comment = document.getElementById("comment").value.trim();

    const reviewData = {

        book_id: Number(id),

        reviewer: reviewer,

        email: email,

        rating: Number(rating),

        comment: comment

    };

    console.log(reviewData);

    try {

        const response = await fetch("http://127.0.0.1:5000/reviews", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(reviewData)

        });

        const result = await response.json();

        if (result.success) {

            alert(result.message);

            form.reset();

            loadReviews();

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.error(error);

        alert("Review Submit Failed");

    }

});

// =======================================
// Load Everything
// =======================================

loadBook();
loadReviews();
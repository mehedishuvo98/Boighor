// =====================================
// Admin Dashboard
// =====================================

console.log("✅ Admin Dashboard Loaded");

// =====================================
// Elements
// =====================================

const table = document.getElementById("bookTable");
const modal = document.getElementById("bookModal");
const addBookBtn = document.getElementById("addBookBtn");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const form = document.getElementById("bookForm");

// বর্তমানে কোন Book Edit হচ্ছে
let editingBookId = null;

// =====================================
// Load Books
// =====================================

async function loadBooks() {

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/books"
        );

        const books = await response.json();

        displayBooks(books);

    }

    catch (error) {

        console.log(error);

        table.innerHTML = `

        <tr>

            <td colspan="7">

                ❌ Books Load Failed

            </td>

        </tr>

        `;

    }

}

// =====================================
// Display Books
// =====================================

function displayBooks(books) {

    table.innerHTML = "";

    books.forEach(book => {

        table.innerHTML += `

        <tr>

            <td>${book.id}</td>

            <td>

                <img
                    src="${book.image}"
                    alt="${book.title}"
                    width="70">

            </td>

            <td>${book.title}</td>

            <td>${book.author}</td>

            <td>${book.category}</td>

            <td>⭐ ${book.rating}</td>

            <td>

                <button
                    class="edit-btn"
                    data-id="${book.id}">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    data-id="${book.id}">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

    // ==========================
    // Edit Button
    // ==========================

    const editButtons = document.querySelectorAll(".edit-btn");

    editButtons.forEach(button => {

        button.addEventListener("click", async function () {

            const id = this.dataset.id;

            editingBookId = id;

            try {

                const response = await fetch(

                    "http://127.0.0.1:5000/book/" + id

                );

                const book = await response.json();

                modal.style.display = "flex";

                modalTitle.innerText = "বই Edit করুন";

                document.getElementById("title").value =
                    book.title;

                document.getElementById("author").value =
                    book.author;

                document.getElementById("category").value =
                    book.category;

                document.getElementById("rating").value =
                    book.rating;

                document.getElementById("image").value =
                    book.image;

                document.getElementById("description").value =
                    book.description;

            }

            catch (error) {

                console.log(error);

                alert("❌ Book Load Failed");

            }

        });

    });

    // ==========================
    // Delete Button
    // ==========================

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => {

        button.addEventListener("click", async function () {

            const id = this.dataset.id;

            const confirmDelete = confirm(

                "আপনি কি এই বইটি Delete করতে চান?"

            );

            if (!confirmDelete) {

                return;

            }

            try {

                const response = await fetch(

                    "http://127.0.0.1:5000/admin/books/" + id,

                    {

                        method: "DELETE"

                    }

                );

                const result = await response.json();

                if (result.success) {

                    alert("✅ Book Deleted Successfully");

                    loadBooks();

                }

                else {

                    alert(result.message);

                }

            }

            catch (error) {

                console.log(error);

                alert("❌ Server Error");

            }

        });

    });

}

// =====================================
// Open Modal
// =====================================

addBookBtn.addEventListener("click", () => {

    editingBookId = null;

    modal.style.display = "flex";

    modalTitle.innerText = "নতুন বই যোগ করুন";

    form.reset();

});

// =====================================
// Close Modal
// =====================================

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", function (e) {

    if (e.target === modal) {

        modal.style.display = "none";

    }

});

// =====================================
// Save Book (Add / Edit)
// =====================================

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = {

        title: document.getElementById("title").value,

        author: document.getElementById("author").value,

        category: document.getElementById("category").value,

        rating: document.getElementById("rating").value,

        image: document.getElementById("image").value,

        description: document.getElementById("description").value

    };

    const url = editingBookId

        ? "http://127.0.0.1:5000/admin/books/" + editingBookId

        : "http://127.0.0.1:5000/admin/books";

    const method = editingBookId

        ? "PUT"

        : "POST";

    try {

        const response = await fetch(url, {

            method: method,

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(data)

        });

        const result = await response.json();

        if (result.success) {

            alert(

                editingBookId

                    ? "✅ Book Updated Successfully"

                    : "✅ Book Added Successfully"

            );

            editingBookId = null;

            modal.style.display = "none";

            form.reset();

            loadBooks();

        }

        else {

            alert(result.message);

        }

    }

    catch (error) {

        console.log(error);

        alert("❌ Server Error");

    }

});

// =====================================
// Start
// =====================================

loadBooks();
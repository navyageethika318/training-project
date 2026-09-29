const form = document.getElementById("idForm");

const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const departmentInput = document.getElementById("department");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const dobInput = document.getElementById("dob");
const photoInput = document.getElementById("photo");

const cardName = document.getElementById("cardName");
const cardId = document.getElementById("cardId");
const cardRole = document.getElementById("cardRole");
const cardDepartment = document.getElementById("cardDepartment");
const cardEmail = document.getElementById("cardEmail");
const cardPhone = document.getElementById("cardPhone");
const cardDob = document.getElementById("cardDob");
const cardPhoto = document.getElementById("cardPhoto");

const resetBtn = document.getElementById("resetBtn");
const downloadBtn = document.getElementById("downloadBtn");
const printBtn = document.getElementById("printBtn");


// Generate unique ID
function generateID() {

    const randomNumber = Math.floor(
        100000 + Math.random() * 900000
    );

    return "DID-" + randomNumber;
}


// Format date
function formatDate(date) {

    if (!date) {
        return "DD/MM/YYYY";
    }

    const parts = date.split("-");

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}


// Generate ID Card
form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();
    const department = departmentInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const dob = dobInput.value;

    // Display values
    cardName.textContent = name;
    cardId.textContent = generateID();
    cardRole.textContent = role;
    cardDepartment.textContent = department;
    cardEmail.textContent = email;
    cardPhone.textContent = phone;
    cardDob.textContent = formatDate(dob);

});


// Upload profile photo
photoInput.addEventListener("change", function() {

    const file = photoInput.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function(event) {

            cardPhoto.src = event.target.result;

        };

        reader.readAsDataURL(file);
    }
});


// Reset form
resetBtn.addEventListener("click", function() {

    form.reset();

    cardName.textContent = "Your Name";
    cardId.textContent = "ID-000000";
    cardRole.textContent = "Your Role";
    cardDepartment.textContent = "Department";
    cardEmail.textContent = "example@email.com";
    cardPhone.textContent = "0000000000";
    cardDob.textContent = "DD/MM/YYYY";

    cardPhoto.src = "https://via.placeholder.com/120";

});


// Download ID Card
downloadBtn.addEventListener("click", function() {

    const card = document.getElementById("idCard");

    html2canvas(card, {
        scale: 2,
        useCORS: true
    }).then(function(canvas) {

        const link = document.createElement("a");

        link.download = "digital-id-card.png";

        link.href = canvas.toDataURL("image/png");

        link.click();

    });

});


// Print ID Card
printBtn.addEventListener("click", function() {

    const card = document.getElementById("idCard");

    const printWindow = window.open("", "", "width=700,height=700");

    printWindow.document.write(`
        <html>
        <head>
            <title>Digital ID Card</title>

            <style>

                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    font-family: Arial, sans-serif;
                }

                .id-card {
                    width: 480px;
                    border: 1px solid #ddd;
                    border-radius: 18px;
                    overflow: hidden;
                }

                .card-header {
                    background: #2563eb;
                    color: white;
                    text-align: center;
                    padding: 20px;
                }

                .card-header h2 {
                    margin: 0;
                }

                .card-body {
                    display: flex;
                    gap: 20px;
                    padding: 25px;
                }

                .photo-container img {
                    width: 110px;
                    height: 130px;
                    object-fit: cover;
                    border-radius: 10px;
                }

                .details h2 {
                    margin-top: 0;
                }

                .details p {
                    font-size: 13px;
                }

                .card-footer {
                    padding: 12px;
                    background: #f3f4f6;
                    display: flex;
                    justify-content: space-between;
                }

            </style>

        </head>

        <body>

            ${card.outerHTML}

        </body>

        </html>
    `);

    printWindow.document.close();

    printWindow.onload = function() {

        printWindow.print();

        printWindow.close();

    };

});
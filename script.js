document.addEventListener("DOMContentLoaded", function () {
    var contactForm = document.getElementById("contactForm");
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
        var isValid = true;
        // Validate individual fields 
        function validateField(fieldId, type) {
            if (type === void 0) { type = "text"; }
            var field = document.getElementById(fieldId);
            var value = field.value.trim();
            var errorMessage = "This field is required";
            if (value === "") {
                field.classList.add("error-border");
                field.placeholder = errorMessage; 
                field.value = ""; 
                isValid = false;
            }
            else if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
                errorMessage = "Enter a valid email";
                field.classList.add("error-border");
                field.placeholder = errorMessage;
                field.value = "";
                isValid = false;
            }
            else if (type === "tel" && !/^\d{10}$/.test(value)) {
                errorMessage = "Enter a valid 10-digit number";
                field.classList.add("error-border");
                field.placeholder = errorMessage;
                field.value = "";
                isValid = false;
            }
            else {
                field.classList.remove("error-border");
                if (fieldId === "name")
                    field.placeholder = "Enter your name";
                if (fieldId === "email")
                    field.placeholder = "Enter your email";
                if (fieldId === "contact")
                    field.placeholder = "Enter your contact number";
                if (fieldId === "subject")
                    field.placeholder = "Enter the subject";
                if (fieldId === "message")
                    field.placeholder = "Enter your message";
            }
        }
        validateField("name");
        validateField("email", "email");
        validateField("contact", "tel");
        validateField("subject");
        validateField("message");
        if (isValid) {
            var formData = {
                Name: document.getElementById("name").value,
                Email: document.getElementById("email").value,
                ContactNumber: document.getElementById("contact").value,
                Subject: document.getElementById("subject").value,
                Message: document.getElementById("message").value,
            };
            console.log(formData);
            fetch("https://67174b6bb910c6a6e0275d5f.mockapi.io/api/v1/ContactMessage", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                alert("Message sent successfully!");
                contactForm.reset(); 
            })
                .catch(function (error) {
                console.error("Error:", error);
                alert("Failed to send message.");
            });
        }
        else {
            console.log("form invalid");
        }
    });
});

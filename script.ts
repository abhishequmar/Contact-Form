interface ContactFormData {
  Name: string;
  Email: string;
  ContactNumber: string;
  Subject: string;
  Message: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm") as HTMLFormElement;

  contactForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    let isValid: boolean = true;

    function validateField(fieldId: string, type: string = "text"): void {
      const field = document.getElementById(fieldId) as HTMLInputElement | HTMLTextAreaElement;
      const value: string = field.value.trim();

      let errorMessage: string = "This field is required";

      if (value === "") {
        field.classList.add("error-border");
        field.placeholder = errorMessage; 
        field.value = "";
        isValid = false;
      } else if (type === "email" && !/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Enter a valid email";
        field.classList.add("error-border");
        field.placeholder = errorMessage;
        field.value = "";
        isValid = false;
      } else if (type === "tel" && !/^\d{10}$/.test(value)) {
        errorMessage = "Enter a valid 10-digit number";
        field.classList.add("error-border");
        field.placeholder = errorMessage;
        field.value = "";
        isValid = false;
      } else {
        field.classList.remove("error-border");
        if (fieldId === "name") field.placeholder = "Enter your name";
        if (fieldId === "email") field.placeholder = "Enter your email";
        if (fieldId === "contact") field.placeholder = "Enter your contact number";
        if (fieldId === "subject") field.placeholder = "Enter the subject";
        if (fieldId === "message") field.placeholder = "Enter your message";
      }
    }

    validateField("name");
    validateField("email", "email");
    validateField("contact", "tel");
    validateField("subject");
    validateField("message");

    if (isValid) {
      const formData: ContactFormData = {
        Name: (document.getElementById("name") as HTMLInputElement).value,
        Email: (document.getElementById("email") as HTMLInputElement).value,
        ContactNumber: (document.getElementById("contact") as HTMLInputElement).value,
        Subject: (document.getElementById("subject") as HTMLInputElement).value,
        Message: (document.getElementById("message") as HTMLTextAreaElement).value,
      };
      console.log(formData);

      fetch("https://67174b6bb910c6a6e0275d5f.mockapi.io/api/v1/ContactMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Message sent successfully!");
          contactForm.reset(); 
        })
        .catch((error: Error) => {
          console.error("Error:", error);
          alert("Failed to send message.");
        });
    } else {
      console.log("form invalid");
    }
  });
});

// GLightbox initialization
const lightbox = GLightbox();

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        let isValid = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const phone = document.getElementById("phone");
        const message = document.getElementById("message");

        document.querySelectorAll(".invalid-feedback").forEach((el) => el.remove());
        document.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));

        if (!name.value.trim()) {
            isValid = false;
            addValidationError(name, "Prosím zadejte své jméno.");
        }

        if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
            isValid = false;
            addValidationError(email, "Prosím zadejte platný e-mail.");
        }

        if (!message.value.trim()) {
            isValid = false;
            addValidationError(message, "Prosím zadejte svou zprávu.");
        }

        if (!isValid) return;

        const payload = {
            accessKey: "sf_m7fcd4fjm9k29127jge1mia0",
            name: name.value.trim(),
            email: email.value.trim(),
            replyTo: email.value.trim(),
            phone: phone.value.trim(),
            message: message.value.trim(),
            $source: "Web elektrikari-fm.cz",
        };

        try {
            const response = await fetch("https://api.staticforms.xyz/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                form.innerHTML = `
                <div class="alert alert-success" role="alert">
                    Vaše zpráva byla úspěšně odeslána. Děkujeme!
                </div>
            `;
            } else {
                const errorData = await response.json();
                form.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Odeslání zprávy se nezdařilo. ${errorData.error || "Zkuste to prosím znovu později."}
                </div>
            `;
            }
        } catch (error) {
            form.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Došlo k chybě při odesílání zprávy. Zkuste to prosím znovu.
            </div>
        `;
        }
    });

    function addValidationError(element, message) {
        element.classList.add("is-invalid");
        const feedback = document.createElement("div");
        feedback.className = "invalid-feedback";
        feedback.textContent = message;
        element.parentNode.appendChild(feedback);
    }
}); 
// ===============================
// CONTACT FORM SUBMIT
// ===============================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Parameters for your EmailJS templates
  const templateParams = {
    name: name,
    email: email,
    message: message
  };

  // ===============================
  // 1. EMAIL TO ADMIN
  // ===============================
  // Using Admin Template ID: template_kmhtnqv
  emailjs.send("default_service", "template_kmhtnqv", templateParams)
    .then(function(response) {
       console.log("Admin Notification Sent!", response.status, response.text);
    }, function(error) {
       console.log("Admin Email Failed:", error);
    });

  // ===============================
  // 2. CONFIRMATION EMAIL TO CUSTOMER
  // ===============================
  // Using Customer Template ID: template_3r2wqif
  emailjs.send("default_service", "template_3r2wqif", templateParams)
    .then(function(response) {
       console.log("Customer Confirmation Sent!", response.status, response.text);
    }, function(error) {
       console.log("Customer Email Failed:", error);
    });

  // ===============================
  // 3. TELEGRAM ALERT TO ADMIN
  // ===============================
  const telegramMessage = `
🚀 New Contact - ZyphoraTech

👤 Name: ${name}
📧 Email: ${email}
📝 Message: ${message}
  `;

  sendTelegram(telegramMessage);

  // Success Feedback
  alert("Message Sent Successfully! ZyphoraTech will contact you soon.");
  contactForm.reset();
});


// ===============================
// TELEGRAM FUNCTION
// ===============================
function sendTelegram(message) {
  const botToken = "8662557516:AAFP4veh6dW_v7w0uX20hQ1yLjYzrV6oqE";
  const chatId = "1758085069";

  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  })
  .then(response => response.json())
  .catch(error => console.error("Telegram Error:", error));
}
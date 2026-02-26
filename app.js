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
const scrollContainers = document.querySelectorAll(".horizontal-scroll");
// ===============================
// AUTO HORIZONTAL SCROLL (WORKING VERSION)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const scrollContainers = document.querySelectorAll(".horizontal-scroll");

  scrollContainers.forEach(container => {

    let scrollSpeed = 1; // speed of scroll

    function autoScroll() {
      container.scrollLeft += scrollSpeed;

      // When reaching end → reset smoothly
      if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
        container.scrollLeft = 0;
      }
    }

    setInterval(autoScroll, 20);

  });

});

// ================= COUNTER ANIMATION =================
const counters = document.querySelectorAll(".counter");

const startCounter = () => {
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100;

    const updateCount = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        if
        (counter.classList.contains("percent"))
        {
          counter.innerText = target + "%";
        }else {
        counter.innerText = target + "+";
      }
    }
    };

    updateCount();
  });
};

const aboutSection = document.querySelector("#about");

window.addEventListener("scroll", () => {
  const sectionTop = aboutSection.offsetTop - 400;
  if (window.scrollY > sectionTop) {
    startCounter();
  }
});
// ================= 3D TILT EFFECT =================
document.querySelectorAll(".service-card, .about-card, .tech-card").forEach(card => {

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });

});
const toggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
    }
  });
});
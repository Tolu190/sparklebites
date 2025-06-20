// ✅ 1. Initialize AOS
AOS.init();

// ✅ 2. Initialize EmailJS
try {
    emailjs.init("fraZjeKccOwpnO8jc");
  } catch (e) {
    console.error("EmailJS init failed:", e);
  }
   // Your actual public key

document.getElementById("reservationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  // ✅ Fetch values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !date || !time) {
    showErrorAlert("❌ Error", "Please complete all required fields.");
    return;
  }

  showLoading(); // 🔄 Show loader

  // ✅ Send reservation to your email
  emailjs.send("service_k0n400u", "template_xjs5vwr", {
    from_name: name,
    from_email: email,
    date: date,
    time: time,
    message: message,
    to_email: "tolulopeoginni90@gmail.com"
  }).then(() => {

    // ✅ Auto-confirmation to user
    emailjs.send("service_k0n400u", "template_p8ig16n", {
      from_name: name,
      to_email: email,
      date: date,
      time: time
    }).then(() => {
      hideLoading();
      showSuccessAlert("✅ Reservation Sent!", "We'll confirm your table via email shortly.");
      document.getElementById("reservationForm").reset();
    }).catch(error => {
      hideLoading();
      showErrorAlert("❌ Confirmation Failed", "Reservation was sent, but confirmation failed.");
      console.error(error);
    });

  }).catch(error => {
    hideLoading();
    showErrorAlert("❌ Submission Failed", "Something went wrong. Please try again later.");
    console.error(error);
  });
});

// ✅ Loader
function showLoading() {
  Swal.fire({
    title: "Sending Reservation...",
    text: "Please wait a moment.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
}

function hideLoading() {
  Swal.close();
}

// ✅ Alerts
function showSuccessAlert(title, message) {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonColor: "#ffb84d"
  });
}

function showErrorAlert(title, message) {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonColor: "#d33"
  });
}

// ✅ 4. Hero image background slideshow + heading animation
const hero = document.querySelector('.hero-section');
const heroHeading = document.querySelector('.hero-section h1');
const heroSubtext = document.querySelector('.hero-section p');
const images = ['images/hero1.jpg', 'images/hero2.jpg', 'images/hero3.jpg'];
let current = 0;

setInterval(() => {
  current = (current + 1) % images.length;
  if (hero) {
    hero.style.backgroundImage = `url(${images[current]})`;

    // Re-trigger the hero section fade-in
    hero.classList.remove('fade-in');
    void hero.offsetWidth;
    hero.classList.add('fade-in');

    // Re-trigger heading animations
    if (heroHeading && heroSubtext) {
      heroHeading.classList.remove('animate');
      heroSubtext.classList.remove('animate');
      void heroHeading.offsetWidth;
      void heroSubtext.offsetWidth;
      heroHeading.classList.add('animate');
      heroSubtext.classList.add('animate');
    }
  }
}, 6000);

$(document).ready(function () {
    // Show a welcome notification
    console.log("data is loading");
    toastr.success("Welcome to AdminLTE Dashboard!");
    

    // ======= Dark Mode Toggle ===========

    // ✅ Check if dark mode was previously enabled (localStorage)
    if (localStorage.getItem("theme") === "dark") {
        $("body").addClass("dark-mode");
        $("#toggleDarkMode .nav-icon").removeClass("fa-moon").addClass("fa-sun"); // Change icon
        $("#toggleDarkMode p").text("Light Mode"); // Change text
    }

    // ✅ Dark Mode Toggle Button in Sidebar
    $("#toggleDarkMode").click(function (e) {
        e.preventDefault(); // Prevent default link behavior
        $("body").toggleClass("dark-mode");

        // ✅ Change icon & text based on the theme
        if ($("body").hasClass("dark-mode")) {
            $("#toggleDarkMode .nav-icon").removeClass("fa-moon").addClass("fa-sun");
            $("#toggleDarkMode p").text("Light Mode");
            localStorage.setItem("theme", "dark"); // Save preference
        } else {
            $("#toggleDarkMode .nav-icon").removeClass("fa-sun").addClass("fa-moon");
            $("#toggleDarkMode p").text("Dark Mode");
            localStorage.setItem("theme", "light"); // Save preference
        }

        toastr.info("Theme changed!");
    });
});

// home page 
$(document).ready(function () {
    console.log("Dashboard Loaded");

    // Dark Mode Toggle
    $("#darkModeToggle").click(function () {
        $("body").toggleClass("dark-mode");

        if ($("body").hasClass("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            $("#darkModeToggle").text("☀️ Light Mode");
        } else {
            localStorage.setItem("darkMode", "disabled");
            $("#darkModeToggle").text("🌙 Dark Mode");
        }
    });

    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        $("body").addClass("dark-mode");
        $("#darkModeToggle").text("☀️ Light Mode");
    }
});

function animateCounter(id, target) {
    let count = 0;
    let interval = setInterval(() => {
        if (count >= target) {
            clearInterval(interval);
        } else {
            count += Math.ceil(target / 50);
            document.getElementById(id).innerText = count;
        }
    }, 50);
}

// Start animation on page load
window.onload = function () {
    animateCounter("userCount", 1500);
    animateCounter("projectCount", 250);
};

// animation
anime({
    targets: '.small-box',
    scale: [0.8, 1],
    opacity: [0, 1],
    delay: anime.stagger(200),
    easing: 'easeOutExpo',
});

$("#animeAssistant").click(function () {
    toastr.info("Welcome to Fidrox Technologies Dashboard!", "Assistant");
});
anime({
    targets: '#animeAssistant',
    translateY: [-50, 0],
    opacity: [0, 1],
    easing: 'easeOutBounce',
    duration: 1000,
});
particlesJS("particles-js", {
    particles: {
        number: { value: 80 },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { speed: 3 }
    }
});
gsap.to("#loadingScreen", { opacity: 0, duration: 2, onComplete: function() {
    $("#loadingScreen").hide();
}});
                   
function updateClock() {
    let now = new Date();
    document.getElementById("holoClock").innerText = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Application form
$(document).ready(function () {
    // Handle Application Form Submission
    $("#applicationForm").submit(function (e) {
        e.preventDefault(); // Prevent default form submission

        // Collect Form Data
        let fullName = $("#fullName").val();
        let email = $("#email").val();
        let phone = $("#phone").val();
        let dob = $("#dob").val();
        let gender = $("#gender").val();
        let position = $("#position").val();
        let experience = $("#experience").val();
        let skills = $("#skills").val();
        let expectedSalary = $("#expectedSalary").val();
        let availability = $("#availability").val();
        let portfolio = $("#portfolio").val();
        let resume = $("#resume").val();
        let coverLetter = $("#coverLetter").val();

        // Basic Validation
        if (!fullName || !email || !phone || !dob || !gender || !position || !experience || !skills || !expectedSalary || !availability || !resume || !coverLetter) {
            toastr.error("All fields are required!", "Submission Error");
            return;
        }

        // Show Success Notification
        toastr.success("Your application has been submitted successfully!", "Success");

        // Reset Form after 2 seconds
        setTimeout(() => {
            $("#applicationForm")[0].reset();
        }, 2000);
    });

    // Reset Button Notification
    $("button[type='reset']").click(function () {
        toastr.info("Form has been reset", "Info");
    });
});

// chat bot
$(document).ready(function () {
    console.log("bot is working");
    // Chatbot Response Logic
    $("#sendMessage").click(function () {
        console.log("bot mes is working");
        let userMessage = $("#userInput").val().trim();

        if (userMessage === "") {
            return;
        }

        // Append User Message
        $("#chatbox").append(`<p class="user-message"><strong>You:</strong> ${userMessage}</p>`);

        // Clear Input Field
        $("#userInput").val("");

        // Bot Response
        setTimeout(() => {
            let botResponse = getBotResponse(userMessage);
            $("#chatbox").append(`<p class="bot-message"><strong>Bot:</strong> ${botResponse}</p>`);
            $("#chatbox").scrollTop($("#chatbox")[0].scrollHeight); // Auto-scroll
        }, 1000);
    });

    // Function to Generate Chatbot Responses
    function getBotResponse(input) {
        let lowerInput = input.toLowerCase();

        if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
            return "Hello! How can I assist you?";
        }
        else if (lowerInput.includes("contact")) {
            return "You can contact us at support@fidrox.com or call +91-1234567890.";
        } 
        else if (lowerInput.includes("services")) {
            return "We specialize in Web Development, Cybersecurity, Railway Signaling, and Application Development.";
        } 
        else if (lowerInput.includes("apply")) {
            return "You can apply for jobs through our Careers page or the Application Form in the dashboard. ";
        }
        else if(lowerInput.includes("who are you") || lowerInput.includes("who r u")){
            return "I am your Assistant, I am here to help you with any questions or problems.. How can I help you?";
        }
         else if (lowerInput.includes("thank you") || lowerInput.includes("thanks")) {
            return "My pleasure, Have a nice day";
        } 
        else {
            return "I'm not sure about that. Please visit our FAQ or Contact Us section for more details.";
        }
    }

    // Press Enter to Send Message
    $("#userInput").keypress(function (event) {
        if (event.which === 13) {
            event.preventDefault();
            $("#sendMessage").click();
        }
    });
});

// ToDo Task
document.addEventListener("DOMContentLoaded", function () {
    const taskList = document.getElementById("todo-list");
    const addTaskBtn = document.getElementById("add-task-btn");
    const newTaskInput = document.getElementById("new-task");
    const taskCount = document.getElementById("task-count");

    function updateTaskCount() {
        let totalTasks = taskList.children.length;
        taskCount.textContent = totalTasks;
        taskCount.style.display = totalTasks > 0 ? "inline-block" : "none";
    }

    // Add Task
    addTaskBtn.addEventListener("click", function () {
        let taskText = newTaskInput.value.trim();
        if (taskText === "") return;

        let listItem = document.createElement("li");
        listItem.className = "list-group-item d-flex justify-content-between align-items-center";
        listItem.innerHTML = `
            ${taskText}
            <div>
                <button class="btn btn-success btn-sm complete-btn"><i class="fas fa-check"></i></button>
                <button class="btn btn-danger btn-sm delete-btn"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(listItem);
        newTaskInput.value = "";
        updateTaskCount();
    });

    // Complete & Delete Task
    taskList.addEventListener("click", function (event) {
        if (event.target.closest(".complete-btn")) {
            event.target.closest("li").classList.toggle("completed");
        }
        if (event.target.closest(".delete-btn")) {
            event.target.closest("li").remove();
            updateTaskCount();
        }
    });

    updateTaskCount();
});


// Speech search bar
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const micButton = document.getElementById("micButton");

    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        micButton.addEventListener("click", function () {
            recognition.start();
            micButton.classList.add("listening");
        });

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript;
            searchInput.value = transcript;
        };

        recognition.onerror = function (event) {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = function () {
            micButton.classList.remove("listening");
        };
    } else {
        alert("Speech recognition is not supported in your browser.");
    }
});


// Language
const translations = {
    en: {
        title: "Welcome to Dashboard",
        description: "Manage your projects efficiently.",
        "btn-profile": "View Profile",
        "btn-logout": "Logout"
    },
    fr: {
        title: "Bienvenue sur le tableau de bord",
        description: "Gérez vos projets efficacement.",
        "btn-profile": "Voir le profil",
        "btn-logout": "Se déconnecter"
    },
    es: {
        title: "Bienvenido al Panel de Control",
        description: "Administra tus proyectos eficientemente.",
        "btn-profile": "Ver perfil",
        "btn-logout": "Cerrar sesión"
    },
    de: {
        title: "Willkommen im Dashboard",
        description: "Verwalten Sie Ihre Projekte effizient.",
        "btn-profile": "Profil anzeigen",
        "btn-logout": "Abmelden"
    }
};

function changeLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach(element => {
        let key = element.getAttribute("data-lang");
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    localStorage.setItem("selectedLang", lang); // Save selection
}

// Load saved language on page load
document.addEventListener("DOMContentLoaded", function () {
    let savedLang = localStorage.getItem("selectedLang") || "en";
    changeLanguage(savedLang);
});

// Sales and revenue
document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-bar");
    const progressValues = [80, 68]; // Sales & Revenue percentages

    progressBars.forEach((bar, index) => {
        let totalLength = 251; // Circle stroke length
        let offset = totalLength - (totalLength * progressValues[index]) / 100;
        bar.style.strokeDashoffset = offset;
    });

    // Add SVG Gradients for a Stylish Look
    const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svgDefs.innerHTML = `
        <linearGradient id="sales-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff9800; stop-opacity:1" />
            <stop offset="100%" style="stop-color:#ff5722; stop-opacity:1" />
        </linearGradient>
        <linearGradient id="revenue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#4caf50; stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2e7d32; stop-opacity:1" />
        </linearGradient>
    `;
    
    document.querySelectorAll(".progress-circle").forEach(svg => {
        svg.appendChild(svgDefs.cloneNode(true));
    });
});


// Screenshot capture
document.getElementById("screenshotBtn").addEventListener("click", function () {
    let dashboard = document.body; // Capture full dashboard

    html2canvas(dashboard, { scale: 2 }).then(canvas => {
        let imgURL = canvas.toDataURL("image/png");
        let downloadLink = document.getElementById("downloadLink");
        downloadLink.href = imgURL;
        downloadLink.click(); // Auto-download screenshot
    });
});

// Feedback
document.addEventListener("DOMContentLoaded", function () {
    // Open modal when feedback button is clicked
    document.getElementById("feedbackBtn").addEventListener("click", function () {
        $("#feedbackModal").modal("show");
    });

    // Submit feedback
    document.getElementById("submitFeedback").addEventListener("click", function () {
        let feedbackText = document.getElementById("feedbackText").value.trim();

        if (feedbackText === "") {
            alert("⚠️ Please enter feedback before submitting!");
            return;
        }

        // Save to localStorage
        let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];
        feedbackList.push({ text: feedbackText, date: new Date().toLocaleString() });
        localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

        alert("✅ Thank you for your feedback!");
        document.getElementById("feedbackText").value = ""; // Clear text
        $("#feedbackModal").modal("hide"); // Close modal
    });
});

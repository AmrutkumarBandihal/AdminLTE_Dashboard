
// ============ User information =========

$(document).ready(function () {
    console.log("Users Page Loaded");

    // ✅ Check if jqGrid is loaded
    if (typeof $.fn.jqGrid === "undefined") {
        console.error("❌ ERROR: jqGrid is NOT loaded! Check your script links.");
        return;
    } else {
        console.log("✅ jqGrid is loaded correctly!");
    }

    // ======= Toastr Live Notifications ===========
    function showLiveNotification(type, message) {
        if (type === "success") {
            toastr.success(message);
        } else if (type === "error") {
            toastr.error(message);
        } else if (type === "info") {
            toastr.info(message);
        } else {
            toastr.warning(message);
        }
    }

    // ✅ Auto show notifications every 10 seconds
    setInterval(function () {
        let messages = [
            "New user registered!",
            "Admin updated user details.",
            "System maintenance scheduled at 10 PM."
        ];
        let randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showLiveNotification("info", randomMessage);
    }, 10000);

    // ======= jqGrid User Table ===========
    $("#grid").jqGrid({
        datatype: "local",
        colNames: ["ID", "Name", "Email", "Status", "Action"],
        colModel: [
            { name: "id", index: "id", width: 60, sorttype: "int", key: true },
            { name: "name", index: "name", width: 150, editable: true },
            { name: "email", index: "email", width: 200, editable: true },
            { name: "status", index: "status", width: 100, editable: true, align: "center" },
            { name: "actions", index: "actions", width: 100, formatter: editButtonFormatter }
        ],
        pager: "#pager",
        rowNum: 10,
        rowList: [10, 20, 30],
        sortname: "id",
        sortorder: "asc",
        viewrecords: true,
        caption: "User Data",
        height: "auto",
        autowidth: true,
        cellEdit: true,
        cellsubmit: 'clientArray',
    });

    // Sample User Data
    let mydata = [
        { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
        { id: 3, name: "Robert Brown", email: "robert@example.com", status: "Active" }
    ];
    
    // Add Data to jqGrid
    $("#grid").jqGrid("setGridParam", { data: mydata }).trigger("reloadGrid");

    // ✅ Add Edit Button for Each Row
    function editButtonFormatter() {
        return "<button class='btn btn-sm btn-primary edit-user'>Edit</button>";
    }

    // ✅ Click to Edit Row
    $(document).on("click", ".edit-user", function () {
        let rowId = $(this).closest("tr").attr("id");
        $("#grid").jqGrid("editRow", rowId);
        toastr.info("Editing row " + rowId);
    });

    // ======= Search and Filter Users ===========
    $("#userSearch").on("keyup", function () {
        let searchText = $(this).val().toLowerCase();
        $("#grid").find("tr:gt(0)").each(function () {
            let rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.indexOf(searchText) !== -1);
        });
    });

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

// chat bot
$(document).ready(function () {
    console.log("cbot is working");
    // Chatbot Response Logic
    $("#sendMessage").click(function () {
        console.log("bot is working");
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


    //  =====  report script chart ========

$(document).ready(function () {
    let ctx = document.getElementById("reportChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["January", "February", "March"],
            datasets: [{
                label: "Sales",
                data: [300, 500, 700],
                backgroundColor: ["#007bff", "#28a745", "#dc3545"]
            }]
        }
    });
});

    
//  Login and Registration
$(document).ready(function () {
// Check if user is logged in
let user = localStorage.getItem("user");

if (user) {
    $("#user-name").text(user);
    $("#login-link, #register-link").addClass("d-none");
    $("#logout-link").removeClass("d-none");
}

// Logout functionality
$("#logout-link").click(function () {
    localStorage.removeItem("user");
    alert("Logged out successfully!");
    location.reload();
});

// Login Form Handling
$("#loginForm").submit(function (event) {
    event.preventDefault();
    let email = $("#email").val();
    let password = $("#password").val();

    if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("user", "Admin");
        alert("Login Successful!");
        window.location.href = "../index.html";
    } else {
        alert("Invalid email or password");
    }
});

// Registration Form Handling
$("#registerForm").submit(function (event) {
    event.preventDefault();
    let name = $("#name").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let confirmPassword = $("#confirmPassword").val();

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    localStorage.setItem("user", name);
    alert("Registration Successful!");
    window.location.href = "login.html";
});
});


// forgot password
$(document).ready(function () {
$("#forgotPasswordForm").submit(function (event) {
    event.preventDefault();
    let email = $("#resetEmail").val().trim();

    if (email !== "") {
        alert("Password reset link has been sent to " + email);
    } else {
        alert("Please enter a valid email.");
    }
});
});


// Forgot Password Form Submission
$(document).ready(function () {
    // Show/Hide Password Toggle
    $("#togglePassword").click(function () {
        let passwordField = $("#password");
        let icon = $(this).find("i");

        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            passwordField.attr("type", "password");
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });

    // Forgot Password Form Submission
    $("#forgotPasswordForm").submit(function (event) {
        event.preventDefault();
        let email = $("#resetEmail").val();
        alert("A password reset link has been sent to " + email);
        window.location.href = "login.html";
    });
});

$(document).ready(function () {
    $(".toggle-password").click(function () {
        let passwordField = $(this).closest(".input-group").find("input");
        let icon = $(this).find("i");

        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            passwordField.attr("type", "password");
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
    });
});
        
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

// Employee Details
$(document).ready(function () {
    let workerData = [
        { id: "1", name: "John Doe", role: "Developer", email: "john@example.com", status: "Active" },
        { id: "2", name: "Jane Smith", role: "Designer", email: "jane@example.com", status: "Inactive" },
        { id: "3", name: "Robert Brown", role: "Designer", email: "robert@example.com", status: "Active" },
        { id: "4", name: "Emily White", role: "Project Manager", email: "emily@example.com", status: "Active" },
        { id: "5", name: "Michael Johnson", role: "Security Analyst", email: "michael@example.com", status: "Inactive" },
        { id: "6", name: "Sophia Lee", role: "HR Manager", email: "sophia@example.com", status: "Active" },
        { id: "7", name: "Daniel Martin", role: "Backend Developer", email: "daniel@example.com", status: "Active" },
        { id: "8", name: "Olivia Taylor", role: "QA Engineer", email: "olivia@example.com", status: "Inactive" },
        { id: "9", name: "William Brown", role: "Frontend Developer", email: "william@example.com", status: "Active" },
        { id: "10", name: "Ava Wilson", role: "DevOps Engineer", email: "ava@example.com", status: "Active" }
    ];

    let roles = [...new Set(workerData.map(worker => worker.role))];
            roles.forEach(role => {
                $('#filterRole').append(`<option value="${role}">${role}</option>`);
            });

            function filterTable() {
                let role = $('#filterRole').val();
                let status = $('#filterStatus').val();
                let filteredData = workerData.filter(worker => 
                    (role === "" || worker.role === role) && (status === "" || worker.status === status)
                );
                $('#workerTable').jqGrid("clearGridData");
                filteredData.forEach(worker => { $('#workerTable').jqGrid("addRowData", worker.id, worker); });
            }

            $('#filterRole, #filterStatus').change(filterTable);

    $("#workerTable").jqGrid({
        datatype: "local",
        colNames: ["ID", "Name", "Role", "Email", "Status", "Actions"],
        colModel: [
            { name: "id", index: "id", width: 50, key: true },
            { name: "name", index: "name", width: 100 },
            { name: "role", index: "role", width: 100 },
            { name: "email", index: "email", width: 150 },
            { name: "status", index: "status", width: 80 },
            { name: "actions", index: "actions", width: 100, formatter: function (cellValue, options, rowObject) {
                return `<button class='btn btn-warning btn-sm editBtn' data-id='${rowObject.id}'><i class='fas fa-edit'></i></button> ` +
                       `<button class='btn btn-danger btn-sm deleteBtn' data-id='${rowObject.id}'><i class='fas fa-trash'></i></button>`;
            }}
        ],
        pager: "#pager",
        rowNum: 10,
        rowList: [5,10, 20, 30],
        sortname: "id",
        sortorder: "asc",
        viewrecords: true,
        caption: "User Data",
        height: "auto",
        autowidth: true,
        cellEdit: true,
        cellsubmit: 'clientArray',
    });

    workerData.forEach(worker => { $("#workerTable").jqGrid("addRowData", worker.id, worker); });

    $("#addWorkerBtn").click(function () {
        $("#workerForm")[0].reset();
        $("#workerId").val("");
        $('#workerModal').modal('show');
    });

    $("#workerTable").on("click", ".editBtn", function () {
        let workerId = $(this).data("id");
        let rowData = $("#workerTable").jqGrid("getRowData", workerId);
        $("#workerId").val(workerId);
        $("#workerName").val(rowData.name);
        $("#workerRole").val(rowData.role);
        $("#workerEmail").val(rowData.email);
        $("#workerStatus").val(rowData.status);
        $('#workerModal').modal('show');
    });

    $("#workerForm").submit(function (e) {
        e.preventDefault();
        let workerId = $("#workerId").val();
        let newWorker = {
            id: workerId || (workerData.length + 1).toString(),
            name: $("#workerName").val(),
            role: $("#workerRole").val(),
            email: $("#workerEmail").val(),
            status: $("#workerStatus").val()
        };
        if (workerId) {
            $("#workerTable").jqGrid("setRowData", workerId, newWorker);
        } else {
            workerData.push(newWorker);
            $("#workerTable").jqGrid("addRowData", newWorker.id, newWorker);
        }
        toastr.success("Worker details saved successfully!");
        $('#workerModal').modal('hide');
    });

    $("#workerTable").on("click", ".deleteBtn", function () {
        let workerId = $(this).data("id");
        $("#workerTable").jqGrid("delRowData", workerId);
        toastr.error("Worker deleted!");
    });
});

// ======= Search and Filter Employees ===========
$("#searchBox").on("keyup", function () {
    let searchText = $(this).val().toLowerCase();
    $("#workerTable").find("tr:gt(0)").each(function () {
        let rowText = $(this).text().toLowerCase();
        $(this).toggle(rowText.indexOf(searchText) !== -1);
    });
});

// Drag and drop file
document.addEventListener("DOMContentLoaded", function () {
    let dropArea = document.getElementById("drop-area");
    let fileInput = document.getElementById("fileInput");
    let uploadBtn = document.getElementById("upload-btn");
    let fileList = document.getElementById("fileList");

    // Clicking the text should open file picker
    uploadBtn.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent event bubbling
        fileInput.click();
    });

    // Clicking the entire drop area also opens the file picker
    dropArea.addEventListener("click", function (event) {
        event.stopPropagation();
        fileInput.click();
    });

    // Handle drag over
    dropArea.addEventListener("dragover", function (event) {
        event.preventDefault();
        dropArea.classList.add("dragover");
    });

    // Handle drag leave
    dropArea.addEventListener("dragleave", function () {
        dropArea.classList.remove("dragover");
    });

    // Handle file drop
    dropArea.addEventListener("drop", function (event) {
        event.preventDefault();
        dropArea.classList.remove("dragover");
        handleFiles(event.dataTransfer.files);
    });

    // Handle file selection from file input
    fileInput.addEventListener("change", function () {
        handleFiles(fileInput.files);
    });

    function handleFiles(files) {
        fileList.innerHTML = ""; // Clear previous list
        for (let file of files) {
            let fileItem = document.createElement("div");
            fileItem.classList.add("file-item");
            fileItem.innerHTML = `<p>${file.name} (${(file.size / 1024).toFixed(2)} KB)</p>`;
            fileList.appendChild(fileItem);
        }
    }
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




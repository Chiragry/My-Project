const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');

// Real-time validation for name
nameInput.addEventListener('input', validateName);

// Real-time validation for email
emailInput.addEventListener('input', validateEmail);

// Real-time validation for password
passwordInput.addEventListener('input', validatePassword);

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isNameValid && isEmailValid && isPasswordValid) {
        // Here you would typically send the data to your server
        alert("Account created successfully!");
        // Store user data in localStorage for demo purposes
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        // Redirect to login page
        window.location.href = 'login.html';
    }
});

function validateName() {
    const name = nameInput.value.trim();
    const nameIcon = nameError.previousElementSibling;

    if (name.length === 0) {
        nameError.innerHTML = "Name is required";
        nameError.style.color = '#ff0000';
        nameIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        nameError.innerHTML = "Please enter your full name (First and Last name)";
        nameError.style.color = '#ff0000';
        nameIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    nameError.innerHTML = "✓";
    nameError.style.color = '#90ee90';
    nameIcon.className = 'fa-solid fa-check';
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const emailIcon = emailError.previousElementSibling;

    if (email.length === 0) {
        emailError.innerHTML = "Email is required";
        emailError.style.color = '#ff0000';
        emailIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.innerHTML = "Please enter a valid email address";
        emailError.style.color = '#ff0000';
        emailIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    emailError.innerHTML = "✓";
    emailError.style.color = '#90ee90';
    emailIcon.className = 'fa-solid fa-check';
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const passIcon = passError.previousElementSibling;

    if (password.length === 0) {
        passError.innerHTML = "Password is required";
        passError.style.color = '#ff0000';
        passIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/)) {
        passError.innerHTML = "Password must contain at least 8 characters, including uppercase, lowercase, number and special character";
        passError.style.color = '#ff0000';
        passIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    passError.innerHTML = "✓";
    passError.style.color = '#90ee90';
    passIcon.className = 'fa-solid fa-check';
    return true;
}

// Make a validateConfirmPassword function to validate it
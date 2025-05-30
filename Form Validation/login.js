const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const form = document.querySelector('form');
const emailError = document.getElementById('emailError');
const passError = document.getElementById('passError');

// Real-time validation for email
emailInput.addEventListener('input', validateEmail);

// Real-time validation for password
passwordInput.addEventListener('input', validatePassword);

// Form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
        // Get stored user data
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
        
        if (storedUserData && 
            storedUserData.email === emailInput.value && 
            storedUserData.password === passwordInput.value) {
            alert('Login successful!');
            // Here you would typically set up a session or token
            // For demo purposes, we'll just redirect to a welcome page
            window.location.href = 'welcome.html';
        } else {
            alert('Invalid email or password');
        }
    }
});

function validateEmail() {
    const email = emailInput.value.trim();
    const emailIcon = emailError.previousElementSibling;

    if (email.length === 0) {
        emailError.textContent = 'Email is required';
        emailError.style.color = '#ff0000';
        emailIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.color = '#ff0000';
        emailIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    emailError.textContent = '✓';
    emailError.style.color = '#90ee90';
    emailIcon.className = 'fa-solid fa-check';
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const passIcon = passError.previousElementSibling;

    if (password.length === 0) {
        passError.textContent = 'Password is required';
        passError.style.color = '#ff0000';
        passIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    if (password.length < 8) {
        passError.textContent = 'Password must be at least 8 characters';
        passError.style.color = '#ff0000';
        passIcon.className = 'fa-solid fa-xmark';
        return false;
    }

    passError.textContent = '✓';
    passError.style.color = '#90ee90';
    passIcon.className = 'fa-solid fa-check';
    return true;
} 
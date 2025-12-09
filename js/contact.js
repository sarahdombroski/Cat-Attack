let nameEl = document.querySelector('#name');
let emailEl = document.querySelector('#email');
let messageEl = document.querySelector('#message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

const formElement = document.forms[0];
let nameIsValid = true;
let emailIsValid = true;
let messageIsValid = true;

nameEl.addEventListener('input', nameVal);
emailEl.addEventListener('input', emailVal);
messageEl.addEventListener('input', messageVal);

function nameVal() {
    // Name Validation
    let name = nameEl.value;
    if (name.length < 3 || name.length > 15) {
        nameError.textContent = "Name can only be 3-15 characters long.";
        nameIsValid = false;
        nameError.classList.add('show');
        nameEl.classList.add('error');
    } else {
        nameError.textContent = "";
        nameIsValid = true;
        nameError.classList.remove('show');
        nameEl.classList.remove('error');
    }
};

function emailVal() {
    // Email Validation
    const email = emailEl.value;
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        emailIsValid = false;
        emailError.classList.add('show');
        emailEl.classList.add('error');
    } else {
        emailError.textContent = "";
        emailIsValid = true;
        emailError.classList.remove('show');
        emailEl.classList.remove('error');
    }
}

function messageVal() {
    // Message Validation
    const message = messageEl.value;
    if (message == "") {
        messageError.textContent = "Please enter a message.";
        messageIsValid = false;
        messageError.classList.add('show');
        messageEl.classList.add('error');
    } else {
        messageError.textContent = "";
        messageIsValid = true;
        messageError.classList.remove('show');
        messageEl.classList.remove('error');
    }
}

formElement.addEventListener('submit', function(e) {
    // Stop the form from just submitting
    nameVal();
    emailVal();
    messageVal();

    // stop the form from doing the default action.
    if (!nameIsValid || !emailIsValid || !messageIsValid) {
        e.preventDefault();
        return;
    }

    e.preventDefault();
    console.log({
        name: sanitizeString(nameEl.value),
        email: emailEl.value,
        message: messageEl.value
    })
    alert("Message sent! Thank you!");
    
    // Reset Form
    nameEl.value = "";
    emailEl.value = "";
    messageEl.value = "";
});

function sanitizeString(input) { 
    console.log(input); 
    let sanitized = ''; 
    // Loop through each character in the string 
    for (let i = 0; i < input.length; i++) { 
        const char = input[i]; 
        switch (char) { 
            case '<': sanitized += '&lt;'; 
            break; 
            case '>': sanitized += '&gt;'; 
            break; 
            case '"': sanitized += '&quot;'; 
            break; 
            case "'": sanitized += '&#39;'; 
            break; 
            case '&': sanitized += '&amp;'; 
            break; 
            default: sanitized += char; 
        }} 
    console.log(sanitized); 
    return sanitized; 
}
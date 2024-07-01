function handleCancelButtonClick() {
    window.location.href = '../index.html';
}
  
document.getElementById('cancel-button').addEventListener('click', handleCancelButtonClick);

//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;


document.getElementById('registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;
    const passwordRepeat = document.getElementById('psw-repeat').value;

    /*if (!passwordRegex.test(password)) {
        alert('La password deve contenere almeno 8 caratteri, un carattere maiuscolo e un numero.');
        return;
    }*/

    // Validazione della password e dell'email
    if (password !== passwordRepeat) {
        alert("Le password non coincidono.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Formato email non valido.");
        return;
    }

    // Feedback di caricamento all'utente
    const submitButton = document.querySelector('.signupbtn');
    submitButton.textContent = 'Registration in progress...';
    submitButton.disabled = true;

/*     try {
        const response = await fetch('http://192.168.1.6:3000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Email already in use! Please try another email address.');
            } else {
                throw new Error('Error in the registration!');
            }
        }

        const data = await response.json();
        console.log(data);
        localStorage.setItem('jwtToken', data.token);
        window.location.href = 'complete-profile.html'; 
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error has occurred: ' + error.message);
        submitButton.textContent = 'Sign Up';
        submitButton.disabled = false;
    } */
// Invio dei dati al server
    fetch('http://192.168.1.6:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Email already in use! Please try another email address.');
            } else {
                throw new Error('Error in the registration!');
            }
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        const token = data.token;
        console.log("Token received (REGISTRATION):", data.token);
        localStorage.setItem('jwtToken', token);
        //window.location.href = '../components/user-profile/profile.html';
        window.location.href = 'complete-profile.html';
    })
    .catch(error => {
        console.error('A complete error has occurred:', error);
        alert('An error has occurred: ' + error.message);
        submitButton.textContent = 'Sign Up';
        submitButton.disabled = false;
    });  
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/;
    return re.test(String(email).toLowerCase());
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const loginData = {
                username: formData.get('username'),
                password: formData.get('password'),
                role: formData.get('role')
            };
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert('Login successful');
                if (data.role === 'admin') {
                    window.location.href = '/admin';
                } else {
                    window.location.href = '/user_jobs';
                }
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const registerData = {
                username: formData.get('username'),
                password: formData.get('password'),
                role: 'user' // Set default role to user during registration
            };
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert('Registration successful');
                window.location.href = '/login';
            }
        });
    }

    const addJobForm = document.getElementById('add-job-form');
    if (addJobForm) {
        addJobForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(addJobForm);
            const jobData = {
                title: formData.get('title'),
                company: formData.get('company'),
                description: formData.get('description'),
                location: formData.get('location')
            };
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData)
            });
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                alert('Job added successfully');
                addJobForm.reset();
            }
        });
    }
});

const formElement = document.getElementById('loginForm');
const mensajeError = document.getElementById('mensajeError');

if (localStorage.getItem('token')) {
    window.location.href = '/user';
}
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);

    var entriesIterator = formData.entries();
    var entriesArray = [...entriesIterator];
    const { email, password } = Object.fromEntries(entriesArray);

    if (email && password) {
        const fetchData = async () => {
            const res = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            
            if (!data.ok) {
                mensajeError.textContent = data.error;
            } else {
                localStorage.setItem('token', data.token);
                window.location.href = '/user';
            }
        };
        fetchData();
    }
});

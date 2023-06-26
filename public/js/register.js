const formElement = document.getElementById('registerForm');
const mensajeError = document.getElementById('mensajeError');

if (localStorage.getItem('token')) {
    window.location.href = '/user';
}
formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);

    var entriesIterator = formData.entries();

    // Convierte los pares clave-valor en un array de arrays
    var entriesArray = [...entriesIterator];

    // Crea un objeto a partir del array de pares clave-valor
    const { userName, email, password } = Object.fromEntries(entriesArray);

    if (userName && email && password) {
        const fetchData = async () => {
            const res = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, password }),
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

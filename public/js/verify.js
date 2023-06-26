const token = localStorage.getItem('token');

if (token) {
    const verifyToken = async () => {
        const user_Name = document.getElementById('userName');
        const user_ID = document.getElementById('userId');
        const res = await fetch('/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-token': token,
            },
        });
        const data = await res.json();
        user_Name.textContent = data.userName;
        user_ID.textContent = data.id;

        if (!data.ok) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
    };
    verifyToken();
} else {
    window.location.href = '/login';
}

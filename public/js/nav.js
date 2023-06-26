const login = document.getElementById('auth');
const register = document.getElementById('auth1');
const logout = document.getElementById('auth2');

if (localStorage.getItem('token')) {
    login.classList.add('display-none');
    register.classList.add('display-none');
    logout.classList.remove('display-none');
} else {
    login.classList.remove('display-none');
    register.classList.remove('display-none');
}

logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
});

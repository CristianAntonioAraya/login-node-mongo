import UserServices from '../services/userServices.js';

const services = new UserServices();

const getAllUsers = async (req, res, next) => {
    try {
        const users = await services.getAll();
        if (users.length === 0) {
            return res.json({ ok: true, msg: 'Theres not users created' });
        }

        res.json(users);
    } catch (error) {
        res.redirect('/login', { error });
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await services.login({ email, password });
        if (user) {
            res.redirect('/all');
        }
    } catch (error) {
        res.render('login', { style: 'auth.css', error: error.message });
    }
};

const createNewUser = async (req, res, next) => {
    try {
        const { userName, email, password } = req.body;
        const user = await services.create({ userName, email, password });
        if (user) {
            res.redirect('/all');
        }
        res.redirect('/register');
    } catch (error) {
        res.render('register', { style: 'auth.css', error: error.message });
    }
};

export { createNewUser, getAllUsers, loginUser };

import UserServices from '../services/userServices.js';
import { generateJwt } from '../middlewares/jwt.js';
import jwt from 'jsonwebtoken';

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

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await services.login({ email, password });

        if (user) {
            const token = await generateJwt(user.id, user.userName);
            res.json({ ok: true, user, token });
        }
    } catch (error) {
        res.json({ ok: false, error: error.message });
    }
};

const createNewUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log(req.body);
        const user = await services.create({ userName, email, password });
        if (user) {
            const token = await generateJwt(user.id, user.userName);
            return res.json({ ok: true, user, token });
        }
        res.json({ ok: false, error: 'Error creating user' });
    } catch (error) {
        res.json({ ok: false, error: error.message });
    }
};

const validateJwt = (req, res) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            ok: false,
            error: 'The token is missing',
        });
    }

    try {
        const { userName, id } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        return res.json({ ok: true, userName, id });
    } catch (error) {
        return res.json({
            ok: false,
            error: 'Invalid Token',
        });
    }
};
export { createNewUser, getAllUsers, loginUser, validateJwt };

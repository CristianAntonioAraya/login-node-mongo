import { Router } from 'express';
import {
    createNewUser,
    getAllUsers,
    loginUser,
    validateJwt,
} from '../controllers/userController.js';

const router = Router();

router.get('/', (req, res) => {
    res.render('home', { style: 'home.css' });
});

router.get('/all', getAllUsers);

router.get('/login', (req, res) => {
    res.render('login', { style: 'auth.css' });
});

router.get('/register', (req, res) => {
    res.render('register', { style: 'auth.css' });
});

router.get('/user', (req, res) => {
    res.render('user', { style: 'user.css' });
});

router.get('/*', (req, res) => {
    res.render('404', { style: '404.css' });
});

router.post('/verify', validateJwt);
router.post('/login', loginUser);
router.post('/register', createNewUser);

export default router;

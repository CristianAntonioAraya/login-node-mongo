import { Router } from 'express';
import {
    createNewUser,
    getAllUsers,
    loginUser,
} from '../controllers/userController.js';

const router = Router();

router.get('/', (req, res, next) => {
    res.render('home', { style: 'home.css' });
});

router.get('/all', getAllUsers);

router.get('/login', (req, res, next) => {
    res.render('login', { style: 'auth.css' });
});

router.get('/register', (req, res, next) => {
    res.render('register', { style: 'auth.css' });
});

router.post('/login', loginUser);
router.post('/register', createNewUser);

export default router;

import express from 'express';
import 'dotenv/config';
import './database.js';
import userRouter from './router/userRouter.js';
import { engine } from 'express-handlebars';
import bodyParser from 'body-parser';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4000;
        this.middleware();
        this.app.use('/', userRouter);
        this.app.engine('handlebars', engine());
        this.app.set('view engine', 'handlebars');
        this.app.set('views', 'views');
    }
    middleware() {
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }
    init() {
        this.app.listen(this.port);
        console.log(`Server on port ${this.port}`);
    }
}

const server = new Server();

server.init();

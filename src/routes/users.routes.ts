import { Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';

import User from '../models/Users';
import CreateUserService from '../services/CreateUserService';
import EditUserService from '../services/EditUserServer';

const usersRouter = Router();

usersRouter.get('/users', async (request, response) => {
    try {
        const userRepository = getRepository(User);
        const user = await userRepository.find();
        return response.json(user);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post('/add_user', async (request, response) => {
    try {
        console.log(request.body);
        const { name, email, phone } = request.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({ name, email, phone });

        return response.json(user);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.put('/edit_user/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const { name, email, phone } = request.body;

        const editUser = new EditUserService();
        const user = await editUser.execute({ id, name, email, phone });
        return response.json(user);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.get('/users/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { id },
        });

        if (!checkUserExist) {
            throw new Error('Usuário não cadastrado.');
        }
        return response.json(checkUserExist);
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.delete('/delete_user/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { id },
        });

        if (!checkUserExist) {
            throw new Error('Usuário não cadastrado.');
        }

        await userRepository.remove(checkUserExist);

        return response.json({ message: 'Usuário deletado com sucesso.' });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.get('/send_email/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { id },
        });

        if (!checkUserExist) {
            throw new Error('Usuário não cadastrado.');
        }

        const nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            host: 'smtp-mail.outlook.com',
            port: 587,
            secureConnection: 'true',
            auth: {
                user: 'youemail@test.com',
                pass: '123123',
            },
            tls: {
                ciphers: 'SSLv3',
            },
        });

        let info = await transporter.sendMail({
            from: 'youemail@test.com', // sender address
            to: checkUserExist.email, // list of receivers
            subject: 'Teste Prático', // Subject line
            text: 'Olá, email enviado como parte de um teste prático.', // plain text body
            html: `<h2>Somente um teste.</h3><h3 style=\"color:red\"><h3>`, // html body
        });

        return response.json({ message: 'Email enviado com sucesso.' });
    } catch (err: any) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;

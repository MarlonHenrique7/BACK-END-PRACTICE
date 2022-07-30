import { getRepository } from 'typeorm';

import User from '../models/Users';

interface Resquest {
    name: string;
    email: string;
    phone: string;
}

class CreateUserService {
    public async execute({ name, email, phone }: Resquest): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { email },
        });

        if (checkUserExist) {
            throw new Error('Email já utilizado.');
        }

        const user = userRepository.create({
            name,
            email,
            phone,
        });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;

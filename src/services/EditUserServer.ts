import { getRepository } from 'typeorm';

import User from '../models/Users';

interface Resquest {
    name: string;
    email: string;
    phone: string;
    id: string;
}

class EditUserService {
    public async execute({
        id,
        name,
        email,
        phone,
    }: Resquest): Promise<User | undefined> {
        const userRepository = getRepository(User);

        const checkUserExist = await userRepository.findOne({
            where: { id },
        });

        if (!checkUserExist) {
            throw new Error('Usuário não cadastrado.');
        }

        var data: any = {};
        if (name) {
            data.name = name;
        }
        if (email) {
            data.email = email;
        }
        if (phone) {
            data.phone = phone;
        }

        await userRepository.update({ id }, data);

        const getUser = await userRepository.findOne({
            where: { id },
        });

        return getUser;
    }
}

export default EditUserService;

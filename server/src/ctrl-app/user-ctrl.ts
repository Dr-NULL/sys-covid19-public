import { User } from '../models/user.entity';

export class UserCtrl {
    public static get(userId?: number) {
        if (!userId) {
            return null;
        }

        return User.findOne({
            relations: [
                'typeUser'
            ],
            where: {
                id: userId
            }
        });
    }

    public static login(nick: string, pass: string) {
        return User.findOne({
            relations: [
                'typeUser'
            ],
            where: {
                nick,
                pass
            }
        });
    }
}

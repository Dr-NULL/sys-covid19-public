import { Method } from '../tool/server';
import { User } from '../models/user.entity';
import { TypeUser } from '../models/type-user.entity';

export const userSystemCheck = new Method.Get();
userSystemCheck.path = 'user/system/check';
userSystemCheck.callback = async (req, res) => {
    const type = await TypeUser.findOne({ restrictions: 0 });
    const user = await User.findOne({ typeUser: type });

    res.helper.json(user);
};

import { Method } from '../tool/server';
import { MenuCtrl } from '../ctrl-app/menu-ctrl';

export const menuGet = new Method.Get();
menuGet.path = 'menu/get';
menuGet.callback = async (req, res) => {
    // Get current user ID
    let id: number;
    if (req.session.current) {
        id = req.session.current.getData();
    }

    // Send Data
    const data = await MenuCtrl.getTree(id);
    res.helper.json(data);
};

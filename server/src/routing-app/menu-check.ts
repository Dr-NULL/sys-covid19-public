import { Method, ErrorHelper } from '../tool/server';
import { MenuCtrl } from '../ctrl-app/menu-ctrl';

export const menuCheck = new Method.Get();
menuCheck.path = 'menu/check';
menuCheck.callback = async (req, res) => {
    // Get menu
    let id: number;
    if (req.session.current) {
        id = req.session.current.getData();
    }

    // Check referer
    let link = req.headers.referer;
    if (!link) {
        throw new ErrorHelper(400, 'La solicitud carece de la cabecera "referer".');
    }
    
    // Clean referer
    const host = req.hostname.replace(/\./gi, '\.');
    const port = `:${req.socket.localPort}`;

    link = link.replace(/^https?:\/\//gi, '');
    link = link.replace(new RegExp(`^${host}`), '');
    link = link.replace(new RegExp(`^${port}`), '');
    link = link.replace(/^[\\\/]/gi, '');
    link = link.replace(/(\?.+|#.+)/gi, '');

    const menu = await MenuCtrl.get(id);
    for (const item of menu) {
        item.path = item.path.replace(/^[\\\/]/gi, '');
        const patt = new RegExp(item.path.replace(/:[^\\\/]+/gi, '[^\\\\\\/]+'), 'gi');

        if (link.match(patt)) {
            res.helper.json(null);
            return;
        }
    }

    throw new ErrorHelper(401, 'No tiene autorización para ingresar a este enlace.');
};
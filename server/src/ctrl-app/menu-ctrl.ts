import { getManager, In } from 'typeorm';
import { Request } from 'express';

import { RelTypeUserMenu } from '../models/rel-type-user-menu.entity';
import { Menu } from '../models/menu.entity';
import { UserCtrl } from './user-ctrl';
import { User } from '../models/user.entity';

interface Relation {
  id: number;
  menuId: number;
  typeId: number;
}

export class MenuCtrl {
  public static async get(userId?: number) {
    // Get General Metadata
    const user = await UserCtrl.get(userId);
    const rela = await this.getRelations(user);

    // Get Menus
    if (rela) {
      const ids = rela.map(x => x.menuId);
      return Menu.find({
        where: { id: In(ids) }
      })
    } else {
      return Menu.find({
        where: { everyone: true }
      })
    }
  }

  public static async getTree(userId?: number) {
    // Get Tree
    const entM = getManager();
    const tree = entM.getTreeRepository(Menu);
    const menu = await tree.findTrees();

    // Get General Metadata
    const user = await UserCtrl.get(userId);
    const rela = await this.getRelations(user);

    // Return data
    return menu.filter(x => MenuCtrl.recursive(x, rela));
  }

  private static getRelations(user?: User): Promise<Relation[]> {
    if (!user) {
      return null;
    }

    return RelTypeUserMenu
      .createQueryBuilder('Rel')
      .select([
        'Rel.id as id',
        'Rel.menuId as menuId',
        'Rel.typeUserId as typeId'
      ])
      .where(
        'Rel.typeUserId = :id',
        { id: user.typeUser.id }
      )
      .execute();
  }

  private static recursive(menu: Menu, rel?: Relation[]) {
    // Recursive iteration
    menu.children = menu
      .children
      .filter(x => MenuCtrl.recursive(x, rel));

    if (rel) {
      // Filter by user type
      if (rel.find(x => x.menuId === menu.id)) {
        return true;
      } else {
        return false;
      }
    } else {
      // Filter by guest
      return menu.everyone;
    }
  }
}

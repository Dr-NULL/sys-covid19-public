import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { clone } from '@tool/other/clone';

import { sizes, button } from '../default';
import { ModalGen } from '../modal-gen';
import { Sizes } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ModalGenService {
  constructor(
    private dialog: MatDialog
  ) { }

  public create(size?: keyof Sizes): ModalGen {
    const obj = new ModalGen(this.dialog);

    // Add default size
    if (size) {
      obj.width = sizes[size];
    } else {
      obj.width = sizes.sm;
    }

    // Add default button
    obj.buttons = [
      clone(button)
    ];

    return obj;
  }
}

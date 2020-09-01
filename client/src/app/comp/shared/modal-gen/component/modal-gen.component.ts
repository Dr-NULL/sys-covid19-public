import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { Button } from '../interface';

@Component({
  selector: 'app-modal-gen',
  templateUrl: './modal-gen.component.html',
  styleUrls: ['./modal-gen.component.scss']
})
export class ModalGenComponent {
  title: string;
  body: string;
  buttons: Button[];

  constructor(
    @Inject(MAT_DIALOG_DATA) data: any,
    private refSelf: MatDialogRef<ModalGenComponent>
  ) {
    this.title = data.title;
    this.body = data.body;
    this.buttons = data.buttons;
  }

  public async buttonClick(button: Button): Promise<void> {
    if (button.callback) {
      await button.callback();
    }

    if (button.dismiss) {
      this.refSelf.close();
    }
  }
}

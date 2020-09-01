import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Button } from './interface';

import { ModalGenComponent } from './component/modal-gen.component';

export class ModalGen {
    private pWidth: string;
    public get width(): string {
        return this.pWidth;
    }
    public set width(v: string) {
        this.pWidth = v;
        if (this.refSelf) {
            this.refSelf.updateSize(v);
        }
    }

    private pButtons: Button[];
    public get buttons(): Button[] {
        return this.pButtons;
    }
    public set buttons(v: Button[]) {
        this.pButtons = v;
        if (this.refSelf) {
            this.refSelf
                .componentInstance
                .buttons = v;
        }
    }

    private pTitle: string;
    public get title(): string {
        return this.pTitle;
    }
    public set title(v: string) {
        this.pTitle = v;
        if (this.refSelf) {
            this.refSelf
                .componentInstance
                .title = v;
        }
    }

    private pBody: string;
    public get body(): string {
        return this.pBody;
    }
    public set body(v: string) {
        this.pBody = v;
        if (this.refSelf) {
            this.refSelf
                .componentInstance
                .body = v;
        }
    }

    private refSelf: MatDialogRef<ModalGenComponent>;
    public constructor(
        private dialog: MatDialog
    ) {
        this.pTitle = 'Insert Title Here';
        this.pBody = 'Insert [HTML] body here...';
    }

    public open(): void {
        this.refSelf = this.dialog.open(
            ModalGenComponent,
            {
                width: this.pWidth,
                data: {
                    title: this.pTitle,
                    body: this.pBody,
                    buttons: this.pButtons
                }
            }
        );
    }

    public close(): void {
        if (this.refSelf) {
            this.refSelf.close();
            this.refSelf = undefined;
        }
    }
}
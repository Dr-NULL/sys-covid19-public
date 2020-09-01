import { Component, Renderer2, Input, ElementRef } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-sidenav-tree',
  templateUrl: './sidenav-tree.component.html',
  styleUrls: ['./sidenav-tree.component.scss']
})
export class SidenavTreeComponent {
  @Input()
  model: Menu;
  open = false;

  constructor(
    private renderer: Renderer2,
    private refSelf: ElementRef
  ) { }

  hasChildren(): boolean {
    if (this.model.children.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  toggle(): void {
    if (this.model.children.length === 0) {
      return;
    }

    if (!this.open) {
      this.renderer.addClass(
        this.refSelf.nativeElement,
        'open'
      );
    } else {
      this.renderer.removeClass(
        this.refSelf.nativeElement,
        'open'
      );
    }

    this.open = !this.open;
  }
}

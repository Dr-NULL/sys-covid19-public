import { Component, Input, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-col',
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss']
})
export class ColComponent {
  private pXs: number;
  /**
   * Get or set the Extra Small Size.
   */
  public get xs(): number {
    return this.pXs;
  }
  @Input()
  public set xs(v: number) {
    this.pXs = v;
  }

  private pSm: number;
  /**
   * Get or set the Small Size.
   */
  public get sm(): number {
    return this.pSm;
  }
  @Input()
  public set sm(v: number) {
    this.pSm = v;
  }

  private pMd: number;
  /**
   * Get or set the Medium Size.
   */
  public get md(): number {
    return this.pMd;
  }
  @Input()
  public set md(v: number) {
    this.pMd = v;
  }

  private pLg: number;
  /**
   * Get or set the Large Size.
   */
  public get lg(): number {
    return this.pLg;
  }
  @Input()
  public set lg(v: number) {
    this.pLg = v;
  }

  private pXl: number;
  /**
   * Get or set the Extra Large Size.
   */
  public get xl(): number {
    return this.pXl;
  }
  @Input()
  public set xl(v: number) {
    this.pXl = v;
  }

  private pWidth: string;
  /**
   * Get or set the width percentaje.
   */
  public get width(): string {
    return this.pWidth;
  }
  public set width(v: string) {
    this.pWidth = v;
    this.renderer.setStyle(
      this.refSelf.nativeElement,
      'width', v
    );
  }

  private pMargin: string;
  /**
   * Get or set the margin in percents.
   */
  public get margin(): string {
    return this.pMargin;
  }
  public set margin(v: string) {
    this.pMargin = v;
    this.renderer.setStyle(
      this.refSelf.nativeElement,
      'margin', v
    );
  }

  constructor(
    private refSelf: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) { }


}

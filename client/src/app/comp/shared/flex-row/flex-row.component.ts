import { Component, OnDestroy, Input, ElementRef, Renderer2, ContentChildren, AfterViewInit, QueryList } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState, MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { ColComponent } from '../col/col.component';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'app-flex-row',
  templateUrl: './flex-row.component.html',
  styleUrls: ['./flex-row.component.scss']
})
export class FlexRowComponent implements OnDestroy, AfterViewInit {
  private pCols = 12;
  public get cols(): number {
    return this.pCols;
  }
  @Input()
  public set cols(v: number) {
    this.pCols = v;
  }

  private pWrap = true;
  public get wrap(): boolean {
    return this.pWrap;
  }
  @Input()
  public set wrap(v: boolean) {
    this.pWrap = v;
    this.renderer.setStyle(
      this.refSelf.nativeElement,
      'flex-wrap',
      (this.pWrap) ? 'wrap' : 'nowrap'
    );
  }

  @ContentChildren(ColComponent)
  children: QueryList<ColComponent>;

  constructor(
    private refSelf: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private breakPointObs: BreakpointObserver
  ) { }

  private breakPSub: Subscription;
  private WatcherSub: Subscription;
  ngAfterViewInit(): void {
    this.wrap = this.pWrap;
    const obs = this.breakPointObs.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ]);

    this.breakPSub = obs.subscribe(this.observe.bind(this));
    this.WatcherSub = this.children.changes.subscribe(this.changes.bind(this));
  }

  ngOnDestroy(): void {
    this.breakPSub.unsubscribe();
    this.WatcherSub.unsubscribe();
  }

  private changes(value: any): void {
    const queries = [
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large
    ];

    const state: BreakpointState = {
      matches: false,
      breakpoints: {}
    };

    for (const query of queries) {
      if (this.breakPointObs.isMatched(query)) {
        state.breakpoints[query] = true;
        state.matches = true;
      } else {
        state.breakpoints[query] = false;
      }
    }

    this.observe(state);
  }

  private observe(state: BreakpointState): void {
    const stat: boolean[] = [
      state.breakpoints[Breakpoints.XSmall],
      state.breakpoints[Breakpoints.Small],
      state.breakpoints[Breakpoints.Medium],
      state.breakpoints[Breakpoints.Large],
      !state.matches
    ];

    const i = stat.findIndex(x => x);
    const margin = (i < 3) ? 16 : 24;
    this.children.forEach(x => this.resizeChild(x, i, margin));

    this.renderer.setStyle(
      this.refSelf.nativeElement,
      'width',
      `calc(100% + ${margin}px)`
    );
    this.renderer.setStyle(
      this.refSelf.nativeElement,
      'margin',
      `-${margin / 2}px`
    );
  }

  private resizeChild(obj: ColComponent, i: number, margin: number): void {
    const values = [
      obj.xs,
      obj.sm,
      obj.md,
      obj.lg,
      obj.xl
    ];

    let cols = values[i];
    // Check to left
    if (!cols) {
      for (let il = i; il >= 0; il--) {
        if (values[il]) {
          cols = values[il];
          break;
        }
      }
    }

    // Check to right
    if (!cols) {
      for (let ir = i; ir < values.length; ir++) {
        if (values[ir]) {
          cols = values[ir];
          break;
        }
      }
    }

    // Default length
    if (!cols) {
      cols = this.cols;
    }

    // Readjuzt the width and the margin
    const width = (cols / this.cols) * 100;
    obj.width = `calc(${width}% - ${margin}px)`;
    obj.margin = `${margin / 2}px`;
  }
}

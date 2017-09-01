import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-from-event',
  templateUrl: './from-event.component.html',
  styleUrls: ['./from-event.component.css']
})
export class FromEventComponent implements OnInit, OnDestroy {
  isRuning = false;

  @ViewChild('demo1ref')
  element1Ref: ElementRef;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  const element = this.element1Ref.nativeElement;
  Rx.Observable
    .fromEvent(element, 'click')
    .subscribe(v => console.log(v));
  /*
    输出:
    MouseEvent {...}
  */
  `;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
    this.runDemo1();
  }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  runDemo1() {
    const element = this.element1Ref.nativeElement;
    Rx.Observable
      .fromEvent(element, 'click')
      .subscribe(v => console.log(v));
  }
  runDemo1zip() {
  }

}

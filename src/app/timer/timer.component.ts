import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .timer(3000, 1000)
    .take(4)
    .subscribe(v => console.log(v));
  /*
    输出:
      0
      1
      2
      3
  */
  `;
  demo2Info =
  `
  Rx.Observable
    .timer(1000)
    .subscribe(v => console.log(v));
  /*
    输出:
      0
  */
  `;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  runDemo1() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .timer(3000, 1000)
        .take(4)
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() + ' ' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .timer(3000, 1000)
      .take(4)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .timer(1000)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .timer(1000)
      .subscribe(v => console.log(v));
  }
}

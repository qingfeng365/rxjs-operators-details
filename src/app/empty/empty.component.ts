import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css']
})
export class EmptyComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable.empty()
    .subscribe(v => console.log('输出:' + v),
    (err) => { },
    () => console.log('已完成'));
  /*
    输出:
      已完成
  */
  `;
  demo2Info =
  `
  Rx.Observable.interval(1000)
  .take(6)
  .mergeMap(x =>
    x % 2 === 1
      ? Rx.Observable.of('a', 'b', 'c')
      : Rx.Observable.empty())
  .subscribe(v => console.log(v));
  /*
    输出:
      a
      b
      c
      a
      b
      c
      a
      b
      c
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
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.empty()
        .subscribe(v => console.log('输出:' + v),
        (err) => { },
        () => {
          console.log('已完成');
          this.isRuning = false;
        });
  }
  runDemo1zip() {
    Rx.Observable.empty()
      .subscribe(v => console.log('输出:' + v),
      (err) => { },
      () => console.log('已完成'));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.interval(1000)
        .take(6)
        .mergeMap(x =>
          x % 2 === 1
            ? Rx.Observable.of('a', 'b', 'c')
            : Rx.Observable.empty())
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable.interval(1000)
      .take(6)
      .mergeMap(x =>
        x % 2 === 1
          ? Rx.Observable.of('a', 'b', 'c')
          : Rx.Observable.empty())
      .subscribe(v => console.log(v));
  }
}

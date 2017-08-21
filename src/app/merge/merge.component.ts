import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-merge',
  templateUrl: './merge.component.html',
  styleUrls: ['./merge.component.css']
})
export class MergeComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `Rx.Observable
  .merge(
    Rx.Observable
      .zip(
        Rx.Observable.from(['a', 'b', 'c']),
        Rx.Observable.interval(2000))
      .map(val => val[0]),
    Rx.Observable
      .zip(
        Rx.Observable.from(['d', 'e', 'f']),
        Rx.Observable.interval(2000))
      .map(val => val[0])
      .delay(1000))
  .subscribe(v => console.log(v));
/*
  输出:
    a
    d
    b
    e
    c
    f
*/

// 另一种写法,使用实例方法
Rx.Observable
  .zip(
    Rx.Observable.from(['a', 'b', 'c']),
    Rx.Observable.interval(2000))
  .map(val => val[0])
  .merge(
    Rx.Observable
      .zip(
        Rx.Observable.from(['d', 'e', 'f']),
        Rx.Observable.interval(2000))
      .map(val => val[0])
      .delay(1000))
  .subscribe(v => console.log(v));
  `;

  demo2Info =
  `
Rx.Observable
  .merge(
    Rx.Observable
      .zip(
        Rx.Observable.from(['A', 'B', 'C', 'D']),
        Rx.Observable.interval(1000))
      .map(val => val[0]),
    Rx.Observable
      .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd']),
        Rx.Observable.interval(2000))
      .map(val => val[0]),
    Rx.Observable.interval(500).take(4),
    2
  )
  .subscribe(v => console.log(v));
/*
  输出:
    A
    a
    B
    C
    b
    D
    0
    1
    2
    c
    3
    d
*/
`;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
  }
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
      Rx.Observable
        .merge(
        Rx.Observable
          .zip(
          Rx.Observable.from(['a', 'b', 'c']),
          Rx.Observable.interval(2000))
          .map(val => val[0]),
        Rx.Observable
          .zip(
          Rx.Observable.from(['d', 'e', 'f']),
          Rx.Observable.interval(2000))
          .map(val => val[0])
          .delay(1000))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .merge(
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c']),
        Rx.Observable.interval(2000))
        .map(val => val[0]),
      Rx.Observable
        .zip(
        Rx.Observable.from(['d', 'e', 'f']),
        Rx.Observable.interval(2000))
        .map(val => val[0])
        .delay(1000))
      .subscribe(v => console.log(v));
  }
  runDemo1Staticzip() {
    Rx.Observable
      .zip(
      Rx.Observable.from(['a', 'b', 'c']),
      Rx.Observable.interval(2000))
      .map(val => val[0])
      .merge(
      Rx.Observable
        .zip(
        Rx.Observable.from(['d', 'e', 'f']),
        Rx.Observable.interval(2000))
        .map(val => val[0])
        .delay(1000))
      .subscribe(v => console.log(v));
  }

  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .merge(
        Rx.Observable
          .zip(
          Rx.Observable.from(['A', 'B', 'C', 'D']),
          Rx.Observable.interval(1000))
          .map(val => val[0]),
        Rx.Observable
          .zip(
          Rx.Observable.from(['a', 'b', 'c', 'd']),
          Rx.Observable.interval(2000))
          .map(val => val[0]),
        Rx.Observable.interval(500).take(4),
        2
        )
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .merge(
        Rx.Observable
          .zip(
            Rx.Observable.from(['A', 'B', 'C', 'D']),
            Rx.Observable.interval(1000))
          .map(val => val[0]),
        Rx.Observable
          .zip(
            Rx.Observable.from(['a', 'b', 'c', 'd']),
            Rx.Observable.interval(2000))
          .map(val => val[0]),
        Rx.Observable.interval(500).take(4),
        2
      )
      .subscribe(v => console.log(v));
  }
}

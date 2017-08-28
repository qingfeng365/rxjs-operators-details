import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-concat-map-to',
  templateUrl: './concat-map-to.component.html',
  styleUrls: ['./concat-map-to.component.css']
})
export class ConcatMapToComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
  // 简单写法,不考虑精确模拟时间
Rx.Observable.from([1, 3, 5])
  .concatMapTo(Rx.Observable.of(10, 10, 10))
  .subscribe(v => console.log(v));
  /*
    输出:
      10
      10
      10
      10
      10
      10
      10
      10
      10
  */
  // 复杂写法,模拟时间
  const order = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0];
  Rx.Observable
    .zip(
      Rx.Observable.from([1, 3, 5]),
      Rx.Observable.interval(1000)
        .take(10)
        .filter(v => order[v] === 1),
      (v, i) => v
    )
    .concatMapTo(
      Rx.Observable
        .zip(
        Rx.Observable.of(10, 10, 10),
        Rx.Observable.interval(1000),
        (v, i) => v
        )
    )
    .subscribe(v => console.log(v));
`;
  demo2Info =
  `
Rx.Observable.from([1, 3, 5])
  .concatMapTo(
    Rx.Observable.of(10, 10, 10),
    (outerValue, innerValue,
      outerIndex, innerIndex) =>
      outerIndex + ' - ' + outerValue + ' => ' +
      innerIndex + ' - ' + innerValue)
  .subscribe(v => console.log(v));
/*
输出:
0 - 1 => 0 - 10
0 - 1 => 1 - 10
0 - 1 => 2 - 10
1 - 3 => 0 - 10
1 - 3 => 1 - 10
1 - 3 => 2 - 10
2 - 5 => 0 - 10
2 - 5 => 1 - 10
2 - 5 => 2 - 10
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
    const order = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0];
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from([1, 3, 5]),
        Rx.Observable.interval(1000)
          .take(10)
          .filter(v => order[v] === 1),
        (v, i) => v
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .concatMapTo(
        Rx.Observable
          .zip(
          Rx.Observable.of(10, 10, 10),
          Rx.Observable.interval(1000),
          (v, i) => v
          )
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 内部Observable: ' + v))

        )
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    const order = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0];
    Rx.Observable
      .zip(
      Rx.Observable.from([1, 3, 5]),
      Rx.Observable.interval(1000)
        .take(10)
        .filter(v => order[v] === 1),
      (v, i) => v
      )
      .concatMapTo(
      Rx.Observable
        .zip(
        Rx.Observable.of(10, 10, 10),
        Rx.Observable.interval(1000),
        (v, i) => v
        )
      )
      .subscribe(v => console.log(v));
  }
  runDemo1zip1() {
    Rx.Observable.from([1, 3, 5])
      .concatMapTo(Rx.Observable.of(10, 10, 10))
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.from([1, 3, 5])
        .concatMapTo(
        Rx.Observable.of(10, 10, 10),
        (outerValue, innerValue,
          outerIndex, innerIndex) =>
          outerIndex + ' - ' + outerValue + ' => ' +
          innerIndex + ' - ' + innerValue)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable.from([1, 3, 5])
      .concatMapTo(
      Rx.Observable.of(10, 10, 10),
      (outerValue, innerValue,
        outerIndex, innerIndex) =>
        outerIndex + ' - ' + outerValue + ' => ' +
        innerIndex + ' - ' + innerValue)
      .subscribe(v => console.log(v));
  }
}

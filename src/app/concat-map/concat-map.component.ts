import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-concat-map',
  templateUrl: './concat-map.component.html',
  styleUrls: ['./concat-map.component.css']
})
export class ConcatMapComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
// 简单写法,不考虑精确模拟时间
Rx.Observable.from([1, 3, 5])
.concatMap(e =>
  Rx.Observable.of(e * 10, e * 10, e * 10))
.subscribe(v => console.log(v));
/*
  输出:
    10
    10
    10
    30
    30
    30
    50
    50
    50
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
  .concatMap(e =>
    Rx.Observable
      .zip(
        Rx.Observable.of(e * 10, e * 10, e * 10),
        Rx.Observable.interval(1000),
        (v, i) => v
      )
  )
  .subscribe(v => console.log(v));
`;
  demo2Info =
  `
const getPromise =
  (v) => new Promise(resolve => resolve(v * 10));

Rx.Observable
  .from([1, 3, 5])
  .concatMap(e => getPromise(e))
  .subscribe(v => console.log(v));
/*
输出:
  10
  30
  50
*/
`;
  demo3Info =
  `
Rx.Observable.from([1, 3, 5])
  .concatMap(e =>
    Rx.Observable.of(e * 10, e * 10, e * 10),
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
1 - 3 => 0 - 30
1 - 3 => 1 - 30
1 - 3 => 2 - 30
2 - 5 => 0 - 50
2 - 5 => 1 - 50
2 - 5 => 2 - 50
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
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
        .concatMap(e => {
          const map$ =
            Rx.Observable
              .zip(
              Rx.Observable.of(e * 10, e * 10, e * 10),
              Rx.Observable.interval(1000),
              (v, i) => v
              )
              .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 内部Observable: ' + v));
          console.log(this.dateTool.getNowBymmsszz() + ' 映射为 内部Observable ');
          console.log(map$);
          return map$;
        }
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
      .concatMap(e =>
        Rx.Observable
          .zip(
          Rx.Observable.of(e * 10, e * 10, e * 10),
          Rx.Observable.interval(1000),
          (v, i) => v
          )
      )
      .subscribe(v => console.log(v));
  }
  runDemo1zip1() {
    Rx.Observable.from([1, 3, 5])
      .concatMap(e =>
        Rx.Observable.of(e * 10, e * 10, e * 10))
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    const getPromise = function (v) {
      return new Promise((resolve, reject) => {
        console.log('Promise resolve: ' + (v * 10));
        resolve(v * 10);
      });
    };
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.from([1, 3, 5])
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .concatMap(e => {
          const mappromise = getPromise(e);
          console.log(this.dateTool.getNowBymmsszz() + ' 映射为 Promise: ');
          console.log(mappromise);
          return mappromise;
        })
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    const getPromise =
      (v) => new Promise(resolve => resolve(v * 10));
    Rx.Observable
      .from([1, 3, 5])
      .concatMap(e => getPromise(e))
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable.from([1, 3, 5])
        .concatMap(e =>
          Rx.Observable.of(e * 10, e * 10, e * 10),
        (outerValue, innerValue,
          outerIndex, innerIndex) =>
          outerIndex + ' - ' + outerValue + ' => ' +
          innerIndex + ' - ' + innerValue)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable.from([1, 3, 5])
      .concatMap(e =>
        Rx.Observable.of(e * 10, e * 10, e * 10),
      (outerValue, innerValue,
        outerIndex, innerIndex) =>
        outerIndex + ' - ' + outerValue + ' => ' +
        innerIndex + ' - ' + innerValue)
      .subscribe(v => console.log(v));
  }
}

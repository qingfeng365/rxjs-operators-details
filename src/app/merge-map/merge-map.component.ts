import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo4subscribe: Subscription = null;

  demo1Info =
  `
const order = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0];
Rx.Observable
  .zip(
  Rx.Observable.from([1, 3, 5]),
  Rx.Observable.interval(1000)
    .take(10)
    .filter(v => order[v] === 1),
  (v, i) => v
  )
  .mergeMap(e =>
    Rx.Observable
      .zip(
      Rx.Observable.of(e * 10, e * 10, e * 10),
      Rx.Observable.interval(1000),
      (v, i) => v
      )
  )
  .subscribe(v => console.log(v));
/*
  输出:
    10
    10
    10
    30
    30
    50
    30
    50
    50
*/
`;

  demo2Info =
  `
Rx.Observable
.of('a', 'b', 'c')
.mergeMap(e =>
  Rx.Observable
    .interval(1000)
    .take(3)
    .map(i => e + i)
)
.subscribe(v => console.log(v));
/*
输出:
  a0
  b0
  c0
  a1
  b1
  c1
  a2
  b2
  c2
*/
`;
  demo3Info =
  `
const getPromise = function (v: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(v * 10);
    }, 500);
  });
};
Rx.Observable
  .of(1, 2, 3, 4, 5)
  .mergeMap(e => getPromise(e),
  (valueFromSource, valueFromPromise) => valueFromSource + ':' + valueFromPromise
  )
  .subscribe(v => console.log(v));
/*
  输出:
    1:10
    2:20
    3:30
    4:40
    5:50
*/
`;
  demo4Info =
`
// 这个例子要思考出正确的输出顺序是有点难度
// 要按时间顺序, 1秒1秒计算
Rx.Observable
.interval(1000)
.take(5)
.mergeMap(e =>
  Rx.Observable
    .interval(1000)
    .take(5),
(outerValue, innerValue, outerIndex, innerIndex) =>
  [outerIndex, outerValue, innerIndex, innerValue],
3
)
.subscribe(v => console.log(v));
/*
输出:
[0, 0, 0, 0]  (第0秒)
[0, 0, 1, 1]  (第1秒)
[1, 1, 0, 0]  (第1秒)
[0, 0, 2, 2]  (第2秒)
[1, 1, 1, 1]  (第2秒)
[2, 2, 0, 0]  (第2秒)
[0, 0, 3, 3]  (第3秒)
[1, 1, 2, 2]  (第3秒)
[2, 2, 1, 1]  (第3秒)
[0, 0, 4, 4]
[1, 1, 3, 3]
[2, 2, 2, 2]
[3, 3, 0, 0]
[1, 1, 4, 4]
[2, 2, 3, 3]
[3, 3, 1, 1]
[4, 4, 0, 0]
[2, 2, 4, 4]
[3, 3, 2, 2]
[4, 4, 1, 1]
[3, 3, 3, 3]
[4, 4, 2, 2]
[3, 3, 4, 4]
[4, 4, 3, 3]
[4, 4, 4, 4]
*/
`;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo1() {
    const order = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0];
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
        .mergeMap(e => {
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
    const order = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0];
    Rx.Observable
      .zip(
      Rx.Observable.from([1, 3, 5]),
      Rx.Observable.interval(1000)
        .take(10)
        .filter(v => order[v] === 1),
      (v, i) => v
      )
      .mergeMap(e =>
        Rx.Observable
          .zip(
          Rx.Observable.of(e * 10, e * 10, e * 10),
          Rx.Observable.interval(1000),
          (v, i) => v
          )
      )
      .subscribe(v => console.log(v));
  }

  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .of('a', 'b', 'c')
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .mergeMap(e => {
          const map$ =
            Rx.Observable
              .interval(1000)
              .take(3)
              .map(i => e + i)
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

  runDemo2zip() {
    Rx.Observable
      .of('a', 'b', 'c')
      .mergeMap(e =>
        Rx.Observable
          .interval(1000)
          .take(3)
          .map(i => e + i)
      )
      .subscribe(v => console.log(v));
  }

  runDemo3() {
    const getPromise = function (v: number): Promise<number> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve(v * 10);
        }, 500);
      });
    };
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .of(1, 2, 3, 4, 5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .mergeMap(e => {
          const mapPromise = getPromise(e);
          console.log(this.dateTool.getNowBymmsszz() + ' 映射为 Promise ');
          console.log(mapPromise);
          return mapPromise;
        },
        (valueFromSource, valueFromPromise) => valueFromSource + ':' + valueFromPromise
        )
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    const getPromise = function (v: number): Promise<number> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve(v * 10);
        }, 500);
      });
    };
    Rx.Observable
      .of(1, 2, 3, 4, 5)
      .mergeMap(e => getPromise(e),
      (valueFromSource, valueFromPromise) => valueFromSource + ':' + valueFromPromise
      )
      .subscribe(v => console.log(v));
  }
  runDemo4() {
    this.isRuning = true;
    this.demo4subscribe =
      Rx.Observable
        .interval(1000)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .mergeMap(e => {
          const map$ =
            Rx.Observable
              .interval(1000)
              .take(5)
              .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 内部Observable: ' + v));
          console.log(this.dateTool.getNowBymmsszz() + ' 映射为 内部Observable ');
          console.log(map$);
          return map$;
        },
        (outerValue, innerValue, outerIndex, innerIndex) =>
          [outerIndex, outerValue, innerIndex, innerValue],
        3
        )
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo4zip() {
    Rx.Observable
      .interval(1000)
      .take(5)
      .mergeMap(e =>
        Rx.Observable
          .interval(1000)
          .take(5),
      (outerValue, innerValue, outerIndex, innerIndex) =>
        [outerIndex, outerValue, innerIndex, innerValue],
      3
      )
      .subscribe(v => console.log(v));
  }
}

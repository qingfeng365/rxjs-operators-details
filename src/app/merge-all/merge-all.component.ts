import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-merge-all',
  templateUrl: './merge-all.component.html',
  styleUrls: ['./merge-all.component.css']
})
export class MergeAllComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
  .zip(
    // 构造由两个 Observable 组成的数组
    Rx.Observable.from([
      Rx.Observable
        .zip(
          Rx.Observable.from(['a', 'b', 'c', 'd']),
          Rx.Observable.interval(1000))
        .map(val => val[0]),
      Rx.Observable
        .zip(
          Rx.Observable.from(['e', 'f', 'g']),
          Rx.Observable.interval(1000))
        .map(val => val[0])
        .delay(500)
    ]),
    Rx.Observable.interval(2000)
  )
  // 数组的元素,每隔2秒发出,元素为内部 Observable
  .map(val => val[0])
  .mergeAll()
  .subscribe(v => console.log(v));
/*
  输出:
    a
    b
    c
    e
    d
    f
    g
*/
  `;
  demo2Info =
  `
const getPromise = function (v): Promise<number> {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(v * 10);
    }, 500);
  });
};
Rx.Observable.interval(1000)
  .take(3)
  .map(v => Rx.Observable.from(getPromise(v + 1)))
  .mergeAll()
  .subscribe(v => console.log(v));
/*
  输出:
    10
    20
    30
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
        .zip(
        Rx.Observable.from([
          Rx.Observable
            .zip(
            Rx.Observable.from(['a', 'b', 'c', 'd']),
            Rx.Observable.interval(1000))
            .map(val => val[0])
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' abcd$ 发射值:' + v)),
          Rx.Observable
            .zip(
            Rx.Observable.from(['e', 'f', 'g']),
            Rx.Observable.interval(1000))
            .map(val => val[0])
            .delay(500)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' efg$ 发射值:' + v))
        ]),
        Rx.Observable.interval(2000)
        )
        .map(val => val[0])
        .do(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 上游操作符发射值:');
          console.log(v);
        })
        .mergeAll()
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      // 构造由两个 Observable 组成的数组
      Rx.Observable.from([
        Rx.Observable
          .zip(
          Rx.Observable.from(['a', 'b', 'c', 'd']),
          Rx.Observable.interval(1000))
          .map(val => val[0]),
        Rx.Observable
          .zip(
          Rx.Observable.from(['e', 'f', 'g']),
          Rx.Observable.interval(1000))
          .map(val => val[0])
          .delay(500)
      ]),
      Rx.Observable.interval(2000)
      )
      // 数组的元素,每隔2秒发出,元素为内部 Observable
      .map(val => val[0])
      .mergeAll()
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    const getPromise = function (v): Promise<number> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve(v * 10);
        }, 500);
      });
    };
    this.isRuning = true;
    this.demo2subscribe = Rx.Observable.interval(1000)
      .take(3)
      .map(v => Rx.Observable.from(getPromise(v + 1)))
      .mergeAll()
      .subscribe(v => console.log(v),
      (err) => { },
      () => this.isRuning = false);
  }
  runDemo2zip() {
    const getPromise = function (v): Promise<number> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve(v * 10);
        }, 500);
      });
    };
    Rx.Observable.interval(1000)
      .take(3)
      .map(v => Rx.Observable.from(getPromise(v + 1)))
      .mergeAll()
      .subscribe(v => console.log(v));
  }

}

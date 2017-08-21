import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-with-latest-from',
  templateUrl: './with-latest-from.component.html',
  styleUrls: ['./with-latest-from.component.css']
})
export class WithLatestFromComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
const order1 = [1, 0, 1, 0, 0, 0, 0, 1, 1, 1];
const order2 = [0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
Rx.Observable
  .zip(
    Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
    Rx.Observable.interval(1000)
      .filter(index => order1[index] === 1)
      .take(5))
  .map(val => val[0])
  .withLatestFrom(
  Rx.Observable
    .zip(
      Rx.Observable.from([1, 2, 3, 4]),
      Rx.Observable.interval(1000)
        .filter(index => order2[index] === 1)
        .take(4))
    .map(val => val[0])
  )
  .subscribe(v => console.log(v));
/*
  输出:
    [b,1]
    [c,4]
    [d,4]
    [e,4]
*/
  `;
  demo2Info =
  `
Rx.Observable
  .zip(
    Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
    Rx.Observable.interval(2000)
  )
  .map(val => val[0])
  .withLatestFrom(
    Rx.Observable.interval(500)
  )
  .subscribe(v => console.log(v));
/*
  输出:
    ["a", 2]
    ["b", 6]
    ["c", 10]
    ["d", 14]
    ["e", 18]
*/
`;
  demo3Info =
`
Rx.Observable
  .zip(
    Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
    Rx.Observable.interval(500)
  )
  .map(val => val[0])
  .withLatestFrom(
    Rx.Observable.interval(1000)
  )
  .subscribe(v => console.log(v));
/*
  输出:
    ["b", 0]
    ["c", 0]
    ["d", 1]
    ["e", 1]
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
  }
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
    const order1 = [1, 0, 1, 0, 0, 0, 0, 1, 1, 1];
    const order2 = [0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(1000)
          .filter(index => order1[index] === 1)
          .take(5))
        .map(val => val[0])
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 字母$ 发射值:' + v))
        .withLatestFrom(
        Rx.Observable
          .zip(
          Rx.Observable.from([1, 2, 3, 4]),
          Rx.Observable.interval(1000)
            .filter(index => order2[index] === 1)
            .take(4))
          .map(val => val[0])
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 数字$ 发射值:' + v)),
      )
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    const order1 = [1, 0, 1, 0, 0, 0, 0, 1, 1, 1];
    const order2 = [0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
    Rx.Observable
      .zip(
      Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
      Rx.Observable.interval(1000)
        .filter(index => order1[index] === 1)
        .take(5))
      .map(val => val[0])
      .withLatestFrom(
      Rx.Observable
        .zip(
        Rx.Observable.from([1, 2, 3, 4]),
        Rx.Observable.interval(1000)
          .filter(index => order2[index] === 1)
          .take(4))
        .map(val => val[0])
      )
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(2000)
        )
        .map(val => val[0])
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 字母$ 发射值:' + v))
        .withLatestFrom(
        Rx.Observable.interval(500)
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 数字$ 发射值:' + v)),
      )
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .zip(
      Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
      Rx.Observable.interval(2000)
      )
      .map(val => val[0])
      .withLatestFrom(
      Rx.Observable.interval(500)
      )
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(500)
        )
        .map(val => val[0])
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 字母$ 发射值:' + v))
        .withLatestFrom(
        Rx.Observable.interval(1000)
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 数字$ 发射值:' + v)),
      )
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable
      .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(500)
      )
      .map(val => val[0])
      .withLatestFrom(
        Rx.Observable.interval(1000)
      )
      .subscribe(v => console.log(v));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-switch-map',
  templateUrl: './switch-map.component.html',
  styleUrls: ['./switch-map.component.css']
})
export class SwitchMapComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo4subscribe: Subscription = null;

  demo1Info =
  `
const order = [1, 0, 0, 0, 0, 1, 0, 1, 0, 0];
Rx.Observable
  .zip(
  Rx.Observable.from([1, 3, 5]),
  Rx.Observable.interval(1000)
    .take(10)
    .filter(v => order[v] === 1),
  (v, i) => v
  )
  .switchMap(e =>
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
    50
    50
*/
`;
  demo2Info =
  `
Rx.Observable
  .timer(0, 4000)
  .switchMap(e => Rx.Observable.timer(0, 1000))
  .takeUntil(Rx.Observable.timer(12000))
  .subscribe(v => console.log(v));
/*
  输出:
    0
    1
    2
    3
    0
    1
    2
    3
    0
    1
    2
    3
*/
`;
  demo3Info =
  `
// 该示例 可与 mergeMap 的对应示例 对比观察
const getPromise = function (v: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve(v * 10);
    }, 500);
  });
};
Rx.Observable
  .of(1, 2, 3, 4, 5)
  .switchMap(e => getPromise(e),
  (valueFromSource, valueFromPromise) => valueFromSource + ':' + valueFromPromise
  )
  .subscribe(v => console.log(v));
/*
  输出:
    5:50
*/
`;
  demo4Info =
`
countdownSeconds: number;
countdown$: Observable<number> =
  Rx.Observable.interval(1000).mapTo(1);
pauseSubject: Subject&lt;Observable&lt;number&gt;&gt; = new Subject();
resumSubject: Subject&lt;Observable&lt;number&gt;&gt; = new Subject();
timersubscribe: Subscription = null;

onStart() {
  if (this.timersubscribe) { this.timersubscribe.unsubscribe(); }
  this.countdownSeconds = 60;
  this.timersubscribe =
    Rx.Observable
      .merge(
      Rx.Observable.of(this.countdown$),
      this.pauseSubject.asObservable(),
      this.resumSubject.asObservable()
      )
      .switchMap((v: Observable&lt;any&gt;) => v)
      .scan((acc, curr) => acc - curr ,
        this.countdownSeconds)
      .subscribe(v => {
        this.countdownSeconds = v;
        if (this.countdownSeconds === 0) {
          this.timersubscribe.unsubscribe();
        }
      }
      );
}
onPause() {
  this.pauseSubject.next(Rx.Observable.of(0));
}
onResum() {
  this.resumSubject.next(this.countdown$);
}
`;
demo4Desc =
`
这段代码比较复杂, 要理清思路才能做出正确的判断

`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
    this.unsubscribe(this.demo4subscribe);
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
        .switchMap(e => {
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
      .switchMap(e =>
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
    this.demo1subscribe =
      Rx.Observable
        .timer(0, 4000)
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .switchMap(e => {
          const map$ =
            Rx.Observable
              .timer(0, 1000)
              .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 内部Observable: ' + v));
          console.log(this.dateTool.getNowBymmsszz() + ' 映射为 内部Observable ');
          console.log(map$);
          return map$;
        }
        )
        .takeUntil(Rx.Observable.timer(12000))
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .timer(0, 4000)
      .switchMap(e => Rx.Observable.timer(0, 1000))
      .takeUntil(Rx.Observable.timer(12000))
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
        .switchMap(e => {
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
      .switchMap(e => getPromise(e),
      (valueFromSource, valueFromPromise) => valueFromSource + ':' + valueFromPromise
      )
      .subscribe(v => console.log(v));
  }

  // tslint:disable-next-line:member-ordering
  countdownSeconds: number;
  // tslint:disable-next-line:member-ordering
  countdown$: Observable<number> =
  Rx.Observable.interval(1000).mapTo(1);
  // tslint:disable-next-line:member-ordering
  pauseSubject: Subject<Observable<number>> = new Subject();
  // tslint:disable-next-line:member-ordering
  resumSubject: Subject<Observable<number>> = new Subject();
  // tslint:disable-next-line:member-ordering
  timersubscribe: Subscription = null;


  onStart() {
    if (this.timersubscribe) { this.timersubscribe.unsubscribe(); }
    this.countdownSeconds = 60;
    this.timersubscribe =
      Rx.Observable
        .merge(
        Rx.Observable.of(this.countdown$),
        this.pauseSubject.asObservable(),
        this.resumSubject.asObservable()
        )
        .do(v => console.log(v))
        .switchMap((v: Observable<any>) => v)
        .scan((acc, curr) => {
          console.log('acc:' + acc);
          console.log('curr:' + curr);
          return acc - curr;
        },
        this.countdownSeconds)
        .subscribe(v => {
          console.log('当前计时:' + v);
          this.countdownSeconds = v;
          if (this.countdownSeconds === 0) {
            this.timersubscribe.unsubscribe();
          }
        }
        );
  }
  onPause() {
    this.pauseSubject.next(Rx.Observable.of(0));
  }
  onResum() {
    this.resumSubject.next(this.countdown$);
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-concat',
  templateUrl: './concat.component.html',
  styleUrls: ['./concat.component.css']
})
export class ConcatComponent implements OnInit, OnDestroy {
  isRuning = false;
  demo0subscribe: Subscription = null;
  demo1subscribe: Subscription = null;
  demo1staticsubscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo0Info =
  `
Rx.Observable.concat(
  Rx.Observable
    .zip(
      Rx.Observable.of('a', 'b'),
      Rx.Observable.interval(1000)
    )
    .map(val => val[0]),
  Rx.Observable
    .zip(
      Rx.Observable.of('x', 'y'),
      Rx.Observable.interval(1000)
    )
    .map(val => val[0])
)
.subscribe(v => console.log(v));
`;
  demo1Info =
  `// 实例方法:
Rx.Observable.of(1, 2, 3)
  .concat(Rx.Observable.of(4, 5, 6))
  .subscribe(v => console.log(v));

// 静态方法:
Rx.Observable
  .concat(
    Rx.Observable.of(1, 2, 3),
    Rx.Observable.of(4, 5, 6)
  )
  .subscribe(v => console.log(v));
/*
  输出:
    1
    2
    3
    4
    5
    6
*/`;

  demo2Info =
  `
  // 第一个 Observable 延迟3秒，然后发出
  // 第二个 Observable 要等待 第一个 Observable 完成才能订阅
  Rx.Observable
  .concat(
    Rx.Observable.of(1, 2, 3)
      .delay(3000),
    Rx.Observable.of(4, 5, 6)
  )
  .subscribe(v => console.log(v));`;

  demo3Info =
  `// 当 source 永远不完成时，随后的 observables 永远不会运行
Rx.Observable
  .concat(
  Rx.Observable.interval(1000),
  Rx.Observable.of('不', '会', '运', '行')
  )
  .subscribe(v => console.log(v));
`;

  constructor() { }
  ngOnInit() {

  }
  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo1staticsubscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
  }
  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo0() {
    this.isRuning = true;
    this.demo0subscribe =
      Rx.Observable.concat(
        Rx.Observable
          .zip(
          Rx.Observable.of('a', 'b'),
          Rx.Observable.interval(1000)
          )
          .map(val => val[0]),
        Rx.Observable
          .zip(
          Rx.Observable.of('x', 'y'),
          Rx.Observable.interval(1000)
          )
          .map(val => val[0])
      )
        .subscribe(
        v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe = Rx.Observable.of(1, 2, 3)
      .concat(Rx.Observable.of(4, 5, 6))
      .subscribe(
      v => console.log(v),
      (err) => { },
      () => this.isRuning = false);
  }
  runDemo1static() {
    this.isRuning = true;
    this.demo1staticsubscribe =
      Rx.Observable.concat(
        Rx.Observable.of(1, 2, 3),
        Rx.Observable.of(4, 5, 6)
      )
        .subscribe(
        v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of(1, 2, 3)
      .concat(Rx.Observable.of(4, 5, 6))
      .subscribe(v => console.log(v));
  }
  runDemo1staticzip() {
    Rx.Observable
      .concat(
      Rx.Observable.of(1, 2, 3),
      Rx.Observable.of(4, 5, 6)
      )
      .subscribe(v => console.log(v));
  }

  runDemo1bak() {
    // 发出 1,2,3
    const sourceOne = Rx.Observable.of(1, 2, 3);
    // 发出 4,5,6
    const sourceTwo = Rx.Observable.of(4, 5, 6);
    // 先发出 sourceOne 的值，当完成时订阅 sourceTwo
    const example = sourceOne.concat(sourceTwo);
    // 输出: 1,2,3,4,5,6
    const subscribe = example.subscribe(val => console.log('Example: Basic concat:', val));


  }

  runDemo1Staticbak() {
    // 发出 1,2,3
    const sourceOne = Rx.Observable.of(1, 2, 3);
    // 发出 4,5,6
    const sourceTwo = Rx.Observable.of(4, 5, 6);
    // 作为静态方法使用
    const example = Rx.Observable.concat(sourceOne, sourceTwo);
    // 输出: 1,2,3,4,5,6
    const subscribe = example.subscribe(val => console.log('Example: static', val));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo1subscribe = Rx.Observable
      .concat(
      Rx.Observable.of(1, 2, 3)
        .delay(3000),
      Rx.Observable.of(4, 5, 6)
      )
      .subscribe(
      v => console.log(v),
      (err) => { },
      () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .concat(
      Rx.Observable.of(1, 2, 3)
        .delay(3000),
      Rx.Observable.of(4, 5, 6)
      )
      .subscribe(v => console.log(v));
  }
  runDemo2bak() {
    // 发出 1,2,3
    const sourceOne = Rx.Observable.of(1, 2, 3);
    // 发出 4,5,6
    const sourceTwo = Rx.Observable.of(4, 5, 6);

    // 延迟3秒，然后发出
    const sourceThree = sourceOne.delay(3000);
    // sourceTwo 要等待 sourceOne 完成才能订阅
    const example = sourceThree.concat(sourceTwo);
    // 输出: 1,2,3,4,5,6
    const subscribe = example.subscribe(val => console.log('Example: Delayed source one:', val));

  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe = Rx.Observable
      .concat(
      Rx.Observable.interval(1000),
      Rx.Observable.of('不', '会', '运', '行')
      )
      .subscribe(
      v => console.log(v),
      (err) => { },
      () => this.isRuning = false);
  }
  runDemo3Stop() {
    if (this.demo3subscribe) {
      this.demo3subscribe.unsubscribe();
      this.isRuning = false;
    }
  }

  runDemo3zip() {
    Rx.Observable
      .concat(
      Rx.Observable.interval(1000),
      Rx.Observable.of('不', '会', '运', '行')
      )
      .subscribe(v => console.log(v));
  }
  runDemo3bak() {
    // 当 source 永远不完成时，随后的 observables 永远不会运行
    const source = Rx.Observable
      .concat(
      Rx.Observable.interval(1000),
      Rx.Observable.of('This', 'Never', 'Runs')
      );
    // 输出: 1,2,3,4....
    const subscribe = source.subscribe(val => console.log('Example: Source never completes, second observable never runs:', val));

  }
}

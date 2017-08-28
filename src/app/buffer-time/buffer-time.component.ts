import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-buffer-time',
  templateUrl: './buffer-time.component.html',
  styleUrls: ['./buffer-time.component.css']
})
export class BufferTimeComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo4subscribe: Subscription = null;
  demo5subscribe: Subscription = null;

  demo1Info =
  `
// 源 Observable 最后两个0, 不会输出, 只是为了模拟弹珠图
// 延长完成时间
Rx.Observable
.zip(
  Rx.Observable
    .of('a', 'b', 'c', 'd', 'e', 'f', 'g', '0', '0'),
  Rx.Observable.interval(350),
  v => v[0]
)
.filter(v => v !== '0')
.bufferTime(1000)
.subscribe(v => console.log(v));
/*
  输出:
    [a,b]
    [c,d,e]
    [f,g]
    []
*/
`;
  demo2Info =
  `
Rx.Observable
.interval(500)
.take(10)
.bufferTime(2000)
.subscribe(v => console.log(v));
/*
  输出:
    [0,1,2]
    [3,4,5,6]
    [7,8,9]
*/
`;

  demo3Info =
  `
Rx.Observable
.interval(500)
.take(10)
.bufferTime(2000, 1000)
.subscribe(v => console.log(v));
/*
输出:
  [0,1,2]
  [1,2,3,4]
  [3,4,5,6]
  [5,6,7,8]
  [7,8,9]
  [9]
*/
`;
  demo4Info =
  `
Rx.Observable
.interval(500)
.take(10)
.bufferTime(2000, 3000)
.subscribe(v => console.log(v));
/*
输出:
  [0,1,2]
  [5,6,7,8]
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
    this.unsubscribe(this.demo4subscribe);
    this.unsubscribe(this.demo5subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo1() {
    this.isRuning = true;
    console.log(this.dateTool.getNowBymmsszz());
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e', 'f', 'g', '0', '0'),
        Rx.Observable.interval(1000),
        v => v[0]
        )
        .filter(v => v !== '0')
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .bufferTime(3000)
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      Rx.Observable
        .of('a', 'b', 'c', 'd', 'e', 'f', 'g', '0', '0'),
      Rx.Observable.interval(350),
      v => v[0]
      )
      .filter(v => v !== '0')
      .bufferTime(1000)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    console.log(this.dateTool.getNowBymmsszz());
    this.demo2subscribe =
      Rx.Observable
        .interval(500)
        .take(10)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .bufferTime(2000)
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .interval(500)
      .take(10)
      .bufferTime(2000)
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    console.log(this.dateTool.getNowBymmsszz());
    this.demo3subscribe =
      Rx.Observable
        .interval(500)
        .take(10)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .bufferTime(2000, 1000)
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable
      .interval(500)
      .take(10)
      .bufferTime(2000, 1000)
      .subscribe(v => console.log(v));
  }
  runDemo4() {
    this.isRuning = true;
    console.log(this.dateTool.getNowBymmsszz());
    this.demo4subscribe =
      Rx.Observable
        .interval(500)
        .take(10)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .bufferTime(2000, 3000)
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo4zip() {
    Rx.Observable
      .interval(500)
      .take(10)
      .bufferTime(2000, 3000)
      .subscribe(v => console.log(v));
  }

  // tslint:disable-next-line:member-ordering
  interval = 500;
  // tslint:disable-next-line:member-ordering
  takeNum = 10;
  // tslint:disable-next-line:member-ordering
  bufferTimeSpan = 2000;
  // tslint:disable-next-line:member-ordering
  bufferCreationInterval = 1000;
  // tslint:disable-next-line:member-ordering
  maxBufferSize = 4;

  runDemo5() {
    this.isRuning = true;
    console.log(this.dateTool.getNowBymmsszz());
    this.demo5subscribe =
      Rx.Observable
        .interval(this.interval)
        .take(this.takeNum)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .bufferTime(this.bufferTimeSpan, this.bufferCreationInterval,
        this.maxBufferSize)
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo5zip() {
    Rx.Observable
      .interval(this.interval)
      .take(this.takeNum)
      .bufferTime(this.bufferTimeSpan, this.bufferCreationInterval,
      this.maxBufferSize)
      .subscribe(v => console.log(v));
  }
}

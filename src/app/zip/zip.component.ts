import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-zip',
  templateUrl: './zip.component.html',
  styleUrls: ['./zip.component.css']
})
export class ZipComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
  .zip(
  Rx.Observable.interval(1000).take(3),
  Rx.Observable.interval(1000)
  )
  .subscribe(v => console.log(v));
/*
   输出:
     [0,0]
     [1,1]
     [2,2]
*/
`;
  demo2Info =
  `
Rx.Observable
  .zip(
  Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
  Rx.Observable.interval(1000)
  )
  .map(val => val[0])
  .subscribe(v => console.log(v));
/*
   输出:
     a
     b
     c
     d
     e
*/
`;
  demo3Info =
`
// 如果最后一个参数是函数, 这个函数被用来计算最终发出的值.
// 否则, 返回一个顺序包含所有输入值的数组
Rx.Observable
  .zip(
  Rx.Observable.of(27, 25, 29),
  Rx.Observable.of('Foo', 'Bar', 'Beer'),
  Rx.Observable.of(true, true, false),
  (age: number, name: string,
    isDev: boolean) => ({ age, name, isDev })
  )
  .subscribe(v => console.log(v));
/*
   输出:
    {age: 27, name: "Foo", isDev: true}
    {age: 25, name: "Bar", isDev: true}
    {age: 29, name: "Beer", isDev: false}
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
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.interval(1000).take(3),
        Rx.Observable.interval(1000),
      )
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      Rx.Observable.interval(1000).take(3),
      Rx.Observable.interval(1000)
      )
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(1000)
        )
        .map(val => val[0])
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .zip(
      Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
      Rx.Observable.interval(1000)
      )
      .map(val => val[0])
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.of(27, 25, 29),
        Rx.Observable.of('Foo', 'Bar', 'Beer'),
        Rx.Observable.of(true, true, false),
        (age: number, name: string,
          isDev: boolean) => ({ age, name, isDev })
        )
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable
      .zip(
      Rx.Observable.of(27, 25, 29),
      Rx.Observable.of('Foo', 'Bar', 'Beer'),
      Rx.Observable.of(true, true, false),
      (age: number, name: string,
        isDev: boolean) => ({ age, name, isDev })
      )
      .subscribe(v => console.log(v));
  }
}

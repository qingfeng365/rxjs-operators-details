import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit, OnDestroy {
  isRuning = false;
  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo4subscribe: Subscription = null;
  demo1Info =
  `
// 符合条件不是唯一项时,会报错
Rx.Observable
.of('a', 'b', 'c')
.single(v => v >= 'a')
.subscribe(v => console.log(v),
(err) => console.log(err),
() => { });
/*
  输出: (传入的错误只是一个字符串,不是错误对象,可能是bug)
    Sequence contains more than one element
*/
`;
  demo2Info =
  `
Rx.Observable
.from([1, 1, 3, 3, 4, 5, 7, 9])
.single(v => v % 2 === 0)
.subscribe(v => console.log(v),
(err) => console.log(err),
() => { });
/*
  输出:
    4
*/
`;
  demo3Info =
  `
// 没有符合条件的项时, 仍会输出值: undefined (不会报错)
Rx.Observable
.from([1, 1, 3, 3, 5, 5, 7, 9])
.single(v => v % 2 === 0)
.subscribe(v => console.log(v),
(err) => console.log(err),
() => { });
/*
输出:
   undefined
*/
`;
  demo4Info =
`
// 如果 源 Observable 没有数据发出, 则会报错
Rx.Observable
.from([])
.single(v => v % 2 === 0)
.subscribe(v => console.log(v),
(err) => console.log(err),
() => { });
/*
  输出: (传入的错误是错误对象: EmptyError )
    no elements in sequence
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
    this.unsubscribe(this.demo4subscribe);
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
        .of('a', 'b', 'c')
        .single(v => v >= 'a')
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b', 'c')
      .single(v => v >= 'a')
      .subscribe(v => console.log(v),
      (err) => console.log(err),
      () => { });
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .from([1, 1, 3, 3, 4, 5, 7, 9])
        .single(v => v % 2 === 0)
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo2zip() {
    Rx.Observable
      .from([1, 1, 3, 3, 4, 5, 7, 9])
      .single(v => v % 2 === 0)
      .subscribe(v => console.log(v),
      (err) => console.log(err),
      () => { });
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .from([1, 1, 3, 3, 5, 5, 7, 9])
        .single(v => v % 2 === 0)
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo3zip() {
    Rx.Observable
      .from([1, 1, 3, 3, 5, 5, 7, 9])
      .single(v => v % 2 === 0)
      .subscribe(v => console.log(v),
      (err) => console.log(err),
      () => { });
  }
  runDemo4() {
    this.isRuning = true;
    this.demo4subscribe =
      Rx.Observable
        .from([])
        .single(v => v % 2 === 0)
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo4zip() {
    Rx.Observable
      .from([])
      .single(v => v % 2 === 0)
      .subscribe(v => console.log(v),
      (err) => console.log(err),
      () => { });
  }
}

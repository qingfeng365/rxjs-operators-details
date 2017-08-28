import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit, OnDestroy {
  isRuning = false;


  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo4subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
.of('a', 'b', 'c', 'd')
.first()
.subscribe(v => console.log(v));
/*
  输出:
    a
*/
  `;
  demo2Info =
  `
Rx.Observable
.from([1, 2, 3, 4, 5, 6])
.first(num => num >= 5)
.subscribe(v => console.log(v));
/*
输出:
  5
*/
`;
  demo3Info =
  `
Rx.Observable
.from([1, 2, 3, 4, 5, 6])
.first(
num => num % 2 === 0,
(result, index) => '偶数 ' + result + ' 的序号为: ' + index)
.subscribe(v => console.log(v));
/*
  输出:
    偶数 2 的序号为: 1
*/
`;
  demo4Info =
  `
Rx.Observable
.from([1, 2, 3, 4, 5])
.first(
  val => val > 5,
  val => 'Value:' + val,
  '无'
)
.subscribe(v => console.log(v));
/*
  输出:
    无
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
        .of('a', 'b', 'c', 'd')
        .first()
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b', 'c', 'd')
      .first()
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .from([1, 2, 3, 4, 5, 6])
        .first(num => num >= 5)
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo2zip() {
    Rx.Observable
      .from([1, 2, 3, 4, 5, 6])
      .first(num => num >= 5)
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .from([1, 2, 3, 4, 5, 6])
        .first(
        num => num % 2 === 0,
        (result, index) => '偶数 ' + result + ' 的序号为: ' + index)
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo3zip() {
    Rx.Observable
      .from([1, 2, 3, 4, 5, 6])
      .first(
      num => num % 2 === 0,
      (result, index) => '偶数 ' + result + ' 的序号为: ' + index)
      .subscribe(v => console.log(v));
  }
  runDemo4() {
    this.isRuning = true;
    this.demo4subscribe =
      Rx.Observable
        .from([1, 2, 3, 4, 5])
        .first(
        val => val > 5,
        val => 'Value:' + val,
        '无'
        )
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo4zip() {
    Rx.Observable
      .from([1, 2, 3, 4, 5])
      .first(
      val => val > 5,
      val => 'Value:' + val,
      '无'
      )
      .subscribe(v => console.log(v));
  }
}

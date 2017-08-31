import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable.of(1, 3, 5)
  .scan((acc, curr) => acc + curr, 0)
  .subscribe(v => console.log(v));
/*
  输出:
    1
    4
    9
*/
`;
demo2Info =
`
Rx.Observable.range(1, 10)
  .scan((acc, curr) =>
    [...acc,
    acc.length === 0 ? curr : acc[acc.length - 1] + curr]
  , [])
  .subscribe(v => console.log(v));

如果只要最后一个数组,可结合 last
或者直接改用 reduce, reduce = scan + last

/*
  输出:
  [1]
  [1, 3]
  [1, 3, 6]
  [1, 3, 6, 10]
  [1, 3, 6, 10, 15]
  [1, 3, 6, 10, 15, 21]
  [1, 3, 6, 10, 15, 21, 28]
  [1, 3, 6, 10, 15, 21, 28, 36]
  [1, 3, 6, 10, 15, 21, 28, 36, 45]
  [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

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
      Rx.Observable.of(1, 3, 5)
        .do(v => console.log(' 源:' + v))
        .scan((acc, curr) => {
          console.log('acc:', acc, ' curr:', curr);
          return acc + curr;
        }, 0)
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of(1, 3, 5)
      .scan((acc, curr) => acc + curr, 0)
      .subscribe(v => console.log(v));
  }

  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.range(1, 10)
        .do(v => console.log(' 源:' + v))
        .scan((acc, curr) => {
          console.log('acc:', acc, ' curr:', curr);
          return [...acc,
          acc.length === 0 ? curr : acc[acc.length - 1] + curr];
        }, [])
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable.range(1, 10)
      .scan((acc, curr) =>
        [...acc,
        acc.length === 0 ? curr : acc[acc.length - 1] + curr]
      , [])
      .subscribe(v => console.log(v));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-throttle',
  templateUrl: './throttle.component.html',
  styleUrls: ['./throttle.component.css']
})
export class ThrottleComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
`
const order = [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
  0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
Rx.Observable
  .zip(
    Rx.Observable
      .from(['a', 'x', 'y', 'b', 'x', 'c', 'x', 'x', 'x']),
    Rx.Observable
      .interval(500)
      .take(21)
      .filter(index => order[index] === 1)
  )
  .map(val => val[0])
  .throttle(v => Rx.Observable.timer(3000)
  )
  .subscribe(v => console.log(v));
/*
  输出:
    a
    b
    c
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo1() {
    const order = [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
    this.isRuning = true;

    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable
          .from(['a', 'x', 'y', 'b', 'x', 'c', 'x', 'x', 'x']),
        Rx.Observable
          .interval(500)
          .take(21)
          .filter(index => order[index] === 1)
        )
        .map(val => val[0])
        .do(e => console.log(
          this.dateTool.getNowBymmsszz() + ' 源Observable发出值:' + e))
        .throttle(v =>
          Rx.Observable
            .timer(3000)
            .do(e => console.log(
              this.dateTool.getNowBymmsszz() + ' duration Observable 触发通知:' + e))
        )
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    const order = [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 1, 0, 0, 1, 1, 1, 1];
    Rx.Observable
      .zip(
        Rx.Observable
          .from(['a', 'x', 'y', 'b', 'x', 'c', 'x', 'x', 'x']),
        Rx.Observable
          .interval(500)
          .take(21)
          .filter(index => order[index] === 1)
      )
      .map(val => val[0])
      .throttle(v => Rx.Observable.timer(3000)
      )
      .subscribe(v => console.log(v));
  }
}

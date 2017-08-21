import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnDestroy {
  isRuning = false;
  demo1subscribe: Subscription = null;
  demo1staticsubscribe: Subscription = null;
  demo1Info =
  `
// 静态方法
Rx.Observable.race(
  Rx.Observable.interval(1000)
    .map(v => '1s:' + v),
  Rx.Observable.interval(1500)
    .map(v => '1.5s:' + v),
  Rx.Observable.interval(2000)
    .map(v => '2s:' + v),
)
  .take(5)
  .subscribe(v => console.log(v));
/*
  输出:
  1s:0
  1s:1
  1s:2
  1s:3
  1s:4
*/

// 实例方法
Rx.Observable
  .interval(1000)
  .map(v => '1s:' + v)
  .race(
    Rx.Observable
      .interval(1500)
      .map(v => '1.5s:' + v),
    Rx.Observable
      .interval(2000)
      .map(v => '2s:' + v),
  )
  .take(5)
  .subscribe(v => console.log(v));
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
  runDemo1static() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.race(
        Rx.Observable.interval(1000)
          .map(v => '1s:' + v),
        Rx.Observable.interval(1500)
          .map(v => '1.5s:' + v),
        Rx.Observable.interval(2000)
          .map(v => '2s:' + v),
      )
        .take(5)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1staticzip() {
    Rx.Observable.race(
      Rx.Observable.interval(1000)
        .map(v => '1s:' + v),
      Rx.Observable.interval(1500)
        .map(v => '1.5s:' + v),
      Rx.Observable.interval(2000)
        .map(v => '2s:' + v),
    )
      .take(5)
      .subscribe(v => console.log(v));
  }
  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.interval(1000)
        .map(v => '1s:' + v)
        .race(
        Rx.Observable.interval(1500)
          .map(v => '1.5s:' + v),
        Rx.Observable.interval(2000)
          .map(v => '2s:' + v),
      )
        .take(5)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .interval(1000)
      .map(v => '1s:' + v)
      .race(
        Rx.Observable
          .interval(1500)
          .map(v => '1.5s:' + v),
        Rx.Observable
          .interval(2000)
          .map(v => '2s:' + v),
      )
      .take(5)
      .subscribe(v => console.log(v));
  }
}

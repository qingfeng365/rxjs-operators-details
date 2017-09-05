import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-let',
  templateUrl: './let.component.html',
  styleUrls: ['./let.component.css']
})
export class LetComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable.interval(1000)
  .let(obs =>
    obs.filter(x => x % 2 === 1)
      .take(5))
  .subscribe(v => console.log(v));
  /*
    输出:
      1
      3
      5
      7
      9
  */
  `;
  demo2Info =
  `
  const otherfn = function (Observable) {
    return Observable.filter(x => x % 2 === 1).take(5);
  };
  Rx.Observable.interval(1000)
    .let(obs =>
      otherfn(obs))
    .subscribe(v => console.log(v));
  /*
    输出:
    1
    3
    5
    7
    9
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
      Rx.Observable.interval(1000)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .let(obs =>
          obs.filter(x => x % 2 === 1)
            .take(5))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.interval(1000)
      .let(obs =>
        obs.filter(x => x % 2 === 1)
          .take(5))
      .subscribe(v => console.log(v));
  }

  runDemo2() {
    const otherfn = function (Observable) {
      return Observable.filter(x => x % 2 === 1).take(5);
    };

    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.interval(1000)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .let(obs =>
          otherfn(obs))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    const otherfn = function (Observable) {
      return Observable.filter(x => x % 2 === 1).take(5);
    };
    Rx.Observable.interval(1000)
      .let(obs =>
        otherfn(obs))
      .subscribe(v => console.log(v));
  }
}



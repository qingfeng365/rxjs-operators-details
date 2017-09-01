import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-interval',
  templateUrl: './interval.component.html',
  styleUrls: ['./interval.component.css']
})
export class IntervalComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable.interval(1000)
    .take(6)
    .subscribe(v => console.log(v));
  /*
    输出:
      0
      1
      2
      3
      4
      5
  */
  `;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  runDemo1() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.interval(1000)
        .take(6)
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() + ' 输出:'+v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.interval(1000)
      .take(6)
      .subscribe(v => console.log(v));
  }

}


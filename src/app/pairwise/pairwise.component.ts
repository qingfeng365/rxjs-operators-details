import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-pairwise',
  templateUrl: './pairwise.component.html',
  styleUrls: ['./pairwise.component.css']
})
export class PairwiseComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable.interval(1000)
  .pairwise()
  .take(5)
  .subscribe(v => console.log(v));
/*
  输出:
    [0, 1]
    [1, 2]
    [2, 3]
    [3, 4]
    [4, 5]
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
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.interval(1000)
        .pairwise()
        .take(5)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.interval(1000)
      .pairwise()
      .take(5)
      .subscribe(v => console.log(v));
  }
}

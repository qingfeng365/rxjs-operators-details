import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html',
  styleUrls: ['./take-until.component.css']
})
export class TakeUntilComponent implements OnInit, OnDestroy {

  isRuning = false;
  demo1subscribe: Subscription = null;
  demo1Info =
  `
Rx.Observable
.zip(
  Rx.Observable
    .of('a', 'b', 'c', 'd', 'e', 'f', 'g'),
  Rx.Observable.interval(1000)
)
.map(v => v[0])
.takeUntil(Rx.Observable.timer(4500).mapTo('z'))
.subscribe(v => console.log(v));
/*
  输出:
     a
     b
     c
     d
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
      Rx.Observable
        .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e', 'f', 'g'),
        Rx.Observable.interval(1000)
        )
        .map(v => v[0])
        .takeUntil(Rx.Observable.timer(4500).mapTo('z'))
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e', 'f', 'g'),
        Rx.Observable.interval(1000)
      )
      .map(v => v[0])
      .takeUntil(Rx.Observable.timer(4500).mapTo('z'))
      .subscribe(v => console.log(v));
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-skip-until',
  templateUrl: './skip-until.component.html',
  styleUrls: ['./skip-until.component.css']
})
export class SkipUntilComponent implements OnInit, OnDestroy {
  isRuning = false;
  demo1subscribe: Subscription = null;
  demo1Info =
  `
Rx.Observable
.zip(
  Rx.Observable
    .of('a', 'b', 'c', 'd', 'e'),
  Rx.Observable.interval(1000)
)
.map(v => v[0])
.skipUntil(Rx.Observable.timer(3500))
.subscribe(v => console.log(v));
/*
  输出:
     d
     e
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
          .of('a', 'b', 'c', 'd', 'e'),
        Rx.Observable.interval(1000)
        )
        .map(v => v[0])
        .skipUntil(Rx.Observable.timer(3500))
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e'),
        Rx.Observable.interval(1000)
      )
      .map(v => v[0])
      .skipUntil(Rx.Observable.timer(3500))
      .subscribe(v => console.log(v));
  }
}

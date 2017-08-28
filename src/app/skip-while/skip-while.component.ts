import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-skip-while',
  templateUrl: './skip-while.component.html',
  styleUrls: ['./skip-while.component.css']
})
export class SkipWhileComponent implements OnInit, OnDestroy {

  isRuning = false;
  demo1subscribe: Subscription = null;
  demo1Info =
  `
Rx.Observable.interval(1000)
.take(7)
.skipWhile(x => x < 4)
.subscribe(v => console.log(v));
/*
  输出:
     4
     5
     6
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
        .take(7)
        .skipWhile(x => x < 4)
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable.interval(1000)
      .take(7)
      .skipWhile(x => x < 4)
      .subscribe(v => console.log(v));
  }

}

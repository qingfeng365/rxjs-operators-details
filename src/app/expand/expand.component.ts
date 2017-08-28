import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-expand',
  templateUrl: './expand.component.html',
  styleUrls: ['./expand.component.css']
})
export class ExpandComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
`
Rx.Observable
  .of(1)
  .expand(x => {
    if (x === 8) {
      return Rx.Observable.empty();
    } else {
      return Rx.Observable.of(x * 2);
    }
  })
  .subscribe(v => console.log(v));
/*
  输出:
    1
    2
    4
    8
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
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .of(1)
        .expand(x => {
          if (x === 8) {
            return Rx.Observable.empty();
          } else {
            return Rx.Observable.of(x * 2);
          }
        })
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .of(1)
      .expand(x => {
        if (x === 8) {
          return Rx.Observable.empty();
        } else {
          return Rx.Observable.of(x * 2);
        }
      })
      .subscribe(v => console.log(v));
  }
}

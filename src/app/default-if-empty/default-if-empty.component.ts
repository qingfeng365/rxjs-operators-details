import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-default-if-empty',
  templateUrl: './default-if-empty.component.html',
  styleUrls: ['./default-if-empty.component.css']
})
export class DefaultIfEmptyComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
`
  Rx.Observable.of()
    .defaultIfEmpty(42)
    .subscribe(v => console.log(v));
  /*
    输出:
      42
  */
  `;
  demo2Info =
  `
  Rx.Observable.empty()
    .defaultIfEmpty(42)
    .subscribe(v => console.log(v));
    /*
      输出:
        42
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
      Rx.Observable.of()
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .defaultIfEmpty(42)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of()
      .defaultIfEmpty(42)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.empty()
        .defaultIfEmpty(42)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable.empty()
      .defaultIfEmpty(42)
      .subscribe(v => console.log(v));
  }
}

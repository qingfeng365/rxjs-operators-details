import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-of',
  templateUrl: './of.component.html',
  styleUrls: ['./of.component.css']
})
export class OfComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable.of(1, 2, 3)
    .subscribe(v => console.log(v));
  /*
    输出:
      1
      2
      3
  */
  `;
  demo2Info =
  `
  Rx.Observable
    .of&lt;any&gt;(
      { name: 'Brian' },
      [1, 2, 3],
      function hello() { return 'Hello'; }
    )
    .subscribe(v => console.log(v));
  /*
    输出:
    Object {name: "Brian"}
    [1, 2, 3]
    function hello() { return 'Hello'; }
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
      Rx.Observable.of(1, 2, 3)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of(1, 2, 3)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .of<any>(
        { name: 'Brian' },
        [1, 2, 3],
        function hello() { return 'Hello'; })
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .of<any>(
        { name: 'Brian' },
        [1, 2, 3],
        function hello() { return 'Hello'; }
      )
      .subscribe(v => console.log(v));
  }
}


import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit, OnDestroy {
  isRuning = false;


  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
.interval(1000)
.take(5)
.filter(v => v % 2 === 1)
.subscribe(v => console.log(v));
/*
  输出:
    1
    3
*/
  `;
  demo2Info =
  `
Rx.Observable
.of('a', 'b', 'c', 'd', 'e')
.filter((v, i) => i % 2 === 0)
.subscribe(v => console.log(v));
/*
  输出:
    a
    c
    e
*/
  `;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {

  }
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
      Rx.Observable
        .interval(1000)
        .take(5)
        .filter(v => v % 2 === 1)
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .interval(1000)
      .take(5)
      .filter(v => v % 2 === 1)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .of('a', 'b', 'c', 'd', 'e')
        .filter((v, i) => i % 2 === 0)
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo2zip() {
    Rx.Observable
      .of('a', 'b', 'c', 'd', 'e')
      .filter((v, i) => i % 2 === 0)
      .subscribe(v => console.log(v));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-distinct-until-changed',
  templateUrl: './distinct-until-changed.component.html',
  styleUrls: ['./distinct-until-changed.component.css']
})
export class DistinctUntilChangedComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
.distinctUntilChanged()
.subscribe(v => console.log(v));
/*
  输出:
    1
    2
    1
    2
    3
    4
*/
`;
  demo2Info =
  `
Rx.Observable
.of(
{ age: 4, name: 'Foo' },
{ age: 7, name: 'Bar' },
{ age: 5, name: 'Foo' },
{ age: 6, name: 'Foo' })
.distinctUntilChanged((p, q) => p.name === q.name)
.subscribe(v => console.log(v));
/*
  输出:
    { age: 4, name: 'Foo' }
    { age: 7, name: 'Bar' }
    { age: 5, name: 'Foo' }
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
        .of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
        .distinctUntilChanged()
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
      .distinctUntilChanged()
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;

    this.demo2subscribe =
      Rx.Observable
        .of(
        { age: 4, name: 'Foo' },
        { age: 7, name: 'Bar' },
        { age: 5, name: 'Foo' },
        { age: 6, name: 'Foo' })
        .distinctUntilChanged((p, q) => p.name === q.name)
        .subscribe(v => console.log(v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo2zip() {
    Rx.Observable
      .of(
      { age: 4, name: 'Foo' },
      { age: 7, name: 'Bar' },
      { age: 5, name: 'Foo' },
      { age: 6, name: 'Foo' })
      .distinctUntilChanged((p, q) => p.name === q.name)
      .subscribe(v => console.log(v));
  }
}

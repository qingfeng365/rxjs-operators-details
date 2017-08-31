import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-partition',
  templateUrl: './partition.component.html',
  styleUrls: ['./partition.component.css']
})
export class PartitionComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
const parts = Rx.Observable.interval(1000)
  .filter(x => x > 0)
  .take(6)
  .partition(x => x % 2 === 1);

parts[0]
  .reduce((acc, cur) => [...acc, cur], [])
  .subscribe(v => console.log(v));

parts[1]
  .reduce((acc, cur) => [...acc, cur], [])
  .subscribe(v => console.log(v));
/*
  输出:
    [1,3,5]
    [2,4,6]
*/
`;
  demo2Info =
`
Rx.Observable
  .from(
  Rx.Observable.interval(1000)
    .filter(x => x > 0)
    .take(6)
    .partition(x => x % 2 === 1))
  .mergeMap(part$ => part$.reduce((acc, cur) => [...acc, cur], []))
  .subscribe(v => console.log(v));
/*
输出:
  [1,3,5]
  [2,4,6]
*/
`;
  demo3Info =
`
Rx.Observable.interval(1000)
  .filter(x => x > 0)
  .take(6)
  .groupBy(x => x % 2 === 1)
  .mergeMap(group$ => group$.reduce((acc, cur) => [...acc, cur], []))
  .subscribe(v => console.log(v));
/*
输出:
  [1,3,5]
  [2,4,6]
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
    const parts = Rx.Observable.interval(1000)
      .filter(x => x > 0)
      .take(6)
      .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
      .partition(x => x % 2 === 1);

    console.log('partition 返回的数组: ');
    console.log(parts);

    parts[0]
      .do(v => console.log(this.dateTool.getNowBymmsszz() + ' ' +
        'parts[0]:' + v))
      .reduce((acc, cur) => [...acc, cur], [])
      .subscribe(v => console.log(v));
    parts[1]
      .do(v => console.log(this.dateTool.getNowBymmsszz() + ' ' +
        'parts[1]:' + v))
      .reduce((acc, cur) => [...acc, cur], [])
      .subscribe(v => console.log(v));

  }
  runDemo1zip() {
    const parts = Rx.Observable.interval(1000)
      .filter(x => x > 0)
      .take(6)
      .partition(x => x % 2 === 1);

    parts[0]
      .reduce((acc, cur) => [...acc, cur], [])
      .subscribe(v => console.log(v));

    parts[1]
      .reduce((acc, cur) => [...acc, cur], [])
      .subscribe(v => console.log(v));
  }
  runDemo2() {

    Rx.Observable
      .from(
      Rx.Observable.interval(1000)
        .filter(x => x > 0)
        .take(6)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .partition(x => x % 2 === 1))
      .mergeMap(part$ => part$.reduce((acc, cur) => [...acc, cur], []))
      .subscribe(v => console.log(v));

  }
  runDemo2zip() {
    Rx.Observable
      .from(
      Rx.Observable.interval(1000)
        .filter(x => x > 0)
        .take(6)
        .partition(x => x % 2 === 1))
      .mergeMap(part$ => part$.reduce((acc, cur) => [...acc, cur], []))
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    Rx.Observable.interval(1000)
      .filter(x => x > 0)
      .take(6)
      .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
      .groupBy(x => x % 2 === 1)
      .mergeMap(group$ => group$.reduce((acc, cur) => [...acc, cur], []))
      .subscribe(v => console.log(v));
  }
  runDemo3zip() {
    Rx.Observable.interval(1000)
      .filter(x => x > 0)
      .take(6)
      .groupBy(x => x % 2 === 1)
      .mergeMap(group$ => group$.reduce((acc, cur) => [...acc, cur], []))
      .subscribe(v => console.log(v));
  }
}

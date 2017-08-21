import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-debounce-time',
  templateUrl: './debounce-time.component.html',
  styleUrls: ['./debounce-time.component.css']
})
export class DebounceTimeComponent implements OnInit, OnDestroy {
  isRuning = false;

  searchCrtl: FormControl = new FormControl();
  searchWord = '';
  demo1subscribe: Subscription = null;

  demo1Info =
  `
const order = [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0];
Rx.Observable
  .zip(
  Rx.Observable
    .from(['a', 'b', 'c', 'd', 'e']),
  Rx.Observable
    .interval(1000)
    .take(12)
    .filter(index => order[index] === 1)
  )
  .map(val => val[0])
  .debounceTime(2000)
  .subscribe(v => console.log(v));
/*
  输出:
    a
    c
    d
*/

值'e' 不会被输出, 只是为了模似弹珠图,
在'd'之后仍未完成,还持续一段时间才完成
`;

demo2Info =
`
this.searchCrtl.valueChanges
.debounceTime(500)
.subscribe(v => {
  this.searchWord = v;
});
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
    this.runDemo2();
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
    const order = [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0];
    this.isRuning = true;

    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable
          .from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable
          .interval(1000)
          .take(12)
          .filter(index => order[index] === 1)
        )
        .map(val => val[0])
        .do(e => console.log(
          this.dateTool.getNowBymmsszz() + ' 源Observable发出值:' + e))
        .debounceTime(2000)
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    const order = [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0];
    Rx.Observable
      .zip(
      Rx.Observable
        .from(['a', 'b', 'c', 'd', 'e']),
      Rx.Observable
        .interval(1000)
        .take(12)
        .filter(index => order[index] === 1)
      )
      .map(val => val[0])
      .debounceTime(2000)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.searchCrtl.valueChanges
      .debounceTime(500)
      .subscribe(v => {
        this.searchWord = v;
      });
  }
}

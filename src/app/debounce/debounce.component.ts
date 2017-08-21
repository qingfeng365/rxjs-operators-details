import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-debounce',
  templateUrl: './debounce.component.html',
  styleUrls: ['./debounce.component.css']
})
export class DebounceComponent implements OnInit, OnDestroy {
  isRuning = false;

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
  .debounce(v => Rx.Observable.interval(2000))
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
        .debounce(v =>
          Rx.Observable
            .interval(2000)
            .do(e => console.log(
              this.dateTool.getNowBymmsszz() + ' duration Observable发出值:' + e))
        )
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
      .debounce(v => Rx.Observable.interval(2000))
      .subscribe(v => console.log(v));
  }
}

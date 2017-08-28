import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-merge-map',
  templateUrl: './merge-map.component.html',
  styleUrls: ['./merge-map.component.css']
})
export class MergeMapComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
`
const order = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0];
Rx.Observable
  .zip(
  Rx.Observable.from([1, 3, 5]),
  Rx.Observable.interval(1000)
    .take(10)
    .filter(v => order[v] === 1),
  (v, i) => v
  )
  .mergeMap(e =>
    Rx.Observable
      .zip(
      Rx.Observable.of(e * 10, e * 10, e * 10),
      Rx.Observable.interval(1000),
      (v, i) => v
      )
  )
  .subscribe(v => console.log(v));
/*
  输出:
    10
    10
    10
    30
    30
    50
    30
    50
    50
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
    const order = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0];
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from([1, 3, 5]),
        Rx.Observable.interval(1000)
          .take(10)
          .filter(v => order[v] === 1),
        (v, i) => v
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 源:' + v))
        .mergeMap(e => {
          const map$ =
            Rx.Observable
              .zip(
              Rx.Observable.of(e * 10, e * 10, e * 10),
              Rx.Observable.interval(1000),
              (v, i) => v
              )
              .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 内部Observable: ' + v));
          console.log(this.dateTool.getNowBymmsszz() + ' 映射为 内部Observable ');
          console.log(map$);
          return map$;
        }
        )
        .subscribe(v => console.log(
          this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    const order = [1, 0, 0, 0, 0, 1, 1, 0, 0, 0];
    Rx.Observable
      .zip(
      Rx.Observable.from([1, 3, 5]),
      Rx.Observable.interval(1000)
        .take(10)
        .filter(v => order[v] === 1),
      (v, i) => v
      )
      .mergeMap(e =>
        Rx.Observable
          .zip(
          Rx.Observable.of(e * 10, e * 10, e * 10),
          Rx.Observable.interval(1000),
          (v, i) => v
          )
      )
      .subscribe(v => console.log(v));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit, OnDestroy {
  isRuning = false;
  demo1subscribe: Subscription = null;
  demo1Info =
`
const order1 = [1, 0, 1, 1, 0, 0, 1, 0, 0, 0];
const order2 = [0, 1, 0, 0, 1, 1, 0, 1, 0, 0];
Rx.Observable
  .zip(
    Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
    Rx.Observable.interval(1000)
      .take(10)
      .filter(index => order1[index] === 1)
  )
  .map(val => val[0])
  .sample(
    Rx.Observable.interval(1000)
      .take(10)
      .filter(index => order2[index] === 1)
      .mapTo('x')
  )
  .subscribe(v => console.log(v));
/*
  输出:
    a
    c
    d
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
    const order1 = [1, 0, 1, 1, 0, 0, 1, 0, 0, 0];
    const order2 = [0, 1, 0, 0, 1, 1, 0, 1, 0, 0];
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(1000)
          .take(10)
          .filter(index => order1[index] === 1)
        )
        .map(val => val[0])
        .do(e => console.log('源 Observable 发出值:' + e))
        .sample(
        Rx.Observable.interval(1000)
          .take(10)
          .filter(index => order2[index] === 1)
          .mapTo('x')
          .do(e => console.log('notifier Observable 发出值:' + e))
        )
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    const order1 = [1, 0, 1, 1, 0, 0, 1, 0, 0, 0];
    const order2 = [0, 1, 0, 0, 1, 1, 0, 1, 0, 0];
    Rx.Observable
      .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(1000)
          .take(10)
          .filter(index => order1[index] === 1)
      )
      .map(val => val[0])
      .sample(
        Rx.Observable.interval(1000)
          .take(10)
          .filter(index => order2[index] === 1)
          .mapTo('x')
      )
      .subscribe(v => console.log(v));
  }
}

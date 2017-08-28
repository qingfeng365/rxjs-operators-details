import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-buffer-toggle',
  templateUrl: './buffer-toggle.component.html',
  styleUrls: ['./buffer-toggle.component.css']
})
export class BufferToggleComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
.zip(
  Rx.Observable
    .of('a', 'b', 'c', 'd', 'e', 'f', 'g'),
  Rx.Observable.interval(1000),
  v => v[0]
)
.bufferToggle(
  Rx.Observable.timer(500, 5000),
  i => {
    if (i === 0) {
      return Rx.Observable.interval(2000);
    } else {
      return Rx.Observable.interval(1000);
    }
  }
)
.subscribe(v => console.log(v));
/*
  输出:
    [a,b]
    [f]
*/
`;
  demo2Info = ``;
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
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e', 'f', 'g'),
        Rx.Observable.interval(1000),
        v => v[0]
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .bufferToggle(
        Rx.Observable.timer(500, 5000),
        i => {
          console.log(this.dateTool.getNowBymmsszz() +
            ' opening Observable: ' + i);
          if (i === 0) {
            return Rx.Observable.interval(2000)
              .do(v => console.log(this.dateTool.getNowBymmsszz() + ' closing Observable(2s):' + v));
          } else {
            return Rx.Observable.interval(1000)
              .do(v => console.log(this.dateTool.getNowBymmsszz() + ' closing Observable(1s):' + v));
          }
        }
        )
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      Rx.Observable
        .of('a', 'b', 'c', 'd', 'e', 'f', 'g'),
      Rx.Observable.interval(1000),
      v => v[0]
      )
      .bufferToggle(
      Rx.Observable.timer(500, 5000),
      i => {
        if (i === 0) {
          return Rx.Observable.interval(2000);
        } else {
          return Rx.Observable.interval(1000);
        }
      }
      )
      .subscribe(v => console.log(v));
  }

  // tslint:disable-next-line:member-ordering
  source_interval = 1000;
  // tslint:disable-next-line:member-ordering
  takeNum = 20;
  // tslint:disable-next-line:member-ordering
  opening_interval = 5000;
  // tslint:disable-next-line:member-ordering
  closing_interval = 3000;

  runDemo2() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .interval(this.source_interval)
        .take(this.takeNum)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .bufferToggle(
        Rx.Observable.interval(this.opening_interval)
          .do(v => console.log(this.dateTool.getNowBymmsszz() +
            ' opening Observable: ' + v)),
        (i) => {
          console.log(this.dateTool.getNowBymmsszz() + ' 创建 closing Observable(' + i + ')');
          return Rx.Observable.interval(this.closing_interval)
            .do(v => console.log(this.dateTool.getNowBymmsszz() +
              ' closing Observable(' + i + '): ' + v));
        }
        )
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .interval(this.source_interval)
      .take(this.takeNum)
      .bufferToggle(
      Rx.Observable.interval(this.opening_interval),
      (i) => Rx.Observable.interval(this.closing_interval))
      .subscribe(v => console.log(v));
  }
}

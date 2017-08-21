import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-concat-all',
  templateUrl: './concat-all.component.html',
  styleUrls: ['./concat-all.component.css']
})
export class ConcatAllComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info = `
Rx.Observable.interval(1000).take(3)
  .map(v => {
    switch (v) {
      case 0:
        return Rx.Observable.zip(
          Rx.Observable.from(['a', 'b']),
          Rx.Observable.interval(2000))
          .map(val => val[0]);
      case 1:
        return Rx.Observable.from(['c', 'd'])
          .delay(2000);
      case 2:
        return Rx.Observable.zip(
          Rx.Observable.from(['e', 'f']),
          Rx.Observable.interval(1000))
          .delay(1000)
          .map(val => val[0]);
    }
  })
  .concatAll()
  .subscribe(v => console.log(v));
/*
  输出:
  a
  b
  c
  d
  e
  f
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
    this.isRuning = true;

    this.demo1subscribe =
      Rx.Observable.interval(1000).take(3)
        .map(v => {
          switch (v) {
            case 0:
              return Rx.Observable.zip(
                Rx.Observable.from(['a', 'b']),
                Rx.Observable.interval(2000))
                .map(val => val[0])
                .do(e => console.log(
                  this.dateTool.getNowBymmsszz() +
                  ' ab$ 发出值: ' + e));
            case 1:
              return Rx.Observable.from(['c', 'd'])
                .delay(2000)
                .do(e => console.log(
                  this.dateTool.getNowBymmsszz() +
                  ' cd$ 发出值: ' + e));
            case 2:
              return Rx.Observable.zip(
                Rx.Observable.from(['e', 'f']),
                Rx.Observable.interval(1000))
                .delay(1000)
                .map(val => val[0])
                .do(e => console.log(
                  this.dateTool.getNowBymmsszz() +
                  ' ef$ 发出值: ' + e));
          }
        })
        .do(e => {
          console.log(this.dateTool.getNowBymmsszz() +
            ' 上流操作符发出 Observable:');
          console.log(e);
        }
        )
        .concatAll()
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.interval(1000).take(3)
      .map(v => {
        switch (v) {
          case 0:
            return Rx.Observable.zip(
              Rx.Observable.from(['a', 'b']),
              Rx.Observable.interval(2000))
              .map(val => val[0]);
          case 1:
            return Rx.Observable.from(['c', 'd'])
              .delay(2000);
          case 2:
            return Rx.Observable.zip(
              Rx.Observable.from(['e', 'f']),
              Rx.Observable.interval(1000))
              .delay(1000)
              .map(val => val[0]);
        }
      })
      .concatAll()
      .subscribe(v => console.log(v));
  }
}

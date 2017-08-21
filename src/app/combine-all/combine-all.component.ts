import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';



@Component({
  selector: 'app-combine-all',
  templateUrl: './combine-all.component.html',
  styleUrls: ['./combine-all.component.css'],
})
export class CombineAllComponent implements OnInit,
  OnDestroy {

  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo0Info =
  `Rx.Observable
  .zip(
    // 数组[ab$, 12$]
    Rx.Observable.from([
      // ab$
      Rx.Observable
        .zip(
          Rx.Observable.from(['a', 'b']),
          Rx.Observable.interval(2000))
        .map(val => val[0]),
      // 12$
      Rx.Observable.interval(500).take(2)
        .delay(2500)
        .map(val => val + 1)
    ]),
    Rx.Observable.interval(2000))
  .map(val => val[0])
  .combineAll()
  .subscribe(v => console.log(v));
/*
  输出:
    [a,1]
    [a,2]
    [b,2]
*/
`;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService
  ) {

  }

  ngOnInit() {
  }

  runDemo0() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.from([
          Rx.Observable
            .zip(
            Rx.Observable.from(['a', 'b']),
            Rx.Observable.interval(2000))
            .map(val => val[0])
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' ab$ 发射值:' + v)),
          Rx.Observable.interval(500).take(2)
            .delay(2500)
            .map(val => val + 1)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 12$ 发射值:' + v))
        ]),
        Rx.Observable.interval(2000))
        .map(val => val[0])
        .do(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 上游操作符发射值:');
          console.log(v);
        })
        .combineAll()
        .subscribe(v => console.log('输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo0zip() {
    Rx.Observable
      .zip(
      // 数组[ab$, 12$]
      Rx.Observable.from([
        // ab$
        Rx.Observable
          .zip(
          Rx.Observable.from(['a', 'b']),
          Rx.Observable.interval(2000))
          .map(val => val[0]),
        // 12$
        Rx.Observable.interval(500).take(2)
          .delay(2500)
          .map(val => val + 1)
      ]),
      Rx.Observable.interval(2000))
      .map(val => val[0])
      .combineAll()
      .subscribe(v => console.log(v));
  }

  runDemo1() {
    this.isRuning = true;

    this.demo1subscribe = Rx.Observable.interval(1000).take(2)
      .do(v => {
        console.log('外部:' + v);
      })
      .map(val =>
        Rx.Observable.interval(1000)
          .map(i => `外部:${val}: - ${i} `)
          .do(v => {
            console.log(`内部发出的值: ${v} - ${this.dateTool.getNowBymmsszz()}`);
          })
          .take(5))
      .combineAll()
      .subscribe(
      val => console.log(val),
      (err) => { },
      () => { this.isRuning = false; });

  }
  runDemo1zip() {
    this.demo1subscribe = Rx.Observable.interval(1000).take(2)
      .map(val =>
        Rx.Observable.interval(1000)
          .map(i => `外部:${val}: - ${i}`)
          .take(5))
      .combineAll()
      .subscribe(val => console.log(val));

  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe = Rx.Observable.fromEvent(document, 'click')
      .do(e => {
        console.log('最开始发出的事件: - ' + this.dateTool.getNowBymmsszz());
        console.log(e);
      })
      .map(ev =>
        Rx.Observable.interval(Math.random() * 2000)
          .take(3)
          .do(v => {
            console.log('内部 Observable 发出的值: - ' + this.dateTool.getNowBymmsszz());
            console.log(v);
          })
      )
      .take(2)
      .do(v => {
        console.log('由 map 转换的 Observable: - ' + this.dateTool.getNowBymmsszz());
        console.log(v);
      })
      .combineAll()
      .subscribe(
      x => console.log(x),
      (err) => { },
      () => { this.isRuning = false; });
  }
  runDemo2zip() {
    Rx.Observable.fromEvent(document, 'click')
      .map(ev =>
        Rx.Observable.interval(Math.random() * 2000)
          .take(3)
      )
      .take(2)
      .combineAll()
      .subscribe(x => console.log(x));
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

}

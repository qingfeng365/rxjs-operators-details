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

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService
  ) {

  }

  ngOnInit() {
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
  runDemo1bak() {
    this.isRuning = true;
    // 每秒发出值，并只取前2个
    const source = Rx.Observable.interval(1000).take(2);
    // 将 source 发出的每个值映射成取前5个值的 interval observable
    const example = source.map(val => Rx.Observable.interval(1000).map(i => `Result (${val}): ${i}`).take(5));
    /*
      soure 中的2个值会被映射成2个(内部的) interval observables，
      这2个内部 observables 每秒使用 combineLatest 策略来 combineAll，
      每当任意一个内部 observable 发出值，就会发出每个内部 observable 的最新值。
    */
    const combined = example.combineAll();
    /*
      输出:
      ["Result (0): 0", "Result (1): 0"]
      ["Result (0): 1", "Result (1): 0"]
      ["Result (0): 1", "Result (1): 1"]
      ["Result (0): 2", "Result (1): 1"]
      ["Result (0): 2", "Result (1): 2"]
      ["Result (0): 3", "Result (1): 2"]
      ["Result (0): 3", "Result (1): 3"]
      ["Result (0): 4", "Result (1): 3"]
      ["Result (0): 4", "Result (1): 4"]
    */
    this.demo1subscribe = combined.subscribe(
      val => console.log(val),
      (err) => { },
      () => { this.isRuning = false; });
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
  runDemo2bak() {
    const clicks = Rx.Observable.fromEvent(document, 'click');
    const higherOrder = clicks.map(ev =>
      Rx.Observable.interval(Math.random() * 2000).take(3)
    ).take(2);
    const result = higherOrder.combineAll();
    result.subscribe(x => console.log(x));
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

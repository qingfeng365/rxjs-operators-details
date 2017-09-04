import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-delay-when',
  templateUrl: './delay-when.component.html',
  styleUrls: ['./delay-when.component.css']
})
export class DelayWhenComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  const delaycfg = {
    'a': 500,
    'b': 3000,
    'c': 200
  };

  Rx.Observable
    .zip(
      Rx.Observable.of('a', 'b', 'c', '0'),
      Rx.Observable.interval(1000),
      x => x
    )
    .filter(v => v !== '0')
    .delayWhen(v => Rx.Observable.interval(delaycfg[v]).mapTo('x'))
    .subscribe(v => console.log(v));
  /*
    输出:
      a
      c
      b
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
    const delaycfg = {
      'a': 500,
      'b': 3000,
      'c': 200
    };

    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable.of('a', 'b', 'c', '0'),
        Rx.Observable.interval(1000),
        x => x
        )
        .filter(v => v !== '0')
        .do(
        v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v),
        () => { },
        () => console.log(this.dateTool.getNowBymmsszz() + ' 源完成.'))
        .delayWhen(v => {
          return Rx.Observable
            .interval(delaycfg[v])
            .mapTo('x')
            .do(
            x =>
              console.log(this.dateTool.getNowBymmsszz() + ' delayDuration Observable-' + v + ' 触发通知...')
            );
        })
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' 输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    const delaycfg = {
      'a': 500,
      'b': 3000,
      'c': 200
    };

    Rx.Observable
      .zip(
      Rx.Observable.of('a', 'b', 'c', '0'),
      Rx.Observable.interval(1000),
      x => x
      )
      .filter(v => v !== '0')
      .delayWhen(v => Rx.Observable.interval(delaycfg[v]).mapTo('x'))
      .subscribe(v => console.log(v));
  }

}


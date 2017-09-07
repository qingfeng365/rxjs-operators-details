import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-retry-when',
  templateUrl: './retry-when.component.html',
  styleUrls: ['./retry-when.component.css']
})
export class RetryWhenComponent implements OnInit, OnDestroy {

  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .timer(20, 1000)
    .filter(x => x > 0)
    .map(x => {
      if (x > 2) {
        throw new Error('出现错误.');
      }
      return x;
    })
    .retryWhen(errorObs$ => {
      return errorObs$
        // 这里是为了模拟第2次错误后,强制完成
        .takeUntil(Rx.Observable.timer(8000))
        .mapTo('r')
        .delay(3000);
    })
    .subscribe(v => console.log(v));
  /*
    输出:
      1
      2
      1
      2
      1
  */
  `;
  demo2Info =
  `
  Rx.Observable
  .timer(20, 1000)
  .filter(x => x > 0)
  .map(x => {
    if (x > 2) {
      throw new Error('出现错误.');
    }
    return x;
  })
  .retryWhen(errorObs$ => {
    return errorObs$
      // 实际重试次数为 take - 1,
      // 因最后一次出错就结束了,不会再试
      .take(3)
      .mapTo('r')
      .delay(3000);
  })
  .subscribe(v => console.log(v));
  /*
  输出:
    1
    2
    1
    2
    1
    2
*/
`;

  demo3Info =
  `
  Rx.Observable
    .timer(20, 1000)
    .filter(x => x > 0)
    .map(x => {
      if (x > 2) {
        throw new Error('出现错误.');
      }
      return x;
    })
    .retryWhen(errorObs$ => {
      return Rx.Observable
        .interval(1000)
        .take(10)
        .filter(v => v === 3 || v === 7)
        .mapTo('r');
    })
    .subscribe(v => console.log(v));
/*
    输出:
      1
      2
      1
      2
      1
  */
`;

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
        .timer(20, 1000)
        .filter(x => x > 0)
        .map(x => {
          if (x > 2) {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .retryWhen(errorObs$ => {
          console.log(this.dateTool.getNowBymmsszz() +
            ' retryWhen 调用函数... ');
          return errorObs$
            .takeUntil(Rx.Observable.timer(8000))
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' errorObs$ 得到的错误: ' + v.message))
            .mapTo('r')
            .delay(3000)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' notifier Observable 在错误发生后延时3秒触发通知.., '))
            .finally(() =>
              console.log(this.dateTool.getNowBymmsszz() + ' errorObs$ 完成.'));
        })
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { console.log('错误:' + err.message); },
        () => this.isRuning = false);
  }

  runDemo1zip() {
    Rx.Observable
      .timer(20, 1000)
      .filter(x => x > 0)
      .map(x => {
        if (x > 2) {
          throw new Error('出现错误.');
        }
        return x;
      })
      .retryWhen(errorObs$ => {
        return errorObs$
          .takeUntil(Rx.Observable.timer(8000))
          .mapTo('r')
          .delay(3000);
      })
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .timer(20, 1000)
        .filter(x => x > 0)
        .map(x => {
          if (x > 2) {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .retryWhen(errorObs$ => {
          console.log(this.dateTool.getNowBymmsszz() +
            ' retryWhen 调用函数... ');
          return errorObs$
            .take(3)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' errorObs$ 得到的错误: ' + v.message))
            .mapTo('r')
            .delay(3000)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' notifier Observable 在错误发生后延时3秒触发通知..'));
        })
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { console.log('错误:' + err.message); },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .timer(20, 1000)
      .filter(x => x > 0)
      .map(x => {
        if (x > 2) {
          throw new Error('出现错误.');
        }
        return x;
      })
      .retryWhen(errorObs$ => {
        return errorObs$
          .take(3)
          .mapTo('r')
          .delay(3000);
      })
      .subscribe(v => console.log(v));
  }

  runDemo3() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .timer(20, 1000)
        .filter(x => x > 0)
        .map(x => {
          if (x > 2) {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .retryWhen(errorObs$ => {
          console.log(this.dateTool.getNowBymmsszz() +
            ' retryWhen 调用函数... ');
          return Rx.Observable
            .interval(1000)
            .take(10)
            .filter(v => v === 3 || v === 7)
            .mapTo('r')
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' notifier Observable 触发通知:' + v))
            .finally(() =>
              console.log(this.dateTool.getNowBymmsszz() + ' notifier Observable 完成.'));
        })
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { console.log('错误:' + err.message); },
        () => this.isRuning = false);
  }

  runDemo3zip() {
    Rx.Observable
      .timer(20, 1000)
      .filter(x => x > 0)
      .map(x => {
        if (x > 2) {
          throw new Error('出现错误.');
        }
        return x;
      })
      .retryWhen(errorObs$ => {
        return Rx.Observable
          .interval(1000)
          .take(10)
          .filter(v => v === 3 || v === 7)
          .mapTo('r');
      })
      .subscribe(v => console.log(v));
  }
}


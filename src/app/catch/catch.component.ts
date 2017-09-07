import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-catch',
  templateUrl: './catch.component.html',
  styleUrls: ['./catch.component.css']
})
export class CatchComponent implements OnInit, OnDestroy {

  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;
  demo4subscribe: Subscription = null;
  demo5subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
  .of('a', 'b', 'x')
  .map(x => {
    if (x === 'x') {
      throw new Error('出现错误.');
    }
    return x;
  })
  .catch((err, caught) => Rx.Observable.of(1, 2, 3))
  .subscribe(v => console.log(v));
  /*
    输出:
      a
      b
      1
      2
      3
  */
  `;
  demo2Info =
  `
  // 使用该模式时, 是注意重试结束条件
  let retrynum = 0;
  Rx.Observable
    .of('a', 'b', 'x')
    .map(x => {
      if (x === 'x') {
        throw new Error('出现错误.');
      }
      return x;
    })
    .catch((err, caught) => {
      retrynum++;
      if (retrynum > 2) { return Rx.Observable.empty(); }
      return caught;
    })
    .subscribe(v => console.log(v));
  /*
    输出:
      a
      b
      a
      b
      a
      b
  */
  `;
  demo3Info =
  `
  Rx.Observable
    .of('a', 'b', 'x')
    .map(x => {
      if (x === 'x') {
        throw new Error('出现错误.');
      }
      return x;
    })
    .catch((err, caught) => {
      throw new Error('捕获错误:' + err.message);
    })
    .subscribe(
      v => console.log('输出:' + v),
      (err) => console.log(err.message)
    );
  /*
    输出:
    捕获错误:出现错误.
  */
  `;
  demo4Info =
  `
  Rx.Observable
    .throw(new Error('X'))
    .catch((err, caught) => {
      return Rx.Observable.of('<无>');
    })
    .subscribe(v => console.log(v));
  /*
    输出:
    <无>
  */
  `;
  demo5Info =
  `
  const getPromise = function (): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        reject(new Error('promise 执行错误'));
      }, 500);
    });
  };

  Rx.Observable
    .from(getPromise())
    .catch((err, caught) => {
      return Rx.Observable.of('<无>');
    })
    .subscribe(v => console.log(v));
  /*
    输出:
    <无>
  */
  `;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
    this.unsubscribe(this.demo4subscribe);
    this.unsubscribe(this.demo5subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .of('a', 'b', 'x')
        .map(x => {
          if (x === 'x') {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .catch((err, caught) => {
          console.log(this.dateTool.getNowBymmsszz() + ' 源抛出错误:' + err.message);
          return Rx.Observable.of(1, 2, 3);
        })
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b', 'x')
      .map(x => {
        if (x === 'x') {
          throw new Error('出现错误.');
        }
        return x;
      })
      .catch((err, caught) => Rx.Observable.of(1, 2, 3))
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    let retrynum = 0;
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .of('a', 'b', 'x')
        .map(x => {
          if (x === 'x') {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .catch((err, caught) => {
          console.log(this.dateTool.getNowBymmsszz() + ' 源抛出错误:' + err.message);
          retrynum++;
          if (retrynum > 2) { return Rx.Observable.empty(); }
          return caught;
        })
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    let retrynum = 0;
    Rx.Observable
      .of('a', 'b', 'x')
      .map(x => {
        if (x === 'x') {
          throw new Error('出现错误.');
        }
        return x;
      })
      .catch((err, caught) => {
        retrynum++;
        if (retrynum > 2) { return Rx.Observable.empty(); }
        return caught;
      })
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .of('a', 'b', 'x')
        .map(x => {
          if (x === 'x') {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .catch((err, caught) => {
          console.log(this.dateTool.getNowBymmsszz() + ' 源抛出错误:' + err.message);
          throw new Error('捕获错误:' + err.message);
        })
        .subscribe(v => console.log('输出:' + v),
        (err) => console.log(err.message),
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable
      .of('a', 'b', 'x')
      .map(x => {
        if (x === 'x') {
          throw new Error('出现错误.');
        }
        return x;
      })
      .catch((err, caught) => {
        throw new Error('捕获错误:' + err.message);
      })
      .subscribe(v => console.log('输出:' + v),
      (err) => console.log(err.message));
  }
  runDemo4() {
    this.isRuning = true;
    this.demo4subscribe =
      Rx.Observable
        .throw(new Error('X'))
        .catch((err, caught) => {
          console.log(this.dateTool.getNowBymmsszz() + ' 源抛出错误:' + err.message);
          return Rx.Observable.of('<无>');
        })
        .subscribe(v => console.log('输出:' + v),
        (err) => console.log('错误:' + err.message),
        () => this.isRuning = false);
  }
  runDemo4zip() {
    Rx.Observable
      .throw(new Error('X'))
      .catch((err, caught) => {
        return Rx.Observable.of('<无>');
      })
      .subscribe(v => console.log(v));
  }
  runDemo5() {
    const getPromise = function (): Promise<string> {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          reject(new Error('promise 执行错误'));
        }, 500);
      });
    };

    this.isRuning = true;
    this.demo5subscribe =
      Rx.Observable
        .from(getPromise())
        .catch((err, caught) => {
          console.log(this.dateTool.getNowBymmsszz() + ' 源抛出错误:' + err.message);
          return Rx.Observable.of('<无>');
        })
        .subscribe(v => console.log('输出:' + v),
        (err) => console.log('错误:' + err.message),
        () => this.isRuning = false);
  }

  runDemo5zip() {
    const getPromise = function (): Promise<string> {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          reject(new Error('promise 执行错误'));
        }, 500);
      });
    };

    Rx.Observable
      .from(getPromise())
      .catch((err, caught) => {
        return Rx.Observable.of('<无>');
      })
      .subscribe(v => console.log(v));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription, TeardownLogic } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
const observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
});

observable.subscribe({
  next: x => console.log('当前值: ' + x),
  error: err => console.error('错误: ' + err),
  complete: () => console.log('推送完成.'),
});
  /*
    输出:
      1
      2
      3
      4
  */
  `;
  demo2Info =
  `
// onSubscription (接受观察者函数)
const onSubscription = function (observer: Rx.Observer<number>): TeardownLogic {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 1000);
};

// Observable (可观察对象)
const observable: Rx.Observable<number> =
  Rx.Observable.create(onSubscription);

// Observer (观察者)
const myobserver: Rx.Observer<number> = {
  next: x => console.log('当前值: ' + x),
  error: err => console.error('错误: ' + err),
  complete: () => console.log('推送完成.'),
};

// Subscription (订阅)
const subscription = observable.subscribe(myobserver);

/*
输出:
  1
  2
  3
  4
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
    const observable = Rx.Observable.create(function (observer) {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    });

    observable.subscribe({
      next: x => console.log('当前值: ' + x),
      error: err => console.error('错误: ' + err),
      complete: () => console.log('推送完成.'),
    });

  }
  runDemo1zip() {
  }
  runDemo2() {

    // onSubscription (接受观察者函数)
    const onSubscription = function (observer: Rx.Observer<number>): TeardownLogic {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      setTimeout(() => {
        observer.next(4);
        observer.complete();
      }, 1000);
    };

    // Observable (可观察对象)
    const observable: Rx.Observable<number> =
      Rx.Observable.create(onSubscription);

    // Observer (观察者)
    const myobserver: Rx.Observer<number> = {
      next: x => console.log('当前值: ' + x),
      error: err => console.error('错误: ' + err),
      complete: () => console.log('推送完成.'),
    };

    // Subscription (订阅)
    const subscription = observable.subscribe(myobserver);
  }
}

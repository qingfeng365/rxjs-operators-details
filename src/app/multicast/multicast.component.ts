import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-multicast',
  templateUrl: './multicast.component.html',
  styleUrls: ['./multicast.component.css']
})
export class MulticastComponent implements OnInit, OnDestroy {

  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  const pub$ =
    Rx.Observable
      .interval(1000)
      .filter(x => x > 0)
      .take(5)
      .do(v => console.log('源:' + v))
      .publish();

  // pub$ 在 subscribe 时不会发出值, 要等待 connect() 被调用
  const sub1 =
    pub$.subscribe(v => console.log(' sub1得到:' + v));
  const sub2 =
    pub$.subscribe(v => console.log(' sub2得到:' + v));

  setTimeout(() => {
    console.log(' connect 开始...');
    pub$.connect();
  }, 2000);
  /*
    输出:
    connect 开始...
    源:1
      sub1得到:1
      sub2得到:1
    源:2
      sub1得到:2
      sub2得到:2
    源:3
      sub1得到:3
      sub2得到:3
    源:4
      sub1得到:4
      sub2得到:4
    源:5
      sub1得到:5
      sub2得到:5
  */
  `;
  demo2Info =
  `
  const pub$ =
    Rx.Observable
      .timer(0, 1000)
      .filter(x => x > 0)
      .take(5)
      .do(v => console.log('源:' + v))
      .multicast(() => new Rx.Subject());

  const sub1 =
    pub$.subscribe(v => console.log(' sub1得到:' + v));

  setTimeout(() => {
    console.log(' connect 开始...');
    pub$.connect();
  }, 0);

  setTimeout(() => {
    const sub2 =
      pub$.subscribe(v => console.log(' sub2得到:' + v));
  }, 3000);
  /*
    输出:
    connect 开始...
    源:1
     sub1得到:1
    源:2
     sub1得到:2
    源:3
     sub1得到:3
     sub2得到:3
    源:4
     sub1得到:4
     sub2得到:4
    源:5
     sub1得到:5
     sub2得到:5
  */
  `;
  demo3Info =
  `
  const pub$ =
    Rx.Observable
      .timer(0, 1000)
      .filter(x => x > 0)
      .take(5)
      .do(v => console.log('源:' + v))
      .multicast(() => new Rx.ReplaySubject(2));

  const sub1 =
    pub$.subscribe(v => console.log(' sub1得到:' + v));

  setTimeout(() => {
    console.log(' connect 开始...');
    pub$.connect();
  }, 0);

  setTimeout(() => {
    console.log(' sub2 开始订阅...');
    const sub2 =
      pub$.subscribe(v => console.log(' sub2得到:' + v));
  }, 3000);
  /*
    输出:
    connect 开始...
    源:1
     sub1得到:1
    源:2
     sub1得到:2
     sub2 开始订阅...
     sub2得到:1
     sub2得到:2
    源:3
     sub1得到:3
     sub2得到:3
    源:4
     sub1得到:4
     sub2得到:4
    源:5
     sub1得到:5
     sub2得到:5
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
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    const pub$ =
      Rx.Observable
        .interval(1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .multicast(() => new Rx.Subject());

    console.log(this.dateTool.getNowBymmsszz() + ' sub1开始订阅...');
    const sub1 =
      pub$
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' sub1得到:' + v),
        (err) => { },
        () => this.isRuning = false);
    console.log(this.dateTool.getNowBymmsszz() + ' sub2开始订阅...');
    const sub2 =
      pub$
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' sub2得到:' + v),
        (err) => { },
        () => this.isRuning = false);

    setTimeout(() => {
      console.log(this.dateTool.getNowBymmsszz() + ' connect 开始...');
      pub$.connect();
    }, 2000);
  }
  runDemo1zip() {
    const pub$ =
      Rx.Observable
        .interval(1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log('源:' + v))
        .multicast(() => new Rx.Subject());

    const sub1 =
      pub$.subscribe(v => console.log(' sub1得到:' + v));
    const sub2 =
      pub$.subscribe(v => console.log(' sub2得到:' + v));

    setTimeout(() => {
      console.log(' connect 开始...');
      pub$.connect();
    }, 2000);
  }
  runDemo2() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    const pub$ =
      Rx.Observable
        .timer(0, 1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .multicast(() => new Rx.Subject());

    console.log(this.dateTool.getNowBymmsszz() + ' sub1开始订阅...');
    const sub1 =
      pub$
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' sub1得到:' + v),
        (err) => { },
        () => this.isRuning = false);

    setTimeout(() => {
      console.log(this.dateTool.getNowBymmsszz() + ' connect 开始...');
      pub$.connect();
    }, 0);

    setTimeout(() => {
      console.log(this.dateTool.getNowBymmsszz() + ' sub2 在3秒后开始订阅...');
      const sub2 =
        pub$
          .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
            ' sub2得到:' + v),
          (err) => { },
          () => this.isRuning = false);
    }, 3000);
  }

  runDemo2zip() {
    const pub$ =
      Rx.Observable
        .timer(0, 1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log('源:' + v))
        .multicast(() => new Rx.Subject());
    const sub1 =
      pub$.subscribe(v => console.log(' sub1得到:' + v));
    setTimeout(() => {
      console.log(' connect 开始...');
      pub$.connect();
    }, 0);
    setTimeout(() => {
      const sub2 =
        pub$.subscribe(v => console.log(' sub2得到:' + v));
    }, 3000);

  }
  runDemo3() {
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    const pub$ =
      Rx.Observable
        .timer(0, 1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .multicast(() => new Rx.ReplaySubject(2));

    console.log(this.dateTool.getNowBymmsszz() + ' sub1开始订阅...');
    const sub1 =
      pub$
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' sub1得到:' + v),
        (err) => { },
        () => this.isRuning = false);

    setTimeout(() => {
      console.log(this.dateTool.getNowBymmsszz() + ' connect 开始...');
      pub$.connect();
    }, 0);

    setTimeout(() => {
      console.log(this.dateTool.getNowBymmsszz() + ' sub2 在3秒后开始订阅...');
      const sub2 =
        pub$
          .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
            ' sub2得到:' + v),
          (err) => { },
          () => this.isRuning = false);
    }, 3000);
  }

  runDemo3zip() {
    const pub$ =
      Rx.Observable
        .timer(0, 1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log('源:' + v))
        .multicast(() => new Rx.ReplaySubject(2));
    const sub1 =
      pub$.subscribe(v => console.log(' sub1得到:' + v));
    setTimeout(() => {
      console.log(' connect 开始...');
      pub$.connect();
    }, 0);
    setTimeout(() => {
      console.log(' sub2 开始订阅...');
      const sub2 =
        pub$.subscribe(v => console.log(' sub2得到:' + v));
    }, 3000);

  }
}


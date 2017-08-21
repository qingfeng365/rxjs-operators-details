import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-start-with',
  templateUrl: './start-with.component.html',
  styleUrls: ['./start-with.component.css']
})
export class StartWithComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable.of('a', 'b', 'c')
  .startWith('s')
  .subscribe(v => console.log(v));
/*
  输出:
    s
    a
    b
    c
*/
  `;
  demo2Info =
  `
Rx.Observable.of('北京!', '再见', '北京!')
  .startWith('你好')
  .scan((acc, curr) => \`\$\{acc} \$\{curr}\`)
  .subscribe(v => console.log(v));
/*
  输出:
    你好
    你好 北京!
    你好 北京! 再见
    你好 北京! 再见 北京!
*/
  `;
  demo3Info =
  `
Rx.Observable
  .interval(1000).take(5)
  .startWith(-3, -2, -1)
  .subscribe(v => console.log(v));
/*
  输出:
    -3
    -2
    -1
    0
    1
    2
    3
    4
*/
  `;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.of('a', 'b', 'c')
        .startWith('s')
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of('a', 'b', 'c')
      .startWith('s')
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.of('北京!', '再见', '北京!')
        .startWith('你好')
        .scan((acc, curr) => {
          console.log(`acc: ${acc} , curr: ${curr}`);
          return `${acc} ${curr}`;
        })
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable.of('北京!', '再见', '北京!')
      .startWith('你好')
      .scan((acc, curr) => `${acc} ${curr}`)
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .interval(1000).take(5)
        .startWith(-3, -2, -1)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable
      .interval(1000).take(5)
      .startWith(-3, -2, -1)
      .subscribe(v => console.log(v));
  }
}

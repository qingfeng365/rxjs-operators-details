import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-ignore-elements',
  templateUrl: './ignore-elements.component.html',
  styleUrls: ['./ignore-elements.component.css']
})
export class IgnoreElementsComponent implements OnInit, OnDestroy {
  isRuning = false;


  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo1Info =
  `
Rx.Observable
.of('a', 'b', 'c', 'd')
.ignoreElements()
.subscribe(v => console.log(v),
(err) => { },
() => {
  console.log('已完成');
});
/*
  输出:
     已完成
*/
  `;
  demo2Info =
`
Rx.Observable
.interval(500)
.map(v => {
  if (v > 3) {
    return Rx.Observable.throw('错误发生在:' + v);
  } else {
    return Rx.Observable.of(v);
  }
})
.mergeAll()
.ignoreElements()
.subscribe(v => console.log('最终输出:' + v),
(err) => { console.log('最终输出错误:' + err); },
() => {
  console.log('已完成');
});
/*
  输出:
    最终输出错误:错误发生在:4
*/
`;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {

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
  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .of('a', 'b', 'c', 'd')
        .ignoreElements()
        .subscribe(v => console.log(v),
        (err) => { },
        () => {
          console.log('已完成');
          this.isRuning = false;
        });
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b', 'c', 'd')
      .ignoreElements()
      .subscribe(v => console.log(v),
      (err) => { },
      () => {
        console.log('已完成');
      });
  }
  runDemo2() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .interval(500)
        .map(v => {
          if (v > 3) {
            return Rx.Observable.throw('错误发生在:' + v);
          } else {
            return Rx.Observable.of(v);
          }
        })
        .mergeAll()
        .do(v => console.log('源发出:' + v))
        .ignoreElements()
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { console.log('最终输出错误:' + err); },
        () => {
          console.log('已完成');
          this.isRuning = false;
        });
  }
  runDemo2zip() {
    Rx.Observable
      .interval(500)
      .map(v => {
        if (v > 3) {
          return Rx.Observable.throw('错误发生在:' + v);
        } else {
          return Rx.Observable.of(v);
        }
      })
      .mergeAll()
      .ignoreElements()
      .subscribe(v => console.log('最终输出:' + v),
      (err) => { console.log('最终输出错误:' + err); },
      () => {
        console.log('已完成');
      });
  }
}

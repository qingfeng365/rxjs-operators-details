import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css']
})
export class RetryComponent implements OnInit, OnDestroy {

  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
  .of(1, 2, 3, -1)
  .map(x => {
    if (x === -1) {
      throw new Error('出现错误.');
    }
    return x;
  })
  .retry(2)
  .subscribe(v => console.log(v),
  (err) => console.log('错误:' + err.message));
  /*
    输出:
      1
      2
      3
      1
      2
      3
      1
      2
      3
      错误:出现错误.

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
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .of(1, 2, 3, -1)
        .map(x => {
          if (x === -1) {
            throw new Error('出现错误.');
          }
          return x;
        })
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .retry(2)
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { console.log('错误:' + err.message); },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .of(1, 2, 3, -1)
      .map(x => {
        if (x === -1) {
          throw new Error('出现错误.');
        }
        return x;
      })
      .retry(2)
      .subscribe(v => console.log(v),
      (err) => console.log('错误:' + err.message));
  }

}


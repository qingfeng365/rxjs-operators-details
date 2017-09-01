import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-from-promise',
  templateUrl: './from-promise.component.html',
  styleUrls: ['./from-promise.component.css']
})
export class FromPromiseComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  const getPromise = function (v): Promise<string> {
    return new Promise(resolve => {
      setTimeout(function () {
        resolve('promise resolve:' + (v * 10));
      }, 500);
    });
  };
  Rx.Observable
    .fromPromise(getPromise(1))
    .subscribe(v => console.log(v));
  /*
    输出:
    promise resolve: 10
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
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable
        .fromPromise(getPromise(1))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };
    Rx.Observable
      .fromPromise(getPromise(1))
      .subscribe(v => console.log(v));
  }

}

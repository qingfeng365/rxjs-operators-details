import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .from([10, 20, 30])
    .subscribe(v => console.log(v));
  /*
    输出:
      10
      20
      30
  */
  `;
  demo2Info =
  `
  const getPromise = function (v): Promise<string> {
    return new Promise(resolve => {
      setTimeout(function () {
        resolve('promise resolve:' + (v * 10));
      }, 500);
    });
  };
  Rx.Observable
    .from(getPromise(1))
    .subscribe(v => console.log(v));
  /*
    输出:
    promise resolve: 10
  */
  `;
  demo3Info =
  `
  Rx.Observable
    .from('Hello')
    .subscribe(v => console.log(v));
  /*
    输出:
      H
      e
      l
      l
      o

  */
  `;


  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

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
      Rx.Observable
        .from([10, 20, 30])
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .from([10, 20, 30])
      .subscribe(v => console.log(v));
  }


  runDemo2() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .from(getPromise(1))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };
    Rx.Observable
      .from(getPromise(1))
      .subscribe(v => console.log(v));
  }

  runDemo3() {
    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable
        .from('Hello')
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    Rx.Observable
      .from('Hello')
      .subscribe(v => console.log(v));
  }

}

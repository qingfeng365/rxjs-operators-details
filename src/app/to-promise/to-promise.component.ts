import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-to-promise',
  templateUrl: './to-promise.component.html',
  styleUrls: ['./to-promise.component.css']
})
export class ToPromiseComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .of(1, 2, 3)
    .toPromise()
    .then(e => console.log(e));
  /*
    输出:
    3
  */
  `;
  demo2Info =
  `
  Rx.Observable
    .throw(new Error('failed'))
    .toPromise()
    .then(e => console.log('Promise resolve:' + e))
    .catch(err => console.log('Promise reject:' + err.message));
  /*
    输出:
    Promise reject:failed
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
    Rx.Observable
      .of(1, 2, 3)
      .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
      .toPromise()
      .then(e => console.log('Promise resolve:' + e));
  }
  runDemo1zip() {
    Rx.Observable
      .of(1, 2, 3)
      .toPromise()
      .then(e => console.log(e));
  }
  runDemo2() {
    Rx.Observable
      .throw(new Error('failed'))
      .toPromise()
      .then(e => console.log('Promise resolve:' + e))
      .catch(err => console.log('Promise reject:' + err.message));
  }
  runDemo2zip() {
    Rx.Observable
      .throw(new Error('failed'))
      .toPromise()
      .then(e => console.log('Promise resolve:' + e))
      .catch(err => console.log('Promise reject:' + err.message));
  }
}


import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-throw',
  templateUrl: './throw.component.html',
  styleUrls: ['./throw.component.css']
})
export class ThrowComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .throw(new Error('错误信息...'))
    .subscribe(v => console.log(v),
    err => console.log('出现错误:' + err.message));
  /*
    输出:
      出现错误:错误信息...
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
        .throw(new Error('错误信息...'))
        .subscribe(v => console.log(v),
        err => console.log('出现错误:' + err.message),
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .throw(new Error('错误信息...'))
      .subscribe(v => console.log(v),
      err => console.log('出现错误:' + err.message));
  }

}


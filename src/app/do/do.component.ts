import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-do',
  templateUrl: './do.component.html',
  styleUrls: ['./do.component.css']
})
export class DoComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable.of(1, 2, 3)
    .do(v => console.log('源发出值:' + v))
    .subscribe(v => console.log(v));
  /*
    输出:
    源发出值:1
    1
    源发出值:2
    2
    源发出值:3
    3
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
      Rx.Observable.of(1, 2, 3)
        .do(v => console.log('源发出值:' + v))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of(1, 2, 3)
    .do(v => console.log('源发出值:' + v))
    .subscribe(v => console.log(v));
  }

}


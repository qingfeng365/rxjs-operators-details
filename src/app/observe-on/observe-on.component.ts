import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-observe-on',
  templateUrl: './observe-on.component.html',
  styleUrls: ['./observe-on.component.css']
})
export class ObserveOnComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  /*
    输出:
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
      Rx.Observable.interval(1000)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
  }

}


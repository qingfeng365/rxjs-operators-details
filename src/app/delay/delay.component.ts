import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.css']
})
export class DelayComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .of('a', 'b')
    .zip(
      Rx.Observable.interval(1000),
      x => x
    )
    .delay(20)
    .subscribe(v => console.log(v));
  /*
    输出:
     a
     b
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
        .of('a', 'b')
        .zip(
        Rx.Observable.interval(1000),
        x => x
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .delay(20)
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:' + v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b')
      .zip(
        Rx.Observable.interval(1000),
        x => x
      )
      .delay(20)
      .subscribe(v => console.log(v));
  }

}

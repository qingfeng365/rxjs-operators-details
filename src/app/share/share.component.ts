import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent  implements OnInit, OnDestroy {

  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  const pub$ =
    Rx.Observable
      .interval(1000)
      .filter(x => x > 0)
      .take(5)
      .do(v => console.log('源:' + v))
      .share();

  const sub1 =
    pub$.subscribe(v => console.log(' sub1得到:' + v));
  const sub2 =
    pub$.subscribe(v => console.log(' sub2得到:' + v));
  /*
    输出:
    源:1
    sub1得到:1
    sub2得到:1
    源:2
    sub1得到:2
    sub2得到:2
    源:3
    sub1得到:3
    sub2得到:3
    源:4
    sub1得到:4
    sub2得到:4
    源:5
    sub1得到:5
    sub2得到:5
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
    console.log(this.dateTool.getNowBymmsszz());
    this.isRuning = true;
    const pub$ =
      Rx.Observable
        .interval(1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .share();

    console.log(this.dateTool.getNowBymmsszz() + ' sub1开始订阅...');
    const sub1 =
      pub$
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' sub1得到:' + v),
        (err) => { },
        () => this.isRuning = false);
    console.log(this.dateTool.getNowBymmsszz() + ' sub2开始订阅...');
    const sub2 =
      pub$
        .subscribe(v => console.log(this.dateTool.getNowBymmsszz() +
          ' sub2得到:' + v),
        (err) => { },
        () => this.isRuning = false);

  }
  runDemo1zip() {
    const pub$ =
      Rx.Observable
        .interval(1000)
        .filter(x => x > 0)
        .take(5)
        .do(v => console.log('源:' + v))
        .share();

    const sub1 =
      pub$.subscribe(v => console.log(' sub1得到:' + v));
    const sub2 =
      pub$.subscribe(v => console.log(' sub2得到:' + v));

  }
}

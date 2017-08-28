import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.css']
})
export class BufferComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
// 源 Observable 的最后一个值 'x',
// 只是为了让源 Observable 延迟一拍才完成,
// 是不会输出的
// closingNotifier Observable 的时间设为 3050,
// 是为了保证在第三个值发出后,才触发通知,
// 如果设为 3000, 有概率在之前就触发通知
Rx.Observable
.zip(
  Rx.Observable
    .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'x'),
  Rx.Observable.interval(1000),
  v => v[0]
)
.buffer(
Rx.Observable
  .interval(3050).mapTo('B')
)
.subscribe(v => console.log(v));
/*
  输出:
    [a,b,c]
    [d,e,f]
    [g,h,i]
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
        .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'x'),
        Rx.Observable.interval(1000),
        v => v[0]
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .buffer(
        Rx.Observable
          .interval(3050).mapTo('B')
          .do(v => console.log(this.dateTool.getNowBymmsszz() +
            ' closingNotifier 发出值:' + v))
        )
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      Rx.Observable
        .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'x'),
      Rx.Observable.interval(1000),
      v => v[0]
      )
      .buffer(
      Rx.Observable
        .interval(3050).mapTo('B')
      )
      .subscribe(v => console.log(v));
  }
}

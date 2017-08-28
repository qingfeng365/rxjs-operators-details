import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-buffer-when',
  templateUrl: './buffer-when.component.html',
  styleUrls: ['./buffer-when.component.css']
})
export class BufferWhenComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
`
// 源 Observable 最后两个0, 不会输出, 只是为了模拟弹珠图
// 延长完成时间
Rx.Observable
.zip(
Rx.Observable
  .of('b', 'c', 'd', 'e', 'f', 'g', '0', '0'),
Rx.Observable.interval(1000),
v => v[0]
)
.filter(v => v !== '0')
.bufferWhen(() => Rx.Observable.timer(3500))
.subscribe(v => console.log(v));
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
    console.log(this.dateTool.getNowBymmsszz());
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable
          .of('b', 'c', 'd', 'e', 'f', 'g', '0', '0'),
        Rx.Observable.interval(1000),
        v => v[0]
        )
        .filter(v => v !== '0')
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源发出值:' + v))
        .bufferWhen(() => Rx.Observable.timer(3500))
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      Rx.Observable
        .of('b', 'c', 'd', 'e', 'f', 'g', '0', '0'),
      Rx.Observable.interval(1000),
      v => v[0]
      )
      .filter(v => v !== '0')
      .bufferWhen(() => Rx.Observable.timer(3500))
      .subscribe(v => console.log(v));
  }
}

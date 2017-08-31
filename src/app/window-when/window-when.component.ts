import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-window-when',
  templateUrl: './window-when.component.html',
  styleUrls: ['./window-when.component.css']
})
export class WindowWhenComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
`
Rx.Observable
  .zip(
    Rx.Observable
      .of('b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'),
    Rx.Observable.interval(1000),
    v => v[0]
  )
  .windowWhen(() => Rx.Observable.timer(3800))
  .scan((acc: [number, any], curr) => [acc[0] + 1, curr], [0, null])
  .subscribe(e => {
    (e[1] as Observable<any>).subscribe(v =>
      console.log('窗口' + e[0] + '输出:' + v));
  });
/*
  输出:
  窗口1输出:b
  窗口1输出:c
  窗口1输出:d
  窗口2输出:e
  窗口2输出:f
  窗口2输出:g
  窗口2输出:h
  窗口3输出:i
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
          .of('b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'),
        Rx.Observable.interval(1000),
        v => v[0]
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .windowWhen(() =>
          Rx.Observable
            .timer(3800)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' closing Observable 触发通知')))
        .do(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' window 发出窗口:');
          console.log(v);
        })
        .scan((acc: [number, any], curr) => [acc[0] + 1, curr], [0, null])
        .subscribe(e => {
          console.log(this.dateTool.getNowBymmsszz() + ' 获得窗口' + e[0]);
          (e[1] as Observable<any>).subscribe(v =>
            console.log(this.dateTool.getNowBymmsszz() + ' 窗口' + e[0] + '输出:' + v));
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .zip(
      Rx.Observable
        .of('b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'),
      Rx.Observable.interval(1000),
      v => v[0]
      )
      .windowWhen(() => Rx.Observable.timer(3800))
      .scan((acc: [number, any], curr) => [acc[0] + 1, curr], [0, null])
      .subscribe(e => {
        (e[1] as Observable<any>).subscribe(v =>
          console.log('窗口' + e[0] + '输出:' + v));
      });
  }
}

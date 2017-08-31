import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-window-toggle',
  templateUrl: './window-toggle.component.html',
  styleUrls: ['./window-toggle.component.css']
})
export class WindowToggleComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
`
Rx.Observable
  .zip(
    Rx.Observable
      .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'),
    Rx.Observable.interval(1000),
    v => v[0]
  )
  .windowToggle(
    Rx.Observable.timer(1500, 3000).mapTo('w'),
    i => Rx.Observable.interval(2000))
  .scan((acc: [number, any], curr) => [acc[0] + 1, curr], [0, null])
  .subscribe(e => {
    (e[1] as Observable<any>).subscribe(v =>
      console.log('窗口' + e[0] + '输出:' + v));
  });
/*
  输出:
    窗口1输出:b
    窗口1输出:c
    窗口2输出:e
    窗口2输出:f
    窗口3输出:h
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
    this.demo1subscribe =
      Rx.Observable
        .zip(
        Rx.Observable
          .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'),
        Rx.Observable.interval(1000),
        v => v[0]
        )
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .windowToggle(
        Rx.Observable.timer(1500, 3000).mapTo('w'),
        i => {
          console.log(this.dateTool.getNowBymmsszz() +
            ' opening Observable: ' + i);
          return Rx.Observable.interval(2000)
            .do(v => console.log(this.dateTool.getNowBymmsszz() + ' closing Observable 触发通知'));
        }
        )
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
        .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'),
      Rx.Observable.interval(1000),
      v => v[0]
      )
      .windowToggle(
      Rx.Observable.timer(1500, 3000).mapTo('w'),
      i => Rx.Observable.interval(2000))
      .scan((acc: [number, any], curr) => [acc[0] + 1, curr], [0, null])
      .subscribe(e => {
        (e[1] as Observable<any>).subscribe(v =>
          console.log('窗口' + e[0] + '输出:' + v));
      });
  }
}

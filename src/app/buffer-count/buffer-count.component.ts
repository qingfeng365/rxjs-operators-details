import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-buffer-count',
  templateUrl: './buffer-count.component.html',
  styleUrls: ['./buffer-count.component.css']
})
export class BufferCountComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable
.of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
.bufferCount(3, 2)
.subscribe(v => console.log(v));
/*
  输出:
    [a,b,c]
    [c,d,e]
    [e,f,g]
    [g,h,i]
    [i]
*/
`;
  demo2Info =
`
Rx.Observable
.interval(500)
.take(10)
.bufferCount(3)
.subscribe(v => console.log(v));
/*
输出:
  [0,1,2]
  [3,4,5]
  [6,7,8]
  [9]
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
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
        .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
        .do(v => console.log('源:' + v))
        .bufferCount(3, 2)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i')
      .bufferCount(3, 2)
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable
        .interval(500)
        .do(v => console.log('源:' + v))
        .take(10)
        .bufferCount(3)
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .interval(500)
      .take(10)
      .bufferCount(3)
      .subscribe(v => console.log(v));
  }
}

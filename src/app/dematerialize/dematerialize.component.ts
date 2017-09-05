import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Notification } from 'rxjs/Notification';
@Component({
  selector: 'app-dematerialize',
  templateUrl: './dematerialize.component.html',
  styleUrls: ['./dematerialize.component.css']
})
export class DematerializeComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable
    .of(
      new Rx.Notification('N', 'x'),
      new Rx.Notification('N', 'y'),
      new Rx.Notification('N', 'z'),
      new Rx.Notification('C')
    )
    .dematerialize()
    .subscribe(v => console.log(v),
    (err) => { },
    () => console.log('已完成.'));
  /*
    输出:
      x
      y
      z
      已完成.
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
        .of<any>(
        new Rx.Notification('N', 'x'),
        new Rx.Notification('N', 'y'),
        new Rx.Notification('N', 'z'),
        new Rx.Notification('C'),
        )
        .do(v => {
          console.log('源:');
          console.log(v);
        })
        .dematerialize()
        .subscribe(v => console.log('最终输出:' + v),
        (err) => { },
        () => {
          console.log('已完成.');
          this.isRuning = false;
        });
  }
  runDemo1zip() {
    Rx.Observable
      .of(
      new Rx.Notification('N', 'x'),
      new Rx.Notification('N', 'y'),
      new Rx.Notification('N', 'z'),
      new Rx.Notification('C')
      )
      .dematerialize()
      .subscribe(v => console.log(v),
      (err) => { },
      () => console.log('已完成.'));
  }

}


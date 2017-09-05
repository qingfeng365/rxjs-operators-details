import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Notification } from 'rxjs/Notification';

@Component({
  selector: 'app-materialize',
  templateUrl: './materialize.component.html',
  styleUrls: ['./materialize.component.css']
})
export class MaterializeComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;

  demo1Info =
  `
  Rx.Observable.of('x', 'y', 'z')
    .materialize()
    .subscribe((v: Notification<any>) => {
      console.log(v);
    });
  /*
    输出:
    Notification {kind: "N", value: "x", error: undefined, hasValue: true}
    Notification {kind: "N", value: "y", error: undefined, hasValue: true}
    Notification {kind: "N", value: "z", error: undefined, hasValue: true}
    Notification {kind: "C", value: undefined, error: undefined, hasValue: false}
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
      Rx.Observable.of('x', 'y', 'z')
        .do(
        v => console.log('源:' + v),
        (err) => { },
        () => console.log('源完成.'))
        .materialize()
        .subscribe((v: Notification<any>) => {
          console.log('输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of('x', 'y', 'z')
      .materialize()
      .subscribe((v: Notification<any>) => {
        console.log(v);
      });
  }

}


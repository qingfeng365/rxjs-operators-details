import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-pluck',
  templateUrl: './pluck.component.html',
  styleUrls: ['./pluck.component.css']
})
export class PluckComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable.of({ v: 1 }, { v: 2 }, { v: 3 })
  .pluck('v')
  .subscribe(v => console.log(v));
/*
  输出:
    1
    2
    3
*/
`;
  demo2Info =
`
Rx.Observable
  .from([
    {
      name: 'Joe',
      age: 30,
      job: {
        title: 'Developer',
        language: 'JavaScript'
      }
    },
    {
      name: 'Sarah',
      age: 35
    }
  ])
  .pluck('job', 'title')
  .subscribe(v => console.log(v));
/*
  输出:
   Developer
   undefined   // 当找不到 job 属性的时候会返回 undefined
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
      Rx.Observable.of({ v: 1 }, { v: 2 }, { v: 3 })
        .pluck('v')
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.of({ v: 1 }, { v: 2 }, { v: 3 })
      .pluck('v')
      .subscribe(v => console.log(v));
  }
  runDemo2() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.from([
        {
          name: 'Joe',
          age: 30,
          job: {
            title: 'Developer',
            language: 'JavaScript'
          }
        },
        {
          name: 'Sarah',
          age: 35
        }
      ])
        .pluck('job', 'title')
        .subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable
      .from([
        {
          name: 'Joe',
          age: 30,
          job: {
            title: 'Developer',
            language: 'JavaScript'
          }
        },
        {
          name: 'Sarah',
          age: 35
        }
      ])
      .pluck('job', 'title')
      .subscribe(v => console.log(v));
  }
}

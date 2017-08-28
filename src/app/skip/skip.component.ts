import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
@Component({
  selector: 'app-skip',
  templateUrl: './skip.component.html',
  styleUrls: ['./skip.component.css']
})
export class SkipComponent implements OnInit, OnDestroy {
  isRuning = false;
  demo1subscribe: Subscription = null;
  demo1Info =
`
Rx.Observable
.of('a', 'b', 'c', 'd', 'e')
.skip(3)
.subscribe(v => console.log(v));
/*
  输出:
     d
     e
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {

  }
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
        .of('a', 'b', 'c', 'd', 'e')
        .skip(3)
        .subscribe(v => console.log(v),
        (err) => { console.log(err); },
        () => { this.isRuning = false; });
  }
  runDemo1zip() {
    Rx.Observable
      .of('a', 'b', 'c', 'd', 'e')
      .skip(3)
      .subscribe(v => console.log(v));
  }
}

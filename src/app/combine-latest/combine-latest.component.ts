import { Component, OnInit, OnDestroy } from '@angular/core';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-combine-latest',
  templateUrl: './combine-latest.component.html',
  styleUrls: ['./combine-latest.component.css']
})
export class CombineLatestComponent implements OnInit, OnDestroy {

  isRuning = false;
  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;


  weightInputCrtl: FormControl = new FormControl();
  heightInputCrtl: FormControl = new FormControl();

  bmi: number;
  bmiLevel: string;

  demo0Info =
`const order1 = [1, 0, 1, 0, 0, 0, 0, 1, 1, 1];
const order2 = [0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
Rx.Observable.combineLatest(
  Rx.Observable
    .zip(
      Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
      Rx.Observable.interval(1000)
        .filter(index => order1[index] === 1)
        .take(5))
    .map(val => val[0]),
  Rx.Observable
    .zip(
      Rx.Observable.from([1, 2, 3, 4]),
      Rx.Observable.interval(1000)
        .filter(index => order2[index] === 1)
        .take(4))
    .map(val => val[0])
)
.subscribe(latestValues => console.log(latestValues));
/*
  输出:
  [a,1]
  [b,1]
  [b,2]
  [b,3]
  [b,4]
  [c,4]
  [d,4]
  [e,4]
*/
  `;


  demo3Info =
  `
// 第一种写法:
this.weightInputCrtl.valueChanges
  .combineLatest(this.heightInputCrtl.valueChanges,
  (w, h) => (w / 2) / ((h / 100) * (h / 100))
  )
  .subscribe(v => this.bmi = v);

// 第二种写法
Rx.Observable.combineLatest(
  this.weightInputCrtl.valueChanges,
  this.heightInputCrtl.valueChanges,
  (w, h) => (w / 2) / ((h / 100) * (h / 100))
).subscribe(v => this.bmi = v);

// 正式写法
Rx.Observable.combineLatest(
  this.weightInputCrtl.valueChanges
    .debounceTime(500),
  this.heightInputCrtl.valueChanges
    .debounceTime(500),
  (w, h) => (w / 2) / ((h / 100) * (h / 100))
)
  .map(bmi => {
    let bmiLevel = '';
    if (bmi < 18.5) {
      bmiLevel = '体重过轻';
    } else if (bmi >= 18.5 && bmi < 24) {
      bmiLevel = '正常';
    } else if (bmi >= 24 && bmi < 27) {
      bmiLevel = '过重';
    } else if (bmi >= 27 && bmi < 30) {
      bmiLevel = '轻度肥胖';
    } else if (bmi >= 30 && bmi < 35) {
      bmiLevel = '中度肥胖';
    } else if (bmi >= 35) {
      bmiLevel = '重度肥胖';
    }
    return { bmi, bmiLevel };
  })
  .subscribe(v => {
    this.bmi = v.bmi;
    this.bmiLevel = v.bmiLevel;
  });
`;

  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() {
    this.runDemo3();
    this.weightInputCrtl.setValue(130);
    this.heightInputCrtl.setValue(165);
  }
  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
  }
  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }

  runDemo0() {
    const order1 = [1, 0, 1, 0, 0, 0, 0, 1, 1, 1];
    const order2 = [0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
    Rx.Observable.combineLatest(
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(1000)
          .filter(index => order1[index] === 1)
          .take(5))
        .map(val => val[0])
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 字母$ 发射值:' + v)),
      Rx.Observable
        .zip(
        Rx.Observable.from([1, 2, 3, 4]),
        Rx.Observable.interval(1000)
          .filter(index => order2[index] === 1)
          .take(4))
        .map(val => val[0])
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 数字$ 发射值:' + v)),
    )
      .subscribe(latestValues => console.log(latestValues),
      (err) => { },
      () => { this.isRuning = false; });
  }

  runDemo0zip() {
    const order1 = [1, 0, 1, 0, 0, 0, 0, 1, 1, 1];
    const order2 = [0, 1, 0, 1, 1, 1, 0, 0, 0, 0];
    Rx.Observable.combineLatest(
      Rx.Observable
        .zip(
        Rx.Observable.from(['a', 'b', 'c', 'd', 'e']),
        Rx.Observable.interval(1000)
          .filter(index => order1[index] === 1)
          .take(5))
        .map(val => val[0]),
      Rx.Observable
        .zip(
        Rx.Observable.from([1, 2, 3, 4]),
        Rx.Observable.interval(1000)
          .filter(index => order2[index] === 1)
          .take(4))
        .map(val => val[0])
    )
    .subscribe(latestValues => console.log(latestValues));
  }


  runDemo3() {
    // 第一种写法
    // this.weightInputCrtl.valueChanges
    //   .combineLatest(this.heightInputCrtl.valueChanges,
    //   (w, h) => (w / 2) / ((h / 100) * (h / 100))
    //   )
    //   .subscribe(v => this.bmi = v);

    // 第二种写法
    // Rx.Observable.combineLatest(
    //   this.weightInputCrtl.valueChanges,
    //   this.heightInputCrtl.valueChanges,
    //   (w, h) => (w / 2) / ((h / 100) * (h / 100))
    // ).subscribe(v => this.bmi = v);

    Rx.Observable.combineLatest(
      this.weightInputCrtl.valueChanges
        .debounceTime(500),
      this.heightInputCrtl.valueChanges
        .debounceTime(500),
      (w, h) => (w / 2) / ((h / 100) * (h / 100))
    )
      .map(bmi => {
        let bmiLevel = '';
        if (bmi < 18.5) {
          bmiLevel = '体重过轻';
        } else if (bmi >= 18.5 && bmi < 24) {
          bmiLevel = '正常';
        } else if (bmi >= 24 && bmi < 27) {
          bmiLevel = '过重';
        } else if (bmi >= 27 && bmi < 30) {
          bmiLevel = '轻度肥胖';
        } else if (bmi >= 30 && bmi < 35) {
          bmiLevel = '中度肥胖';
        } else if (bmi >= 35) {
          bmiLevel = '重度肥胖';
        }
        return { bmi, bmiLevel };
      })
      .subscribe(v => {
        this.bmi = v.bmi;
        this.bmiLevel = v.bmiLevel;
      });
  }

  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe = Rx.Observable
      .combineLatest(
      Rx.Observable.timer(1000, 4000).take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' T1发出值:' + v)),
      Rx.Observable.timer(2000, 4000).take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' T2发出值:' + v)),
      Rx.Observable.timer(3000, 4000).take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' T2发出值:' + v))
      )
      .subscribe(latestValues => console.log(latestValues),
      (err) => { },
      () => { this.isRuning = false; });

  }
  runDemo1zip() {
    Rx.Observable
      .combineLatest(
      Rx.Observable.timer(1000, 4000).take(5),
      Rx.Observable.timer(2000, 4000).take(5),
      Rx.Observable.timer(3000, 4000).take(5),
    )
      .subscribe(latestValues => console.log(latestValues));

  }
  runDemo1bak() {
    this.isRuning = true;
    // timerOne 在1秒时发出第一个值，然后每4秒发送一次
    const timerOne = Rx.Observable.timer(1000, 4000).take(5);
    // timerTwo 在2秒时发出第一个值，然后每4秒发送一次
    const timerTwo = Rx.Observable.timer(2000, 4000).take(5);
    // timerThree 在3秒时发出第一个值，然后每4秒发送一次
    const timerThree = Rx.Observable.timer(3000, 4000).take(5);

    // 当一个 timer 发出值时，将每个 timer 的最新值作为一个数组发出
    const combined = Rx.Observable
      .combineLatest(
      timerOne,
      timerTwo,
      timerThree
      );

    this.demo1subscribe = combined.subscribe(latestValues => {
      // 从 timerValOne、timerValTwo 和 timerValThree 中获取最新发出的值
      const [timerValOne, timerValTwo, timerValThree] = latestValues;
      /*
          示例:
        timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
        timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
        timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
      */
      console.log(
        `Timer One Latest: ${timerValOne},
     Timer Two Latest: ${timerValTwo},
     Timer Three Latest: ${timerValThree}`
      );
    },
      (err) => { },
      () => { this.isRuning = false; });

  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe = Rx.Observable
      .combineLatest(
      Rx.Observable.timer(1000, 4000).take(3),
      Rx.Observable.timer(2000, 4000).take(3),
      Rx.Observable.timer(3000, 4000).take(3),
      (one, two, three) =>
        `T1: ${one} - T2: ${two} - T3: ${three}`
      )
      .subscribe(latestValues => console.log(latestValues),
      (err) => { },
      () => { this.isRuning = false; });

  }
  runDemo2zip() {
    Rx.Observable
      .combineLatest(
      Rx.Observable.timer(1000, 4000).take(3),
      Rx.Observable.timer(2000, 4000).take(3),
      Rx.Observable.timer(3000, 4000).take(3),
      (one, two, three) =>
        `T1: ${one} - T2: ${two} - T3: ${three}`
      )
      .subscribe(latestValues => console.log(latestValues));

  }
  runDemo2bak() {
    // timerOne 在1秒时发出第一个值，然后每4秒发送一次
    const timerOne = Rx.Observable.timer(1000, 4000).take(3);
    // timerTwo 在2秒时发出第一个值，然后每4秒发送一次
    const timerTwo = Rx.Observable.timer(2000, 4000).take(3);
    // timerThree 在3秒时发出第一个值，然后每4秒发送一次
    const timerThree = Rx.Observable.timer(3000, 4000).take(3);

    // combineLatest 还接收一个可选的 projection 函数
    const combinedProject = Rx.Observable
      .combineLatest(
      timerOne,
      timerTwo,
      timerThree,
      (one, two, three) => {
        return `T1: ${one} - T2: ${two} - T3: ${three}`;
      }
      );
    // 输出值
    const subscribe = combinedProject.subscribe(latestValuesProject => console.log(latestValuesProject));

  }
}

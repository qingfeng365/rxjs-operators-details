import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-fork-join',
  templateUrl: './fork-join.component.html',
  styleUrls: ['./fork-join.component.css']
})
export class ForkJoinComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo2_1subscribe: Subscription = null;

  demo1Info =
  `
const getPromise = () => {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('promise resolve data');
    }, 500);
  });
};

Rx.Observable.forkJoin(
  Rx.Observable
    .range(10, 5).delay(1000),
  Rx.Observable
    .interval(1000).take(5),
  Rx.Observable
    .of(1000),
  getPromise()
).subscribe(v => console.log(v));
/*
  输出:
    [14, 4, 1000, "promise resolve data"]
*/
`;
  demo2Info =
  `
const getPromise = function (v) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('promise resolve:' + (v * 10));
    }, 500);
  });
};

Rx.Observable
  .forkJoin(
    // forkJoin 可以直接用数组做参数, 不使用 ... 展开也可以
  ...[1, 2, 3, 4, 5].map(i => getPromise(i))
  )
  .subscribe(v => {
    console.log('最终输出:');
    console.log(v);
  }
  );
/*
   输出:
   [
     "promise resolve:10",
     "promise resolve:20",
     "promise resolve:30",
     "promise resolve:40",
     "promise resolve:50"]
*/
  `;
  demo2Desc = `
代码解析:
  [1, 2, 3, 4, 5].map(i => getPromise(i))
  这里的 map 是 数组的 map , 不是 Rx 操作符,
  目标是将数组 [1, 2, 3, 4, 5],
  转换成数组 [promise1, promise2, promise3, promise4, promise5]

forkJoin 更适用于处理已知固定数量的静态 Observable,
而本案例 promise 的数量来自一个数组,或者 promise 的数量是可变的,
其实更适合用 combineAll
`;
  demo2_1Info =
  `
const getPromise = function (v) {
  return new Promise(resolve => {
    setTimeout(function () {
      resolve('promise resolve:' + (v * 10));
    }, 500);
  });
};

Rx.Observable.of(1, 2, 3, 4, 5)
  .scan((acc, curr) => [...acc, curr], [])
  // 获取最终的数组 [1,2,3,4,5]
  .last()
  // 转换成 promise数组 [promise1,promise2,promise3,promise4,promise5]
  .map(array => array.map(item => getPromise(item)))
  //  promise数组 转化为 ForkJoinObservable 对象
  .map(promiseArray => Rx.Observable.forkJoin(promiseArray))
  // map 为高阶Observable, 因为 map 后的值不是普通值, 而是一个 Observable
  // 因此需要 可使高阶 Observable 转换为一阶 Observable 的操作符来处理
  // 如: mergeAll combineAll concatAll 均可,
  // 在这里,这几个操作符效果是一样,因为只有一个 Observable, 且这个 Observable
  // 只有一个值
  .mergeAll()
  .subscribe(v => {
    console.log('最终输出:');
    console.log(v);
  });
  `;
  demo2_1Desc =
  `// 代码解析:
// 第一个 map 和 第二个 map ,可以合并:

Rx.Observable.of(1, 2, 3, 4, 5)
  .scan((acc, curr) => [...acc, curr], [])
  .last()
  .map(array => Rx.Observable.forkJoin(array.map(item => getPromise(item))))
  .mergeAll()
  .subscribe(v => {
    console.log('最终输出:');
    console.log(v);
  });

// map + mergeAll 等价于 mergeMap, 因此可以写为:

Rx.Observable.of(1, 2, 3, 4, 5)
  .scan((acc, curr) => [...acc, curr], [])
  .last()
  .mergeMap(array => Rx.Observable.forkJoin(array.map(item => getPromise(item))))
  .subscribe(v => {
    console.log('最终输出:');
    console.log(v);
  });
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }
  ngOnInit() {
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
  runDemo1() {
    const dateTool = this.dateTool;
    const getPromise = (): Promise<string> => {
      return new Promise(resolve => {
        setTimeout(function () {
          console.log(dateTool.getNowBymmsszz() + ' promise:' + 'promise resolve data');
          resolve('promise resolve data');
        }, 500);
      });
    };
    this.isRuning = true;

    this.demo1subscribe =
      Rx.Observable.forkJoin(
        Rx.Observable
          .range(10, 5).delay(1000)
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' range:' + v)),
        Rx.Observable
          .interval(1000).take(5)
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' interval:' + v)),
        Rx.Observable
          .of(1000)
          .do(v => console.log(this.dateTool.getNowBymmsszz() + ' of:' + v)),
        getPromise()
      ).subscribe(v => console.log(v),
        (err) => { },
        () => this.isRuning = false);

  }
  runDemo1zip() {
    const getPromise = () => {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve data');
        }, 500);
      });
    };

    Rx.Observable.forkJoin(
      Rx.Observable
        .range(10, 5).delay(1000),
      Rx.Observable
        .interval(1000).take(5),
      Rx.Observable
        .of(1000),
      getPromise()
    ).subscribe(v => console.log(v));

  }
  runDemo2() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };
    this.isRuning = true;

    this.demo2subscribe =
      Rx.Observable
        .forkJoin(
        ...[1, 2, 3, 4, 5].map(i => getPromise(i))
        )
        .subscribe(v => {
          console.log('最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };

    Rx.Observable
      .forkJoin(
      ...[1, 2, 3, 4, 5].map(i => getPromise(i))
      )
      .subscribe(v => {
        console.log('最终输出:');
        console.log(v);
      }
      );
  }
  runDemo2_1() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };
    this.isRuning = true;

    this.demo2_1subscribe =
      Rx.Observable.of(1, 2, 3, 4, 5)
        .scan((acc, curr) => [...acc, curr], [])
        .last()
        .do(v => {
          console.log('last:');
          console.log(v);
        })
        .map(array => array.map(item => getPromise(item)))
        .do(v => {
          console.log('map1:');
          console.log(v);
        })
        .map(promiseArray => Rx.Observable.forkJoin(promiseArray))
        .do(v => {
          console.log('map2:');
          console.log(v);
        })
        .mergeAll()
        .subscribe(v => {
          console.log('最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1_1zip() {
    const getPromise = function (v): Promise<string> {
      return new Promise(resolve => {
        setTimeout(function () {
          resolve('promise resolve:' + (v * 10));
        }, 500);
      });
    };

    // Rx.Observable.of(1, 2, 3, 4, 5)
    //   .scan((acc, curr) => [...acc, curr], [])
    //   // 获取最终的数组 [1,2,3,4,5]
    //   .last()
    //   // 转换成 promise数组 [promise1,promise2,promise3,promise4,promise5]
    //   .map(array => array.map(item => getPromise(item)))
    //   //  promise数组 转化为 ForkJoinObservable 对象
    //   .map(promiseArray => Rx.Observable.forkJoin(promiseArray))
    //   // map 为高阶Observable, 因为 map 后的值不是普通值, 而是一个 Observable
    //   // 因此需要 可使高阶 Observable 转换为一阶 Observable 的操作符来处理
    //   // 如: mergeAll combineAll concatAll 均可,
    //   // 在这里,这几个操作符效果是一样,因为只有一个 Observable, 且这个 Observable
    //   // 只有一个值
    //   .mergeAll()
    //   .subscribe(v => {
    //     console.log('最终输出:');
    //     console.log(v);
    //   });

    // Rx.Observable.of(1, 2, 3, 4, 5)
    //   .scan((acc, curr) => [...acc, curr], [])
    //   .last()
    //   .map(array => Rx.Observable.forkJoin(array.map(item => getPromise(item))))
    //   .mergeAll()
    //   .subscribe(v => {
    //     console.log('最终输出:');
    //     console.log(v);
    //   });

    Rx.Observable.of(1, 2, 3, 4, 5)
      .scan((acc, curr) => [...acc, curr], [])
      .last()
      .mergeMap(array => Rx.Observable.forkJoin(array.map(item => getPromise(item))))
      .subscribe(v => {
        console.log('最终输出:');
        console.log(v);
      });

  }
}

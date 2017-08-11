import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// import 'rxjs/Rx';


@Injectable()
export class DiffAnalysisService {

  lastInfo$: Observable<any>;

  constructor(private router: Router) { }

  showDiffInfo(diffInfoTag: string) {
    this.lastInfo$ = Observable.of(diffInfoData['combineAll-combineLatest']);
    this.router.navigate(
      [{
        outlets: { diffdialog: 'diffdialog' }
      }]);
  }
  hideDiffInfo() {
    this.router.navigate(
      [{
        outlets: { diffdialog: null }
      }]);
  }

  getLastInfo(): Observable<any> {
    return this.lastInfo$;
  }

}
// export class DiffInfoDataItem {
//   header: string;
//   info: string;
// }

export const diffInfoData = {
  'combineAll-combineLatest': {
    header:
    `combineAll 与 combineLatest 的对比分析`,
    info:
    `
相同点:

- 功能是一样的,都是将高阶 Observable 转化为 一阶 Observable
- 处理方式也是一样, 均按 combineLatest 形式发射值

不同点:

- 调用方式不一样
  combineAll 只能由上游 Observable 实例调用
  combineLatest 可以使用静态方法,也可以由上游 Observable 实例调用

- 接收参数形式不一样
  combineAll 不接收参数,即只能处理上游 Observable 实例发出的值
  combineLatest 必须接收参数
    参数为  Observable实例 或 ...Observable实例[]

如何选择:

假设已经存在多个 Observable实例, 如 A$, B$, C$,
则两者都可以使用, 但用 combineLatest 更方便

- combineLatest

  Observable.combineLatest(A$, B$, C$)

  或

  A$.combineLatest(B$, C$)

- combineAll

  Observable.from([A$, B$, C$])
    .combineAll()

如果还没有多个 Observable实例,或者 Observable 实例是动态创建的,
则一般来说,应用 combineAll

    Observable.from([A, B, C])
      .map(v => Observable.of(v))
      .combineAll()
`
  }
};


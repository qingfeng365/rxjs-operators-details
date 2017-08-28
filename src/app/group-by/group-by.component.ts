import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Rx from 'rxjs/Rx';
import 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
import { DateToolService } from '../util/date-tool.service';
import { DiffAnalysisService } from '../service/diff-analysis.service';

@Component({
  selector: 'app-group-by',
  templateUrl: './group-by.component.html',
  styleUrls: ['./group-by.component.css']
})
export class GroupByComponent implements OnInit, OnDestroy {
  isRuning = false;

  demo1subscribe: Subscription = null;
  demo2subscribe: Subscription = null;
  demo3subscribe: Subscription = null;

  demo1Info =
  `
Rx.Observable.interval(1000)
  .filter(v => v > 0)
  .take(5)
  .groupBy(i => i % 2)
  .subscribe(group$ =>
    group$.subscribe(
      e => console.log('分组[' +
      group$.key + ']:' + e)
    )
  );
/*
  输出:
    分组[1]:1
    分组[0]:2
    分组[1]:3
    分组[0]:4
    分组[1]:5
*/
`;
  demo2Info =
  `
Rx.Observable.interval(1000)
  .filter(v => v > 0)
  .take(5)
  .groupBy(i => i % 2)
  .mergeMap(group$ => {
    return group$.reduce((acc, cur) => [...acc, cur], []);
  })
  .subscribe(v => console.log(v));
/*
  输出:
    [1, 3, 5]
    [2, 4]
*/

注意:
  这里不能使用 concatMap ,
  如果使用 concatMap, 则只有第1个数组有值,
  第2个数组为[],原因是 group$ 内部是使用 subject 发射,
  subject 要先订阅, 后发射,才能收到全部值,
  concatMap 要等第1个 group$ 完成,才开始订阅 第2个 group$,
  第1个 group$ 最后值 5, 发射之前,
  值2,值4 已经在第2个 group$ 先发射了.
  这时再订阅 第2个 group$, 已经收不到值了

  同理,也不能使用 switchMap ,会丢掉第1组

  也不能使用 exhaustMap, 会丢掉第2组

  switchMap 与 exhaustMap 的原因是 直接不订阅,
  跟 concatMap 订阅但收不到值,还有点差别
`;
  demo3Info =
`
const people = [
  { name: 'Sue', age: 25 },
  { name: 'Joe', age: 30 },
  { name: 'Frank', age: 25 },
  { name: 'Sarah', age: 35 }];

Rx.Observable.from(people)
  .groupBy(p => p.age, p => p.name)
  .mergeMap(group$ => {
    return group$.reduce((acc, cur) =>
      ({ age: acc.age, users: [...acc.users, cur] })
      , { age: group$.key, users: [] });
  })
  .subscribe(v => console.log(JSON.stringify(v)));
/*
  输出:
    {"age":25,"users":["Sue","Frank"]}
    {"age":30,"users":["Joe"]}
    {"age":35,"users":["Sarah"]}
*/
`;
  constructor(private dateTool: DateToolService,
    public diffAnalysisService: DiffAnalysisService) { }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.unsubscribe(this.demo1subscribe);
    this.unsubscribe(this.demo2subscribe);
    this.unsubscribe(this.demo3subscribe);
  }

  unsubscribe(subscribe: any) {
    if (subscribe) {
      subscribe.unsubscribe();
    }
  }
  runDemo1() {
    this.isRuning = true;
    this.demo1subscribe =
      Rx.Observable.interval(1000)
        .filter(v => v > 0)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .groupBy(i => i % 2)
        .subscribe(group$ => {
          console.log(this.dateTool.getNowBymmsszz() + ' 首轮输出:');
          console.log(group$);
          group$.subscribe(
            e => console.log(this.dateTool.getNowBymmsszz() + ' 分组[' +
              group$.key + ']输出:' + e)
          );
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo1zip() {
    Rx.Observable.interval(1000)
      .filter(v => v > 0)
      .take(5)
      .groupBy(i => i % 2)
      .subscribe(group$ =>
        group$.subscribe(
          e => console.log('分组[' +
            group$.key + ']:' + e)
        )
      );
  }
  runDemo2() {
    this.isRuning = true;
    this.demo2subscribe =
      Rx.Observable.interval(1000)
        .filter(v => v > 0)
        .take(5)
        .do(v => console.log(this.dateTool.getNowBymmsszz() + ' 源:' + v))
        .groupBy(i => i % 2)
        .mergeMap(group$ => {
          console.log(this.dateTool.getNowBymmsszz() + ' 分组 Observable:');
          console.log(group$);
          return group$.reduce((acc, cur) => {
            console.log(this.dateTool.getNowBymmsszz() + ' ' +
              '分组[' + group$.key + ']:' + cur);
            return [...acc, cur];
          }, []);
        })
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(v);
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo2zip() {
    Rx.Observable.interval(1000)
      .filter(v => v > 0)
      .take(5)
      .groupBy(i => i % 2)
      .exhaustMap(group$ => {
        return group$.reduce((acc, cur) => [...acc, cur], []);
      })
      .subscribe(v => console.log(v));
  }
  runDemo3() {
    const people = [
      { name: 'Sue', age: 25 },
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 25 },
      { name: 'Sarah', age: 35 }];

    this.isRuning = true;
    this.demo3subscribe =
      Rx.Observable.from(people)
        .do(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 源:');
          console.log(v);
        })
        .groupBy(p => p.age, p => p.name)
        .mergeMap(group$ => {
          console.log(this.dateTool.getNowBymmsszz() + ' 分组 Observable:');
          console.log(group$);
          return group$.reduce((acc, cur) => {
            console.log(this.dateTool.getNowBymmsszz() + ' ' +
              '分组[' + group$.key + ']:');
            console.log(cur);
            return { age: acc.age, users: [...acc.users, cur] };

          }, { age: group$.key, users: [] });
        })
        .subscribe(v => {
          console.log(this.dateTool.getNowBymmsszz() + ' 最终输出:');
          console.log(JSON.stringify(v));
        },
        (err) => { },
        () => this.isRuning = false);
  }
  runDemo3zip() {
    const people = [
      { name: 'Sue', age: 25 },
      { name: 'Joe', age: 30 },
      { name: 'Frank', age: 25 },
      { name: 'Sarah', age: 35 }];

    Rx.Observable.from(people)
      .groupBy(p => p.age, p => p.name)
      .mergeMap(group$ => {
        return group$.reduce((acc, cur) =>
          ({ age: acc.age, users: [...acc.users, cur] })
          , { age: group$.key, users: [] });
      })
      .subscribe(v => console.log(JSON.stringify(v)));
  }
}

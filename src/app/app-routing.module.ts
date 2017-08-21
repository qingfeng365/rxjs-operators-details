import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';
import { CombineAllComponent } from './combine-all/combine-all.component';
import { ShowDiffAnalysisComponent } from './show-diff-analysis/show-diff-analysis.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ConcatComponent } from './concat/concat.component';
import { ConcatAllComponent } from './concat-all/concat-all.component';
import { MergeComponent } from './merge/merge.component';
import { MergeAllComponent } from './merge-all/merge-all.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';
import { PairwiseComponent } from './pairwise/pairwise.component';
import { RaceComponent } from './race/race.component';
import { StartWithComponent } from './start-with/start-with.component';
import { ZipComponent } from './zip/zip.component';
import { WithLatestFromComponent } from './with-latest-from/with-latest-from.component';
import { DebounceComponent } from './debounce/debounce.component';
import { DebounceTimeComponent } from './debounce-time/debounce-time.component';
import { DistinctUntilChangedComponent } from './distinct-until-changed/distinct-until-changed.component';
import { FilterComponent } from './filter/filter.component';
import { FirstComponent } from './first/first.component';
import { IgnoreElementsComponent } from './ignore-elements/ignore-elements.component';
import { LastComponent } from './last/last.component';
import { SampleComponent } from './sample/sample.component';
import { SingleComponent } from './single/single.component';
import { SkipComponent } from './skip/skip.component';
import { SkipUntilComponent } from './skip-until/skip-until.component';
import { SkipWhileComponent } from './skip-while/skip-while.component';
import { TakeComponent } from './take/take.component';
import { TakeUntilComponent } from './take-until/take-until.component';
import { TakeWhileComponent } from './take-while/take-while.component';
import { ThrottleComponent } from './throttle/throttle.component';
import { ThrottleTimeComponent } from './throttle-time/throttle-time.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'diffdialog',
    component: ShowDiffAnalysisComponent,
    outlet: 'diffdialog'
  },
  {
    path: 'operators',
    component: OperatorsComponent,
  },
  {
    path: 'combine-all',
    component: CombineAllComponent
  },
  {
    path: 'combine-latest',
    component: CombineLatestComponent
  },
  {
    path: 'concat',
    component: ConcatComponent
  },
  {
    path: 'concat-all',
    component: ConcatAllComponent
  },
  {
    path: 'debounce',
    component: DebounceComponent
  },
  {
    path: 'debounce-time',
    component: DebounceTimeComponent
  },
  {
    path: 'distinct-until-changed',
    component: DistinctUntilChangedComponent
  },
  {
    path: 'filter',
    component: FilterComponent
  },
  {
    path: 'first',
    component: FirstComponent
  },
  {
    path: 'fork-join',
    component: ForkJoinComponent
  },
  {
    path: 'ignore-elements',
    component: IgnoreElementsComponent
  },
  {
    path: 'last',
    component: LastComponent
  },
  {
    path: 'merge',
    component: MergeComponent
  },
  {
    path: 'merge-all',
    component: MergeAllComponent
  },
  {
    path: 'pairwise',
    component: PairwiseComponent
  },
  {
    path: 'race',
    component: RaceComponent
  },
  {
    path: 'sample',
    component: SampleComponent
  },
  {
    path: 'single',
    component: SingleComponent
  },
  {
    path: 'skip',
    component: SkipComponent
  },
  {
    path: 'skip-until',
    component: SkipUntilComponent
  },
  {
    path: 'skip-while',
    component: SkipWhileComponent
  },
  {
    path: 'start-with',
    component: StartWithComponent
  },
  {
    path: 'take',
    component: TakeComponent
  },
  {
    path: 'take-until',
    component: TakeUntilComponent
  },
  {
    path: 'take-while',
    component: TakeWhileComponent
  },
  {
    path: 'throttle',
    component: ThrottleComponent
  },
  {
    path: 'throttle-time',
    component: ThrottleTimeComponent
  },
  {
    path: 'with-latest-from',
    component: WithLatestFromComponent
  },
  {
    path: 'zip',
    component: ZipComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

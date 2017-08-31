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
import { BufferComponent } from './buffer/buffer.component';
import { BufferCountComponent } from './buffer-count/buffer-count.component';
import { BufferTimeComponent } from './buffer-time/buffer-time.component';
import { BufferToggleComponent } from './buffer-toggle/buffer-toggle.component';
import { BufferWhenComponent } from './buffer-when/buffer-when.component';
import { ConcatMapComponent } from './concat-map/concat-map.component';
import { ConcatMapToComponent } from './concat-map-to/concat-map-to.component';
import { ExhaustMapComponent } from './exhaust-map/exhaust-map.component';
import { ExpandComponent } from './expand/expand.component';
import { GroupByComponent } from './group-by/group-by.component';
import { MapComponent } from './map/map.component';
import { MapToComponent } from './map-to/map-to.component';
import { MergeMapComponent } from './merge-map/merge-map.component';
import { PartitionComponent } from './partition/partition.component';
import { PluckComponent } from './pluck/pluck.component';
import { ScanComponent } from './scan/scan.component';
import { SwitchMapComponent } from './switch-map/switch-map.component';
import { WindowComponent } from './window/window.component';
import { WindowCountComponent } from './window-count/window-count.component';
import { WindowTimeComponent } from './window-time/window-time.component';
import { WindowToggleComponent } from './window-toggle/window-toggle.component';
import { WindowWhenComponent } from './window-when/window-when.component';
import { CreateComponent } from './create/create.component';
import { EmptyComponent } from './empty/empty.component';
import { FromComponent } from './from/from.component';
import { FromEventComponent } from './from-event/from-event.component';
import { FromPromiseComponent } from './from-promise/from-promise.component';
import { IntervalComponent } from './interval/interval.component';
import { OfComponent } from './of/of.component';
import { RangeComponent } from './range/range.component';
import { ThrowComponent } from './throw/throw.component';
import { TimerComponent } from './timer/timer.component';

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
    path: 'buffer',
    component: BufferComponent
  },
  {
    path: 'buffer-count',
    component: BufferCountComponent
  },
  {
    path: 'buffer-time',
    component: BufferTimeComponent
  },
  {
    path: 'buffer-toggle',
    component: BufferToggleComponent
  },
  {
    path: 'buffer-when',
    component: BufferWhenComponent
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
    path: 'concat-map',
    component: ConcatMapComponent
  },
  {
    path: 'concat-map-to',
    component: ConcatMapToComponent
  },
  {
    path: 'create',
    component: CreateComponent
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
    path: 'empty',
    component: EmptyComponent
  },
  {
    path: 'exhaust-map',
    component: ExhaustMapComponent
  },
  {
    path: 'expand',
    component: ExpandComponent
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
    path: 'from',
    component: FromComponent
  },
  {
    path: 'from-event',
    component: FromEventComponent
  },
  {
    path: 'from-promise',
    component: FromPromiseComponent
  },
  {
    path: 'group-by',
    component: GroupByComponent
  },
  {
    path: 'ignore-elements',
    component: IgnoreElementsComponent
  },
  {
    path: 'interval',
    component: IntervalComponent
  },
  {
    path: 'last',
    component: LastComponent
  },
  {
    path: 'map',
    component: MapComponent
  },
  {
    path: 'map-to',
    component: MapToComponent
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
    path: 'merge-map',
    component: MergeMapComponent
  },
  {
    path: 'of',
    component: OfComponent
  },
  {
    path: 'pairwise',
    component: PairwiseComponent
  },
  {
    path: 'partition',
    component: PartitionComponent
  },
  {
    path: 'pluck',
    component: PluckComponent
  },
  {
    path: 'race',
    component: RaceComponent
  },
  {
    path: 'range',
    component: RangeComponent
  },
  {
    path: 'sample',
    component: SampleComponent
  },
  {
    path: 'scan',
    component: ScanComponent
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
    path: 'switch-map',
    component: SwitchMapComponent
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
    path: 'throw',
    component: ThrowComponent
  },
  {
    path: 'timer',
    component: TimerComponent
  },
  {
    path: 'window',
    component: WindowComponent
  },
  {
    path: 'window-count',
    component: WindowCountComponent
  },
  {
    path: 'window-time',
    component: WindowTimeComponent
  },
  {
    path: 'window-toggle',
    component: WindowToggleComponent
  },
  {
    path: 'window-when',
    component: WindowWhenComponent
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

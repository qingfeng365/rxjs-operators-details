import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';
import { CombineAllComponent } from './combine-all/combine-all.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DateToolService } from './util/date-tool.service';
import { ShowDiffAnalysisComponent } from './show-diff-analysis/show-diff-analysis.component';
import { DiffAnalysisService } from './service/diff-analysis.service';
import { DialogModule } from 'primeng/primeng';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ConcatComponent } from './concat/concat.component';
import { ConcatAllComponent } from './concat-all/concat-all.component';
import { MergeComponent } from './merge/merge.component';
import { MergeAllComponent } from './merge-all/merge-all.component';
import { ForkJoinComponent } from './fork-join/fork-join.component';
import { PairwiseComponent } from './pairwise/pairwise.component';
import { RaceComponent } from './race/race.component';
import { StartWithComponent } from './start-with/start-with.component';
import { WithLatestFromComponent } from './with-latest-from/with-latest-from.component';
import { ZipComponent } from './zip/zip.component';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperatorsComponent,
    CombineAllComponent,
    NavbarComponent,
    ShowDiffAnalysisComponent,
    CombineLatestComponent,
    ConcatComponent,
    ConcatAllComponent,
    MergeComponent,
    MergeAllComponent,
    ForkJoinComponent,
    PairwiseComponent,
    RaceComponent,
    StartWithComponent,
    WithLatestFromComponent,
    ZipComponent,
    DebounceComponent,
    DebounceTimeComponent,
    DistinctUntilChangedComponent,
    FilterComponent,
    FirstComponent,
    IgnoreElementsComponent,
    LastComponent,
    SampleComponent,
    SingleComponent,
    SkipComponent,
    SkipUntilComponent,
    SkipWhileComponent,
    TakeComponent,
    TakeUntilComponent,
    TakeWhileComponent,
    ThrottleComponent,
    ThrottleTimeComponent,
    BufferComponent,
    BufferCountComponent,
    BufferTimeComponent,
    BufferToggleComponent,
    BufferWhenComponent,
    ConcatMapComponent,
    ConcatMapToComponent,
    ExhaustMapComponent,
    ExpandComponent,
    GroupByComponent,
    MapComponent,
    MapToComponent,
    MergeMapComponent,
    PartitionComponent,
    PluckComponent,
    ScanComponent,
    SwitchMapComponent,
    WindowComponent,
    WindowCountComponent,
    WindowTimeComponent,
    WindowToggleComponent,
    WindowWhenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DateToolService, DiffAnalysisService],
  bootstrap: [AppComponent]
})
export class AppModule { }

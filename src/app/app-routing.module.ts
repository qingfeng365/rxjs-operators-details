import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OperatorsComponent } from './operators/operators.component';
import { CombineAllComponent } from './combine-all/combine-all.component';
import { ShowDiffAnalysisComponent } from './show-diff-analysis/show-diff-analysis.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

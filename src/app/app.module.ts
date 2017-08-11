import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OperatorsComponent,
    CombineAllComponent,
    NavbarComponent,
    ShowDiffAnalysisComponent,
    CombineLatestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [DateToolService, DiffAnalysisService],
  bootstrap: [AppComponent]
})
export class AppModule { }

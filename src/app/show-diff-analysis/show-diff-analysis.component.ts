import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/primeng';
import { DiffAnalysisService } from '../service/diff-analysis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-diff-analysis',
  templateUrl: './show-diff-analysis.component.html',
  styleUrls: ['./show-diff-analysis.component.css']
})
export class ShowDiffAnalysisComponent implements OnInit {
  header = 'test';
  info = 'testinfo';
  display = true;
  constructor(private diffAnalysisService: DiffAnalysisService,
    private router: Router) { }

  ngOnInit() {
    this.diffAnalysisService.getLastInfo()
      .subscribe(
        v => {
          this.header = v.header;
          this.info = v.info;
        }
      );
  }
  onHide() {
    this.diffAnalysisService.hideDiffInfo();
  }
}

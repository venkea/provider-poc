import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from '../services/report.service';
import { MatTableDataSource } from '@angular/material/table';


import * as _moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  reportDate: string;
  showGenerateButton: boolean;
  loading: boolean;
  showResult: boolean;
  displayedColumns: string[] = ['No', 'Provider Id', 'Error Description'];
  failedRecordList: any[];
  listData: MatTableDataSource <any[]>;

  constructor(private reportService: ReportService) { }
  ngOnInit() {

  }

  toggle(ref:any) {
    if (this.reportDate != null) {
      this.showGenerateButton = true;
    }
  }

  generateReport() {
    this.loading = true;
    this.reportService.getReport(this.reportDate).subscribe((res: any) => {
      this.loading = false;
      this.showResult = true;
      this.failedRecordList = res;
      this.listData = new MatTableDataSource(res);
    });
  }
}

import {AfterViewInit,  Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ReportService } from '../services/report.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ErrorModel} from '../model/errorModel';

import { Observable } from 'rxjs';
import {Subscription, timer} from 'rxjs';


import * as _moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  reportDate: string;
  showGenerateButton: boolean;
  loading: boolean;
  showResult: boolean;
  displayedColumns: string[] = ['ProviderId', 'ErrorDescription'];
  failedRecordList: any[];
  errorMessage: any;
  listEmpty = false;
  listData= new MatTableDataSource<any>();
  errorsListPerProvider: any[];

  constructor(private reportService: ReportService, private datePipe: DatePipe) { 
  }
  ngOnInit() {

  }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.listData.paginator = this.paginator;
  }

  toggle(ref:any) {
    if (this.reportDate != null) {
      this.showGenerateButton = true;
    }
  }

  generateReport() {
    this.loading = true;
    var formattedDate = this.datePipe.transform(this.reportDate, 'yyyy-MM-dd');
    this.reportService.getReport(formattedDate)
    .subscribe(
      (response) => {                           //next() callback
        console.log('response received')
        console.log(response)
        this.loading = false;
        this.failedRecordList = response;
        if (this.failedRecordList.length > 0) {
          this.errorsListPerProvider = [];
          this.showResult = true;
          // this.failedRecordList.forEach(element => {              
          //   this.errorsListPerProvider.push(element.description);
          // });
        } else {
          this.showResult = false;
        }
        console.log('This is the string array',this.errorsListPerProvider);
        this.listData = new MatTableDataSource(response);
        this.listData.paginator = this.paginator;
        if(this.failedRecordList.length <= 0) {
          this.listEmpty = true;
        } else {
          this.listEmpty = false;
        }
        
      },
      (error) => {  
        console.log('error -- ', error)                            //error() callback
        console.error('Request failed with error')
        this.errorMessage = error;
        this.loading = false;
      },
      () => {                                   //complete() callback
        console.log('Request completed')      //This is actually not needed 
        this.loading = false; 
      })
    // .subscribe((res) => {
    //   console.log("This is the response ",res)
    //   this.reportService.getReport(formattedDate);
    //   this.loading = false;
    //   this.showResult = true;
    //   this.failedRecordList = res;
    //   this.listData = new MatTableDataSource(this.failedRecordList);
    // });
  }
}

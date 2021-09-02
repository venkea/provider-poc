import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReport (data : any) : Observable<any> {
    console.log("this is the data", data)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // return [{
    //   'No:': '1', 'Provider ID': '104999', 'Error': ' Tax Id lenth is not 11, Tax Id length is not ELEVEN , NPI Id lenth is not 10, NPI Id length is not TEN , Provider Speciality Code is not provided or it is not valid for individual provider,  Tax Id field is not Numeric , NPI field is not Numeric , Invalid Tax Id,  Invalid Npi,  Provider Speciality Code is Invalid , Comp code is missing, '},
    // {
    //   'No:': '2', 'Provider ID': '104999', 'Error': ' Tax Id lenth is not 11, Tax Id length is not ELEVEN , NPI Id lenth is not 10, NPI Id length is not TEN , Provider Speciality Code is not provided or it is not valid for individual provider,  Tax Id field is not Numeric , NPI field is not Numeric , Invalid Tax Id,  Invalid Npi,  Provider Speciality Code is Invalid , Comp code is missing, '},
    // ];
    return this.http.get(
      'http://localhost:8090/api/logs/' + data,
      { headers });
  };
}

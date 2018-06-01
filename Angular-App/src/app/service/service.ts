import { Pageable } from '../component/employee.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Employee } from '../bean/employee';
import { EmployeeResponse } from '../bean/employee.response';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CachedHttp } from 'angular-async-cache';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class EmployeeService {

  url = 'http://127.0.0.1:4200/';
  constructor(private cachedhttp: CachedHttp, private http: HttpClient) { }
  allUrl1 = environment.serviceURL;
  private userUrl = 'http://10.224.20.210:8080/';
  allUrl = this.userUrl + 'data';

  getEmployees(): Observable<EmployeeResponse> {
    return this.http.get(this.allUrl).map(this.extractData)
      .catch(this.handleError);
  }

  deleteEmployee(empId:number){
    let deleteQuery = this.userUrl + '/deleteemployee' + empId;
    this.http.delete(deleteQuery).subscribe(
      (val) => {
      console.log('Deleted Succesfully')
    },
    response =>{
      console.log('Error', response);
    });
  }

  updateEmployee(employee: Employee){
    JSON.stringify(employee);
  }

  addEmployee(emp: Employee): Observable<any>{
    // var uri = this.allUrl1 + "create";
    const uri = this.userUrl + 'create';
    return this.http.post<any>(uri,
      emp,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': this.url,
          'Cache-control': 'no-cache',
          'Expires': '0',
          'Pragma': 'no-cache'
        })
      })
      .map(res => res);
  }

  getEmployeesList(p: Pageable): Observable<EmployeeResponse> {
    const extended = '?page=' + p.page + '&size=' + p.limit;
    return this.cachedhttp.get(this.allUrl + extended).map(this.extractData)
      .catch(this.handleError);

  }
  private extractData(res: EmployeeResponse) {
    return res;
  }

  private handleError(error: Response | any) {
    alert(error.message);
    console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
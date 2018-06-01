import { AppRoutingModule } from '../../../src/app/app-routing.module';
import { Observable } from 'rxjs/Observable';
import { PaginationComponent } from './pagination.component';
import { Component, OnInit, Injectable, HostListener } from '@angular/core';
import { EmployeeService } from '../service/service';
import { Employee } from '../bean/employee';
import { EmployeeResponse } from '../bean/employee.response';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap, Routes, UrlSegment } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { JSONSchema } from 'JSON';

@Component({
  selector: 'app-employee',
  templateUrl: '../views/employee/employee.component.html',
  styleUrls: ['../views/employee/employee.component.css']
})

export class EmployeeComponent implements OnInit {
 rForm: FormGroup;
 firstName = '';
 lastName = '';
 contact = '';
 remarks = '';
 titleAlert  = 'This field is required';
 status = '';
 /*employee = {
   gender: [
     { name: 'Male',  selected: true, id: 1 },
     { name: 'Female',  selected: false, id: 2 }
   ],
   eduqual : [
     { name: '10th',  selected: true, id: 1 },
     { name: '12th',  selected: true, id: 2 },
     { name: 'B.tech',  selected: false, id: 3 },
     { name: 'M.tech',  selected: false, id: 4 },
     { name: 'BCA',  selected: false, id: 5 },
     { name: 'MCA',  selected: false, id: 6 }
   ]
 };*/
  loading = false;
  page = 1;
  limit = 5;
  total = 0;
  response: EmployeeResponse = new EmployeeResponse();
  URL: any;
  condition: string;

  ngOnInit() {
    
  this.getEmployeeList();
  this.condition = navigator.onLine ? 'online' : 'offline';
  } 
   constructor (protected localStorage: AsyncLocalStorage, private employeeService: EmployeeService,
     private pageable: PaginationComponent, private fb: FormBuilder) {
      this.rForm = new FormGroup({
      status: new FormControl(this.condition),
      firstName: new FormControl(),
      lastName: new FormControl(),
      // gender: new FormControl(),
      // eduqual:  new FormControl(),
      contact: new FormControl(),
      remarks:  new FormControl()
   });
    /*this.form = this.fb.group({
      gender: this.buildGender(),
      eduqual:this.buildEduqual()
    });*/
    this.rForm = this.fb.group({
     'status': [this.condition, Validators.required],
     'firstName': [null, Validators.required],
     'lastName': [null, Validators.required],
     'contact': [null, Validators.required],
     'remarks': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(500)])]
     // 'eduqual':[null, Validators.required],
     // 'gender':[null, Validators.required]
   });

 }
 /*get gender(): FormArray {
   return this.form.get('gender') as FormArray;
 };

 get eduqual(): FormArray {
   return this.form.get('eduqual') as FormArray;
 };
 buildGender() {
   const arr = this.employee.gender.map(s => {
     return this.fb.control(s.selected);
   })
   return this.fb.array(arr);
 }

 buildEduqual() {
   const arr = this.employee.eduqual.map(s => {
     return this.fb.control(s.selected);
   })
   return this.fb.array(arr);
 }*/
 addPost(post) {
   const employee: Employee = new Employee();
   employee.firstName = post.firstName;
   employee.lastName = post.lastName;
   employee.contact = post.contact;
   employee.remarks = post.remarks;
   if (post.status.trim() === 'offline') {
   alert('It seems you are offline,Data adding to cache');
   // Store the data
     this.localStorage.setItem('newPost', JSON.stringify(employee)).subscribe(() => {});
   } else {
   this.employeeService.addEmployee(post).subscribe(res => {
      this.getEmployeeList();
   this.rForm.reset();
   });
   }
   
 }

 //deletes a user by id
 deleteUser(empId : number){
      this.employeeService.deleteEmployee(empId);
 }

 addCachedData() {
 const val = 'online';
  if ( val.trim() === 'online') {
  if ((this.localStorage.getItem<Employee>('newPost') != null)) {
    this.localStorage.getItem<Employee>('newPost').subscribe((employee) => {
      if ( employee != null) {
      this.employeeService.addEmployee(employee);
      this.localStorage.removeItem('newPost').subscribe(() => {});
      }
    });
  }
  }
}

check(): boolean {
  const status: boolean = this.status === 'online' ? true : false;
  const request: boolean = ( this.localStorage.getItem<Employee>('newPost') != null) ? true : false;
  alert(!(status && request));
  return !(status && request);
}


  getEmployees(): void {
    console.log('response start time is: ' + new Date().getMilliseconds() );
    this.employeeService.getEmployees()
        .subscribe(response => {
          this.response.employee = response.employee;
          console.log(this.response);
        });
        
   console.log('response end time is: ' + new Date().getMilliseconds() );
  }

getEmployeeList(): void {
    this.loading = true;
    this.employeeService.getEmployeesList({page: this.page - 1, limit: this.limit})
        .subscribe((response) => {
          this.response.employee = response.employee;
          console.log(response);
          this.total = response.totalElements;
          this.limit = response.size;
          this.page = this.page;
          this.loading = false;
          }, ( responseError) => {
            alert('Error in loading');
          }
        );
  }


  goToPage(n: number): void {
    this.page = n;
    this.getEmployeeList();
  }

  onNext(): void {
    this.page++;
     this.getEmployeeList();
  }

  onPrev(): void {
    this.page--;
     this.getEmployeeList();
  }

  /* downloadcsv(data: Employee[]):void {
     var options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: false,
    useBom: false,
    headers: ['Employee ID', 'Employee Name', 'Employee Designation','Employee Contact']
  };
new Angular2Csv(data, 'EmployeeDetails',options);*/
}


export interface Pageable {
    page: number;
    limit: number; // interfaces allow fields to be optional
}

const schema: JSONSchema = {
  properties: {
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    contact: {type: 'string'},
    remarks: {type: 'string'}
  },
  required: ['firstName', 'lastName' , 'contact' , 'remarks']
};

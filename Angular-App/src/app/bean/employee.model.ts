export class EmployeeModel{
    emp_firstName: string;
    emp_lastName: string;
    emp_Desig: string;
    emp_Contact: string;

    // constuctor(firstname: string,lastname: string,desig: string,contact: string){
    //     this.emp_firstName = firstname;
    //     this.emp_lastName = lastname;
    //     this.emp_Desig = desig;
    //     this.emp_Contact = contact;
    // }
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
    
}
export class Employee {
    firstName: string;
    lastName: string;
    contact: string;
    remarks: string
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}
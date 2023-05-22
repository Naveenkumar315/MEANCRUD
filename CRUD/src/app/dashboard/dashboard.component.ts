import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
  firstName:any;
  lastName:any;
  phoneNo:any;
  age:any;
  
  studentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phoneNo: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    id: new FormControl('', Validators.required)
  });

  studentData:any = [];

  displayedColumns: string[] = ['firstName', 'lastName', 'phoneNo', 'age', 'operations'];

  constructor(private service:StudentService) { }
  ngOnInit(): void {
    this.getStudent()
  }

  createStudent(event:any){
    debugger
  
    if(this.studentForm.value.id == ''){
    const obj = {
      firstName: this.studentForm.value.firstName,
      lastName: this.studentForm.value.lastName,
      age: this.studentForm.value.age,
      phoneNo: this.studentForm.value.phoneNo,
    }
    this.service.createStudent(obj).subscribe((res)=>{
      console.log('sfd'+res)
      if(res == '1'){
        Swal.fire('','Record Saved Successfully','info')
        this.studentForm.reset()
        this.getStudent()
      }
    })
  }else{
    const obj = {
      firstName: this.studentForm.value.firstName,
      lastName: this.studentForm.value.lastName,
      age: this.studentForm.value.age,
      phoneNo: this.studentForm.value.phoneNo,
      _id: this.studentForm.value.id
    }
    this.service.updateStudent(obj).subscribe((res)=>{
      console.log('sfd'+JSON.stringify(res))
      if(res == '2'){
        Swal.fire('','Record Updated Successfully','info')
        this.studentForm.reset()
        this.getStudent()
      }
    })
}

  }

  getStudent(){
    this.service.getStudent().subscribe((res:any)=>{
      debugger
      // this.studentData = []
      this.studentData = res.students
      console.log('sfd'+JSON.stringify(res))
      
    })
    
  }

  updateStudent(data:any){
    debugger
    this.studentForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      phoneNo: data.phoneNo,
      id: data._id
    });
    
  }

  deleteStudent(id:any){
    debugger
    const obj:any = {
      id: id
    }
    this.service.deleteStudent(id).subscribe((res)=>{
      if(res == '1'){
        Swal.fire('','Record Deleted Successfully','info')
        this.getStudent()
      }
    })
  }

  limitDigits(event:any,max:Number) {
    const maxDigits = max; // Change this value to your desired maximum number of digits
    if (event.target.value.length > maxDigits) {
      event.target.value = event.target.value.slice(0, maxDigits);
    }
  }
  
}

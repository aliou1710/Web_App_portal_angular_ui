import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { student } from 'src/app/models/api-models/studentmodel';
import {StudentService} from '../student.service';
@Component({
  selector: 'app-view-one-student',
  templateUrl: './view-one-student.component.html',
  styleUrls: ['./view-one-student.component.css']
})
export class ViewOneStudentComponent implements OnInit{

  constructor(private readonly studentService : StudentService,private readonly route :ActivatedRoute){}

  studentId: string | null | undefined;
  student: student={
    id:'',
    firstName:'',
    lastName:'',
    dateOfBirth:'',
    email:'',
    mobile:0,
    genderId:'',
    profileImageUrl:'',
    gender:{
      id:'',
      description:''
    },
    address:{
      id:'',
      physicalAddress:'',
      postalAddress:''
    }

  }



  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
     this.studentId = params.get('id');

     if(this.studentId){
        this.studentService.getStudentById(this.studentId).subscribe(
          (successResponse)=>{
           this.student = successResponse;
            console.log(successResponse);
          }
        );
     }
    });
  }
}

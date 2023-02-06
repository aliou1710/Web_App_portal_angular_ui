import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { student } from 'src/app/models/api-models/studentmodel';
import {StudentService} from '../student.service';
import { GenderService  } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/api-models/gendermodel';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-one-student',
  templateUrl: './view-one-student.component.html',
  styleUrls: ['./view-one-student.component.css']
})
export class ViewOneStudentComponent implements OnInit{

  constructor(private readonly studentService : StudentService
    ,private readonly genderService : GenderService
    ,private readonly route :ActivatedRoute,
    private readonly snackbar : MatSnackBar,
    private router : Router){}

  studentId: string | null | undefined;
  //student from api-models
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
  //Gender is from ui-models
  genderList : Gender[] = [];
  isNewStudent = false;
  header="";
  displayProfileImageUrl ="";


  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=>{
     this.studentId = params.get('id');

     if(this.studentId){
      //if the route contains the keyword 'Add' => we will have  a new student Functionnality
      if(this.studentId.toLocaleLowerCase()==='Add'.toLocaleLowerCase()){
        //new functionnality
        this.isNewStudent = true;
        this.header = 'Add New Student';
        this.SetImage();
      }
      else{
        //existing functionnality( pour modifier un student)
        this.isNewStudent = false;
        this.header = 'Edit Student';

        this.studentService.getStudentById(this.studentId).subscribe(
          (successResponse)=>{
           this.student = successResponse;
           this.SetImage();
            console.log(successResponse);
          },(errorResponse)=>{
            this.SetImage();
            console.log(errorResponse);
          }
        );

      }
      this.genderService.getGenderList().subscribe((successresponses)=>{
        //we use this genderlist (from ui-model to use in html file)
        this.genderList = successresponses;
      });

     }
    });
  }

  onUpdateStudent(): void{
    console.log(this.student);
    this.studentService.updateStudent_(this.student.id,this.student).subscribe(
      (successresponse)=>{
        //show notification
        this.snackbar.open('Student updated succesfuly',undefined,{
          //en ms
          duration:2000
        });
        console.log(successresponse);
      },
      (errorResponse)=>{
        console.log(errorResponse);
      }
    );
  }
   onDeleteStudent():void{
    this.studentService.deleteStudent_(this.student.id).subscribe(
      (successResponse)=>{
        console.log(successResponse);
        this.snackbar.open('Student deleted Succesfully', undefined,
        {
          duration:2000
        });
        setTimeout(()=>{
          this.router.navigateByUrl('students ');
        },2000);
      },
      (errorResponse)=>{
        console.log(errorResponse);
      }
    );

  }

  onAddStudent():void{
    this.studentService.addStudent_(this.student).subscribe(
    (successResponse)=>{
       //show notification
      this.snackbar.open('Student updated succesfuly',undefined,{
      //en ms
      duration:2000
      });
      setTimeout(()=>{
        this.router.navigateByUrl('students/${successResponse.id}');
      },2000);
      console.log(successResponse);
    },
    (errorResponse)=>{
      //log
      console.log(errorResponse);
    });

  }



  //images
  private SetImage():void{
    //profileImageUrl not empty
    if(this.student.profileImageUrl!="-" && this.student.profileImageUrl!=null ){
      //fetch the image by url
      this.displayProfileImageUrl = this.studentService.getImagePath(this.student.profileImageUrl);
    }else{
      //Display a default
      this.displayProfileImageUrl ='../../../assets/profile.jpg';

    }
  }
  uploadImage(event:any):void{
    if(this.studentId){
      const file : File = event.target.files[0];
      this.studentService.uploadImage(this.student.id,file).subscribe(
        (successResponse)=>{
          console.log("success");
          this.student.profileImageUrl= successResponse;
          this.SetImage();


        //show notification
        this.snackbar.open('Student updated succesfuly',undefined,{
          //en ms
          duration:2000
        });
          //
      },
      (errorResponse)=>{
        console.log("error");
        console.log(errorResponse);
      });

    }
  }


}

import { Component,OnInit, ViewChild} from '@angular/core';
import { StudentService } from './student.service';
import {student} from '../models/ui-models/studentuimodel';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  liststudents : student[]=[];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth','email' ,'mobile','gender','edit'];
  dataSource: MatTableDataSource<student> = new MatTableDataSource<student>();

  //proprieté pagination
  @ViewChild(MatPaginator) matPaginator!:MatPaginator;
  //proprieté sorted
  @ViewChild(MatSort) matSort!:MatSort;


  constructor(private studentService : StudentService){}
ngOnInit(): void {
    //fetch students
    this.studentService.getStudent().subscribe(
      (successResponse)=>{
        this.liststudents = successResponse;
        console.log(successResponse[0].firstName);
        console.log(successResponse[0].lastName);
        this.dataSource = new MatTableDataSource<student>(this.liststudents);

        //pagination
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }


      },(errorResponse)=>{
      console.log(errorResponse);
    }
    );
}

filterStudents(searchid : string){
  this.dataSource.filter = searchid.trim().toLowerCase();
}
}

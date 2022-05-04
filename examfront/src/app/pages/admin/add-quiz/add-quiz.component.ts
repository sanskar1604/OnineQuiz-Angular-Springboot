import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  }
  categories=[
    {
      cid:'',
      title:''
    }
  ]
 
  

  constructor( private _quiz:QuizService,private _snack:MatSnackBar,private _cat:CategoryService) { }

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !!','error in loading data from server','error');

      }
      );
    
  }


  addQuiz(){
    console.log(this.quiz);
    if(this.quiz.title.trim()==''||this.quiz.description.trim()==''
    ||this.quiz.maxMarks.trim()==''||this.quiz.numberOfQuestions==''){
      this._snack.open('Title required','',{duration:3000,});
    return;
    }
    this._quiz.addQuiz(this.quiz).subscribe(
      (data:any)=>{
        Swal.fire("Succes ",'Quiz is Added successfully','success');

       this. quiz={
        category:{
          cid:''
        },
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:true,
          
        };
      },
      (error)=>{
        Swal.fire("Error!",'server error','error');
        console.log(error);
      }
    )
    
  }

}

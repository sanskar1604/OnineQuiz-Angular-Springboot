import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes=[
    {
      qId:23,
      title:'',
      description:'',
      maxMarks:'',
      numberOfQuestions:'',
      active:'',
      category:{
        title:'',
      },
    },
   
  ]

  constructor(private _quiz:QuizService,private snack:MatSnackBar) { }

  ngOnInit(): void {

    this._quiz.quizzes().subscribe(
      (data:any)=>{
        this.quizzes=data;
        console.log(this.quizzes);
      },
      (error)=>{
        console.log(error);
        Swal.fire('Error !',"Error in loading data !",'error')
      }
    )

  }
  deleteQuiz(qId:any){
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      }
    }).then((result) => {
      if (result.isConfirmed) {
    this._quiz.deleteQuiz(qId).subscribe(
      (data)=>{
        this.quizzes.filter((quiz)=>quiz.qId!=qId);

        console.log(data)
        // alert('sucess');
      },
      (error)=>{
        console.log(error);
        // alert('somthing went wrong');
        this.snack.open('something went wrong ','',{duration:3000})
      }
    )
    this.quizzes.filter((quiz)=>quiz.qId!=qId);
    
    Swal.fire('Deleted !', '', 'success')
    this.quizzes=this.quizzes.filter((quiz)=>quiz.qId != qId);

  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
}

    )
}
}

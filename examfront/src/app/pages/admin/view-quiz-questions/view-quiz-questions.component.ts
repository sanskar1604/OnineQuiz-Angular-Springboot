import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit {

  qId:any;
  qTitle:any;

  questions:any=[];
 

  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private snack:MatSnackBar

  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    
    this.qTitle=this._route.snapshot.params['title'];
    console.log('this is qid====='+this.qId);
    this._question.getQuestionOfQuiz(this.qId).subscribe(
      (data:any)=>{
        console.log(data)
        this.questions=data;
        console.log(this.questions)

      },
      (error)=>{
        console.log(error);
      }
    );
    console.log(this.qId,this.qTitle);

  }
  public deleteQuestion(qid:any){
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
          this._question.deleteQuestion(qid).subscribe(
        
          (data)=>{
            
            console.log(data)
            // alert('sucess');
            this.questions=this.questions.filter((q:any)=>q.quesId!=qid);
          },
          (error)=>{
            console.log(error);
            // alert('somthing went wrong');
            Swal.fire("Error !! ","Error in loading data","error");
            this.snack.open('something went wrong ','',{duration:3000})
          }
        )
        Swal.fire('Deleted !', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    }
    )
  }

}

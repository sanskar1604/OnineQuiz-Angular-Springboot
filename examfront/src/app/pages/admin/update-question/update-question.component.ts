import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  question:any;
  quesID:any;



  constructor(
    private _route :ActivatedRoute ,
    private _question:QuestionService,
    private _quiz:QuizService,
    private _router:Router

  ) { }

  ngOnInit(): void {
    this.quesID=this._route.snapshot.params['quesId'];

    this._question.getQuestion(this.quesID).subscribe(
      (data:any)=>{
        this.question=data;
        console.log(this.question);
      },(error)=>{
        console.log(error);
      }

    );

    this._quiz.getQuiz

   
    
  }
  public updateQuestion(){
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        Swal.fire("Success",'Quiz Updated',"success").then((e)=>{
          this._router.navigate(['/admin/quizzes']);
        });

      },(error)=>{
        Swal.fire("Error",'error in updating quiz','error');
        console.log(error);
        console.log(this.question);
      }
    )
  }

}

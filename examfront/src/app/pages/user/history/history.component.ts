import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  result:any=[
    {
      
    "rId": 46,
    "attempted": 1,
    "correctAnswers": 1,
    "marksGot": 100,
    "quiz": {
        "qId": 6,
        "title": "Test26",
        "description": "Test",
        "maxMarks": "100",
        "numberOfQuestions": "10",
       
        "category": {
            "cid": 5,
            "title": "Test",
            "description": "Test"
        }
    }
    
    }
  ]

  userId:any;
  user:any;
  quizId:any;
  constructor(
    private _question:QuestionService,
        private _loginService:LoginService,
        private _route:ActivatedRoute

  ) { }

  ngOnInit(): void {
     this.user=this._loginService.getUser();
    // console.log("=========USER========="+this.user.id+"===QUIZ ID==="+this.qid);
    this.userId=this.user.id;
    
    this._route.params.subscribe((params)=>{
      this.quizId=params['qid'];
      // alert("quiz id :"+this.quizId)
      if(this.quizId==0){
        this._question.getAllResult(this.userId).subscribe(
          (data)=>{
            this.result=data;
            console.log("Result Fetched");
          },(error)=>{
            alert("Error in Loading Result");
          }
        )
      }else{
        this._question.getAllResultByUserAndQuiz(this.userId,this.quizId).subscribe(
          (data)=>{
            this.result=data;
          },(error)=>{
            alert("Error in Loading Result kk");
          }
        )
      }
    })

   
  }

}

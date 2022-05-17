import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  
  user:any
  userId:any
  result:any={
    attempted:'',
    correctAnswers:'',
    marksGot:'',
    quiz:{

    },user:{

    }

  }


  qid:any;
  questions:any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer:any;
  videoRef: any;
  localStream:any;
  constructor(
    private locationSt:LocationStrategy, 
    private _route:ActivatedRoute, 
    private _question:QuestionService,
    private _loginService:LoginService
  ) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    this.loadQuestions()

    this.user=this._loginService.getUser();
    this.userId=this.user.id;
    this.result.quiz['qId']=this.qid;
    this.result.user['id']=this.userId;
  }
  setupCamera(){
    navigator.mediaDevices.getUserMedia({
      video:{width:150,height:100},
      audio:false
    }).then(stream=>{
      console.log(stream);
      this.videoRef.srcObject=stream;
      this.localStream=stream;
    })
  }
  videoOff(){
    this.localStream.getVideoTracks()[0].stop();
    console.log("call from videoOff function");
  }

  loadQuestions() {
    this._question.getQuestionOfQuizForTest(this.qid).subscribe(
      (data:any) => {
        
         

        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        this.startTimer();
      },(error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading question of quiz', 'error');
      }
    )
    }
  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title: 'Do you want to submit the quiz ?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if(e.isConfirmed){
        this.evalQuiz();
      }
    })
  }

  startTimer(){
    this.videoRef=document.getElementById('video');
    console.log(this.videoRef);
    this.setupCamera();
    let t:any = window.setInterval(()=>{
      if(this.timer <= 0){
        this.videoOff();
         this.evalQuiz();
         clearInterval(t);
      }else{
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer/60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }

  evalQuiz(){
    this.videoOff();
    // call to server to check questions
      this._question.evalQuiz(this.questions).subscribe(
        (data:any) => {  
          this.result.attempted=data.attempted;
          this.result.correctAnswers=data.correctAnswers;
          this.result.marksGot=data.marksGot;

          this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
          this.correctAnswers = data.correctAnswers;
          this.attempted = data.attempted;
          this.isSubmit = true;
         
          //updateREsult API calling
          this._question.updateResult(this.result).subscribe(
            (data:any)=>{
              console.log("=======Result Updated======");
            },(error)=>{
              console.log(error);
            }
          )


        },(error) => {
          console.log(error);
        }
      )
    // this.isSubmit = true;
    //     this.questions.forEach((q:any) => {
    //       if(q.givenAnswer == q.answer){
    //         this.correctAnswers++
    //         let marksSingle = this.questions[0].quiz.maxMarks/this.questions.length
    //         this.marksGot += marksSingle 
    //       }
    //       if(q.givenAnswer.trim() != ''){
    //         this.attempted++;
    //       }
    //     })
    //     console.log("Correct Answer :"+this.correctAnswers);
    //     console.log("Marks Got: "+this.marksGot);
  }
  printPage(){
    window.print()
  }
}


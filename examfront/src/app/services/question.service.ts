import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(
    private _http:HttpClient
  ) { }

  public getQuestionOfQuiz(qid:any){
       return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }

  public getQuestionOfQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
}
  
  public addQuetsion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
  }
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }
  public getQuestion(quesId:any){
    return this._http.get(`${baseUrl}/question/${quesId}`);
  }

  //eval quiz
  public evalQuiz(questions:any){
    return this._http.post(`${baseUrl}/question/eval-quiz`, questions);
  }

}

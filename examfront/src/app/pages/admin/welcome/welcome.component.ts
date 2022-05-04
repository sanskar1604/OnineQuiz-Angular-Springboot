import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  categories=[
    {
     cid:'',
      title:'',
      description:''
    }
   
  ];
  quizzes:any
  constructor(
    private _categories:CategoryService, private _quizzes:QuizService
  ) { }

  ngOnInit(): void {
    this._categories.categories().subscribe(
      (data:any) => {
        this.categories = data;
        console.log(this.categories);
      },(error) => {
        console.log(error);
      }
    )

    this._quizzes.quizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },(error) => {
        console.log(error);
      }
    )
  }

}

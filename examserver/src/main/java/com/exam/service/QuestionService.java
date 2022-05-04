package com.exam.service;

import java.util.List;
import java.util.Set;

import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;

public interface QuestionService {
	public Question addQuestion(Question question);
	public Question upadteQuestion(Question question);
	public Set<Question> getQuestions();
	public Question getQuestion(Long questionId);
	public Set<Question> getQuestionOfQuiz(Quiz Quiz);
	public void deleteQuestion(Long quesId);
	public Question get(Long questionsId);
	

}

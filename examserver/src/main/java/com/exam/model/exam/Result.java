package com.exam.model.exam;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.exam.model.User;

@Entity
@Table(name="result")
public class Result {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long  rId;
	private int attempted;
	private int correctAnswers;
	private int marksGot;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Quiz quiz;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	
	Result(){}


	public long getrId() {
		return rId;
	}


	public void setrId(long rId) {
		this.rId = rId;
	}


	public int getAttempted() {
		return attempted;
	}


	public void setAttempted(int attempted) {
		this.attempted = attempted;
	}


	public int getCorrectAnswers() {
		return correctAnswers;
	}


	public void setCorrectAnswers(int correctAnswers) {
		this.correctAnswers = correctAnswers;
	}


	public int getMarksGot() {
		return marksGot;
	}


	public void setMarksGot(int marksGot) {
		this.marksGot = marksGot;
	}


	public Quiz getQuiz() {
		return quiz;
	}


	public void setQuiz(Quiz quiz) {
		this.quiz = quiz;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	public Result(long rId, int attempted, int correctAnswers, int marksGot) {
		super();
		this.rId = rId;
		this.attempted = attempted;
		this.correctAnswers = correctAnswers;
		this.marksGot = marksGot;
	}
	
	
	

}

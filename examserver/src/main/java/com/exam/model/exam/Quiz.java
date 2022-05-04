package com.exam.model.exam;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.annotation.Generated;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.ManyToAny;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long qId;
	private String title;
	private String description;
	private String maxMarks;
	private String numberOfQuestions;
	private boolean active=false;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;
	
	@OneToMany(mappedBy = "quiz",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Question>questions=new HashSet<>();
	
	public Quiz() {
		
	}


	public Quiz(long qId, String title, String description, String maxMarks, String numberOfQuestions, boolean active) {
		super();
		this.qId = qId;
		this.title = title;
		this.description = description;
		this.maxMarks = maxMarks;
		this.numberOfQuestions = numberOfQuestions;
		this.active = active;
	}
	
 

	public Category getCategory() {
		return category;
	}
	
	


	public Set<Question> getQuestions() {
		return questions;
	}


	public void setQuestions(Set<Question> questions) {
		this.questions = questions;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


	public long getqId() {
		return qId;
	}


	public void setqId(long qId) {
		this.qId = qId;
	}


	public String getTitle() {
		return title;
	}


	public void setTitle(String title) {
		this.title = title;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getMaxMarks() {
		return maxMarks;
	}


	public void setMaxMarks(String maxMarks) {
		this.maxMarks = maxMarks;
	}


	public String getNumberOfQuestions() {
		return numberOfQuestions;
	}


	public void setNumberOfQuestions(String numberOfQuestions) {
		this.numberOfQuestions = numberOfQuestions;
	}


	public boolean isActive() {
		return active;
	}


	public void setActive(boolean active) {
		this.active = active;
	}
	
	
	

}

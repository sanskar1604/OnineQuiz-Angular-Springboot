package com.exam.service;

import java.util.List;

import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;

public interface ResultService {
	public Result getResult(Long rId);
	public Result addResult(Result result);
	public List<Result>allResult(User user_id);
	public List<Result>allResultByUserAndQuiz(User user_id,Quiz quiz_id);

}

package com.exam.service.impl;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.repo.ResultRepository;
import com.exam.service.ResultService;



@Service
public class ResultServiceImpl implements ResultService {
	
	@Autowired
	private ResultRepository resultRepository;
	

	@Override
	public Result getResult(Long rId) {
		// TODO Auto-generated method stub
		return this.resultRepository.findById(rId).get();
	}

	@Override
	public Result addResult(Result result) {
		// TODO Auto-generated method stub
		return this.resultRepository.save(result);
	}

	@Override
	public List<Result> allResult(User user_id) {
		// TODO Auto-generated method stub
		List<Result> result=this.resultRepository.findByUser(user_id);
		return result;
	}

	@Override
	public List<Result> allResultByUserAndQuiz(User user_id, Quiz quiz_id) {
		// TODO Auto-generated method stub
		List<Result> resultByQuiz=this.resultRepository.findByUserAndQuiz(user_id, quiz_id);
		return resultByQuiz;
	}

}

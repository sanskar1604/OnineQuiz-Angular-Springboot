package com.exam.controller;
import java.util.List;
import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;
import com.exam.service.ResultService;


@RestController
@CrossOrigin
@RequestMapping("/result")
public class ResultController {
	
	@Autowired
	private ResultService resultService;
	
	@PostMapping("/")
	public Result addResult(@RequestBody Result result) {
		return this.resultService.addResult(result);
	}
	
	@GetMapping("/{rId}")
	public Result getResult(@PathVariable("rId") Long rId) {
		return this.resultService.getResult(rId);
	}
	
	@GetMapping("/all/{user_id}")
	public List<Result> getAllResult(@PathVariable ("user_id") User user_id){
		return this.resultService.allResult(user_id);
	}
	@GetMapping("resultByQuiz/{user_id}/{quiz_id}")
	public List<Result> getAllResultByUserAndQuiz(@PathVariable("user_id")User user_id,@PathVariable("quiz_id")Quiz quiz_id){
		return this.resultService.allResultByUserAndQuiz(user_id, quiz_id);
	}
 
}

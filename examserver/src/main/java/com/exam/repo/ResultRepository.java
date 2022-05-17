package com.exam.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.model.User;
import com.exam.model.exam.Quiz;
import com.exam.model.exam.Result;

public interface ResultRepository extends JpaRepository<Result, Long> {
       public List<Result> findByUser(User user_id);
       public List<Result> findByUserAndQuiz(User user_id,Quiz quiz_id);
}

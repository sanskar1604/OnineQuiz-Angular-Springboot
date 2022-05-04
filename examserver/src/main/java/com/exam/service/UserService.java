package com.exam.service;import java.util.List;
import java.util.Set;

import com.exam.model.User;
import com.exam.model.UserRole;

public interface UserService {
	//creating user
	public User createUser(User user,Set<UserRole> userRoles) throws Exception;
	//get user by username
	public User getUser(String username);
	//Delete user by username
	public void deleteUser(Long userId);
	// GetAll Users
	public List<User> getAll();
	//Update User
	public User upadteUser(Long userId,User user1);
	

}

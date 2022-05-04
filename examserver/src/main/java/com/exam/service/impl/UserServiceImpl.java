package com.exam.service.impl;

import java.util.List; 
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.helper.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;

	//creating user
	
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
	User local=	this.userRepository.findByUsername(user.getUsername());
	if(local!=null) {
		System.out.println("User is Already there");
		throw new UserFoundException();
	}else {
		for(UserRole ur:userRoles) {
			roleRepository.save(ur.getRole());
		}
		user.getUserRoles().addAll(userRoles);
		local=this.userRepository.save(user);
	}
	
		return local;
	}

	//getting user by username
	@Override
	public User getUser(String username) {
	
		return this.userRepository.findByUsername(username);
	}

//	Delete user by id
	@Override
	public void deleteUser(Long userId) {
		// TODO Auto-generated method stub
		this.userRepository.deleteById(userId);
		
	}

	//getting all users
	@Override
	public List<User> getAll() {
		// TODO Auto-generated method stub
		return this.userRepository.findAll();
	}
	

//	Update User by id 
	@Override
	public User upadteUser(Long userId ,User user1) {
		// TODO Auto-generated method stub
		User upUser=this.userRepository.getById(userId);
		upUser.setFirstName(user1.getFirstName());
		upUser.setLastName(user1.getLastName());
		upUser.setPassword(user1.getPassword());
		upUser.setPhone(user1.getPassword());
		upUser.setEmail(user1.getEmail());
		 
		return this.userRepository.save(upUser);
	}

}

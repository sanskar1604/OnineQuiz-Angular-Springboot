package com.exam.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

import antlr.collections.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	//for creating user {   localhost:8080/user/   }
	@PostMapping("/")
	public User createUser(@RequestBody User user) throws Exception {
		user.setProfile("default.png");
		//encoding password with bcryptpassword
		user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));
		
		Set<UserRole>roles=new HashSet<>();
		Role role=new Role();
		role.setRoleId(45L);
		role.setRoleName("NORMAL");
		UserRole userRole=new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		return this.userService.createUser(user, roles);
		
	}
	
//	Get user by username localhost:8080/user/PradeepBairwa
	
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username") String username) {
		return this.userService.getUser(username);
	} 
	
//	Delete User By Id localhost:8080/user/9
	
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId")Long userId) {
		this.userService.deleteUser(userId);
	}
//	GetAll users
	
	@GetMapping("/all")
	public java.util.List<User> getAll() {
		return this.userService.getAll();    
			
	}
//	Update user By Id
	@PutMapping("/update/{userId}")
	public User upadteUser(  @PathVariable("userId")Long userId,@RequestBody User user1) {
		
		return this.userService.upadteUser(userId, user1);
		
	}
	
//	@ExceptionHandler(UserFoundException.class)
//	public ResponseEntity<?> exceptionHandler(UserFoundException ex){return ResponseEntity<?>}

}

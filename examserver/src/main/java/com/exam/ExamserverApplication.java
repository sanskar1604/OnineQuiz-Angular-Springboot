package com.exam;

import java.util.HashSet; 
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.exam.helper.UserFoundException;
import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;

@SpringBootApplication
public class ExamserverApplication //implements CommandLineRunner
{
//implements CommandLineRunner {

//	@Autowired
//	private UserService userService;
//	@Autowired
//	private BCryptPasswordEncoder bCryptPasswordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
	}

//	
//	public void run(String... args) throws Exception {
//		// TODO Auto-generated method stub
//		try {
//		System.out.println("starting code");
//		
//		User user=new User();
//		user.setFirstName("Pradeep");
//		user.setLastName("Bairwa");
//		user.setEmail("Pradeep.bairwa@DXC.com");
//		user.setUsername("KaleenBhaiiya");
//		user.setPassword(this.bCryptPasswordEncoder.encode("123"));
//		user.setEnabled(true);
//		user.setProfile("default.png");
//		
//		Role role1=new Role();
//		
//		role1.setRoleId(10L);
//		role1.setRoleName("ADMIN");
//		
//		Set<UserRole> userRoleSet=new HashSet<>();
//		UserRole userRole=new UserRole();
//		userRole.setRole(role1);
//		userRole.setUser(user);
//		
//		userRoleSet.add(userRole);
//		User user1=this.userService.createUser(user, userRoleSet);
//		System.out.println(user1.getUsername());
//		
//		
//		}catch (UserFoundException e) {
//			// TODO: handle exception
//			e.printStackTrace();
//		}

//    }
}

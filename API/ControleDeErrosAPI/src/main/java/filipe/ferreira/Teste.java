package filipe.ferreira;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class Teste {

	
	public static void main(String[] args) {
		System.out.println(new BCryptPasswordEncoder().encode("12345"));

		
		
		System.out.println();
	}
	

}

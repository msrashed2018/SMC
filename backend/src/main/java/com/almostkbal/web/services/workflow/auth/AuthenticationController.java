package com.almostkbal.web.services.workflow.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.almostkbal.web.services.workflow.auth.jwt.TokenProvider;
import com.almostkbal.web.services.workflow.auth.resource.JwtResponse;
import com.almostkbal.web.services.workflow.auth.resource.LoginUser;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
//@RequestMapping("/token")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private TokenProvider jwtProvider;

	@Autowired
	PasswordEncoder encoder;

	private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@RequestMapping(value = "/api/signin", method = RequestMethod.POST)
	public ResponseEntity<?> authenticate(@RequestBody LoginUser loginUser) throws AuthenticationException {
		logger.info("authenticate user[" + loginUser.getUsername() + "]");
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginUser.getUsername(), loginUser.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}

}

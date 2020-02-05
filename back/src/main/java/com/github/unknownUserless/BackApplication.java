package com.github.unknownUserless;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import java.util.Collections;

@ComponentScan
@SpringBootApplication
public class BackApplication {

	public static void main(String[] args) {

		SpringApplication app = new SpringApplication(BackApplication.class);
		app.run(args);
	}

}

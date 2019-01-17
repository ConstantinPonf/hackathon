package com.fairpay.backend;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	ApplicationRunner init() {
		// TODO: Initialize Smart Contract.
		List<String> list = new ArrayList<>();
		list.add("Test");
		list.add("1");
		list.add("2");
		return args -> {
			list.forEach(System.out::println);
		};
	}
}


package com.mash;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.mash.mapper")
public class MashMallApplication {

	public static void main(String[] args) {
		SpringApplication.run(MashMallApplication.class, args);
	}
}

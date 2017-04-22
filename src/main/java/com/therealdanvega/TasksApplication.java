package com.therealdanvega;

import com.therealdanvega.domain.Task;
import com.therealdanvega.service.TaskService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TasksApplication {

	public static void main(String[] args) {
		SpringApplication.run(TasksApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(TaskService taskService){
		return args -> {
			taskService.save( new Task(1L,"Create Spring Boot Application",false));
			taskService.save( new Task(2L,"Create Angular 2 Application",false));
			taskService.save( new Task(3L,"Run the demo application",false));
		};
	}
}

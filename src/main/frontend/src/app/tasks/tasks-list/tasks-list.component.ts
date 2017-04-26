import { Component, OnInit } from '@angular/core';
import {Task} from "../task.model";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  constructor(private taskService: TaskService) {
    // fetch our tasks from our Spring Boot Application
    taskService.getTasks()
        .subscribe(
            (tasks: any[]) => this.tasks = tasks,
            (error) => console.log(error),
            () => console.log('Task Service completed.')
        );
  }

  ngOnInit() {
  }

  getTaskClass(task: Task){
    let completed: string = 'list-group-item list-group-item-success';
    let incomplete: string = 'list-group-item list-group-item-danger';
    return task.completed ? completed : incomplete;
  }
}

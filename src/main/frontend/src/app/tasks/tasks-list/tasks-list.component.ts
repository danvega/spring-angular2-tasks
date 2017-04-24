import { Component, OnInit } from '@angular/core';
import {Task} from "../task.model";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {
  tasks: Task[] = [];
  constructor() {
    this.tasks = [
        new Task('Create A Spring Boot Application', true),
        new Task('Create Angular Application', true),
        new Task('Run Application Demo', true),
        new Task('Make 1 Million Dollars!', false)
    ];
  }

  ngOnInit() {
  }

  getTaskClass(task: Task){
    let completed: string = 'list-group-item list-group-item-success';
    let incomplete: string = 'list-group-item list-group-item-danger';
    return task.completed ? completed : incomplete;
  }
}

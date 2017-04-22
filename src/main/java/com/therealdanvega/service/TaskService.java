package com.therealdanvega.service;

import com.therealdanvega.domain.Task;

import java.util.List;

public interface TaskService {

    public Iterable<Task> list();

    public void save(Task task);
}

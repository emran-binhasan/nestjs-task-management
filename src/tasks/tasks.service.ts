import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v7 as uuid } from 'uuid';
import { createTaskDto } from './dto/create-task.dto';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: getTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((tasks) => tasks.status === status);
    }
    if (search) {
      tasks = tasks.filter((tasks) => {
        if (
          tasks.title.includes(search) ||
          tasks.description.includes(search)
        ) {
          return true
        }
        return false
      });
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new Error(`Task with ID "${id}" not found`);
    }
    return found;
  }

  createTask(createTaskDto: createTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): void {
    const idx = this.tasks.findIndex((task) => task.id === id);
    if (idx !== -1) {
      this.tasks.splice(idx, 1);
    }
  }

  updateTaskById(id: string, body: Task): Task {
    let oldTask = this.tasks.find((task) => task.id === id);
    if (!oldTask) {
      throw new Error('error');
    }
    oldTask.title = body.title;
    oldTask.description = body.description;
    oldTask.status = body.status;
    return oldTask;
  }
}

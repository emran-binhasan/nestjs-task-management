import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { createTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: createTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id')
  updateTaskById(@Param('id') id: string, @Body() body:Task) {
    return this.taskService.updateTaskById(id,body);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    return this.taskService.deleteTaskById(id);
  }
}

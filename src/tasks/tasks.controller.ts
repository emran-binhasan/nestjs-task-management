import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/update-task-dto';
import { Task } from './task.entity';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto:getTasksFilterDto):Promise<Task[]>{
    return this.taskService.getTasks(filterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task > {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto:createTaskDto): Promise<Task>{
     return this.taskService.createTask(createTaskDto)
  }


  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto:updateTaskDto):Promise <Task> {
    return this.taskService.updateTask(id,updateTaskDto);
  }

  @Delete('/:id')
  removeTask(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
}

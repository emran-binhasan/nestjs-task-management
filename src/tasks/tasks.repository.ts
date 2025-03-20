import { Repository, DataSource } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksRepository extends Repository<Task> {
  async getTasks(filterDto:getTasksFilterDto):Promise<Task[]>{
    const query = this.createQueryBuilder('task');
    const tasks =await query.getMany();
    return tasks
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { createTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { updateTaskDto } from './dto/update-task-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { getTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly tasksRepository: Repository<Task>,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } }); // ✅ Ensure correct findOne syntax
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }

  async getTasks(filterDto: getTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.tasksRepository.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status =:status', { status });
    }
    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    return query.getMany();
  }

  async createTask(createTaskDto: createTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.tasksRepository.save(task);
    return task;
  }

  async updateTask(id: string, updateTaskDto: updateTaskDto): Promise<Task> {
    const task = this.getTaskById(id);
    const upateTask = { ...updateTaskDto };
    await this.tasksRepository.update(id, upateTask);
    return task;
  }

  async removeTask(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}

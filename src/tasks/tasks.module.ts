import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity'; // Import Task entity
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // ✅ Use Task entity instead
  controllers: [TasksController],
  providers: [TasksService,TasksRepository],
})
export class TasksModule {}

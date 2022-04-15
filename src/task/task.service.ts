import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './entities/task.entity'
import { TaskStatus } from './task.enum';
import { TaskRepository } from './task.repository';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ) {}

  async getByID(id: number): Promise<Task> {
    const res = await this.taskRepository.findOne(id)
    if (!res ) {
      throw new NotFoundException(`This task with ID${id} is not exist!`)
    }
    return res
  }

  async getTask(taskFilterDto: GetTaskFilterDto): Promise<Task[]> {     
    return await this.taskRepository.getTask(taskFilterDto);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto)
  }     
  
  async deleteTask(id: number): Promise<void> {
    const res = await this.taskRepository.delete(id)
    if (!res) {
      throw new NotFoundException(`This task with ID${id} is not exist!`)
    }
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getByID(id)
    task.status = status
    await task.save()
    return task
  }

//   getByFilter(filterDto: GetTaskFilterDto): Task[] {
//     const { status, search } = filterDto
//     let tasks = this.getAll()
//     if (status) {
//       tasks = tasks.filter(a => a.status === status)
//     }
//     if (search) {
//       tasks = tasks.filter(a => a.title.includes(search) || a.description.includes(search))
//     }
//     return tasks;
//   }

//   update(id: string, status: TaskStatus) {
//     const task = this.getById(id)
//     task.status = status
//     return task;
//   }

}
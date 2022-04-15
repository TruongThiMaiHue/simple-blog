import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity'
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipe/task-status-validation.pipe';
import { TaskStatus } from './task.enum';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get() 
  getTask(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.taskService.getTask(filterDto) 
  }

  @Get(':id')
  findByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch(':id')
  updateStatus(
    @Param('id', ParseIntPipe) id: number, 
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Promise<Task> {
    return this.taskService.updateStatus(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}

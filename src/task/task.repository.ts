import { Task } from './entities/task.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task.enum'
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const newTask = new Task()
        const { title, description } = createTaskDto
        newTask.title = title
        newTask.description = description
        newTask.status = TaskStatus.OPEN
        return await newTask.save()
    }    
    
    async getTask(getTaskFilterDto: GetTaskFilterDto): Promise<Task[]>{
        const { status, search } = getTaskFilterDto
        const query = this.createQueryBuilder('task')

        if (status) {
            query.andWhere('task.status = :status', { status })
        }
        if (search)  {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`})
        }
        const tasks = await query.getMany()
        return tasks
    }
}
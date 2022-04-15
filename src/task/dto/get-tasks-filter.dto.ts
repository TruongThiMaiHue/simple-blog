import { IsOptional, IsIn } from 'class-validator'
import { TaskStatus } from "../task.enum";

export class GetTaskFilterDto {   //search by status and title/description
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    //check xem status user muốn tìm có nằm trong các defaut trạng thái task ko
    status: TaskStatus;

    @IsOptional()
    search: string

}
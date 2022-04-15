import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task.enum';
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: any) {  //value là giá trị mà user truyền lên trong body đó
        value = value.toUpperCase();
        if (!this.isValid(value)) {
            throw new BadRequestException(`${value} is not a valid status`)
        }
        return value;
    }
    private isValid(value: any) {
        const idx = this.allowedStatuses.indexOf(value);
        return idx !== -1;
    }
}
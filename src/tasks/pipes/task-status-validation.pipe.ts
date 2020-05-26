import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: TaskStatus) {
        if(!this.isStatusValid(value)) {
            throw new BadRequestException('Invalid status');
        }
        return value;
    }

    private isStatusValid(status: TaskStatus): boolean {
        return Object.values(TaskStatus).includes(status);
    }
}
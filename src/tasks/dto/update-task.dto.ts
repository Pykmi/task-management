import { TaskStatus } from '../task-status.enum';
import { IsIn, IsNotEmpty } from "class-validator";

export class UpdateTaskDto {
    @IsNotEmpty()
    id: string;

    @IsIn(Object.values(TaskStatus))
    status: TaskStatus;
}
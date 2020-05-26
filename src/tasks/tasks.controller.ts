import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskService.getTasks(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): void {
        this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateStatusById(
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Param('id') id: number
    ): Promise<Task> {
        return this.taskService.updateTaskStatusById(id, status);
    }

    /* @Get() */
    /* getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if(!filterDto.status && !filterDto.search) {
            return this.taskService.getAllTasks();
        }

        return this.taskService.getTasksWithFilters(filterDto);
    }

    @Patch('/:id/status')
    updateStatusById(
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Param('id') id: string
    ): Task {
        return this.taskService.updateTaskById(id, status);
    } */
}

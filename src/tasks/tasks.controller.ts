import { Controller, Get, Post, Body, Param, Delete, Patch, UsePipes, ValidationPipe, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {}

    /* @Get() */
    getAllTasks(): Task[] {
        return this.taskService.getAllTasks();
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if(!filterDto.status && !filterDto.search) {
            return this.taskService.getAllTasks();
        }

        return this.taskService.getTasksWithFilters(filterDto);
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id') id: string): void {
        this.taskService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateStatusById(
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @Param('id') id: string
    ): Task {
        return this.taskService.updateTaskById(id, status);
    }
}

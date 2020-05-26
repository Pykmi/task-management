import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    private filterStatus(task: Task, filter: GetTasksFilterDto): boolean {
        return filter.status ? task.status === filter.status.toUpperCase() : false;
    }

    private filterTitles(task: Task, filter: GetTasksFilterDto): boolean {
        return filter.search ? task.title.toUpperCase().includes(filter.search.toUpperCase()) : false;
    }

    private filterDesc(task: Task, filter: GetTasksFilterDto): boolean {
        return filter.search ? task.description.toUpperCase().includes(filter.search.toUpperCase()) : false;
    }

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        return this.tasks.filter(task => this.filterTitles(task, filterDto) || this.filterStatus(task, filterDto) || this.filterDesc(task, filterDto));
    }

    getTaskById(id: string): Task {
        const foundTask = this.tasks.find(task => task.id === id);
        if(!foundTask) {
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }

        return foundTask;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };

        this.tasks.push(task);
        return task;
    }

    deleteTaskById(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    updateTaskById(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}

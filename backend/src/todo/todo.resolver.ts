/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/todo.model';
import { TodoService } from 'src/todo/todo.service';

@Resolver((of) => Todo)
export class TodoResolver {
  constructor(@Inject(TodoService) private todoService: TodoService) {}

  @Query((returns) => [Todo])
  async searchTodos(
    @Args('done', { type: () => Boolean, nullable: true }) done?: boolean,
    @Args('text', { type: () => String, nullable: true }) text?: string,
  ) {
    return this.todoService.search(done, text);
  }

  @Query((returns) => [Todo])
  async getAllTodo() {
    return this.todoService.findAll();
  }

  @Query((returns) => Todo)
  async getAllTodoById(@Args('id', { type: () => Int }) id: number) {
    return this.todoService.findOne(id);
  }

  @Mutation((returns) => Todo)
  async createTodo(
    @Args('text') text: string,
    @Args('done', { type: () => Boolean, defaultValue: false }) done: boolean,
  ): Promise<Todo> {
    return this.todoService.create(text, done);
  }

  @Mutation((returns) => Todo)
  async updateTodoStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('text', { type: () => String }) text: string,
    @Args('done', { type: () => Boolean }) done: boolean,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.done = done;
    todo.text = text;
    return this.todoService.update(id, text, done);
  }

  @Mutation((returns) => Boolean)
  async deleteTodo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new Error('Todo not found');
    }
    this.deleteTodo(id);
    return true;
  }
}

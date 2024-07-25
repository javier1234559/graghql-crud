/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from 'src/todo/todo.model';

@Resolver((of) => Todo)
export class TodoResolver {
  todos: Todo[] = [
    {
      id: 1,
      text: 'Todo 1',
      done: false,
    },
    {
      id: 2,
      text: 'Todo 2',
      done: true,
    },
  ];

  @Query((returns) => [Todo])
  async getAllTodo() {
    return this.todos;
  }

  @Query((returns) => Todo)
  async getAllTodoById(@Args('id', { type: () => Int }) id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  @Mutation((returns) => Todo)
  async createTodo(
    @Args('text') text: string,
    @Args('done', { type: () => Boolean, defaultValue: false }) done: boolean,
  ): Promise<Todo> {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      text,
      done,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  @Mutation((returns) => Todo)
  async updateTodoStatus(
    @Args('id', { type: () => Int }) id: number,
    @Args('text', { type: () => String }) text: string,
    @Args('done', { type: () => Boolean }) done: boolean,
  ): Promise<Todo> {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.done = done;
    todo.text = text;
    return todo;
  }

  @Mutation((returns) => Boolean)
  async deleteTodo(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      throw new Error('Todo not found');
    }
    this.todos.splice(index, 1);
    return true;
  }
}

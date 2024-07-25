import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/todo.model';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async search(done?: boolean, text?: string): Promise<Todo[]> {
    const query = this.todoRepository.createQueryBuilder('todo');

    if (done !== undefined) {
      query.andWhere('todo.done = :done', { done });
    }

    if (text) {
      query.andWhere('todo.text LIKE :text', { text: `%${text}%` });
    }

    return query.getMany();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({
      where: { id },
    });
  }

  async create(text: string, done: boolean): Promise<Todo> {
    const todo = new Todo();
    todo.text = text;
    todo.done = done;
    return this.todoRepository.save(todo);
  }

  async update(id: number, text: string, done: boolean): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id },
    });
    todo.text = text;
    todo.done = done;
    return this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}

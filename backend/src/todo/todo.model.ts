import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field((type) => Int)
  id: number;

  @Field()
  text: string;

  @Field((type) => Boolean)
  done: boolean;
}

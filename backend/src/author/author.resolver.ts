// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { Args, Parent, ResolveField, Resolver , Query } from '@nestjs/graphql';
// import { Field, Int, ObjectType } from '@nestjs/graphql';

// @ObjectType()
// export class Post {
//   @Field(type => Int)
//   id: number;

//   @Field()
//   title: string;

//   @Field(type => Int, { nullable: true })
//   votes?: number;
// }

// @ObjectType()
// export class Author {
//   @Field(type => Int)
//   id: number;

//   @Field({ nullable: true })
//   firstName?: string;

//   @Field({ nullable: true })
//   lastName?: string;

//   @Field(type => [Post])
//   posts: Post[];
// }

// @Resolver(of => Author)
// export class AuthorsResolver {

//   @Query(returns  => Author)
//   async author(@Args('id', { type: () => Int }) id: number) {
//     return null;
//   }

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     console.log(id)
//     return null;
//   }
// }
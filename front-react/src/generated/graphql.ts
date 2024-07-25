import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Scalars['Boolean']['output'];
  updateTodoStatus: Todo;
};


export type MutationCreateTodoArgs = {
  done?: Scalars['Boolean']['input'];
  text: Scalars['String']['input'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateTodoStatusArgs = {
  done: Scalars['Boolean']['input'];
  id: Scalars['Int']['input'];
  text: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAllTodo: Array<Todo>;
  getAllTodoById: Todo;
};


export type QueryGetAllTodoByIdArgs = {
  id: Scalars['Int']['input'];
};

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  text: Scalars['String']['output'];
};

export type GetAllTodosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTodosQuery = { __typename?: 'Query', getAllTodo: Array<{ __typename?: 'Todo', id: number, text: string, done: boolean }> };

export type UpdateTodoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  text: Scalars['String']['input'];
  done: Scalars['Boolean']['input'];
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodoStatus: { __typename?: 'Todo', id: number, text: string, done: boolean } };

export type AddTodoMutationVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type AddTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: number, text: string, done: boolean } };

export type DeleteTodoMutationVariables = Exact<{
  deleteTodoId: Scalars['Int']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: boolean };


export const GetAllTodosDocument = gql`
    query GetAllTodos {
  getAllTodo {
    id
    text
    done
  }
}
    `;

/**
 * __useGetAllTodosQuery__
 *
 * To run a query within a React component, call `useGetAllTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllTodosQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, options);
      }
export function useGetAllTodosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, options);
        }
export function useGetAllTodosSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetAllTodosQuery, GetAllTodosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllTodosQuery, GetAllTodosQueryVariables>(GetAllTodosDocument, options);
        }
export type GetAllTodosQueryHookResult = ReturnType<typeof useGetAllTodosQuery>;
export type GetAllTodosLazyQueryHookResult = ReturnType<typeof useGetAllTodosLazyQuery>;
export type GetAllTodosSuspenseQueryHookResult = ReturnType<typeof useGetAllTodosSuspenseQuery>;
export type GetAllTodosQueryResult = Apollo.QueryResult<GetAllTodosQuery, GetAllTodosQueryVariables>;
export const UpdateTodoDocument = gql`
    mutation UpdateTodo($id: Int!, $text: String!, $done: Boolean!) {
  updateTodoStatus(id: $id, text: $text, done: $done) {
    id
    text
    done
  }
}
    `;
export type UpdateTodoMutationFn = Apollo.MutationFunction<UpdateTodoMutation, UpdateTodoMutationVariables>;

/**
 * __useUpdateTodoMutation__
 *
 * To run a mutation, you first call `useUpdateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTodoMutation, { data, loading, error }] = useUpdateTodoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      text: // value for 'text'
 *      done: // value for 'done'
 *   },
 * });
 */
export function useUpdateTodoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTodoMutation, UpdateTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, options);
      }
export type UpdateTodoMutationHookResult = ReturnType<typeof useUpdateTodoMutation>;
export type UpdateTodoMutationResult = Apollo.MutationResult<UpdateTodoMutation>;
export type UpdateTodoMutationOptions = Apollo.BaseMutationOptions<UpdateTodoMutation, UpdateTodoMutationVariables>;
export const AddTodoDocument = gql`
    mutation AddTodo($text: String!) {
  createTodo(text: $text, done: false) {
    id
    text
    done
  }
}
    `;
export type AddTodoMutationFn = Apollo.MutationFunction<AddTodoMutation, AddTodoMutationVariables>;

/**
 * __useAddTodoMutation__
 *
 * To run a mutation, you first call `useAddTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutation, { data, loading, error }] = useAddTodoMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useAddTodoMutation(baseOptions?: Apollo.MutationHookOptions<AddTodoMutation, AddTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTodoMutation, AddTodoMutationVariables>(AddTodoDocument, options);
      }
export type AddTodoMutationHookResult = ReturnType<typeof useAddTodoMutation>;
export type AddTodoMutationResult = Apollo.MutationResult<AddTodoMutation>;
export type AddTodoMutationOptions = Apollo.BaseMutationOptions<AddTodoMutation, AddTodoMutationVariables>;
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($deleteTodoId: Int!) {
  deleteTodo(id: $deleteTodoId)
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      deleteTodoId: // value for 'deleteTodoId'
 *   },
 * });
 */
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
import { createTodoHandler, deleteTodoHandler, fetchTodoById, fetchTodos, fetchUserById } from "../../handler/handler";

export const todoResolvers = {
    Query: {
        getAllTodos: async () => {
            try {
                // Call the handler function to fetch all todos
                const todos = await fetchTodos();
                return todos;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch todos');
            }
        },

        getTodoById: async (_parent: any, { id }: { id: string }) => {
            try {
                // Call the handler function to fetch a todo by its ID
                const todo = await fetchTodoById(id);
                if (!todo) {
                    throw new Error(`Todo with id ${id} not found`);
                }
                return todo;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch todo by id');
            }
        }
    },

    Todo: {
        user: async (todo: any) => {
            try {
                // Fetch the user associated with this todo using its userId
                const user = await fetchUserById(todo.userId);
                return user;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to fetch user for todo');
            }
        }
    },

    Mutation: {
        createTodo: async (_parent: any, { userId, title }: { userId: string, title: string }) => {
            try {
                // Call the handler function to create a new todo
                const newTodo = await createTodoHandler(userId, title);
                return newTodo;
            } catch (error) {
                console.error(error);
                throw new Error('Failed to create todo');
            }
        },
        deleteTodo: async (_parent: any, { id }: { id: string }) => {
            try {
                return await deleteTodoHandler(id);
            } catch (error) {
                throw new Error('Failed to delete todo');
            }
        }
    }
};

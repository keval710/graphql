// src/handlers.ts
import { Todo } from '../../schema/todo.schema';
import { User } from '../../schema/user.schema';
import throwError, { errorType } from '../../helper/errorHandler';

// Fetch all users
export const fetchUsers = async () => {
    try {
        // Populate the 'todos' field and return all users
        const users = await User.find().populate('todos');
        return users;
    } catch (error) {
        throw error;
    }
};

// Fetch a specific user by id
export const fetchUserById = async (id: string) => {
    try {
        // Find the user by ID and populate the 'todos' field
        const user = await User.findOne({ _id: id }).populate('todos');
        if (!user) {
            throw throwError(errorType.USER_NOT_FOUND.message, errorType.USER_NOT_FOUND);
        }
        return user;
    } catch (error: any) {
        throw error;
    }
};

export const createUserHandler = async (name: string, email: string) => {
    try {
        const newUser = new User({ name, userName: `${name}-${email}`, email });
        await newUser.save();
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create user');
    }
}

export const deleteUserHandler = async (id: string) => {
    try {
        const user = await User.findOneAndDelete({ _id: id });
        if (!user) {
            throw throwError(errorType.FAILED_FETCH.message, errorType.FAILED_FETCH);
        }
        Todo.deleteMany({ userId: id }).exec(); // Delete all todos associated with the user
        return {
            message: 'User deleted successfully'
        };
    } catch (error: any) {
        throw error;
    }
}

// Fetch all todos
export const fetchTodos = async () => {
    try {
        // Fetch all todos from the database
        const todos = await Todo.find().populate('userId');
        return todos;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch todos');
    }
};

// Fetch a specific todo by id
export const fetchTodoById = async (id: string) => {
    try {
        const todo = await Todo.findOne({ _id: id }).populate('userId');
        if (!todo) {
            return []; // Return null if not found
        }
        return todo;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch todo by id');
    }
};

export const createTodoHandler = async (userId: string, title: string) => {
    try {
        const newTodo = new Todo({
            userId,
            title,
            completed: false,  // Assuming a new todo starts as incomplete
        });
        await newTodo.save(); // Save the new todo to the database
        return newTodo; // Return the newly created todo
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create todo');
    }
};

export const deleteTodoHandler = async (id: string) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: id });
        if (!todo) {
            throw throwError(errorType.FAILED_FETCH.message, errorType.FAILED_FETCH);
        }
        return {
            message: 'Todo deleted successfully'
        };
    } catch (error: any) {
        throw error;
    }
}
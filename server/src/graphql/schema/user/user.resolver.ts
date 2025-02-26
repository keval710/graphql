import { createUserHandler, deleteUserHandler, fetchUserById, fetchUsers } from "../../handler/handler";
import { errorType } from '../../../helper/errorHandler';

export const userResolvers = {
    Query: {
        getAllUsers: async () => {
            try {
                return await fetchUsers();
            } catch (error) {
                throw new Error('Failed to fetch users');
            }
        },
        getUserById: async (_: any, { id }: any, context: any) => {
            try {
                const res = await fetchUserById(id);
                return res;
            } catch (error: any) {
                if (error?.extensions?.code?.message === errorType.USER_NOT_FOUND.message) {
                    return error;
                } else {
                    throw new Error('Failed to fetch user');
                }
            }
        }
    },

    User: {
        id: (user: any) => user._id.toString(), // Map _id to id explicitly
    },

    Mutation: {
        createUser: async (_: any, { name, email }: any) => {
            try {
                return await createUserHandler(name, email);
            } catch (error) {
                throw new Error('Failed to create user');
            }
        },
        deleteUser: async (_: any, { id }: any) => {
            try {
                return await deleteUserHandler(id);
            } catch (error) {
                throw new Error('Failed to delete user');
            }
        }
    }
};

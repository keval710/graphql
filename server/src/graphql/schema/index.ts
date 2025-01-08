import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { todoTypeDefs } from "./todo/todo.typeDefs";
import { userTypeDefs } from "./user/user.typeDefs";
import { todoResolvers } from "./todo/todo.resolver";
import { userResolvers } from "./user/user.resolver";
import { makeExecutableSchema } from '@graphql-tools/schema'

export const typeDefs = mergeTypeDefs([userTypeDefs, todoTypeDefs]);
export const resolvers = mergeResolvers([todoResolvers, userResolvers]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
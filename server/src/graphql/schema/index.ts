import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from '@graphql-tools/schema'
import { todoTypeDefs } from "./todo/todo.typeDefs";
import { userTypeDefs } from "./user/user.typeDefs";
import { todoResolvers } from "./todo/todo.resolver";
import { userResolvers } from "./user/user.resolver";
import { fileResolver } from "./file/file.resolver";
import { fileType } from "./file/file.type";

export const typeDefs = mergeTypeDefs([userTypeDefs, todoTypeDefs, fileType]);
export const resolvers = mergeResolvers([todoResolvers, userResolvers, fileResolver]);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
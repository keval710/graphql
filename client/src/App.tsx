import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TODO, ADD_USER, GET_TODOS_AND_USERS } from "./gql";

const App = () => {
  const { loading, error, data, refetch } = useQuery(GET_TODOS_AND_USERS);
  const [addTodo, { }] = useMutation(ADD_TODO);
  const [addUser, { }] = useMutation(ADD_USER);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  function handleTodoSubmit(e: any) {
    e.preventDefault();
    addTodo({
      variables: {
        userId,
        title
      }
    });
    setTitle('');
    setUserId('');
    refetch();
  }

  function handleUserSubmit(e: any) {
    e.preventDefault();
    addUser({
      variables: {
        name,
        email
      }
    });
    setName('');
    setEmail('');
    refetch();
  }

  return (
    <div className="min-h-screen bg-gray-100 py-3">
      <header className="text-center p-5 bg-gray-200 shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">GraphQL</h1>
      </header>
      <main className="container mx-auto px-4 py-5">

        {/* Add Todo Form */}
        <section className="mb-8 flex flex-col md:flex-row gap-8">
          {/* Add Todo Section */}
          <div className="bg-white shadow-md rounded-md p-6 flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Todo</h2>
            <form className="space-y-4" onSubmit={(e) => handleTodoSubmit(e)}>
              <div>
                <label htmlFor="todo-id" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <input
                  type="text"
                  name="id"
                  id="todo-id"
                  placeholder="Enter User ID"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="todo-title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="todo-title"
                  placeholder="Enter Todo Title"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Add Todo
              </button>
            </form>
          </div>

          {/* Add User Section */}
          <div className="bg-white shadow-md rounded-md p-6 flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add User</h2>
            <form className="space-y-4" onSubmit={(e) => handleUserSubmit(e)}>
              <div>
                <label htmlFor="user-name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="user-name"
                  placeholder="Enter User Name"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="user-email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="user-email"
                  placeholder="Enter Email Address"
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700"
              >
                Add User
              </button>
            </form>
          </div>
        </section>

        {/* Todos Section */}
        <section className="mb-8">
          {loading ? (
            <p className="text-center text-gray-600">Loading todos...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error fetching todos :(</p>
          ) : (
            <div className="bg-white shadow-md rounded-md p-6 overflow-x-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Todos</h2>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Id</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Title</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getAllTodos.map((todo: { id: number; title: string, completed: boolean }) => (
                    <tr key={todo.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{todo.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{todo.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{`${todo.completed}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Users Section */}
        <section>
          {loading ? (
            <p className="text-center text-gray-600">Loading users...</p>
          ) : error ? (
            <p className="text-center text-red-500">Error fetching users :(</p>
          ) : (
            <div className="bg-white shadow-md rounded-md p-6 overflow-x-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Users</h2>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">User ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">Todos</th>
                  </tr>
                </thead>
                <tbody>
                  {data.getAllUsers.map((user: { id: number; name: string; email: string; todos: any[] }) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <ul className="list-disc ml-4">
                          {user.todos.length > 0 ? (
                            user.todos.map((todo: { id: number; title: string }) => (
                              <li key={todo.id} className="text-gray-600">
                                {todo.title}
                              </li>
                            ))
                          ) : (
                            <p className="text-gray-500">No Todos</p>
                          )}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default App
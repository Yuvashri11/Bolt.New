import dedent from "dedent";
export default {
  SUGGESTIONS: [
    'Create TODO App in React',
    'Create Budget Track App',
    'Create Gym Management Portal Dashboard',
    'Create VITE app',
    'Create Login Signup Screen',
    'Create Quizz App On History'
  ],

  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  SIGNIN_HEADING: 'Continue With Bolt.New',
  SIGNIN_SUBHEADING: 'To use Bolt you must log into an existing account.',
  SIGNIN_AGREEMENT_TEXT: 'By using Bolt, you agree to the collection of necessary usage data to improve your experience.',

  DEMO: {
    'Create TODO App in React': {
      projectTitle: 'React ToDo App',
      description: 'A basic ToDo App in React with Tailwind CSS.',
      generatedFiles: [
        '/src/App.js',
        '/src/components/TodoList.js',
        '/src/components/TodoForm.js',
        '/src/components/TodoItem.js',
        '/src/index.css'
      ],
      files: {
        '/src/App.js': {
          code: `import React, { useState } from 'react';
import './index.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text, completed: false }];
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">React ToDo App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;`
        },

        '/src/components/TodoForm.js': {
          code: `import React, { useState } from 'react';

function TodoForm({ addTodo }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="border p-2 flex-grow"
        placeholder="Enter a task"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2">
        Add
      </button>
    </form>
  );
}

export default TodoForm;`
        },

        '/src/components/TodoList.js': {
          code: `import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleTodo, deleteTodo }) {
  return (
    <ul className="space-y-2">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;`
        },

        '/src/components/TodoItem.js': {
          code: `import React from 'react';

function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
  return (
    <li
      className={\`p-2 border rounded flex justify-between items-center \${todo.completed ? 'line-through text-gray-400' : ''}\`}
    >
      <span onClick={() => toggleTodo(index)} className="cursor-pointer">
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(index)}
        className="ml-4 text-red-500 hover:underline"
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;`
        },

        '/src/index.css': {
          code: `body {
  font-family: sans-serif;
  background: #111827;
  color: #fff;
}

input, button {
  outline: none;
}`
        }
      }
    }
  }
};

export const DEPENDANCY = {
  "postcss": "^8.4.0",
  "tailwindcss": "^3.4.1",
  "autoprefixer": "^10.0.0",
  "uuid4": "^2.0.3",
  "tailwind-merge": "^2.4.0",
  "tailwindcss-animate": "^1.0.7",
  "lucide-react": "latest",
  "react-router-dom": "latest",
  "firebase": "^11.1.0",
  "@google/generative-ai": "^0.21.0"
};
export const DEFAULT_FILE = {
  "/public/index.html": {
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React App</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`
  },

  "/src/index.js": {
    code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);`
  },

  "/src/App.js": {
    code: `import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Hello from /src/App.js 🎉</h1>
    </div>
  );
}`
  },

  "/src/index.css": {
    code: `/* Tailwind base layers (auto-applied via CDN) */
body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #0f172a;
  color: white;
}`
  }
};

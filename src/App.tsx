import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }
  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
     <Authenticator>
      {({ signOut }) => (
    <main>
      <img> src="https://static.wixstatic.com/media/7ee455_09c333a33612498e8b90bbf4035221d9~mv2.jpg/v1/fill/w_256,h_316,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ReindeerGeneric_edited_edited_edited_edi.jpg" alt="ReindeerTek"</img>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (<li
            onClick={() => deleteTodo(todo.id)}
            key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
        <button onClick={signOut}>Sign out</button>
    </main>
      )}
    </Authenticator>
  );
}

export default App;

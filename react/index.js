import { createElement, useEffect, useState } from "//cdn.skypack.dev/react";
import ReactDOM from "//cdn.skypack.dev/react-dom";
import { html } from "//cdn.skypack.dev/htm/react";
import { useForm } from "//cdn.skypack.dev/react-hook-form";
import Dexie from "//cdn.skypack.dev/dexie";

const db = new Dexie("react");

db.version(1).stores({
  todos: `++id, name`,
});

const App = () => {
  const [todos, setTodos] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = ({ name }) => {
    db.todos.add({ name });
    fetchTodos();
    setValue("name", "");
  };

  const fetchTodos = async () => {
    setTodos(await db.todos.toArray());
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return html`
    <div>
      <form onSubmit=${handleSubmit(onSubmit)}>
        ${createElement("input", { ...register("name") })}
        <button>add</button>
      </form>
      <ul>
        ${todos.map(
          (todo) => html`<li>
            <span>${todo.name}</span>
          </li>`
        )}
      </ul>
    </div>
  `;
};

ReactDOM.render(html`<${App} />`, document.body);

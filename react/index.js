import { createElement, useEffect, useState } from "//esm.sh/react";
import ReactDOM from "//esm.sh/react-dom";
import { html } from "//esm.sh/htm/react";
import { useForm } from "//esm.sh/react-hook-form";
import Dexie from "//esm.sh/dexie";

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

  const deleteTodo = async (id) => {
    await db.todos.delete(id);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return html`
    <div>
      <form onSubmit=${handleSubmit(onSubmit)}>
        ${createElement("input", { ...register("name", { required: true }) })}
        <button>add</button>
      </form>
      <table>
        ${todos.map(
          (todo) => html`
            <tr>
              <td>${todo.name}</td>
              <td>
                <button
                  onClick=${() => {
                    deleteTodo(todo.id);
                  }}
                >
                  remove
                </button>
              </td>
            </tr>
          `
        )}
      </table>
    </div>
  `;
};

ReactDOM.render(html`<${App} />`, document.querySelector("#root"));

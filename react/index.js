import { createElement, useState } from "//cdn.skypack.dev/react";
import ReactDOM from "//cdn.skypack.dev/react-dom";
import { html } from "//cdn.skypack.dev/htm/react";
import { useForm } from "//cdn.skypack.dev/react-hook-form";

const App = () => {
  const [todos, setTodos] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = ({ name }) => {
    setTodos((todos) => todos.concat({ name }));
    setValue("name", "");
  };

  return html`
    <div>
      <form onSubmit=${handleSubmit(onSubmit)}>
        ${createElement("input", { ...register("name") })}
        <button>add</button>
      </form>
      <ul>
        ${todos.map((todo) => html`<li>${todo.name}</li>`)}
      </ul>
    </div>
  `;
};

ReactDOM.render(html`<${App} />`, document.body);

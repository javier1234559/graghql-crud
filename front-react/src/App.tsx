import { useState } from "react";
import TodoList from "./components/TodoList";
import FormAdd from "./components/FormAdd";
import FormSearch from "./components/FormSearch";

function App() {
  const [searchParams, setSearchParams] = useState<{
    text?: string;
    done?: boolean;
  }>({});

  return (
    <div className="container">
      <FormSearch setSearchParams={setSearchParams} />
      <FormAdd />
      <div className="body">
        <TodoList searchParams={searchParams} />
      </div>
    </div>
  );
}

export default App;

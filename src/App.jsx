import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

// import "./App.css";

function App() {
  const [todo, setTodo] = useState("");

  const [todos, setTodos] = useState([]);

  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
    }
    setTodos(todos);
  }, []);

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    uuidv4();
    setTodos([...todos, { id: uuidv4(), todo, isComepleted: false }]);

    setTodo("");
    // console.log(todos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isComepleted = !newTodos[index].isComepleted;
    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 p-5 bg-violet-200 rounded-xl md:w-[35%]">
        <h1 className="font-bold text-center text-xl">Personal Task Tracer</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input
            type="text"
            onChange={handleChange}
            value={todo}
            className="w-1/2 my-5 mx-5 rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md disabled:bg-slate-600
            "
          >
            Save
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
          name=""
          id="show"
          className="mx-2"
        />{" "}
        <label htmlFor="show">Show Finished</label>
        <div className="h-[1px] bg-black opacity-55 mx-auto w-[90%] my-4"></div>
        <h1 className="text-xl font-bold mx-5 my-5">Your Todos</h1>
        {todos.length === 0 && <div className="m-5">No Todos to display</div>}
        {todos.map((item) => {
          return (
            (showFinished || !item.isComepleted) && (
              <div
                key={item.id}
                className="todo flex md:w-1/2 justify-between my-3"
              >
                <div className="flex gap-5 mx-5">
                  <input
                    name={item.id}
                    onChange={handleCheckBox}
                    type="checkbox"
                    value={todo.isComepleted}
                  />

                  <div className={item.isComepleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>
                <div className="buttons flex h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}

export default App;

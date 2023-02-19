import React, { useState, useRef, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { MdDone, MdEdit } from "react-icons/md";
import "./styles.css";

import { Todo } from "./model";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [ edit, setEdit ] = useState<boolean>(false);
  const [ editTodo, setEditTodo ] = useState<string>(todo.todo);

  // CLICK TO MARK AS DONE
  const handleDone = (id: number) => {
    setTodos(
      todos.map(
        (todo) =>

            todo.id === id ? { ...todo, isDone: !todo.isDone } :
            todo
      )
    );
  };

  // CLICK TO DELETE
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // CLICK TO EDIT
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map(
        (todo) =>

            todo.id === id ? { ...todo, todo: editTodo } :
            todo
      )
    );
    setEdit(false);
  };

// FOCUS ON INPUT
const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      inputRef.current?.focus();
    },
    [ edit ]
  );


  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
      {
        edit ? <input
        ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className='todos__single--text'
        /> :
        todo.isDone ? <s className='todos__single--text'>{todo.todo}</s> :
        <span className='todos__single--text'>{todo.todo}</span>}

      <div>
        <span
          className='icon'
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <MdEdit />
        </span>
        <span className='icon' onClick={() => handleDelete(todo.id)}>
          <TiDelete />
        </span>
        <span className='icon' onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;

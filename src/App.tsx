/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { getTodos } from './api';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  // eslint-disable-next-line
  const [filter, setFilter] = useState('');

  const filtration = (method: string) => {
    const filteredTodos = [...todos];

    setFilter(method);

    switch (method) {
      case 'all':
        return setTodos(filteredTodos);
      case 'active':
        return setTodos(filteredTodos.filter(todo => !todo.completed));
      case 'completed':
        return setTodos(filteredTodos.filter(todo => todo.completed));
      default:
        return setTodos(filteredTodos);
    }
  };

  const openModal = (t: Todo) => {
    setSelectedTodo(t);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTodo(null);
    setModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter onSelect={filtration} />
            </div>

            <div className="block">
              {loading && <Loader />}
              <TodoList todos={todos} onShow={openModal} />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && <TodoModal todo={selectedTodo} onClose={closeModal} />}
    </>
  );
};

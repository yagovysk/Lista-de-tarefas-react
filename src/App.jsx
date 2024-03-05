import React, { useState } from 'react';
import Modal from 'react-modal';
import './App.css';

const initialEditState = {
  index: null,
  value: '',
};
export function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showList, setShowList] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showTaskAddedModal, setShowTaskAddedModal] = useState(false); // Estado para controlar a exibição do modal de tarefa adicionada
  const [showTaskDeletedModal, setShowTaskDeletedModal] = useState(false); // Estado para controlar a exibição do modal de tarefa excluída
  const [editState, setEditState] = useState(initialEditState);
  const [showTaskEditedModal, setShowTaskEditedModal] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setTasks([...tasks, { task: inputValue.trim(), completed: false }]);
      setInputValue('');
      setShowTaskAddedModal(true); // Mostrar o modal de tarefa adicionada após adicionar uma tarefa
    }
  };

  const handleDelete = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setShowTaskDeletedModal(true); // Mostrar o modal de tarefa excluída após excluir uma tarefa
  };

  const handleToggleShowList = () => {
    setShowList(!showList); // Alternar o estado showList entre verdadeiro e falso
    setShowAddTaskModal(false); // Garantir que o modal de adicionar tarefa seja ocultado ao mostrar ou ocultar a lista
    setShowEditTaskModal(false); // Garantir que o modal de editar tarefa seja ocultado ao mostrar ou ocultar a lista
    setFilter('all'); // Definir o filtro para mostrar todas as tarefas por padrão
  };

  const handleToggleAddTaskModal = () => {
    setShowAddTaskModal(!showAddTaskModal);
  };

  const handleTaskCompletion = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };
  const [showEditTaskModal, setShowEditTaskModal] = useState(false); // Adicionando o estado para controlar o modal de edição

  const handleEdit = (index) => {
    setEditState({ index: index, value: tasks[index].task });
    setShowEditTaskModal(true); // Abrindo o modal de edição quando o botão "Editar" for clicado
  };

  const handleToggleEditTaskModal = () => {
    setEditState(initialEditState);
    setShowEditTaskModal(!showEditTaskModal);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[editState.index].task = inputValue.trim();
      setTasks(newTasks);
      setInputValue('');
      setShowTaskEditedModal(true); // Mostrar o modal de tarefa editada após a edição
      handleToggleEditTaskModal(); // Fechar o modal de edição
    }
  };

  return (
    <main className="container-lista">
      <section className="container-section">
        <h1>Lista de Tarefas</h1>
        <div className="container-buttons">
          <button onClick={handleToggleShowList}>
            {showList ? 'Ocultar Lista' : 'Mostrar Lista'}
          </button>
          <button onClick={handleToggleAddTaskModal}>Adicionar Tarefa</button>
        </div>
        <Modal
          className="container-modal"
          style={{ overlay: { background: 'none' } }}
          isOpen={showAddTaskModal}
          onRequestClose={handleToggleAddTaskModal}>
          <div className="container-content">
            <h2>Adicione a lista de tarefas</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Digite uma tarefa"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit">Adicionar a Lista de Tarefas</button>
            </form>
            <div className="container-back">
              <button
                className="back-button"
                onClick={handleToggleAddTaskModal}>
                Voltar
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          className="message-modal"
          style={{ overlay: { background: 'none' } }}
          isOpen={showTaskAddedModal}
          onRequestClose={() => setShowTaskAddedModal(false)}>
          <p>Tarefa adicionada com sucesso!</p>
          <button onClick={() => setShowTaskAddedModal(false)}>Fechar</button>
        </Modal>

        <Modal
          className="container-message"
          style={{ overlay: { background: 'none' } }}
          isOpen={showTaskDeletedModal}
          onRequestClose={() => setShowTaskDeletedModal(false)}>
          <p>Tarefa excluída com sucesso!</p>
          <button onClick={() => setShowTaskDeletedModal(false)}>Fechar</button>
        </Modal>
        <Modal
          className="container-modal"
          style={{ overlay: { background: 'none' } }}
          isOpen={showEditTaskModal}
          onRequestClose={handleToggleEditTaskModal}>
          <div className="container-content">
            <form onSubmit={handleSubmitEdit}>
              <input
                type="text"
                placeholder="Edite a tarefa"
                value={inputValue}
                onChange={handleInputChange}
              />
              <button type="submit">Salvar edição</button>
            </form>
            <div className="container-button">
              <button onClick={handleToggleEditTaskModal}>Voltar</button>
            </div>
          </div>
        </Modal>

        <Modal
          className="container-message"
          style={{ overlay: { background: 'none' } }}
          isOpen={showTaskEditedModal}
          onRequestClose={() => setShowTaskEditedModal(false)}>
          <p>Tarefa editada com sucesso!</p>
          <button onClick={() => setShowTaskEditedModal(false)}>Fechar</button>
        </Modal>

        {showList && (
          <>
            <div className="container-filters">
              <button onClick={() => setFilter('all')}>Todas</button>
              <button onClick={() => setFilter('completed')}>Concluídas</button>
              <button onClick={() => setFilter('pending')}>Pendentes</button>
            </div>
            {tasks.length === 0 ? (
              <p className="task">
                Favor adicionar conteúdo à lista. A lista está vazia.
              </p>
            ) : (
              <ul className="list-container">
                {tasks
                  .filter((task) => {
                    if (filter === 'completed') return task.completed;
                    if (filter === 'pending') return !task.completed;
                    return true; // Mostrar todas as tarefas se o filtro for 'all'
                  })
                  .map((task, index) => (
                    <li
                      className="item-list"
                      key={index}
                      style={{
                        textDecoration: task.completed
                          ? 'line-through'
                          : 'none',
                        color: task.completed ? 'green' : 'inherit',
                      }}>
                      <div>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskCompletion(index)}
                        />
                        {task.task}
                        <div className="buttons-list">
                          <button onClick={() => handleDelete(index)}>
                            Excluir
                          </button>
                          <button onClick={() => handleEdit(index)}>
                            Editar
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}

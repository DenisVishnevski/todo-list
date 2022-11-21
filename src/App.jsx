import { useState } from 'react';
import './css/global.css'
import CreateNewTaskMenu from "./components/CreateNewTaskMenu";
import ToDoList from './components/ToDoList';
import { produceWithPatches } from 'immer';
let taskId = 1;
function App() {
  const [taskList, setTaskList] = useState([]);

  /**
   * Добавляет в массив новый обьект, состоящий из полученных данных и id элемента.
   * @param {string} title 
   * @param {string} description 
   * @param {inputDate} deadline 
   * @param {{name: string, path: string }[]} filesArray 
   */
  function addTask(title, description, deadline, filesArray) {
    setTaskList([...taskList, { id: taskId, title: title, description: description, deadline: deadline, filesArray: filesArray }]);
    taskId += 1;
  }

  /**
   * Пересобирает массив задач, исключая из списка нужную.
   * @param {number} id номер удаляемой задачи
   */
  function deleteTask(id) {
    let newTaskArray = [];
    for (let index = 0; index < taskList.length; index++ ) {
      if (taskList[index].id !== id) {
        newTaskArray.push(taskList[index]);
      }
    }
    console.log(newTaskArray);
    setTaskList([]);
    setTimeout(() => {
      setTaskList(newTaskArray);
  }, "1");
  }
  return (
    <div className="wrapper">
      <h1>TODO</h1>
      <CreateNewTaskMenu addTask={addTask} />
      <ToDoList taskList={taskList} deleteTask={deleteTask} />
    </div>
  );
}

export default App;

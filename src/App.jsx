import { useEffect, useState } from 'react';
import './css/global.css'
import CreateNewTaskMenu from "./components/CreateNewTaskMenu";
import ToDoList from './components/ToDoList';
import ContactButton from './components/UI/ContactButton';
import telegramIcon from './assets/images/telegramIcon.svg'
import myWebsiteIcon from './assets/images/myWebsiteIcon.svg'
import githubIcon from './assets/images/githubIcon.svg'

let storageTaskList = window.localStorage.getItem('task_list');

function App() {
  const [taskList, setTaskList] = useState(() => {
    if (JSON.parse(storageTaskList)) {
      return [...JSON.parse(storageTaskList)]
    }
    return []
  });

  useEffect(() => {
    localStorage.setItem('task_list', JSON.stringify(taskList));
  }, [taskList]);

  /**
   * Добавляет в массив новый обьект, состоящий из полученных данных и id элемента.
   * @param {string} title 
   * @param {string} description 
   * @param {inputDate} deadline 
   * @param {{name: string, path: string }[]} filesArray 
   */
  function addTask(title, description, deadline, filesArray) {
    let taskId = 1;
    let lastTask = taskList[taskList.length - 1];
    if (lastTask) {
      taskId = lastTask.id + 1;
    }
    setTaskList([...taskList, {
      id: taskId,
      title: title,
      description: description,
      deadline: deadline,
      filesArray: filesArray,
      isPerformed: false
    }]);
  }

  /**
   * Получает данные из компонента задач, пересобирает массив задач, обнавляя данные.
   * @param {number} id номер обновляемой задачи.
   * @param {object} value обект, передаваемый в массив задач.
   */
  function updateTasksList(id, value) {
    let newTaskArray = [];
    for (let index = 0; index < taskList.length; index++) {
      if (taskList[index].id === id) {
        newTaskArray.push({ ...taskList[index], ...value });
      }
      else {
        newTaskArray.push(taskList[index]);
      }
    }
    setTaskList(newTaskArray);
  }

  /**
   * Пересобирает массив задач, исключая из списка нужную.
   * @param {number} id номер удаляемой задачи.
   */
  function deleteTask(id) {
    let newTaskArray = [];
    for (let index = 0; index < taskList.length; index++) {
      if (taskList[index].id !== id) {
        newTaskArray.push(taskList[index]);
      }
    }
    setTaskList([]);
    setTimeout(() => {
      setTaskList(newTaskArray);
    }, "1");
  }
  return (
    <div className="wrapper">
      <div className="contacts_block">
        <ContactButton icon={myWebsiteIcon} title={"Мой сайт-портфолио"} link="https://denis-vishnevski.vercel.app/" />
        <ContactButton icon={githubIcon} title={"GitHub"} link="https://github.com/DenisVishnevski" />
        <ContactButton icon={telegramIcon} title={"Telegram"} link="https://t.me/Vishnevski0" />
      </div>
      <h1>TODO</h1>
      <CreateNewTaskMenu addTask={addTask} />
      <ToDoList taskList={taskList} deleteTask={deleteTask} updateTasksList={updateTasksList} />
    </div>
  );
}

export default App;

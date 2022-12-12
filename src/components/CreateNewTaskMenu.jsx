import { useState } from 'react';
import '../css/CreateNewTaskMenu.css';
import plus from '../assets/images/plus.svg';
import calendarIcon from '../assets/images/calendarIcon.svg'
import ContentBlock from './ContentBlock';
import FileInput from './FileInput';

function CreateNewTaskMenu(props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [filesListHeight, setFilesListHeight] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [filesArray, setFilesArray] = useState([]);

  /**
   * При вызове функция переключает открытое и закрытое состояние меню.
   */
  function isOpenMenuHandler() {
    if (menuIsOpen) {
      closeMenu();
    }
    else {
      openMenu();
    }
  }
  /**
   * Открывает меню: увеличивает высоту блока.
   */
  function openMenu() {
    setMenuIsOpen(true);
  }
  /**
   * Закрывает меню: присваивает значения по умолчанию всем полям, уменьшает высоту блока.
   */
  function closeMenu() {
    setTitleValue('');
    setDescriptionValue('');
    setDateValue('');
    setFilesArray([]);
    setMenuIsOpen(false);
  }
  /**
   * Передает поля родительскому компоненту, закрывает блок. 
   */
  function submitTask() {
    props.addTask(titleValue, descriptionValue, dateValue, filesArray);
    closeMenu();
  }
  /**
   * Добавляет в массив обьект {назваеие файла, путь файла}.
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
  function addFile(event) {
    event.preventDefault();
    setFilesArray([...filesArray, { name: event.target.files[0].name, path: event.target.value }]);
  }
  /**
   * Пересобирает массив файлов, исключая из списка нужный файл.
   * @param {number} id номер удаляемого файла.
   */
  function deleteFile(id) {
    const newFileArray = [];
    for (let index = 0; index < filesArray.length; index++) {
      if (index !== id) {
        newFileArray.push(filesArray[index]);
      }
    }
    setFilesListHeight(120);
    setFilesArray([]);
    setTimeout(() => {
      setFilesArray(newFileArray);
      setFilesListHeight(0);
    }, "1")
  }
  return (
    <div className='create_new_task_menu'>
      {menuIsOpen
        ? (
          <div className='create_menu'>
            <div className="upper_block">
              <div className='left_block'>
                <img style={{ transform: `rotate(45deg)` }} onClick={isOpenMenuHandler} src={plus} alt="Create" />
                <div className="divider"></div>

                <ContentBlock
                  titleValue={titleValue}
                  setTitleValue={setTitleValue}
                  descriptionValue={descriptionValue}
                  setDescriptionValue={setDescriptionValue}
                  filesArray={filesArray}
                  deleteFile={deleteFile}
                  filesListHeight={filesListHeight}
                />
              </div>
              <div className="buttons_block">
                {menuIsOpen
                  ? <FileInput addFile={addFile} taskId={'_menu'} />
                  : null
                }
              </div>
            </div>
            {menuIsOpen
              ? (
                <div className="bottom_block">
                  <button className='add_button' onClick={submitTask}>Добавить</button>
                  <div className="date_block">
                    <input
                      type="date"
                      className='date_input'
                      id='date_input_menu'
                      value={dateValue}
                      onChange={(event) => { setDateValue(event.target.value) }}
                    />
                    <label htmlFor={`date_input_menu`}>
                      <img src={calendarIcon} alt="Calendar" />
                    </label>
                  </div>
                </div>
              )
              : null
            }
          </div>
        )
        : <div className="create_button" onClick={openMenu}>
          <div className="buttons_block">
            <img src={plus} alt="Create" />
            <h2>Создать новую заметку</h2>
          </div>
        </div>

      }
    </div>
  );
}

export default CreateNewTaskMenu;

import { useState } from 'react';
import '../css/CreateNewTaskMenu.css';
import plus from '../assets/images/plus.svg';
import clip from '../assets/images/clip.svg';
import ContentBlock from './ContentBlock';

function CreateNewTaskMenu(props) {
  const [menuHeight, setMenuHeight] = useState(80);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [plusButtonRotation, setButtonIconRotation] = useState(0);
  const [filesListHeight, setFilesListHeight] = useState(0);

  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [fileValue, setFileValue] = useState('');
  const [filesArray, setFilesArray] = useState([]);

  function isOpenMenuHandler() {
    if (menuIsOpen) {
      closeMenu();
    }
    else {
      openMenu();
    }
  }

  function openMenu() {
    setMenuHeight(250);
    setMenuIsOpen(true);
    setButtonIconRotation(45);
  }
  function closeMenu() {
    setTitleValue('');
    setDescriptionValue('');
    setDateValue('');
    setFilesArray([]);
    setMenuIsOpen(false);
    setMenuHeight(80);
    setButtonIconRotation(0);
  }
  function submitTask() {
    props.addTask(titleValue, descriptionValue, dateValue, filesArray);
    closeMenu();
  }
  function addFile(event) {
    event.preventDefault();
    setFilesArray([...filesArray, {name: event.target.files[0].name, path: event.target.value }]);
    setFileValue('');
  }
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
    console.log(newFileArray);
  }
  return (
    <div className='create_new_task_menu' style={{ minHeight: menuHeight }}>
      <div className="upper_block">
        <div className='left_block'>
          <img style={{transform: `rotate(${plusButtonRotation}deg)`}} onClick={isOpenMenuHandler} src={plus} alt="Create" />
          {menuIsOpen
            ? (
              <ContentBlock
                titleValue={titleValue}
                setTitleValue={setTitleValue}
                descriptionValue={descriptionValue}
                setDescriptionValue={setDescriptionValue}
                filesArray={filesArray}
                deleteFile={deleteFile}
                filesListHeight={filesListHeight}
              />
            )
            : <h2 onClick={openMenu}>Создать новую заметку</h2>

          }
        </div>
        {menuIsOpen
          ? (<label htmlFor="file_input">
            <img className='climp' src={clip} alt="Прикрепить" />
            <input
              className='file_input'
              id="file_input"
              type="file"
              value={fileValue}
              onChange={addFile}
            />
          </label>)
          : null
        }

      </div>
      {menuIsOpen
        ? (
          <div className="bottom_block">
            <button className='add_button' onClick={submitTask}>Добавить</button>
            <input
              type="date"
              className='date_input'
              value={dateValue}
              onChange={(event) => { setDateValue(event.target.value) }}
            />
          </div>
        )
        : null
      }
    </div>
  );
}

export default CreateNewTaskMenu;

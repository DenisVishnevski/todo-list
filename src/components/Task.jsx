import { useState, useEffect } from 'react';
import ContentBlock from './ContentBlock';
import dayJS from 'dayjs';
import tick from '../assets/images/tick.svg'
import arrowIcon from '../assets/images/arrowIcon.svg'
import FileInput from './FileInput';
import DeleteButton from './UI/DeleteButton';

function Task(props) {
    const [isPerformedTask, setIsPerformedTask] = useState(props.isPerformed);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [dateColor, setDateColor] = useState('#FFFFFF');
    const [filesListHeight, setFilesListHeight] = useState(0);
    const [openButtonScaleY, setOpenButtonScaleY] = useState(1);

    const [titleValue, setTitleValue] = useState(props.title);
    const [descriptionValue, setDescriptionValue] = useState(props.description);
    const [dateValue, setDateValue] = useState(props.deadline);
    const [filesArray, setFilesArray] = useState(props.filesArray);

    const nowDate = dayJS(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            if (dayJS(dateValue).isBefore(nowDate) && isPerformedTask === false) {
                setDateColor('#FF5656');
            }
            else if (isPerformedTask) {
                setDateColor('#55ECEC');
            }
            else {
                setDateColor('#FFFFFF');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [dateValue, isPerformedTask]);

    /**
      * Переключает открытое и закрытое состояние меню, меняет направление кнопки "Открыть/Закрыть" (стрелка).
      */
    function isOpenTaskHandler() {
        if (menuIsOpen) {
            setMenuIsOpen(false);
            setOpenButtonScaleY(1);
        }
        else {
            setMenuIsOpen(true);
            setOpenButtonScaleY(-1);
        }
    }
    
    /**
     * Передает объект родительскому компоненту.
     * @param {object} value объект состоящий из одного свойства, в которое передается значение из поля ввода.
     */
    function updateTask(value) {
        props.updateTasksList(props.id, value);

    }
    /**
     * Вызывает родительскую функцию "Удалить задачу", передает ей id задачи.
     */
    function deleteTask() {
        props.deleteTask(props.id)
    }
    /**
     * Переключает выполненное и активное состояния задачи, передает его родительскому компоненту.
     */
    function isPerformed() {
        if (isPerformedTask) {
            setIsPerformedTask(false);
            updateTask({ isPerformed: false });
        }
        else {
            setIsPerformedTask(true);
            updateTask({ isPerformed: true });
        }
    }
    /**
      * Добавляет в массив обьект {назваеие файла, путь файла}, также передает его родительскому компоненту.
      * @param {React.ChangeEvent<HTMLInputElement>} event 
      */
    function addFile(event) {
        event.preventDefault();
        setFilesArray([...filesArray, { name: event.target.files[0].name, path: event.target.value }]);
        updateTask({ filesArray: [...filesArray, { name: event.target.files[0].name, path: event.target.value }] });
    }
    /**
    * Пересобирает массив файлов, исключая из списка нужный файл, передает массив родительскому компоненту.
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
            updateTask({ filesArray: newFileArray });
            setFilesListHeight(0);
        }, "1")
    }
    return (
        <div className="task">
            <div className="upper_block">
                <div className='left_block'>
                    <div className="tick_icon">
                        {isPerformedTask
                            ? <img onClick={isPerformed} src={tick} alt="Performed" />
                            : <div onClick={isPerformed} className="circle_icon"></div>
                        }
                    </div>
                    <div className="divider"></div>
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
                                updateTask={updateTask}
                            />
                        )
                        : <h2>{titleValue}</h2>

                    }
                </div>
                <div className="buttons_block">
                    {menuIsOpen
                        ? null
                        : <h2 style={{ color: dateColor }}>{props.deadline ? dayJS(dateValue).format('DD.MM') : ''}</h2>
                    }
                    {menuIsOpen
                        ? <FileInput addFile={addFile} taskId={props.id} />
                        : null
                    }
                    <img style={{ transform: `scale(1, ${openButtonScaleY}` }} onClick={isOpenTaskHandler} src={arrowIcon} alt="Open/Close" />
                    <DeleteButton onClick={deleteTask} />

                </div>
            </div>
            {menuIsOpen
                ? (
                    <div className="date_block">
                        <input
                            type="date"
                            className='date_input'
                            style={{ color: dateColor }}
                            value={dateValue}
                            onChange={(event) => {
                                setDateValue(event.target.value);
                                updateTask({ deadline: event.target.value });
                            }}
                        />
                    </div>
                )
                : null
            }
        </div>
    );
}

export default Task;
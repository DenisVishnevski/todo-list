import { useState, useEffect } from 'react';
import ContentBlock from './ContentBlock';
import dayJS from 'dayjs';
import tick from '../assets/images/tick.svg'
import arrowIcon from '../assets/images/arrowIcon.svg'
import FileInput from './FileInput';
import DeleteButton from './UI/DeleteButton';

function Task(props) {
    const [isPerformedTask, setIsPerformedTask] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [dateColor, setDateColor] = useState('#FFFFFF');
    const [titleColor, setTitleColor] = useState(props.title);
    const [filesListHeight, setFilesListHeight] = useState(0);
    const [openButtonScaleY, setOpenButtonScaleY] = useState(1);

    const [titleValue, setTitleValue] = useState(props.title);
    const [descriptionValue, setDescriptionValue] = useState(props.description);
    const [dateValue, setDateValue] = useState(props.deadline);

    const [filesArray, setFilesArray] = useState(props.filesArray);

    const nowDate = dayJS(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            if (dayJS(dateValue).isBefore(nowDate)) {
                setDateColor('#FF5656');
            }
            else {
                setDateColor('#FFFFFF');
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [dateValue]);


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

    function deleteTask() {
        props.deleteTask(props.id)
    }

    function isPerformed() {
        if (isPerformedTask) {
            setIsPerformedTask(false);
            setTitleColor('#FFFFFF');
        }
        else {
            setIsPerformedTask(true);
            setTitleColor('#55ECEC');
        }
    }
    function addFile(event, id) {
        event.preventDefault();
        setFilesArray([...filesArray, { name: event.target.files[0].name, path: event.target.value }]);
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
        <div className="task">
            <div className="upper_block">
                <div className='left_block'>
                    <div className="tick_icon">
                        {isPerformedTask
                            ? <img onClick={isPerformed} src={tick} alt="Performed" />
                            : <div onClick={isPerformed} className="circle_icon"></div>
                        }
                    </div>
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
                        : <h2 style={{ color: titleColor }} >{titleValue}</h2>

                    }
                </div>
                <div className="buttons_block">
                    {menuIsOpen
                        ? null
                        : <h2 style={{ color: dateColor }}>{props.deadline ? dayJS(props.deadline).format('DD.MM') : ''}</h2>
                    }
                    {menuIsOpen
                        ? <FileInput addFile={addFile} taskId={props.id} />
                        : null
                    }
                    <img style={{transform: `scale(1, ${openButtonScaleY}`}} onClick={isOpenTaskHandler} src={arrowIcon} alt="Open/Close" />
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
                                setDateValue(event.target.value)
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
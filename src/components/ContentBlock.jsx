import { useEffect } from 'react';
import File from './UI/File';
import { useState } from 'react';

function ContentBlock(props) {
    const [descriptionHeight, setDescriptionHeight] = useState(30);
    /**
     * Передает родительскому компоненту значение поля "Описание", вызывает функцию-обработчик высоты скролла.
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    function descriptionHandler (event) {
        props.setDescriptionValue(event.target.value);
        scrollTopHandler(event);
        if (props.updateTask) {
            props.updateTask({description: event.target.value});
        }
    }
    /**
     * Увеличивает элемент поля "Описание" до размера блока текста.
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    function scrollTopHandler(event) {
          setDescriptionHeight(event.target.scrollHeight);
      }
    return (
        <div className="content_block">
            <input
                type="text"
                placeholder='Название'
                value={props.titleValue}
                className='title_input'
                onChange={(event) => { 
                    props.setTitleValue(event.target.value);
                    if (props.updateTask) {
                        props.updateTask({title: event.target.value});
                    }
                }}
            />
            <textarea
                placeholder='Описание'
                value={props.descriptionValue}
                className='description_input'
                onChange={descriptionHandler}
                style={{ minHeight: descriptionHeight }}>
            </textarea >

            <div style={{minHeight: props.filesListHeight}} className="files_list">
                {props.filesArray.map((file, index) =>
                    <File key={index} name={file.name} id={index} delete={props.deleteFile} />
                )}
            </div>
        </div>
    );
}

export default ContentBlock;
import { useEffect, useRef } from 'react';
import File from './UI/File';
import { useState } from 'react';

function ContentBlock(props) {
    const [titleHeight, setTitleHeight] = useState(30);
    const [descriptionHeight, setDescriptionHeight] = useState(30);

    const titleInputRef = useRef(null);
    const descriptionInputRef = useRef(null);

    useEffect(() => {
        setTitleHeight(titleInputRef.current.scrollHeight);
        setDescriptionHeight(descriptionInputRef.current.scrollHeight);
    }, []);

      /**
     * Передает родительскому компоненту значение поля "Название", вызывает функцию-обработчик высоты скролла.
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
      function titleHandler(event) {
        props.setTitleValue(event.target.value);
        setTitleHeight(titleInputRef.current.scrollHeight);
        if (props.updateTask) {
            props.updateTask({ title: event.target.value });
        }
    }
    /**
     * Передает родительскому компоненту значение поля "Описание", вызывает функцию-обработчик высоты скролла.
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    function descriptionHandler(event) {
        props.setDescriptionValue(event.target.value);
        setDescriptionHeight(descriptionInputRef.current.scrollHeight);
        if (props.updateTask) {
            props.updateTask({ description: event.target.value });
        }
    }
    return (
        <div className="content_block">
            <textarea
                placeholder='Название'
                value={props.titleValue}
                className='title_input'
                maxLength="150"
                onChange={titleHandler}
                style={{ minHeight: titleHeight }}
                ref={titleInputRef}>
            </textarea>
            <textarea
                placeholder='Описание'
                value={props.descriptionValue}
                className='description_input'
                onChange={descriptionHandler}
                style={{ minHeight: descriptionHeight }}
                ref={descriptionInputRef}>
            </textarea>

            <div style={{ minHeight: props.filesListHeight }} className="files_list">
                {props.filesArray.map((file, index) =>
                    <File key={index} name={file.name} id={index} delete={props.deleteFile} />
                )}
            </div>
        </div>
    );
}

export default ContentBlock;
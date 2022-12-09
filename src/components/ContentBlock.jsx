import { useEffect, useRef } from 'react';
import File from './UI/File';
import { useState } from 'react';

function ContentBlock(props) {
    const [titleHeight, setTitleHeight] = useState(30);
    const [titleSampleValue, setTitleSampleValue] = useState('');

    const [descriptionHeight, setDescriptionHeight] = useState(30);
    const [descriptionSampleValue, setDescriptionSampleValue] = useState('');

    const titleInputRef = useRef(null);
    const titleSampleInputRef = useRef(null);
    
    const descriptionInputRef = useRef(null);
    const descriptionSampleInputRef = useRef(null);

    useEffect(() => {
        setTitleHeight(titleInputRef.current.scrollHeight);
        setDescriptionHeight(descriptionInputRef.current.scrollHeight);
    }, []);

    /**
   * Передает родительскому компоненту значение поля "Название", загружает весь вписанный текст в невидимый элемент, 
   * считывает высоту скролла и передает её в видимый элемент.
   * @param {React.ChangeEvent<HTMLInputElement>} event 
   */
    function titleHandler(event) {
        props.setTitleValue(event.target.value);

        setTitleSampleValue(titleInputRef.current.value);
        setTitleHeight(titleInputRef.current.scrollHeight);
        setTimeout(() => {
            setTitleHeight(titleSampleInputRef.current.scrollHeight);
        }, 1)

        if (props.updateTask) {
            props.updateTask({ title: event.target.value });
        }
    }
    /**
     * Передает родительскому компоненту значение поля "Описание", загружает весь вписанный текст в невидимый элемент, 
     * считывает высоту скролла и передает её в видимый элемент.
     * @param {React.ChangeEvent<HTMLInputElement>} event 
     */
    function descriptionHandler(event) {
        props.setDescriptionValue(event.target.value);

        setDescriptionSampleValue(descriptionInputRef.current.value);
        setDescriptionHeight(descriptionInputRef.current.scrollHeight);
        setTimeout(() => {
            setDescriptionHeight(descriptionSampleInputRef.current.scrollHeight);
        }, 1)
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

            <textarea
                ref={titleSampleInputRef}
                className='title_input'
                style={{ visibility: 'hidden', height: 0 }}
                value={titleSampleValue}
                readOnly>
            </textarea>
            <textarea
                ref={descriptionSampleInputRef}
                className='description_input'
                style={{ visibility: 'hidden', height: 0, margin: 0 }}
                value={descriptionSampleValue}
                readOnly>
            </textarea>
        </div>
    );
}

export default ContentBlock;
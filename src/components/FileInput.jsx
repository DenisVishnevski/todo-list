import { useState } from 'react';
import clip from '../assets/images/clip.svg';

function FileInput(props) {
    const [fileValue, setFileValue] = useState('');

    return (
        <label htmlFor={"file_input" + props.taskId}>
            <img className='climp' src={clip} alt="Прикрепить"/>
            <input
                className='file_input'
                id={"file_input" + props.taskId}
                type="file"
                value={fileValue}
                onChange={(event) => {
                    props.addFile(event, props.taskId);
                    setFileValue('');
                }}
            />
        </label>
    );
}
export default FileInput;
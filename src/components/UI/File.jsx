import { useEffect, useState } from 'react';
import '../../css/File.css'
import x from '../../assets/images/blackX.svg';
import fileIcon from '../../assets/images/fileIcon.svg';
function File(props) {
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        formattingFileName();
    }, []);
/**
 * Форматирует имя файла под размер блока
 */
    function formattingFileName() {
        let newFileName = '';
        let fileFormat = '';
        if (props.name.length > 13) {
            for (let index = 0; index < props.name.length; index++) {
                if (index < 8 - (props.name.length - props.name.indexOf('.'))) {
                    newFileName += props.name.charAt(index);
                }
                if (index > props.name.indexOf('.') - 3) {
                    fileFormat += props.name.charAt(index);
                }
            }
            setFileName(newFileName + '...' + fileFormat);
        }
        else {
            setFileName(props.name);
        }
    }
    return (
        <div className="file">
            <img
                onClick={() => {
                    props.delete(props.id);
                }}
                className='delete_button'
                src={x}
                alt="Удалить"
            />
            <img src={fileIcon} alt={props.name} />
            <h2>{fileName}</h2>
        </div>
    );
}

export default File;
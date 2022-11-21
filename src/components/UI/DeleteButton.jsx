import deleteButton from '../../assets/images/deleteButton.svg';

function DeleteButton(props) {
    return (
        <img
            className="delete_button"
            onClick={props.onClick}
            src={deleteButton}
            alt="Delete"
        />
    );
}

export default DeleteButton;

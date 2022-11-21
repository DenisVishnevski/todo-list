import '../css/ToDoList.css'
import Task from './Task';

function ToDoList(props) {  return (
        <div className='todo_list'>
                {props.taskList.map((task, index) =>
                    <Task
                        key={index}
                        title={task.title}
                        description={task.description}
                        deadline={task.deadline}
                        filesArray={task.filesArray}
                        id={task.id}
                        deleteTask={props.deleteTask}
                    />
                )}
        </div>
    );
}

export default ToDoList;
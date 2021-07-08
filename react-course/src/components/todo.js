// dependences
import { useState } from 'react';

// components
import Dialog from './dialog';

// styles
import styled from 'styled-components';
const TodoTask = styled.p`
    color: var(--color-app-primary);
    font-size: 120%;
`;

const TodoDiv = styled.div`
    background-color: white;
    width: clamp(200px, 20%, 400px);
    margin: 10px 10px 10px 0;
    padding: 10px;
    border: solid 1px #ddd;
    border-radius: 5px;

    & {TodoTask} {
        text-decoration: ${ props => !props.done ? 'none': 'line-through' }
    }
`;

function Todo(props) { console.log('RENDERING', props.task)
    const [dialog, setDialog] = useState(false);

    function showDialogHandler() {
        setDialog(true);
    }

    function cancelDeleteHandler() {
        setDialog(false);
    }

    function confirmDeleteHandler() {
        props.deleteBehavior(props.id);
    }

    return (
        <>
            { dialog &&
                <Dialog
                    cancelDeleteBehavior={cancelDeleteHandler}
                    confirmDeleteBehavior={confirmDeleteHandler}
                />
            }

            <TodoDiv done={props.done}>
                <TodoTask>{props.task}</TodoTask>
                <div className="buttons">
                    <button className="btn btn-edit">Edit</button>
                    <button className="btn btn-delete" onClick={showDialogHandler}>Delete</button>
                </div>
            </TodoDiv>
        </>
    )
}

export default Todo;
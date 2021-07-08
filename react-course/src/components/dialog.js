import styled from "styled-components";
const OverlayDiv = styled.div`
    background-color: black;
    z-index: 2;
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.1;
`;

const DialogDiv = styled.div`
    background-color: white;
    z-index: 3;
    padding: 10px 30px;
    border-radius: 5px;

    /* centering */
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

function Dialog(props) {
    const cancelHandler = () => {
        props.cancelDeleteBehavior();
    }

    const confirmHandler = () => {
        props.confirmDeleteBehavior();
    }

    return (
        <>
            <OverlayDiv onClick={cancelHandler}/>
            <DialogDiv>
                <p>Are you sure ?</p>
                <button onClick={cancelHandler}>Cancel</button>
                <button onClick={confirmHandler}>Confirm</button>
            </DialogDiv>    
        </>
    ) // return
}

export default Dialog;
import Notification from "../ui/notification";

// styles
import styled from "styled-components"
const WrapperDiv = styled.div`
    position: relative;
    padding: 10px 20px;
`;

export default function Wrapper(props) {
    return <WrapperDiv>
        <Notification />
        {props.children}
    </WrapperDiv>
}
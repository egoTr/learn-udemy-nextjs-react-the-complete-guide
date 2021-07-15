import Notification from '../../components/ui/notification';

// styles
import styled from "styled-components"
const WrapperDiv = styled.div`
    flex-grow: 1;
    padding: 10px 20px;
`;

export default function Wrapper(props) {
    return <WrapperDiv>
        <Notification />
        {props.children}
    </WrapperDiv>
}
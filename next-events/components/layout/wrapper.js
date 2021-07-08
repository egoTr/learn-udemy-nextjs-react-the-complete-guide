// styles
import styled from "styled-components"
const WrapperDiv = styled.div`
    padding: 10px 20px;
`;

export default function Wrapper(props) {
    return <WrapperDiv>
        {props.children}
    </WrapperDiv>
}
import styled from "styled-components";
const HrDiv = styled.div`
    background-color: var(--color-app-primary);
    width: 100%;
    height: 2px;
    margin: 10px 0 5px 0;
`;
export default function Hr() {
    return <HrDiv></HrDiv>
}
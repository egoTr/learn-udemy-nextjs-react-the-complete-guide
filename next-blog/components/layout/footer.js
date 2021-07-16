import NewsLetterRegisterForm from "../newsletter";

// styles
import styled from "styled-components";
const Container = styled.div`
    background-color: #f9f9f9;
    padding: 30px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Footer() {
    return <Container>
        <NewsLetterRegisterForm />
    </Container>
}
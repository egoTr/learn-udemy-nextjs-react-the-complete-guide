import NewsLetterRegisterForm from "../newsletter-register-form";

// styles
import styled from "styled-components";
const FooterDiv = styled.div`
    background-color: #f9f9f9;
    padding: 30px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default function Footer() {
    return <FooterDiv>
        <NewsLetterRegisterForm />
    </FooterDiv>
}
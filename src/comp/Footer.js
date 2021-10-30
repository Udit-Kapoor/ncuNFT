import React  from 'react';
import styled from "styled-components";

const Footer = () => {
    
    return (
    <Container>
     <p>Copyright © 2012 - DevsOnly | Developed by Udit 19csu327 and Tarun 19csu322</p>
   

    </Container>
    );
}

export default Footer;

const Container = styled.div`
display: flex;
justify-content: center;
font-size: .7rem;
margin: 0 -150px;
height: 40px;
background-color: #19234E;

`;

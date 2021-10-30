import React , {useState} from 'react';
import styled from "styled-components";
import HomeImg from "../img/home.png";

const HomeScreen = () => {
    
    return (
    <Container>
        <NCUImg>
            <img src={HomeImg} alt="" />
        </NCUImg>
        <HomeText>
            <h1>welcome to <br />
The NorthCap University <br />
NFT Collectables</h1>
        </HomeText>
    </Container>
    );
}

export default HomeScreen;

const Container = styled.div`
text-align: center;
margin-top: 25px;
`;
const NCUImg = styled.div``;
const HomeText = styled.div`
h1{
    margin-top: -50px;
    font-size: 2.5rem;
    color: #fff;
    line-height: 3.5rem;
}
`;


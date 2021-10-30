import React , {useEffect} from 'react';
import styled from "styled-components";
import ScriptTag from 'react-script-tag';
// import { useScript } from "hooks/useScript";
import Moralis from 'moralis/dist/moralis.min.js';

const Collection = () => {
    
    // useScript("https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js")
    // useScript("https://unpkg.com/moralis/dist/moralis.js")

    Moralis.initialize("j2nFoDMxP7XTEpzQwtyVflJoMI0nXdYs4FBBWaEx");
    Moralis.serverURL = "https://3ydt3eazpluk.usemoralis.com:2053/server";

    async function getNFT(){
        let address = "0x57B860Fb7b8FD1DE8d7052241f6D4CC6B5E98F6F";

        const options = { 
            chain: 'mumbai', 
            address: '0x57B860Fb7b8FD1DE8d7052241f6D4CC6B5E98F6F', 
        };
      
        const polygonNFTs = await Moralis.Web3.getNFTs(options);
        console.log(polygonNFTs);

        
        polygonNFTs.forEach( e => {
            let url = e.token_uri;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                
                let currentDiv = document.getElementById("content");
                let content = `
                <div class="nft">
                    <a href="${"https://testnets.opensea.io/assets/mumbai/"+e.token_address+"/"+e.token_id}" target="_blank">
                    <p>${data.name}</p>
                    <img src="${data.image}"/>
                    </a>
                </div>
                `
                currentDiv.innerHTML += content;
            })
        })
    }
   
    useEffect(
        getNFT, // <- function that will run on every dependency update
        [] // <-- empty dependency array
    ) 
    return (
        
    <Container>
        
        <h1>🤑 Our NFTs </h1>
        <div id="content"></div>
    </Container>
    );
}

export default Collection;

const Container = styled.div`
text-align: center;
margin-top: 50px;
font-size: 2rem;
#content{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.nft{
    img{
        height: 250px;
        width: 200px;
        margin: 5px 15px;
        object-fit: cover;
    }
    p{
        font-size: 0.8rem;
    }
}

`;



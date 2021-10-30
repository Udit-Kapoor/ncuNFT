import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";
import styled from "styled-components";
import ncuLogo from "./img/logo.png"
import HomeScreen from "./comp/HomeScreen"
import Collection from "./comp/Collection"

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [ability, setAbility] = useState("");
  const [edScore, setEdScore] = useState("");
  const [pScore, setPScore] = useState("");
  // const [metadata, setMetadata] = useState("");
   
  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
 
  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 
    addWalletListener(); 
}, []);

  const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);   
  };

  const onMintPressed = async () => {
    const attributes = [{
      "trait_type" : "Department",
      "value" : department
    }, {
      "trait_type" : "Designation",
      "value" : designation
    }, {
        "trait_type" : "Ability",
        "value" : ability
      }, {
        "trait_type" : "Ed_Score",
        "value" : edScore
      }, {
        "trait_type" : "P_Score",
        "value" : pScore
      }]
    const { status } = await mintNFT(url, name, description, attributes);
    setStatus(status);
};

  return (
    <Container>
      <Header>
      <Nav>
      <Logo href="">
        <img src={ncuLogo} alt="" />
        <h2>NFT<span>Collectables</span></h2>
      </Logo>
      <Menu>
        <MenuLink href="">Home</MenuLink>
        <MenuLink href="">Mint</MenuLink>
        <MenuLink href="">Marketplace</MenuLink>
      </Menu>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      </Nav>
      <HomeScreen />
      </Header>
      <Collection />
      <br></br>
      <h1 id="title">🧙‍♂️ Mint NFTs</h1>
      <p className="tittle_bottom">
        (Admin only)
      </p>
      <form>
        <br/>
          <label>🖼 Link to asset: </label>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <br/>
        <label>🤔 Name: </label>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <br/>
        <label>✍️ Description: </label>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
        <br/>
        <label>🎓 Department: </label>
        <input
          type="text"
          placeholder="e.g. CSE , APS , LA "
          onChange={(event) => setDepartment(event.target.value)}
        />
        <br/>
        <label>👓 Designation: </label>
        <input
          type="text"
          placeholder="e.g. Professor , HOD "
          onChange={(event) => setDesignation(event.target.value)}
        />
        <br/>
        <label>🏋🏻‍♂️ Ability: </label>
        <input
          type="text"
          placeholder="e.g. Kindness , Forgiving "
          onChange={(event) => setAbility(event.target.value)}
        />
        <br/>
        <label>👨🏻‍🎓 ED Score: </label>
        <input
          type="number"
          placeholder="range 0 - 100 "
          onChange={(event) => setEdScore(event.target.value)}
        />
        <br/>
        <label>♟ P SCore: </label>
        <input
          type="number"
          placeholder="range 0 - 100 "
          onChange={(event) => setPScore(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </Container>
  );
};

const MenuLink = styled.a`
  padding: 1rem 2rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: #fff;
  transition: all 0.3s ease-in;
  font-size: 1.5rem;
  font-weight: 700;
  &:hover {
    color: #7b7fda;
  }
`;

const Header = styled.div`
  margin: 0 -160px;
  background-color: #0F152E;
  padding: 0 160px 50px 160px ;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;

`;

const Container = styled.div`
  width: 100%;
  overflow-x: hidden;
  padding: 0 100px;
  box-sizing: border-box;
  input {
	border: 0;
	z-index: 1;
	background-color: transparent;
	border-bottom: 2px solid #eee; 
	font: inherit;
	font-size: 1.125rem;
	padding: .25rem 0;
	&:focus, &:valid {
		outline: 0;
		border-bottom-color: #6658d3;
		&+.input-label {
			color: #6658d3;
			transform: translateY(-1.5rem);
		}
	}
}

`;
const Nav = styled.div`
  padding: 0 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-family: 'Montserrat';
  position: relative;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 1rem 0;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease-in;
  font-weight: 800;
  font-size: 1.7rem;
  display: flex;
  align-items: center;
  h2{
    display: inline-block;
  }
  img{
    display: inline-block;
    margin: 0 20px;
  }
  span {
    font-weight: 600;
    font-size: 1.3rem;
  }
  &:hover{
    color: ${props => props.theme.primary}
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? "300px" : "0")};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;



export default Minter;

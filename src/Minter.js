import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, mintNFT } from "./utils/interact.js";

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
    const attributes = [{"Department":department,"Designation":designation,"Ability":ability,"ED_Score":edScore,"P_Score":pScore}]
    const { status } = await mintNFT(url, name, description, attributes);
    setStatus(status);
};

  return (
    <div className="Minter">
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

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🤔 Name: </h2>
        <input
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
        <h2>✍️ Department: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDepartment(event.target.value)}
        />
        <h2>✍️ Designation: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDesignation(event.target.value)}
        />
        <h2>✍️ Ability: </h2>
        <input
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setAbility(event.target.value)}
        />
        <h2>✍️ ED Score: </h2>
        <input
          type="number"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setEdScore(event.target.value)}
        />
        <h2>✍️ P SCore: </h2>
        <input
          type="number"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setPScore(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;

require('dotenv').config();
const key = "a776ac18dc06bbf83ec6";
// process.env.REACT_APP_PINATA_KEY;
const secret = "f2056818c17494d425dc80be47bdf176226f0a995f040d6030b3cf44653268a8";
// process.env.REACT_APP_PINATA_SECRET;

const axios = require('axios');

export const pinJSONToIPFS = async(JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios 
        .post(url, JSONBody, {
            headers: {
                pinata_api_key: key,
                pinata_secret_api_key: secret,
            }
        })
        .then(function (response) {
           return {
               success: true,
               pinataUrl: "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash
           };
        })
        .catch(function (error) {
            console.log(error)
            return {
                success: false,
                message: error.message,
            }

    });
};
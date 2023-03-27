import React from 'react';

import {ethers} from "ethers";
import {Box, Button} from "@mui/material";

const SignIn = ({setWallet}) => {

    const connectToMetamask = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        setWallet(accounts[0])
    }

    return (
        <Box
            sx={{
                marginTop: 30,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <img className="logo-sign-in" src={process.env.PUBLIC_URL + '/logo.png'}/>
            <Box sx={{marginTop: 5}}/>
            <Button variant="contained"
                    onClick={connectToMetamask}>
                Connect to Metamask
            </Button>
        </Box>
    )
}

export default SignIn;
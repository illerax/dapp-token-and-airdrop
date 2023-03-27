import React, {useState} from 'react';
import {Box, Button, Divider, List, ListItem, ListItemText, TextField} from "@mui/material";
import {ethers} from "ethers";

const TokenControls = ({callAirdropContract, showModalWithText}) => {

    const [airdropSum, setAirdropSum] = useState(0);
    const [address, setAddress] = useState(null);
    const [addressList, setAddressList] = useState([]);

    const setAirdropSumValue = (val) => {
        setAirdropSum(val ? val : airdropSum);
    }

    const addToAddressList = (val) => {
        if (addressList.includes(val)) {
            showModalWithText(`Address is already in list`);
        } else if (ethers.utils.isAddress(val)) {
            setAddressList((prevState) => [...prevState, val]);
        } else {
            showModalWithText(`Wrong address: ${val}`);
        }
    }

    const startAirdrop = () => {
        if(!addressList || addressList.length < 1) {
            showModalWithText(`Add addresses`);
        } else if(!airdropSum) {
            showModalWithText(`Set airdrop amount`);
        } else {
            callAirdropContract(airdropSum, addressList);
            setAddressList([]);
            setAirdropSum(0);
        }
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            ml: 0
        }}>
            <List component="nav" aria-label="mailbox folders">
                <ListItem>
                    <ListItemText primary="1."/>
                    {addressList && addressList[0] ? <ListItemText secondary={addressList[0]}/> : ""}
                </ListItem>
                <Divider/>
                <ListItem divider>
                    <ListItemText primary="2."/>
                    {addressList && addressList[1] ? <ListItemText secondary={addressList[1]}/> : ""}
                </ListItem>
                <ListItem>
                    <ListItemText primary="3."/>
                    {addressList && addressList[2] ? <ListItemText secondary={addressList[2]}/> : ""}
                </ListItem>
                <Divider light/>
            </List>
            <Box sx={{
                display: 'flex',
                alignItems: 'left',
            }}>
                <TextField id="add-address"
                           value={address}
                           onInput={event => setAddress(event.target.value)}
                           label="Add wallet to airdrop list"
                           variant="outlined"
                           size="small"/>
                <Button size="medium"
                        disabled={addressList && addressList.length > 2}
                        onClick={() => addToAddressList(address)}
                        variant="outlined">Add</Button>
                <Button size="medium"
                        disabled={!addressList || addressList.length < 1}
                        onClick={() => setAddressList([])}
                        variant="text">Clear</Button>
            </Box>
            <Box sx={{
                marginTop: 3,
                display: 'flex',
                alignItems: 'left',
            }}>
                <TextField id="airdrop-sum"
                           value={airdropSum}
                           onInput={event => setAirdropSumValue(event.target.value)}
                           type="number"
                           label="Airdrop amount"
                           variant="outlined"
                           size="small"/>
                <Button size="medium"
                        onClick={startAirdrop}
                        variant="contained">
                    Airdrop
                </Button>
            </Box>
        </Box>
    )
}

export default TokenControls;
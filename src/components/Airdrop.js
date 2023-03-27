import React, {useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    CircularProgress
} from "@mui/material";
import {ethers} from "ethers";
import {AIRDROP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS} from "../constants";
import TOKEN_ABI from "../abi/contractTokenAbi";
import AIRDROP_ABI from "../abi/contractAirdropAbi";
import AirdropModal from "./AirdropModal";
import {formatUnits} from "ethers/lib/utils";
import TokenTable from "./TokenTable";
import TokenControls from "./TokenControls";

const Airdrop = () => {

    const [isWaiting, setIsWaiting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [tokenInfo, setTokenInfo] = useState({});

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, TOKEN_ABI, provider);
    const airdropContract = new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AIRDROP_ABI, provider);
    const signer = provider.getSigner();

    const showModalWithText = (val) => {
        setModalText(val);
        setShowModal(true)
    }

    const callAirdropContract = async (sum, addressList) => {
        setIsWaiting(true);
        try {
            const transaction = await airdropContract.connect(signer).airdropWithTransfer(TOKEN_CONTRACT_ADDRESS, addressList, addressList.map(it => sum));
            const receipt = await transaction.wait();
            console.log(receipt);
        } catch (err) {
            console.log(err)
        }
        setIsWaiting(false);
    }

    const getTokenInfo = async () => {
        try {
            const [decimals, name, symbol, totalSupply, tokenBalance, airdropBalance] = await Promise.all([
                tokenContract.decimals(),
                tokenContract.name(),
                tokenContract.symbol(),
                tokenContract.totalSupply(),
                tokenContract.balanceOf(TOKEN_CONTRACT_ADDRESS),
                tokenContract.balanceOf(AIRDROP_CONTRACT_ADDRESS)
            ]);
            setTokenInfo({
                name: name,
                symbol: symbol,
                decimals: decimals,
                totalSupply: formatUnits(totalSupply),
                tokenBalance: formatUnits(tokenBalance),
                airdropBalance: formatUnits(airdropBalance),
            });
            console.log(JSON.stringify(tokenInfo))
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTokenInfo();
        return () => {
            console.log("cleanup")
        };

    }, [isWaiting]);

    return (
        <div>
            <AirdropModal text={modalText}
                          open={showModal}
                          handleClose={() => setShowModal(false)}/>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isWaiting}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>

            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >

                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <TokenTable tokenInfo={tokenInfo}/>
                </Box>
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        ml: 5
                    }}
                >
                    <TokenControls callAirdropContract={callAirdropContract}
                                   showModalWithText={showModalWithText}/>
                </Box>
            </Box>
        </div>
    )
}

export default Airdrop;
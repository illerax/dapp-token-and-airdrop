import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {AIRDROP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS} from "../constants";


const TokenTable = ({tokenInfo}) => {

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableBody>
                    <TableRow key="token-address">
                        <TableCell component="th" scope="row">Token address:</TableCell>
                        <TableCell align="left">{TOKEN_CONTRACT_ADDRESS}</TableCell>
                    </TableRow>
                    <TableRow key="airdrop-address">
                        <TableCell component="th" scope="row">Airdrop contract address:</TableCell>
                        <TableCell align="left">{AIRDROP_CONTRACT_ADDRESS}</TableCell>
                    </TableRow>
                    <TableRow key="token-name">
                        <TableCell component="th" scope="row">Name:</TableCell>
                        <TableCell align="left">{tokenInfo.name}</TableCell>
                    </TableRow>
                    <TableRow key="token-symbol">
                        <TableCell component="th" scope="row">Symbol:</TableCell>
                        <TableCell align="left">{tokenInfo.symbol}</TableCell>
                    </TableRow>
                    <TableRow key="token-decimals">
                        <TableCell component="th" scope="row">Decimals:</TableCell>
                        <TableCell align="left">{tokenInfo.decimals}</TableCell>
                    </TableRow>
                    <TableRow key="token-total-supply">
                        <TableCell component="th" scope="row">Total supply:</TableCell>
                        <TableCell align="left">{tokenInfo.totalSupply}</TableCell>
                    </TableRow>
                    <TableRow key="token-token-balance">
                        <TableCell component="th" scope="row">Token balance:</TableCell>
                        <TableCell align="left">{tokenInfo.tokenBalance}</TableCell>
                    </TableRow>
                    <TableRow key="token-airdrop-balance">
                        <TableCell component="th" scope="row">Airdrop available balance:</TableCell>
                        <TableCell align="left">{tokenInfo.airdropBalance}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TokenTable;
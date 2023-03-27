import SignIn from "./components/SignIn";
import React, {useState} from "react";
import {Container, createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import Airdrop from "./components/Airdrop";

const theme = createTheme();

function App() {
    const [wallet, setWallet] = useState();
    const view = wallet ? <Airdrop/> : <SignIn setWallet={setWallet}/>;
    return (
        <div className="App">
            <CssBaseline/>
            <ThemeProvider theme={theme}>
                <Container component="main" >
                    {view}
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default App;

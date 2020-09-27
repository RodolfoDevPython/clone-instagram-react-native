import React from "react";
import { StatusBar } from "react-native"; //ajuste para o header no android pq ele vem com uma cor padrão no statusBar

import Router from "./router";


// barStyle -> estilo da cor de fonte dos icones de status bar
export default function App() {
    return(
        <>
            <StatusBar barStyle='dark-content' backgroundColor="#dddddd" />
            <Router />
        </>
    )
}
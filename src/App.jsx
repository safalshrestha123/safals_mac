import React from 'react'
import {Dock, Navbar, Welcome} from "#components/index.js";
import { Terminal } from "#windows/index.js";


const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Terminal />
            <Dock/>
        </main>
    )
}
export default App

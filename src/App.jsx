import React from 'react'
import {Dock, Home, Navbar, Welcome} from "#components/index.js";
import { Contact, Finder, ImageFile, Photos, Resume, Safari, Terminal, TextFile, Trash } from "#windows/index.js";


const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Home />
            <Safari />
            <Terminal />
            <Finder />
            <TextFile />
            <ImageFile />
            <Resume />
            <Photos />
            <Contact />
            <Trash />
            <Dock/>
        </main>
    )
}
export default App

import React, { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./comps/LandingPage";
import CodeBlockPage from "./comps/CodeBlockPage";
import io from "socket.io-client";
import dotenv from "dotenv";
import "./styles.css";

dotenv.config();


function App() {
  const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);

  useEffect(() => {
    getData()
  }, []);

  async function getData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/code-blocks`);
      setBlocks(response.data);
    } catch (err) {
      throw err;
    }
  }

  function handleBlockClick(block) {
    setSelectedBlock(Object.values(block));
  }

  function handleBackClick() {
    setSelectedBlock([])
  }

  return (
    <div className="app">
      {
        selectedBlock.length === 0 ? <LandingPage blocks={blocks} onBlockClick={handleBlockClick} /> :
          <CodeBlockPage block={selectedBlock} back={handleBackClick} socket={socket} />
      }
    </div>
  );
}


export default App;

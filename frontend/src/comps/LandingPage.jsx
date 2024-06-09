import React from "react";
import CodeBlockCard from "./CodeBlockCard";

function LandingPage({ blocks, onBlockClick }) {
    const handleBlockClick = onBlockClick;

    function makeBlockList() {
        return (
            <div className="block-list">
                <ul className="list-head">
                    {blocks.map(makeCodeBlockCard)}
                </ul>
            </div>
        )
    }

    function makeCodeBlockCard(block) {
        return <li key={block.id}><CodeBlockCard block={block} onBlockClick={handleBlockClick} /></li>
    }

    return <div className="landing-page">
        <h1>Choose code block:</h1>
        {makeBlockList()}
    </div>
}

export default LandingPage;
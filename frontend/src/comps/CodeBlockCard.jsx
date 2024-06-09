import React from "react";

function CodeBlock({ block, onBlockClick }) {
    return (
        <div className="code-block-card" onClick={() => onBlockClick(block)}>
            <h1>{block.title}</h1>
            <h2>{block.code}</h2>
        </div>
    )
}

export default CodeBlock;
import React, { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor";



function CodeBlockPage({ back, block ,socket}) {
    const handleBackClick = back;
    const [id, title, code] = block;
    const [editableCode, setEditableCode] = useState(code);
    const [isMentor, setIsMentor] = useState(true);

    useEffect(() => {
        socket.emit('join_room', id);

        socket.on('client_id', clientID => {
            console.log(`My Client ID = ${clientID}`);
            if (clientID > 0) {
                setIsMentor(false);
            } else {
                setIsMentor(true);
            }
        });

        socket.on('code_update', (newCode) => {
            setEditableCode(newCode);
        });

        function cleanup() {
            socket.emit('leave_room', id);
            socket.off('client_id');
            socket.off('code_update');
        }

        window.addEventListener('beforeunload', cleanup);

        return () => {
            window.removeEventListener('beforeunload', cleanup);
            cleanup();

        };
    }, [id, socket]);

    function handleCodeChange(newVal) {
        const newCode = newVal;
        setEditableCode(newCode);
        socket.emit('code_change', { room: id, code: newCode });
    };

    return (
        <div className="code-block-page">
            <button onClick={handleBackClick}>Exit Session</button>
            <h1>{title}</h1>
            <p>You are using this page as a {isMentor ? "Mentor" : "Student"}</p>
            <CodeEditor code={editableCode} onChange={handleCodeChange} readonly={isMentor}/>
        </div>
    )
}


export default CodeBlockPage;


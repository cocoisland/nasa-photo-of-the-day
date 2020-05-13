import React, {useEffect, useState} from 'react';

function MouseMove() {
    const [position, setPosition] = useState({ x:0, y:0});

    useEffect( () => {
        const setFromEvent = e => {
            setPosition({ x:e.clientX, y:e.clientY })
        };
        window.addEventListener('mousemove', setFromEvent);

        // CleanUp Effect return
        return() => {window.removeEventListener('mousemove', setFromEvent)};
    }, [position]);

    // function component return
    return (
        <div>{position.x} {position.y}</div>
    )
}

export default MouseMove;
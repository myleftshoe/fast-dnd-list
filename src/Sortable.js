import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Handler from './Handler';
import { preventDefault } from './events';

//------------------------------------------------------------------------------

export default function Sortable(props) {

    let [handler, setHandler] = useState();
    let [started, setStarted] = useState();

    useEffect(() => {
        setHandler(new Handler(containerRef.current, props));
    }, [props.children]);

    // workaround to prevent mousedown event firing after 300ms when using touch
    useEffect(() => { containerRef.current.ontouchstart = preventDefault })

    const containerRef = useRef();

    function start(e) {
        setStarted(true);
        handler.grasp(e);
        props.onGrasp && props.onGrasp();
    }

    function move(e) {
        handler.move(e);
        props.Drag && props.onDrag();
    }

    function end(e) {
        const result = handler.release(e);
        setStarted();
        props.onDrop && props.onDrop(result);
    }

    const handleStart = handler && start;
    const handleMove = started && handler && move;
    const handleEnd = handler && end;

    return <div style={{ overflowY: 'scroll' }}>
        <div
            className='container'
            ref={containerRef}
            onPointerDown={handleStart}
            onPointerMove={handleMove}
            onPointerUp={handleEnd}
            onContextMenu={preventDefault}
        >
            {props.children}
        </div>
    </div >
}

//------------------------------------------------------------------------------

Sortable.propTypes = {
    onGrasp: PropTypes.func,
    onDrag: PropTypes.func,
    onDrop: PropTypes.func,
    raised: PropTypes.bool,
    dragClassName: PropTypes.string,
}

Sortable.defaultProps = {
    raised: true,
    dragClassName: 'drag-style',
}

//------------------------------------------------------------------------------

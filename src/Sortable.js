import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Handler from './Handler';
import { preventDefault } from './events';

//------------------------------------------------------------------------------

export default function Sortable(props) {

    let [handler, setHandler] = useState();
    let [started, setStarted] = useState(false);
    let [usingTouch, setUsingTouch] = useState(true);

    const containerRef = useRef();

    useEffect(() => {
        setHandler(new Handler(containerRef.current, props));
    }, [props.children]);

    function onPointerDown(e) {
        if (e.pointerType === 'touch')
            setUsingTouch(true);
        else
            setUsingTouch(false);
    }

    function start(e) {
        setStarted(true);
        if (e.target === containerRef.current) return;
        handler.grasp(e.target);
        props.onGrasp && props.onGrasp();
    }

    function move(e) {
        if (usingTouch)
            handler.move(e.touches[0].clientX, e.touches[0].clientY);
        else
            handler.move(e.clientX, e.clientY);

        props.Drag && props.onDrag();
    }

    function end() {
        const result = handler.release();
        setStarted(false);
        props.onDrop && props.onDrop(result);
    }

    let events = {};

    if (handler) {
        if (usingTouch) events = {
            onTouchStart: start,
            onTouchMove: move,
            onTouchEnd: end,
        }
        else events = {
            onMouseDown: start,
            onMouseMove: started ? move : null,
            onMouseUp: end,
        }
    }

    return <div style={{ overflowY: 'scroll' }}>
        <div
            className='container'
            ref={containerRef}
            onPointerDown={onPointerDown}
            {...events}
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

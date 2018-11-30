import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Handler from './Handler';
import { preventDefault } from './events';

//------------------------------------------------------------------------------

export default function Sortable(props) {

    let [handler, setHandler] = useState();
    let [started, setStarted] = useState(false);
    let [usingTouch, setUsingTouch] = useState(false);
    useEffect(() => {
        setHandler(new Handler(containerRef.current, props));
    }, [props.children]);

    // workaround to prevent mousedown event firing after 300ms when using touch
    useEffect(() => {
        // if (preventMouse)
        //     containerRef.current.ontouchstart = preventDefault;
        // else
        //     containerRef.current.ontouchstart = null;
        // console.log(containerRef.current.ontouchstart);
    })

    const containerRef = useRef();

    function onPointerDown(e) {
        console.log('onPointerDown');
        if (e.pointerType === 'touch')
            setUsingTouch(true);
        else
            setUsingTouch(false);
    }

    function touchStart(e) {
        console.log('touchStart');
        // setUsingTouch(true);
        if (e.target === containerRef.current) return;
        handler.grasp(e.target);
        props.onGrasp && props.onGrasp();
    }

    function touchMove(e) {
        console.log('touchMove');
        handler.move(e.touches[0].clientX, e.touches[0].clientY);
        props.Drag && props.onDrag();
    }

    function touchEnd() {
        console.log('touchEnd');
        const result = handler.release();
        setStarted();
        props.onDrop && props.onDrop(result);
    }

    function mouseDown(e) {
        console.log('mouseDown');
        setStarted(true);
        // setUsingTouch(false);
        if (e.target === containerRef.current) return;
        handler.grasp(e.target);
        props.onGrasp && props.onGrasp();
    }

    function mouseMove(e) {
        console.log('mouseMove');
        handler.move(e.clientX, e.clientY);
        props.Drag && props.onDrag();
    }

    function mouseUp() {
        console.log('mouseUp');
        const result = handler.release();
        setStarted(false);
        props.onDrop && props.onDrop(result);
    }

    const handleTouchStart = usingTouch && handler ? touchStart : null;
    const handleTouchMove = usingTouch && handler ? touchMove : null;
    const handleTouchEnd = usingTouch && handler ? touchEnd : null;

    const handleMouseDown = !usingTouch && handler ? mouseDown : null;
    const handleMouseMove = started && !usingTouch && handler ? mouseMove : null;
    const handleMouseUp = !usingTouch && handler ? mouseUp : null;

    return <div style={{ overflowY: 'scroll' }}>
        <div
            className='container'
            ref={containerRef}
            onPointerDown={onPointerDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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

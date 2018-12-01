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

    useEffect(() => {
        if (!usingTouch && started)
            document.body.addEventListener("mousemove", move);
        else
            document.body.removeEventListener("mousemove", move);
        return () => {
            document.body.removeEventListener("mousemove", move);
        };
      });

    function handlePointerDown(e) {
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
            // onMouseMove: started ? move : null,
            onMouseUp: end,
            // onMouseLeave:  end,
        }
    }

    return (
        //
        // Notes:
        //
        // 1. The draggable is positioned relatively. In order for it to not be cut-off when dragged
        // beyond the container edges requires overflow-x: visible on the container. But it's not
        // possible to have overflow visible on one axis and allow the other axis to scroll: the
        // visible axis will be overidden with overflow: auto (google it!).
        // The solution is to wrap the container with overflow-x: visible in a scrollable div as
        // below.
        // Positioning the draggable absolutely allows it to remain visible no matter where it is
        // but will close the placeholder when grasped. It also requires its size to be tweaked
        // on grasp as it loses its container padding.
        //
        // 2. The event listeners are attached to the wrapper (not the container) as the mousemove
        // events do not fire when the draggable is outside the container (and dragged fast so that
        // the mouse leaves the draggable). I.e. the draggable freezes until the mouse is moved over
        // it again. The container fits the list contenet snuggly whereas the wrapper is the full width
        // of the page -> events on the wrapper continue to fire.
        // Update: Now adds mousemove listener to the document so others can go either on container or
        // wrapper. Leave on wrapper for now.

        <div style={{ overflowY: 'scroll' }}
            onPointerDown={handlePointerDown}
            {...events}
            onContextMenu={preventDefault}
        >
            <div className='container' ref={containerRef}>
                {props.children}
            </div>
    </div >
    )
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

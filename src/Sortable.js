import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Handler from './Handler';
import { preventDefault } from './events';

//------------------------------------------------------------------------------

export default function Sortable(props) {

    useEffect(() => {
        handler = new Handler(containerRef.current, props);
    });

    const containerRef = useRef();

    let handler;

    function onTouchStart(e) {
        handler.grasp(e);
        props.onGrasp && props.onGrasp();
    }

    function onTouchMove(e) {
        handler.move(e);
        props.Drag && props.onDrag();
    }

    function onTouchEnd(e) {
        const result = handler.release(e);
        props.onDrop && props.onDrop(result);
    }

    return <div style={{ overflowY: 'scroll' }}>
        <div
            className='container'
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onContextMenu={preventDefault}
        >
            {props.children}
        </div>
    </div>
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

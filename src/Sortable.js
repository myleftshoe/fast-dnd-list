import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Handler from './Handler';
import { preventDefault } from './utils';

//------------------------------------------------------------------------------

export default function Sortable(props) {

    useEffect(() => {
        handler = new Handler(containerRef.current, props);
        return null;
    });

    const containerRef = React.createRef();
    let handler;

    function onTouchStart(e) {
        e.stopPropagation();
        handler.init(e);
        props.onGrasp && props.onGrasp();
    }

    function onTouchMove(e) {
        e.stopPropagation();
        handler.handleMove(e);
        props.Drag && props.onDrag();
    }

    async function onTouchEnd(e) {
        e.stopPropagation();
        const result = await handler.release(e);
        console.table([...containerRef.current.children].map(({ style }) => [style.transition, style.transform]))
        props.onDrop && props.onDrop(result)
        // setTimeout(() => props.onDrop && props.onDrop(result),2000);
    }

    return <div
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onContextMenu={preventDefault}
    >
        {props.children}
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

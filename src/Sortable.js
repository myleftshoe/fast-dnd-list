import React from 'react';
import PropTypes from 'prop-types';
import Draggable from './Draggable';
import { preventDefault } from './utils';

export default function Sortable(props) {

    let startPosition, currentPosition;

    const getTotalMovement = ({ x, y }) => ({
        x: x - startPosition.x,
        y: y - startPosition.y,
    });

    let draggable;

    function onTouchStart(e) {
        e.stopPropagation();
        draggable = new Draggable(e.target, props);
        draggable.grasp(draggable);
        startPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        props.onGrasp && props.onGrasp();
    }

    function onTouchMove(e) {
        e.stopPropagation();
        currentPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY }
        const { x, y } = getTotalMovement(currentPosition);
        draggable.element.style.transform = `translate(${x}px,${y}px)`;
        props.Drag && props.onDrag();
    }

    const onTouchEnd = e => {
        e.stopPropagation();
        draggable.release(draggable);
        props.onDrop && props.onDrop();
    }

    return <div
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

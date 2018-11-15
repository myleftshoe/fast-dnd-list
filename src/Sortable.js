import React from 'react';
import PropTypes from 'prop-types';
import Draggable from './Draggable';
import { preventDefault } from './utils';

export default function Sortable(props) {

    let draggable;

    function onTouchStart(e) {
        e.stopPropagation();
        draggable = new Draggable(e.target, props);
        draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
        draggable.grasp(draggable);
        props.onGrasp && props.onGrasp();
    }

    function onTouchMove(e) {
        e.stopPropagation();
        draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
        props.Drag && props.onDrag();
    }

    function onTouchEnd(e) {
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

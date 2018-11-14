import React from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';

export default function Sortable(props) {

    let startPosition, currentPosition;

    const getTotalMovement = ({x, y}) => ({
        x: x - startPosition.x,
        y: y - startPosition.y,
    });

    let draggable;

    function animateGrasp() {
        draggable.style.zIndex = 999;
        draggable.style.position = 'relative';
        draggable.style.transition = transitions.grasp;
        draggable.classList.add(props.dragClassName);
        props.raised && draggable.classList.add('shadow');
    }

    function onTouchStart(e) {
        e.stopPropagation();
        draggable = e.target;
        // console.log(draggable.position);
        // console.log(draggable.style);
        animateGrasp(draggable);
        startPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        props.onGrasp && props.onGrasp();
    }

    function onTouchMove(e) {
        e.stopPropagation();
        currentPosition = {x: e.touches[0].clientX, y: e.touches[0].clientY}
        const { x, y } = getTotalMovement(currentPosition);
        draggable.style.transform = `translate(${x}px,${y}px)`;
        props.Drag && props.onDrag();
    }

    async function moveIntoPlace() {
        if (!currentPosition)
            return Promise.resolve();
        const event = fireAndForget(draggable, "transitionend");
        draggable.style.transition = transitions.moveIntoPlace;
        draggable.style.transform = null;
        await event;
        return event;
    }

    async function settleIntoPlace() {
        const event = fireAndForget(draggable, "transitionend");
        draggable.classList.remove(props.dragClassName);
        draggable.classList.remove('shadow');
        draggable.style.transition = transitions.settleIntoPlace;
        await event;
        draggable.style.transition = null;
    }

    async function animateRelease() {
        await moveIntoPlace(draggable);
        settleIntoPlace(draggable);
        draggable.style.zIndex = 0;
    };

    const onTouchEnd = e => {
        e.stopPropagation();
        animateRelease(draggable);
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

const transitions = {
    grasp: 'box-shadow .2s ease-in-out, background-color .2s ease-in-out',
    moveIntoPlace: 'transform .2s ease-in-out',
    settleIntoPlace: 'box-shadow .2s ease-in-out, background-color .2s ease-in-out'
}

const preventDefault = e => e.preventDefault();

const fireAndForget = (target, eventName) => new Promise((resolve, reject) => {
    const handler = ({ target }) => {
        target.removeEventListener(eventName, handler, false);
        resolve();
    }
    target.addEventListener(eventName, handler, false);
})

import React from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';

export default function Sortable(props) {

    let startPosition, currentPosition;

    const getTotalMovement = ({x, y}) => ({
        x: x - startPosition.x,
        y: y - startPosition.y,
    });

    const animateGrasp = target => {
        target.style.zIndex = 999;
        target.style.position = 'relative';
        target.style.transition = transitions.grasp;
        target.classList.add(props.dragClassName);
        props.raised && target.classList.add('shadow');
    }

    const onTouchStart = e => {
        e.stopPropagation();
        animateGrasp(e.target);
        startPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        props.onGrasp && props.onGrasp();
    }

    const onTouchMove = e => {
        e.stopPropagation();
        currentPosition = {x: e.touches[0].clientX, y: e.touches[0].clientY}
        const { x, y } = getTotalMovement(currentPosition);
        e.target.style.transform = `translate(${x}px,${y}px)`;
        props.Drag && props.onDrag();
    }

    const moveIntoPlace = async target => {
        if (!currentPosition)
            return Promise.resolve();
        const event = fireAndForget(target, "transitionend");
        target.style.transition = transitions.moveIntoPlace;
        target.style.transform = null;
        await event;
        return event;
    }

    const settleIntoPlace = async target => {
        const event = fireAndForget(target, "transitionend");
        target.classList.remove(props.dragClassName);
        target.classList.remove('shadow');
        target.style.transition = transitions.settleIntoPlace;
        await event;
        target.style.transition = null;
    }

    const animateRelease = async target => {
        await moveIntoPlace(target);
        settleIntoPlace(target);
        target.style.zIndex = 0;
    };

    const onTouchEnd = e => {
        e.stopPropagation();
        animateRelease(e.target);
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

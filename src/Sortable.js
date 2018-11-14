import React from 'react';
import PropTypes from 'prop-types';
import './Draggable.css';


function Draggable(element, props) {

    return {

        get element() {
            return element
        },

        get props() {
            return props
        },

        grasp() {
            element.style.zIndex = 999;
            element.style.position = 'relative';
            element.style.transition = transitions.grasp;
            element.classList.add(props.dragClassName);
            props.raised && element.classList.add('shadow');
        },

        async moveIntoPlace() {
            const { element } = this;
            // if (!currentPosition)
            //     return Promise.resolve();
            const event = fireAndForget(element, "transitionend");
            element.style.transition = transitions.moveIntoPlace;
            element.style.transform = null;
            await event;
            return event;
        },

        async settleIntoPlace() {
            const { element, props } = this;
            const event = fireAndForget(element, "transitionend");
            element.classList.remove(props.dragClassName);
            element.classList.remove('shadow');
            element.style.transition = transitions.settleIntoPlace;
            await event;
            element.style.transition = null;
        },

        async release() {
            const { element } = this;
            await this.moveIntoPlace();
            this.settleIntoPlace();
            element.style.zIndex = 0;
        }
    }
}

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

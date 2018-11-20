import Draggable from './Draggable';

export default function (containerElement, props) {

    const container = {
        element: containerElement,
        indexOf: element => [...containerElement.children].indexOf(element),
        children: () => [...containerElement.children],
    }

    let draggable;
    let last;
    let placeholderIndex;
    let lastDirection;

    return {

        grasp(e) {

            if (e.target === container.element) return;

            draggable = new Draggable(e.target, props);
            draggable.grasp(draggable);

            placeholderIndex = container.children().indexOf(draggable.element);

            last = { element: draggable.element, direction: null };

        },

        move(e) {

            draggable.position = [e.touches[0].clientX, e.touches[0].clientY];
            scrollIfRequired();

            const { direction, dimensions: { height } } = draggable;
            const elements = container.children();

            if (direction === 'up' && lastDirection === 'down')
                placeholderIndex++;
            else if (direction === 'down' && lastDirection === 'up')
                placeholderIndex--;

            if (direction === 'down') {
                for (let i = placeholderIndex + 1; i < elements.length; i++) {
                    const element = elements[i];
                    const translateY = Number((element.style.transform.match(/-?\d+/g) || [0])[0]);
                    const { top } = element.getBoundingClientRect();
                    if (top > draggable.absoluteCenter[1]) break;
                    element.style.willChange = 'transform';
                    if (element !== draggable.element)
                        element.style['transition'] = 'transform .2s ease-in-out';
                    element.style['transform'] = `translateY(${-height + translateY}px)`;
                    last.element = element;
                    placeholderIndex++;
                }
            }
            else if (direction === 'up') {
                for (let i = placeholderIndex - 1; i >= 0; i--) {
                    const element = elements[i];
                    const translateY = Number((element.style.transform.match(/-?\d+/g) || [0])[0]);
                    const { top } = element.getBoundingClientRect();
                    if (top + element.offsetHeight < draggable.absoluteCenter[1]) break;
                    element.style.willChange = 'transform';
                    if (element !== draggable.element)
                        element.style['transition'] = 'transform .2s ease-in-out';
                    element.style['transform'] = `translateY(${height + translateY}px)`;
                    last.element = element;
                    placeholderIndex--;
                }
            }

            lastDirection = direction;

        },

        async release(e) {

            const oldIndex = container.indexOf(draggable.element);
            const newIndex = container.indexOf(last.element);

            await draggable.release(0, getFinalPosition());

            container.children().forEach(element => {
                element.style.transition = null;
                element.style.transform = null;
            });

            return { oldIndex, newIndex }
        }
    }

    function scrollIfRequired() {

        let scrollContainer = draggable.element.parentNode;
        while (scrollContainer) {
            if (scrollContainer === document.body) break;
            if (scrollContainer.scrollHeight > scrollContainer.clientHeight && window.getComputedStyle(scrollContainer)['overflow-y'] !== 'visible') break;
            scrollContainer = scrollContainer.parentNode;
        }
        scrollContainer = scrollContainer || document.body;

        const triggerOffset = 40;
        let offset = 0;

        const scrollable = scrollContainer;
        const containerRect = scrollable.getBoundingClientRect();
        const targetRect = draggable.element.getBoundingClientRect();
        const bottomOffset = Math.min(containerRect.bottom, window.innerHeight) - targetRect.bottom;
        const topOffset = targetRect.top - Math.max(containerRect.top, 0);
        const maxScrollTop = container.element.scrollHeight - Math.min(scrollable.clientHeight, window.innerHeight);

        if (bottomOffset < triggerOffset) {
            offset = Math.min(triggerOffset, triggerOffset - bottomOffset);
        }
        else if (topOffset < triggerOffset) {
            offset = Math.max(-triggerOffset, topOffset - triggerOffset);
        }
        // console.log(maxScrollTop, scrollable.scrollTop, offset);
        const scrollAmount = Math.max(0, Math.min(maxScrollTop, scrollable.scrollTop + offset));
        console.log(scrollAmount, document.body.scrollTop);
        scrollable.scrollTop = scrollAmount;
        // console.log(scrollable, scrollable.scrollTop);
        // window.scrollTop = scrollAmount;
        // scrollable.scrollTop = scrollable.scrollTop + 10;
        // document.documentElement.scrollTop = document.documentElement.scrollTop + scrollAmount;
        // console.log(document.documentElement.scrollTop);
    }

    function getFinalPosition() {

        const elementOffsetTop = last.element.offsetTop;
        const draggableOffsetTop = draggable.element.offsetTop;

        const [, translateY] = getElementTranslation(last.element);

        let y = elementOffsetTop - draggableOffsetTop;
        if (translateY === 0) {
            let off = draggable.dimensions.height;
            if (elementOffsetTop > draggableOffsetTop)
                off = -off;
            y = y + off;
        }

        return y;
    }

    function getElementTranslation(element) {
        const transformMatrix = window.getComputedStyle(element).getPropertyValue('transform');
        const [, , , , x, y] = transformMatrix.match(/-?\d+/g) || [0, 0, 0, 0, 0, 0];
        return [x, y]
    }

    function getElementUnderDraggable() {
        let element = null;
        const [cx, cy] = draggable.absoluteCenter;

        element = document.elementFromPoint(cx, cy);
        if (container.indexOf(element) < 0)
            element = null;

        return element;
    }

}

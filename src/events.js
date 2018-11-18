export const preventDefault = e => e.preventDefault();

export const fireAndForget = (target, eventName) => new Promise((resolve, reject) => {
    const handler = ({ target }) => {
        target.removeEventListener(eventName, handler, false);
        resolve();
    }
    target.addEventListener(eventName, handler, false);
})

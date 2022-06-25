/**
 * Make a call to mock API
 * @param {'edit' | 'delete' | 'add'} type
 * @param {*} data
 */
export default (type, data) => {
    return new Promise((r, rj) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/dev/point', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = () => {
            r(xhr.response);
        };

        xhr.onerror = (e) => {
            rj(xhr.status);
        };

        xhr.send(JSON.stringify({ type, data }));
    });
};

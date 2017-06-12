# poster
2-way postMessage


## API

#### initialisation
```js
/**
 * Poster
 * @param target - DOM node of the target:
 *                - if it's a parent app - target should be the iframe to which messages are sent
 *                - if initialisation is inside the iframe - the target would usually be the top/parent window
 * @param onMessageReceivedCallback - function that will be called when a message is received FROM the target
 */
const poster = new Poster(target, onMessageReceivedCallback);

/**
 * onMessageReceivedCallback
 * @param actionName - or channel; any string will do
 * @param params - can be a primitive, or a [serialisable](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) object that will be passed along with the message
 * @param responseCallback [optional] - if the received message expects a callback - this function should be called
 */
function onMessageReceivedCallback (actionName, params, responseCallback) { }
```

#### sending messages
```js
const actionName = 'channel4';
const params = { param: 'param one' };
const cb = msg => { console.log('parent: callback message', msg); }
poster.send(actionName, params, cb);
```

## Example usage

**index.html**
```js
const p = new Poster(document.getElementById('frame'), (action, params, cb) => {
    console.log('parent: onmessage', action, params);
    
    setTimeout(() => {
        cb({ response: 'callback from parent' });
    }, 1000);
});



p.send('parent-frame', { param: 'param one' }, msg => {
    console.log('parent: callback message', msg);
});
```


**frame.html**
```js
const p = new Poster(window.top, (action, params, cb) => {
    console.log('frame: onmessage', action, params);
    
    setTimeout(() => {
        cb({ response: 'callback from frame' });
    }, 1000);
});



p.send('parent-frame', { param: 'param one' }, msg => {
    console.log('parent: callback message', msg);
});
```

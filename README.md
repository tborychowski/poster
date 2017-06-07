# poster
2-way postMessage

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

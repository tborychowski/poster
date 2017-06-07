/**
 * Poster
 * handle "postMessage" communication between frames/webcontents/etc.
 * provides 2-way communication with callbacks
 *
 */

function Poster (target, handler) {
	if (!(this instanceof Poster)) return new Poster(...arguments);

	if (target.tagName === 'IFRAME') target = target.contentWindow;
	this.target = target;
	this.handler = handler || function () {};
	this.callbacks = {};

	window.addEventListener('message', this.onMsg.bind(this));
	return this;
}

Poster.prototype.send = function (action, params, cb) {
	const data = { action: action, params: params };
	if (typeof cb === 'function') {
		const id = 'cb_' + +new Date();
		this.callbacks[id] = cb;
		data.callback = id;
	}
	else if (typeof cb === 'string') data.callback = cb;
	this.target.postMessage(data, '*');
};


Poster.prototype.onMsg = function (e) {
	const action = e.data.action;
	const params = e.data.params;
	const cbId = e.data.callback;

	const cb = function (id, msg) {
		this.send('__callback', msg, id);
	};

	if (action === '__callback' && typeof this.callbacks[cbId] === 'function') {
		this.callbacks[cbId](params);
		delete this.callbacks[cbId];
	}
	else this.handler(action, params, cb.bind(this, cbId));
};

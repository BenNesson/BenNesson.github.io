var OBA = (function () {
    let DEFAULT_TRIES = 10;
    let OBA_REGION = 'pugetsound';

    let requestUrlBase = `https://api.${OBA_REGION}.onebusaway.org/api/where`;

    let createElement = function (elementName) {
        return document.createElement(elementName);
    }

    let callbacks = new Object();
    let getCallbackName = function () {
        let timeChunk = `${(new Date()).getTime()}`;
        let result = `cb_${timeChunk}`;
        for (let i = 0; typeof (callbacks[result]) !== 'undefined'; result = `cb_${timeChunk}_${i}`) {
            i++;
        }
        return result;
    };

    let request = function (url, callback, onError, tries) {
        if (typeof (tries) === 'undefined') {
            tries = DEFAULT_TRIES;
        }
        let callbackName = getCallbackName();
        let scriptTag = createElement('script');
        callbacks[callbackName] = {
            url: url,
            cb: function (r) {
                if (r.code == 200) {
                    callback(r);
                } else if (tries > 0) {
                    request(url, callback, tries - 1);
                } else if (onError) {
                    onError();
                }
                document.head.removeChild(scriptTag);
                delete callbacks[callbackName];
            }
        };
        let fullCallbackName = `OBA.callbacks.${callbackName}.cb`;
        scriptTag.setAttribute('src', `${url}&callback=${fullCallbackName}`);
        scriptTag.setAttribute('onerror', `${fullCallbackName}({code:0})`);
        document.head.appendChild(scriptTag);
    };

    let flattenParams = function (params) {
        let chunks = [];
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                chunks.push(`${key}=${params[key]}`);
            }
        }
        return chunks.join('&');
    };

    let api_request = function (requestData) {
        let _url = `${requestUrlBase}/${requestData.method}`;
        if (typeof (requestData.id) !== 'undefined') {
            _url = `${_url}/${requestData.id}`;
        }
        _url = `${_url}.json?${flattenParams(requestData.params)}`;
        request(_url, requestData.callback);
    };

    return {
        api_request: api_request,
        callbacks: callbacks,
        request: request
    };
})();

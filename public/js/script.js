/**
 * Execute JS only when DOM Content is loaded
 */
document.addEventListener("DOMContentLoaded", function() {

    const data = {
        item1: '1',
        item2: '2',
        item3: '3',
        item4: {
            item1: '1'
        }
    };

    const data2 = window.navigator;

    const BFI = {


        /**
         * Initialization function
         */
        init() {

            console.log(getWinNavData());
            iterate(getWinNavData(), '#window_navigator', '');
        }
    };

    BFI.init();
});



//================================================================================
// Auxiliary functions
//================================================================================



/**
 * Function that writes window.navigator properties into simple dictionary-like object
 * @return {object}
 */
function getWinNavData() {
    let data = {};
    const navObj = window.navigator;

    data.appCodeName = navObj.appCodeName;
    data.appName = navObj.appName;
    data.appVersion = navObj.appVersion;

    data.connection = {
        downlink: navObj.connection.downlink,
        effectiveType: navObj.connection.effectiveType,
        rtt: navObj.connection.rtt
    };

    data.hardwareConcurrency = navObj.hardwareConcurrency;
    data.language = navObj.language;
    data.languages = navObj.languages;
    data.maxTouchPoints = navObj.maxTouchPoints;
    data.platform = navObj.platform;
    data.plugins = formatWinNavPlugins(navObj.plugins);
    data.product = navObj.product;
    data.productSub = navObj.productSub;
    data.userAgent = navObj.userAgent;
    data.vendor = navObj.vendor;

    console.log(formatWinNavPlugins(navObj.plugins));
    return data;
}

function formatWinNavPlugins(obj) {
    let plugins = {};

    for (plugin in obj) {
        if (obj.hasOwnProperty(plugin)) {
            let pluginName = obj[plugin].name;
            plugins[pluginName] = {
                description: obj[plugin].description,
                filename: obj[plugin].filename,
                type: obj[plugin][0].type
            };
            plugins[pluginName].description = obj[plugin].description;
            plugins[pluginName].MimeType = obj[plugin][0];
            delete plugins[pluginName][0];
        }
    }
    return plugins;
}

/**
 * Auxiliary function to write object key-value pairs as unordered list into defined element
 * Works recursively
 * @param {object} obj object with data
 * @param {string} selector html selector for element to write for. In recursive == false
 * @param {string} stack for recursive call
 * @param {object} parentLi for recursive call
 */
function iterate(obj, selector, stack, parentLi) {
    let parentEl = '';
    if (selector) {
        parentEl = document.querySelector(selector);
    }

    const ul = document.createElement('ul');

    // Iterate every own property of object
    for (let property in obj) {

        if (obj.hasOwnProperty(property) && typeof (property !== 'function')) {

            // If this property is an object call function recursively
            if (typeof obj[property] === "object") {
                let parentLi = document.createElement('li');
                parentLi.innerHTML = property;
                parentLi.classList.add("has-text-weight-bold");
                ul.appendChild(parentLi);
                iterate(obj[property], false, stack + '.' + property, parentLi);
            } else {
                // In other case write to the html
                let li = document.createElement('li');
                li.innerHTML = property + ":   " + obj[property];
                li.classList.add("has-text-weight-bold");
                ul.appendChild(li);
            }
        }
    }

    if (selector)  {
        parentEl.appendChild(ul);
    } else {
        // console.log(ul);
        parentLi.appendChild(ul);
    }
}

function getAllPropertyNames( obj ) {
    let props = [];

    do {
        Object.getOwnPropertyNames( obj ).forEach(function ( prop ) {
            if ( props.indexOf( prop ) === -1 ) {
                props.push( prop );
            }
        });
    } while ( obj = Object.getPrototypeOf( obj ) );

    return props;
}

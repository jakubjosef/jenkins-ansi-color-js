function DOMReady(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function addScript(src, callback, async) {
    var s = document.createElement('script');
    s.setAttribute('src', src);
    s.onload = callback;
    if (async) s.async = true
    document.body.appendChild(s);
}

DOMReady(function() {
    var consoleOutputSelector = ".console-output";
    if (document.querySelector(consoleOutputSelector)) {
        // init ansi colors
        addScript("/userContent/theme/js/ansi_up.js", function() {
            var ansiUp = new AnsiUp,
                $console = document.querySelector(consoleOutputSelector),
                entities = {
                    'amp': '&',
                    'apos': '\'',
                    '#x27': '\'',
                    '#x2F': '/',
                    '#39': '\'',
                    '#47': '/',
                    'lt': '<',
                    'gt': '>',
                    'nbsp': ' ',
                    'quot': '"'
                },
                decodeHTMLEntities = function(text) {
                    return text.replace(/&([^;]+);/gm, function(match, entity) {
                        return entities[entity] || match
                    })
                },
                colorizeFn = function() {
                    $console.innerHTML = decodeHTMLEntities(ansiUp.ansi_to_html($console.innerHTML));
                };

            colorizeFn();
            // create prototype.js global ajax handle responder
            Ajax.Responders.register({
                onComplete: function(req, res) {
                    if (req.body.indexOf("start=") != -1 && res.status==200 && res.responseText != "") {
                        colorizeFn();
                    }
                }
            });
        }, true);
    }
});

function DOMReady(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
function addScript(src, callback, async) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  s.onload=callback;
  if(async) s.async = true
  document.body.appendChild(s);
}

DOMReady(function(){
  // init ansi colors
  addScript("/userContent/theme/js/ansi_up.js", (function(contentSelector){
    var ansiUp = new AnsiUp
     ,  $console = document.querySelector(contentSelector)
     ,  entities = {
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
        }
     , decodeHTMLEntities = function (text) {
          return text.replace(/&([^;]+);/gm, function (match, entity) {
            return entities[entity] || match
          })
        }
     , colorizeFn = function(){
        $console.innerHTML = decodeHTMLEntities(ansiUp.ansi_to_html($console.innerHTML));
     };

     colorizeFn();
     $console.addEventListener('change', colorizeFn, false);
  }).bind(null,".console-output"), true);
});
(function() {
  'use strict';
 
  window.addEventListener('load', () => {
    Array.from(document.getElementsByTagName('img')).map(i => i.style.display = 'none');
  });
})();

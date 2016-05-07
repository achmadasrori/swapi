(function() {
  var isIE = /msie/gi.test(navigator.userAgent); 
  
  this.infiniteScroll = function(options) {
    var defaults = {
      callback: function() {},
      distance: 50
    }
    for (var key in defaults) {
      if(typeof options[key] == 'undefined') options[key] = defaults[key];
    }  
    
    var scroller = {
      options: options,
      updateInitiated: false
    }
    
    window.onscroll = function(event) {
      handleScroll(scroller, event);
    }
    document.ontouchmove = function(event) {
      handleScroll(scroller, event);
    }
  }
  
  function getScrollPos() {
    if (isIE) {
      return document.documentElement.scrollTop;
    } else {
      return window.pageYOffset;
    }
  }
  
  var prevScrollPos = getScrollPos();
  
  function handleScroll(scroller, event) {
    if (scroller.updateInitiated) {
      return;
    }   
    var scrollPos = getScrollPos();
    if (scrollPos == prevScrollPos) {
      return;
    }
    
    var pageHeight = document.documentElement.scrollHeight;
    var clientHeight = document.documentElement.clientHeight;
    
    if (pageHeight - (scrollPos + clientHeight) < scroller.options.distance) {
      scroller.updateInitiated = true;
  
      scroller.options.callback(function() {
        scroller.updateInitiated = false;
      });
    }
    
    prevScrollPos = scrollPos;  
  }
}());
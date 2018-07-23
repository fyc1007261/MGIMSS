;(function ($) {
  var angleStart = -360;

// jquery rotate animation
  function rotate(li, d) {
    $({d: angleStart}).animate({d: d}, {
      step: function (now) {
        $(li)
          .css({transform: 'rotate(' + now + 'deg)'})
          .find('label')
          .css({transform: 'rotate(' + (-now) + 'deg)'});
      }, duration: 0
    });
  }

// show / hide the options
  function toggleOptions(s) {
    s.toggleClass('open');
    var li = s.find('li');
    var deg = s.hasClass('half') ? 180 / (li.length - 1) : 360 / li.length;
    for (var i = 0; i < li.length; i++) {
      var d = s.hasClass('half') ? (i * deg) - 90 : i * deg;
      s.hasClass('open') ? rotate(li[i], d) : rotate(li[i], angleStart);
    }
  }

  $('.v-capsule').click(function (e) {
    alert("haha");
    var selector = $(this).find(".selector");
    if (selector.hasClass('open')) {
      // alert("hea");
      toggleOptions(selector);
    }
    else {
      var y = e.pageY;
      var x = e.pageX;
      // alert("x: " + x + ",y: " + y);
      var parent_y = this.getBoundingClientRect().top;
      var parent_x = this.getBoundingClientRect().left;
      // alert("px: " + parent_x + ",py: " + parent_y);
      selector.css("left", x - parent_x);
      selector.css("top", y - parent_y);
      toggleOptions(selector);
    }
  });
})(function () {
  if (typeof module !== 'undefined' && module.exports) {
    return require('jquery');
  }
  return window.jQuery;
}());




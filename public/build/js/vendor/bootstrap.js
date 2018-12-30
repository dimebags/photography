(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/vendor/bootstrap"],{

/***/ "./assets/js/vendor/bootstrap.js":
/*!***************************************!*\
  !*** ./assets/js/vendor/bootstrap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * Bootstrap v3.3.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery');
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.');

  if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher');
  }
}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.3.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap');
    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }

    return false; // explicit for ie8 (  ._.)
  } // http://blog.alexmaccaw.com/css-transitions


  $.fn.emulateTransitionEnd = function (duration) {
    var called = false;
    var $el = this;
    $(this).one('bsTransitionEnd', function () {
      called = true;
    });

    var callback = function callback() {
      if (!called) $($el).trigger($.support.transition.end);
    };

    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();
    if (!$.support.transition) return;
    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function handle(e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
      }
    };
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]';

  var Alert = function Alert(el) {
    $(el).on('click', dismiss, this.close);
  };

  Alert.VERSION = '3.3.1';
  Alert.TRANSITION_DURATION = 150;

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = $(selector);
    if (e) e.preventDefault();

    if (!$parent.length) {
      $parent = $this.closest('.alert');
    }

    $parent.trigger(e = $.Event('close.bs.alert'));
    if (e.isDefaultPrevented()) return;
    $parent.removeClass('in');

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove();
    }

    $.support.transition && $parent.hasClass('fade') ? $parent.one('bsTransitionEnd', removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION) : removeElement();
  }; // ALERT PLUGIN DEFINITION
  // =======================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.alert');
      if (!data) $this.data('bs.alert', data = new Alert(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.alert;
  $.fn.alert = Plugin;
  $.fn.alert.Constructor = Alert; // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  }; // ALERT DATA-API
  // ==============


  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close);
}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function Button(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };

  Button.VERSION = '3.3.1';
  Button.DEFAULTS = {
    loadingText: 'loading...'
  };

  Button.prototype.setState = function (state) {
    var d = 'disabled';
    var $el = this.$element;
    var val = $el.is('input') ? 'val' : 'html';
    var data = $el.data();
    state = state + 'Text';
    if (data.resetText == null) $el.data('resetText', $el[val]()); // push to event loop to allow forms to submit

    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state]);

      if (state == 'loadingText') {
        this.isLoading = true;
        $el.addClass(d).attr(d, d);
      } else if (this.isLoading) {
        this.isLoading = false;
        $el.removeClass(d).removeAttr(d);
      }
    }, this), 0);
  };

  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      var $input = this.$element.find('input');

      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false;else $parent.find('.active').removeClass('active');
      }

      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change');
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'));
    }

    if (changed) this.$element.toggleClass('active');
  }; // BUTTON PLUGIN DEFINITION
  // ========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.button');
      var options = _typeof(option) == 'object' && option;
      if (!data) $this.data('bs.button', data = new Button(this, options));
      if (option == 'toggle') data.toggle();else if (option) data.setState(option);
    });
  }

  var old = $.fn.button;
  $.fn.button = Plugin;
  $.fn.button.Constructor = Button; // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  }; // BUTTON DATA-API
  // ===============


  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target);
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn');
    Plugin.call($btn, 'toggle');
    e.preventDefault();
  }).on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type));
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function Carousel(element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;
    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this));
    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element.on('mouseenter.bs.carousel', $.proxy(this.pause, this)).on('mouseleave.bs.carousel', $.proxy(this.cycle, this));
  };

  Carousel.VERSION = '3.3.1';
  Carousel.TRANSITION_DURATION = 600;
  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  };

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return;

    switch (e.which) {
      case 37:
        this.prev();
        break;

      case 39:
        this.next();
        break;

      default:
        return;
    }

    e.preventDefault();
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);
    this.interval && clearInterval(this.interval);
    this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
    return this;
  };

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item');
    return this.$items.index(item || this.$active);
  };

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var delta = direction == 'prev' ? -1 : 1;
    var activeIndex = this.getItemIndex(active);
    var itemIndex = (activeIndex + delta) % this.$items.length;
    return this.$items.eq(itemIndex);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'));
    if (pos > this.$items.length - 1 || pos < 0) return;
    if (this.sliding) return this.$element.one('slid.bs.carousel', function () {
      that.to(pos);
    }); // yes, "slid"

    if (activeIndex == pos) return this.pause().cycle();
    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);
    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide('next');
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide('prev');
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find('.item.active');
    var $next = next || this.getItemForDirection(type, $active);
    var isCycling = this.interval;
    var direction = type == 'next' ? 'left' : 'right';
    var fallback = type == 'next' ? 'first' : 'last';
    var that = this;

    if (!$next.length) {
      if (!this.options.wrap) return;
      $next = this.$element.find('.item')[fallback]();
    }

    if ($next.hasClass('active')) return this.sliding = false;
    var relatedTarget = $next[0];
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    });
    this.$element.trigger(slideEvent);
    if (slideEvent.isDefaultPrevented()) return;
    this.sliding = true;
    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active');
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
      $nextIndicator && $nextIndicator.addClass('active');
    }

    var slidEvent = $.Event('slid.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    }); // yes, "slid"

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow

      $active.addClass(direction);
      $next.addClass(direction);
      $active.one('bsTransitionEnd', function () {
        $next.removeClass([type, direction].join(' ')).addClass('active');
        $active.removeClass(['active', direction].join(' '));
        that.sliding = false;
        setTimeout(function () {
          that.$element.trigger(slidEvent);
        }, 0);
      }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
    } else {
      $active.removeClass('active');
      $next.addClass('active');
      this.sliding = false;
      this.$element.trigger(slidEvent);
    }

    isCycling && this.cycle();
    return this;
  }; // CAROUSEL PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.carousel');
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      var action = typeof option == 'string' ? option : options.slide;
      if (!data) $this.data('bs.carousel', data = new Carousel(this, options));
      if (typeof option == 'number') data.to(option);else if (action) data[action]();else if (options.interval) data.pause().cycle();
    });
  }

  var old = $.fn.carousel;
  $.fn.carousel = Plugin;
  $.fn.carousel.Constructor = Carousel; // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  }; // CAROUSEL DATA-API
  // =================


  var clickHandler = function clickHandler(e) {
    var href;
    var $this = $(this);
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7

    if (!$target.hasClass('carousel')) return;
    var options = $.extend({}, $target.data(), $this.data());
    var slideIndex = $this.attr('data-slide-to');
    if (slideIndex) options.interval = false;
    Plugin.call($target, options);

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex);
    }

    e.preventDefault();
  };

  $(document).on('click.bs.carousel.data-api', '[data-slide]', clickHandler).on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler);
  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      Plugin.call($carousel, $carousel.data());
    });
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function Collapse(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.$trigger = $(this.options.trigger).filter('[href="#' + element.id + '"], [data-target="#' + element.id + '"]');
    this.transitioning = null;

    if (this.options.parent) {
      this.$parent = this.getParent();
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger);
    }

    if (this.options.toggle) this.toggle();
  };

  Collapse.VERSION = '3.3.1';
  Collapse.TRANSITION_DURATION = 350;
  Collapse.DEFAULTS = {
    toggle: true,
    trigger: '[data-toggle="collapse"]'
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width');
    return hasWidth ? 'width' : 'height';
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return;
    var activesData;
    var actives = this.$parent && this.$parent.find('> .panel').children('.in, .collapsing');

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse');
      if (activesData && activesData.transitioning) return;
    }

    var startEvent = $.Event('show.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    if (actives && actives.length) {
      Plugin.call(actives, 'hide');
      activesData || actives.data('bs.collapse', null);
    }

    var dimension = this.dimension();
    this.$element.removeClass('collapse').addClass('collapsing')[dimension](0).attr('aria-expanded', true);
    this.$trigger.removeClass('collapsed').attr('aria-expanded', true);
    this.transitioning = 1;

    var complete = function complete() {
      this.$element.removeClass('collapsing').addClass('collapse in')[dimension]('');
      this.transitioning = 0;
      this.$element.trigger('shown.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);
    var scrollSize = $.camelCase(['scroll', dimension].join('-'));
    this.$element.one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return;
    var startEvent = $.Event('hide.bs.collapse');
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;
    var dimension = this.dimension();
    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
    this.$element.addClass('collapsing').removeClass('collapse in').attr('aria-expanded', false);
    this.$trigger.addClass('collapsed').attr('aria-expanded', false);
    this.transitioning = 1;

    var complete = function complete() {
      this.transitioning = 0;
      this.$element.removeClass('collapsing').addClass('collapse').trigger('hidden.bs.collapse');
    };

    if (!$.support.transition) return complete.call(this);
    this.$element[dimension](0).one('bsTransitionEnd', $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']();
  };

  Collapse.prototype.getParent = function () {
    return $(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function (i, element) {
      var $element = $(element);
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
    }, this)).end();
  };

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in');
    $element.attr('aria-expanded', isOpen);
    $trigger.toggleClass('collapsed', !isOpen).attr('aria-expanded', isOpen);
  };

  function getTargetFromTrigger($trigger) {
    var href;
    var target = $trigger.attr('data-target') || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // strip for ie7

    return $(target);
  } // COLLAPSE PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.collapse');
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      if (!data && options.toggle && option == 'show') options.toggle = false;
      if (!data) $this.data('bs.collapse', data = new Collapse(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.collapse;
  $.fn.collapse = Plugin;
  $.fn.collapse.Constructor = Collapse; // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  }; // COLLAPSE DATA-API
  // =================


  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this);
    if (!$this.attr('data-target')) e.preventDefault();
    var $target = getTargetFromTrigger($this);
    var data = $target.data('bs.collapse');
    var option = data ? 'toggle' : $.extend({}, $this.data(), {
      trigger: this
    });
    Plugin.call($target, option);
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop';
  var toggle = '[data-toggle="dropdown"]';

  var Dropdown = function Dropdown(element) {
    $(element).on('click.bs.dropdown', this.toggle);
  };

  Dropdown.VERSION = '3.3.1';

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);
    if ($this.is('.disabled, :disabled')) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');
    clearMenus();

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.trigger('focus').attr('aria-expanded', 'true');
      $parent.toggleClass('open').trigger('shown.bs.dropdown', relatedTarget);
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return;
    var $this = $(this);
    e.preventDefault();
    e.stopPropagation();
    if ($this.is('.disabled, :disabled')) return;
    var $parent = getParent($this);
    var isActive = $parent.hasClass('open');

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus');
      return $this.trigger('click');
    }

    var desc = ' li:not(.divider):visible a';
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc);
    if (!$items.length) return;
    var index = $items.index(e.target);
    if (e.which == 38 && index > 0) index--; // up

    if (e.which == 40 && index < $items.length - 1) index++; // down

    if (!~index) index = 0;
    $items.eq(index).trigger('focus');
  };

  function clearMenus(e) {
    if (e && e.which === 3) return;
    $(backdrop).remove();
    $(toggle).each(function () {
      var $this = $(this);
      var $parent = getParent($this);
      var relatedTarget = {
        relatedTarget: this
      };
      if (!$parent.hasClass('open')) return;
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget));
      if (e.isDefaultPrevented()) return;
      $this.attr('aria-expanded', 'false');
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget);
    });
  }

  function getParent($this) {
    var selector = $this.attr('data-target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    var $parent = selector && $(selector);
    return $parent && $parent.length ? $parent : $this.parent();
  } // DROPDOWN PLUGIN DEFINITION
  // ==========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.dropdown');
      if (!data) $this.data('bs.dropdown', data = new Dropdown(this));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  var old = $.fn.dropdown;
  $.fn.dropdown = Plugin;
  $.fn.dropdown.Constructor = Dropdown; // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  }; // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================


  $(document).on('click.bs.dropdown.data-api', clearMenus).on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown).on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown);
}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$backdrop = this.isShown = null;
    this.scrollbarWidth = 0;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.3.1';
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', {
      relatedTarget: _relatedTarget
    });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) return;
    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');
    this.escape();
    this.resize();
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);
      if (that.options.backdrop) that.adjustBackdrop();
      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in').attr('aria-hidden', false);
      that.enforceFocus();
      var e = $.Event('shown.bs.modal', {
        relatedTarget: _relatedTarget
      });
      transition ? that.$element.find('.modal-dialog') // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();
    e = $.Event('hide.bs.modal');
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) return;
    this.isShown = false;
    this.escape();
    this.resize();
    $(document).off('focusin.bs.modal');
    this.$element.removeClass('in').attr('aria-hidden', true).off('click.dismiss.bs.modal');
    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').prependTo(this.$element).on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this);
      }, this));
      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');
      if (!callback) return;
      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };

      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  }; // these following methods are used to handle overflowing modals


  Modal.prototype.handleUpdate = function () {
    if (this.options.backdrop) this.adjustBackdrop();
    this.adjustDialog();
  };

  Modal.prototype.adjustBackdrop = function () {
    this.$backdrop.css('height', 0).css('height', this.$element[0].scrollHeight);
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    this.bodyIsOverflowing = document.body.scrollHeight > document.documentElement.clientHeight;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '');
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  }; // MODAL PLUGIN DEFINITION
  // =======================


  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;
  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal; // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  }; // MODAL DATA-API
  // ==============


  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7

    var option = $target.data('bs.modal') ? 'toggle' : $.extend({
      remote: !/#/.test(href) && href
    }, $target.data(), $this.data());
    if ($this.is('a')) e.preventDefault();
    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown

      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function Tooltip(element, options) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;
    this.init('tooltip', element, options);
  };

  Tooltip.VERSION = '3.3.1';
  Tooltip.TRANSITION_DURATION = 150;
  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport);
    var triggers = this.options.trigger.split(' ');

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i];

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
      } else if (trigger != 'manual') {
        var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin';
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout';
        this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
      }
    }

    this.options.selector ? this._options = $.extend({}, this.options, {
      trigger: 'manual',
      selector: ''
    }) : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();
    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value;
    });
    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in';
      return;
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    clearTimeout(self.timeout);
    self.hoverState = 'in';
    if (!self.options.delay || !self.options.delay.show) return self.show();
    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ? obj : $(obj.currentTarget).data('bs.' + this.type);

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions());
      $(obj.currentTarget).data('bs.' + this.type, self);
    }

    clearTimeout(self.timeout);
    self.hoverState = 'out';
    if (!self.options.delay || !self.options.delay.hide) return self.hide();
    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);
      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
      if (e.isDefaultPrevented() || !inDom) return;
      var that = this;
      var $tip = this.tip();
      var tipId = this.getUID(this.type);
      this.setContent();
      $tip.attr('id', tipId);
      this.$element.attr('aria-describedby', tipId);
      if (this.options.animation) $tip.addClass('fade');
      var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top';
      $tip.detach().css({
        top: 0,
        left: 0,
        display: 'block'
      }).addClass(placement).data('bs.' + this.type, this);
      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var orgPlacement = placement;
        var $container = this.options.container ? $(this.options.container) : this.$element.parent();
        var containerDim = this.getPosition($container);
        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top' : placement == 'top' && pos.top - actualHeight < containerDim.top ? 'bottom' : placement == 'right' && pos.right + actualWidth > containerDim.width ? 'left' : placement == 'left' && pos.left - actualWidth < containerDim.left ? 'right' : placement;
        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight);
      this.applyPlacement(calculatedOffset, placement);

      var complete = function complete() {
        var prevHoverState = that.hoverState;
        that.$element.trigger('shown.bs.' + that.type);
        that.hoverState = null;
        if (prevHoverState == 'out') that.leave(that);
      };

      $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight; // manually read margins because getBoundingClientRect includes difference

    var marginTop = parseInt($tip.css('margin-top'), 10);
    var marginLeft = parseInt($tip.css('margin-left'), 10); // we must check for NaN for ie 8/9

    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;
    offset.top = offset.top + marginTop;
    offset.left = offset.left + marginLeft; // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0

    $.offset.setOffset($tip[0], $.extend({
      using: function using(props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        });
      }
    }, offset), 0);
    $tip.addClass('in'); // check to see if placing tip in new offset caused the tip to resize itself

    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight;
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight);
    if (delta.left) offset.left += delta.left;else offset.top += delta.top;
    var isVertical = /top|bottom/.test(placement);
    var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight;
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight';
    $tip.offset(offset);
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, isHorizontal) {
    this.arrow().css(isHorizontal ? 'left' : 'top', 50 * (1 - delta / dimension) + '%').css(isHorizontal ? 'top' : 'left', '');
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
    $tip.removeClass('fade in top bottom left right');
  };

  Tooltip.prototype.hide = function (callback) {
    var that = this;
    var $tip = this.tip();
    var e = $.Event('hide.bs.' + this.type);

    function complete() {
      if (that.hoverState != 'in') $tip.detach();
      that.$element.removeAttr('aria-describedby').trigger('hidden.bs.' + that.type);
      callback && callback();
    }

    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;
    $tip.removeClass('in');
    $.support.transition && this.$tip.hasClass('fade') ? $tip.one('bsTransitionEnd', complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION) : complete();
    this.hoverState = null;
    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;

    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function ($element) {
    $element = $element || this.$element;
    var el = $element[0];
    var isBody = el.tagName == 'BODY';
    var elRect = el.getBoundingClientRect();

    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, {
        width: elRect.right - elRect.left,
        height: elRect.bottom - elRect.top
      });
    }

    var elOffset = isBody ? {
      top: 0,
      left: 0
    } : $element.offset();
    var scroll = {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop()
    };
    var outerDims = isBody ? {
      width: $(window).width(),
      height: $(window).height()
    } : null;
    return $.extend({}, elRect, scroll, outerDims, elOffset);
  };

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? {
      top: pos.top + pos.height,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == 'top' ? {
      top: pos.top - actualHeight,
      left: pos.left + pos.width / 2 - actualWidth / 2
    } : placement == 'left' ? {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left - actualWidth
    } :
    /* placement == 'right' */
    {
      top: pos.top + pos.height / 2 - actualHeight / 2,
      left: pos.left + pos.width
    };
  };

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = {
      top: 0,
      left: 0
    };
    if (!this.$viewport) return delta;
    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0;
    var viewportDimensions = this.getPosition(this.$viewport);

    if (/right|left/.test(placement)) {
      var topEdgeOffset = pos.top - viewportPadding - viewportDimensions.scroll;
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight;

      if (topEdgeOffset < viewportDimensions.top) {
        // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset;
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) {
        // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset;
      }
    } else {
      var leftEdgeOffset = pos.left - viewportPadding;
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth;

      if (leftEdgeOffset < viewportDimensions.left) {
        // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset;
      } else if (rightEdgeOffset > viewportDimensions.width) {
        // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset;
      }
    }

    return delta;
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;
    title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
    return title;
  };

  Tooltip.prototype.getUID = function (prefix) {
    do {
      prefix += ~~(Math.random() * 1000000);
    } while (document.getElementById(prefix));

    return prefix;
  };

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template);
  };

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = this;

    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type);

      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions());
        $(e.currentTarget).data('bs.' + this.type, self);
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self);
  };

  Tooltip.prototype.destroy = function () {
    var that = this;
    clearTimeout(this.timeout);
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type);
    });
  }; // TOOLTIP PLUGIN DEFINITION
  // =========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tooltip');
      var options = _typeof(option) == 'object' && option;
      var selector = options && options.selector;
      if (!data && option == 'destroy') return;

      if (selector) {
        if (!data) $this.data('bs.tooltip', data = {});
        if (!data[selector]) data[selector] = new Tooltip(this, options);
      } else {
        if (!data) $this.data('bs.tooltip', data = new Tooltip(this, options));
      }

      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tooltip;
  $.fn.tooltip = Plugin;
  $.fn.tooltip.Constructor = Tooltip; // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function Popover(element, options) {
    this.init('popover', element, options);
  };

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js');
  Popover.VERSION = '3.3.1';
  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  }); // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);
  Popover.prototype.constructor = Popover;

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();
    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
    $tip.find('.popover-content').children().detach().end()[// we use append for html objects to maintain js events
    this.options.html ? typeof content == 'string' ? 'html' : 'append' : 'text'](content);
    $tip.removeClass('fade top bottom left right in'); // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.

    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide();
  };

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };

  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;
    return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content);
  };

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow');
  };

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template);
    return this.$tip;
  }; // POPOVER PLUGIN DEFINITION
  // =========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.popover');
      var options = _typeof(option) == 'object' && option;
      var selector = options && options.selector;
      if (!data && option == 'destroy') return;

      if (selector) {
        if (!data) $this.data('bs.popover', data = {});
        if (!data[selector]) data[selector] = new Popover(this, options);
      } else {
        if (!data) $this.data('bs.popover', data = new Popover(this, options));
      }

      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.popover;
  $.fn.popover = Plugin;
  $.fn.popover.Constructor = Popover; // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this);
    this.$body = $('body');
    this.$scrollElement = $(element).is('body') ? $(window) : $(element);
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector = (this.options.target || '') + ' .nav li > a';
    this.offsets = [];
    this.targets = [];
    this.activeTarget = null;
    this.scrollHeight = 0;
    this.$scrollElement.on('scroll.bs.scrollspy', process);
    this.refresh();
    this.process();
  }

  ScrollSpy.VERSION = '3.3.1';
  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
  };

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset';
    var offsetBase = 0;

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position';
      offsetBase = this.$scrollElement.scrollTop();
    }

    this.offsets = [];
    this.targets = [];
    this.scrollHeight = this.getScrollHeight();
    var self = this;
    this.$body.find(this.selector).map(function () {
      var $el = $(this);
      var href = $el.data('target') || $el.attr('href');
      var $href = /^#./.test(href) && $(href);
      return $href && $href.length && $href.is(':visible') && [[$href[offsetMethod]().top + offsetBase, href]] || null;
    }).sort(function (a, b) {
      return a[0] - b[0];
    }).each(function () {
      self.offsets.push(this[0]);
      self.targets.push(this[1]);
    });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight = this.getScrollHeight();
    var maxScroll = this.options.offset + scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (this.scrollHeight != scrollHeight) {
      this.refresh();
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i);
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null;
      return this.clear();
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;
    this.clear();
    var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
    var active = $(selector).parents('li').addClass('active');

    if (active.parent('.dropdown-menu').length) {
      active = active.closest('li.dropdown').addClass('active');
    }

    active.trigger('activate.bs.scrollspy');
  };

  ScrollSpy.prototype.clear = function () {
    $(this.selector).parentsUntil(this.options.target, '.active').removeClass('active');
  }; // SCROLLSPY PLUGIN DEFINITION
  // ===========================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.scrollspy');
      var options = _typeof(option) == 'object' && option;
      if (!data) $this.data('bs.scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.scrollspy;
  $.fn.scrollspy = Plugin;
  $.fn.scrollspy.Constructor = ScrollSpy; // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  }; // SCROLLSPY DATA-API
  // ==================


  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      Plugin.call($spy, $spy.data());
    });
  });
}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    this.element = $(element);
  };

  Tab.VERSION = '3.3.1';
  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;
    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });
    $previous.trigger(hideEvent);
    $this.trigger(showEvent);
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
    var $target = $(selector);
    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition

        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }

      callback && callback();
    }

    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
    $active.removeClass('in');
  }; // TAB PLUGIN DEFINITION
  // =====================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tab;
  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab; // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  }; // TAB DATA-API
  // ============


  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+function ($) {
  'use strict'; // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function Affix(element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$target = $(this.options.target).on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this)).on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this));
    this.$element = $(element);
    this.affixed = this.unpin = this.pinnedOffset = null;
    this.checkPosition();
  };

  Affix.VERSION = '3.3.1';
  Affix.RESET = 'affix affix-top affix-bottom';
  Affix.DEFAULTS = {
    offset: 0,
    target: window
  };

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    var targetHeight = this.$target.height();
    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false;

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return scrollTop + this.unpin <= position.top ? false : 'bottom';
      return scrollTop + targetHeight <= scrollHeight - offsetBottom ? false : 'bottom';
    }

    var initializing = this.affixed == null;
    var colliderTop = initializing ? scrollTop : position.top;
    var colliderHeight = initializing ? targetHeight : height;
    if (offsetTop != null && colliderTop <= offsetTop) return 'top';
    if (offsetBottom != null && colliderTop + colliderHeight >= scrollHeight - offsetBottom) return 'bottom';
    return false;
  };

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass('affix');
    var scrollTop = this.$target.scrollTop();
    var position = this.$element.offset();
    return this.pinnedOffset = position.top - scrollTop;
  };

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return;
    var height = this.$element.height();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;
    var scrollHeight = $('body').height();
    if (_typeof(offset) != 'object') offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function') offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element);
    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom);

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '');
      var affixType = 'affix' + (affix ? '-' + affix : '');
      var e = $.Event(affixType + '.bs.affix');
      this.$element.trigger(e);
      if (e.isDefaultPrevented()) return;
      this.affixed = affix;
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null;
      this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace('affix', 'affixed') + '.bs.affix');
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      });
    }
  }; // AFFIX PLUGIN DEFINITION
  // =======================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.affix');
      var options = _typeof(option) == 'object' && option;
      if (!data) $this.data('bs.affix', data = new Affix(this, options));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.affix;
  $.fn.affix = Plugin;
  $.fn.affix.Constructor = Affix; // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  }; // AFFIX DATA-API
  // ==============


  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();
      data.offset = data.offset || {};
      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop != null) data.offset.top = data.offsetTop;
      Plugin.call($spy, data);
    });
  });
}(jQuery);

/***/ })

},[["./assets/js/vendor/bootstrap.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvdmVuZG9yL2Jvb3RzdHJhcC5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJFcnJvciIsIiQiLCJ2ZXJzaW9uIiwiZm4iLCJqcXVlcnkiLCJzcGxpdCIsInRyYW5zaXRpb25FbmQiLCJlbCIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInRyYW5zRW5kRXZlbnROYW1lcyIsIldlYmtpdFRyYW5zaXRpb24iLCJNb3pUcmFuc2l0aW9uIiwiT1RyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwibmFtZSIsInN0eWxlIiwidW5kZWZpbmVkIiwiZW5kIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJkdXJhdGlvbiIsImNhbGxlZCIsIiRlbCIsIm9uZSIsImNhbGxiYWNrIiwidHJpZ2dlciIsInN1cHBvcnQiLCJzZXRUaW1lb3V0IiwiZXZlbnQiLCJzcGVjaWFsIiwiYnNUcmFuc2l0aW9uRW5kIiwiYmluZFR5cGUiLCJkZWxlZ2F0ZVR5cGUiLCJoYW5kbGUiLCJlIiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJkaXNtaXNzIiwiQWxlcnQiLCJvbiIsImNsb3NlIiwiVkVSU0lPTiIsIlRSQU5TSVRJT05fRFVSQVRJT04iLCJwcm90b3R5cGUiLCIkdGhpcyIsInNlbGVjdG9yIiwiYXR0ciIsInJlcGxhY2UiLCIkcGFyZW50IiwicHJldmVudERlZmF1bHQiLCJsZW5ndGgiLCJjbG9zZXN0IiwiRXZlbnQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJyZW1vdmVDbGFzcyIsInJlbW92ZUVsZW1lbnQiLCJkZXRhY2giLCJyZW1vdmUiLCJoYXNDbGFzcyIsIlBsdWdpbiIsIm9wdGlvbiIsImVhY2giLCJkYXRhIiwiY2FsbCIsIm9sZCIsImFsZXJ0IiwiQ29uc3RydWN0b3IiLCJub0NvbmZsaWN0IiwiQnV0dG9uIiwiZWxlbWVudCIsIm9wdGlvbnMiLCIkZWxlbWVudCIsImV4dGVuZCIsIkRFRkFVTFRTIiwiaXNMb2FkaW5nIiwibG9hZGluZ1RleHQiLCJzZXRTdGF0ZSIsInN0YXRlIiwiZCIsInZhbCIsInJlc2V0VGV4dCIsInByb3h5IiwiYWRkQ2xhc3MiLCJyZW1vdmVBdHRyIiwidG9nZ2xlIiwiY2hhbmdlZCIsIiRpbnB1dCIsImZpbmQiLCJwcm9wIiwidG9nZ2xlQ2xhc3MiLCJidXR0b24iLCIkYnRuIiwidGVzdCIsInR5cGUiLCJDYXJvdXNlbCIsIiRpbmRpY2F0b3JzIiwicGF1c2VkIiwic2xpZGluZyIsImludGVydmFsIiwiJGFjdGl2ZSIsIiRpdGVtcyIsImtleWJvYXJkIiwia2V5ZG93biIsInBhdXNlIiwiZG9jdW1lbnRFbGVtZW50IiwiY3ljbGUiLCJ3cmFwIiwidGFnTmFtZSIsIndoaWNoIiwicHJldiIsIm5leHQiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJnZXRJdGVtSW5kZXgiLCJpdGVtIiwicGFyZW50IiwiY2hpbGRyZW4iLCJpbmRleCIsImdldEl0ZW1Gb3JEaXJlY3Rpb24iLCJkaXJlY3Rpb24iLCJhY3RpdmUiLCJkZWx0YSIsImFjdGl2ZUluZGV4IiwiaXRlbUluZGV4IiwiZXEiLCJ0byIsInBvcyIsInRoYXQiLCJzbGlkZSIsIiRuZXh0IiwiaXNDeWNsaW5nIiwiZmFsbGJhY2siLCJyZWxhdGVkVGFyZ2V0Iiwic2xpZGVFdmVudCIsIiRuZXh0SW5kaWNhdG9yIiwic2xpZEV2ZW50Iiwib2Zmc2V0V2lkdGgiLCJqb2luIiwiYWN0aW9uIiwiY2Fyb3VzZWwiLCJjbGlja0hhbmRsZXIiLCJocmVmIiwiJHRhcmdldCIsInNsaWRlSW5kZXgiLCJ3aW5kb3ciLCIkY2Fyb3VzZWwiLCJDb2xsYXBzZSIsIiR0cmlnZ2VyIiwiZmlsdGVyIiwiaWQiLCJ0cmFuc2l0aW9uaW5nIiwiZ2V0UGFyZW50IiwiYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzIiwiZGltZW5zaW9uIiwiaGFzV2lkdGgiLCJzaG93IiwiYWN0aXZlc0RhdGEiLCJhY3RpdmVzIiwic3RhcnRFdmVudCIsImNvbXBsZXRlIiwic2Nyb2xsU2l6ZSIsImNhbWVsQ2FzZSIsImhpZGUiLCJvZmZzZXRIZWlnaHQiLCJpIiwiZ2V0VGFyZ2V0RnJvbVRyaWdnZXIiLCJpc09wZW4iLCJjb2xsYXBzZSIsImJhY2tkcm9wIiwiRHJvcGRvd24iLCJpc0FjdGl2ZSIsImNsZWFyTWVudXMiLCJpbnNlcnRBZnRlciIsInN0b3BQcm9wYWdhdGlvbiIsImRlc2MiLCJkcm9wZG93biIsIk1vZGFsIiwiJGJvZHkiLCJib2R5IiwiJGJhY2tkcm9wIiwiaXNTaG93biIsInNjcm9sbGJhcldpZHRoIiwicmVtb3RlIiwibG9hZCIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJfcmVsYXRlZFRhcmdldCIsImNoZWNrU2Nyb2xsYmFyIiwic2V0U2Nyb2xsYmFyIiwiZXNjYXBlIiwicmVzaXplIiwiYXBwZW5kVG8iLCJzY3JvbGxUb3AiLCJhZGp1c3RCYWNrZHJvcCIsImFkanVzdERpYWxvZyIsImVuZm9yY2VGb2N1cyIsIm9mZiIsImhpZGVNb2RhbCIsImhhcyIsImhhbmRsZVVwZGF0ZSIsInJlc2V0QWRqdXN0bWVudHMiLCJyZXNldFNjcm9sbGJhciIsInJlbW92ZUJhY2tkcm9wIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsInByZXBlbmRUbyIsImN1cnJlbnRUYXJnZXQiLCJmb2N1cyIsImNhbGxiYWNrUmVtb3ZlIiwiY3NzIiwic2Nyb2xsSGVpZ2h0IiwibW9kYWxJc092ZXJmbG93aW5nIiwiY2xpZW50SGVpZ2h0IiwicGFkZGluZ0xlZnQiLCJib2R5SXNPdmVyZmxvd2luZyIsInBhZGRpbmdSaWdodCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJzY3JvbGxEaXYiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwibW9kYWwiLCJzaG93RXZlbnQiLCJUb29sdGlwIiwiZW5hYmxlZCIsInRpbWVvdXQiLCJob3ZlclN0YXRlIiwiaW5pdCIsImFuaW1hdGlvbiIsInBsYWNlbWVudCIsInRlbXBsYXRlIiwidGl0bGUiLCJkZWxheSIsImh0bWwiLCJjb250YWluZXIiLCJ2aWV3cG9ydCIsInBhZGRpbmciLCJnZXRPcHRpb25zIiwiJHZpZXdwb3J0IiwidHJpZ2dlcnMiLCJldmVudEluIiwiZXZlbnRPdXQiLCJlbnRlciIsImxlYXZlIiwiX29wdGlvbnMiLCJmaXhUaXRsZSIsImdldERlZmF1bHRzIiwiZ2V0RGVsZWdhdGVPcHRpb25zIiwiZGVmYXVsdHMiLCJrZXkiLCJ2YWx1ZSIsIm9iaiIsInNlbGYiLCJjb25zdHJ1Y3RvciIsIiR0aXAiLCJjbGVhclRpbWVvdXQiLCJoYXNDb250ZW50IiwiaW5Eb20iLCJjb250YWlucyIsIm93bmVyRG9jdW1lbnQiLCJ0aXAiLCJ0aXBJZCIsImdldFVJRCIsInNldENvbnRlbnQiLCJhdXRvVG9rZW4iLCJhdXRvUGxhY2UiLCJ0b3AiLCJsZWZ0IiwiZGlzcGxheSIsImdldFBvc2l0aW9uIiwiYWN0dWFsV2lkdGgiLCJhY3R1YWxIZWlnaHQiLCJvcmdQbGFjZW1lbnQiLCIkY29udGFpbmVyIiwiY29udGFpbmVyRGltIiwiYm90dG9tIiwicmlnaHQiLCJ3aWR0aCIsImNhbGN1bGF0ZWRPZmZzZXQiLCJnZXRDYWxjdWxhdGVkT2Zmc2V0IiwiYXBwbHlQbGFjZW1lbnQiLCJwcmV2SG92ZXJTdGF0ZSIsIm9mZnNldCIsImhlaWdodCIsIm1hcmdpblRvcCIsIm1hcmdpbkxlZnQiLCJpc05hTiIsInNldE9mZnNldCIsInVzaW5nIiwicHJvcHMiLCJNYXRoIiwicm91bmQiLCJnZXRWaWV3cG9ydEFkanVzdGVkRGVsdGEiLCJpc1ZlcnRpY2FsIiwiYXJyb3dEZWx0YSIsImFycm93T2Zmc2V0UG9zaXRpb24iLCJyZXBsYWNlQXJyb3ciLCJpc0hvcml6b250YWwiLCJhcnJvdyIsImdldFRpdGxlIiwiJGUiLCJpc0JvZHkiLCJlbFJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJlbE9mZnNldCIsInNjcm9sbCIsIm91dGVyRGltcyIsInZpZXdwb3J0UGFkZGluZyIsInZpZXdwb3J0RGltZW5zaW9ucyIsInRvcEVkZ2VPZmZzZXQiLCJib3R0b21FZGdlT2Zmc2V0IiwibGVmdEVkZ2VPZmZzZXQiLCJyaWdodEVkZ2VPZmZzZXQiLCJvIiwicHJlZml4IiwicmFuZG9tIiwiZ2V0RWxlbWVudEJ5SWQiLCIkYXJyb3ciLCJlbmFibGUiLCJkaXNhYmxlIiwidG9nZ2xlRW5hYmxlZCIsImRlc3Ryb3kiLCJyZW1vdmVEYXRhIiwidG9vbHRpcCIsIlBvcG92ZXIiLCJjb250ZW50IiwiZ2V0Q29udGVudCIsInBvcG92ZXIiLCJTY3JvbGxTcHkiLCJwcm9jZXNzIiwiJHNjcm9sbEVsZW1lbnQiLCJvZmZzZXRzIiwidGFyZ2V0cyIsImFjdGl2ZVRhcmdldCIsInJlZnJlc2giLCJnZXRTY3JvbGxIZWlnaHQiLCJtYXgiLCJvZmZzZXRNZXRob2QiLCJvZmZzZXRCYXNlIiwiaXNXaW5kb3ciLCJtYXAiLCIkaHJlZiIsInNvcnQiLCJhIiwiYiIsInB1c2giLCJtYXhTY3JvbGwiLCJhY3RpdmF0ZSIsImNsZWFyIiwicGFyZW50cyIsInBhcmVudHNVbnRpbCIsInNjcm9sbHNweSIsIiRzcHkiLCJUYWIiLCIkdWwiLCIkcHJldmlvdXMiLCJoaWRlRXZlbnQiLCJ0YWIiLCJBZmZpeCIsImNoZWNrUG9zaXRpb24iLCJjaGVja1Bvc2l0aW9uV2l0aEV2ZW50TG9vcCIsImFmZml4ZWQiLCJ1bnBpbiIsInBpbm5lZE9mZnNldCIsIlJFU0VUIiwiZ2V0U3RhdGUiLCJvZmZzZXRUb3AiLCJvZmZzZXRCb3R0b20iLCJwb3NpdGlvbiIsInRhcmdldEhlaWdodCIsImluaXRpYWxpemluZyIsImNvbGxpZGVyVG9wIiwiY29sbGlkZXJIZWlnaHQiLCJnZXRQaW5uZWRPZmZzZXQiLCJhZmZpeCIsImFmZml4VHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7QUFNQSxJQUFJLE9BQU9BLE1BQVAsS0FBa0IsV0FBdEIsRUFBbUM7QUFDakMsUUFBTSxJ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bEN0RSxLQUFDLENBQUNFLEVBQUYsQ0FBS3lYLEtBQUwsR0FBYXhULEdBQWI7QUFDQSxXQUFPLElBQVA7QUFDRCxHQUhELENBaklZLENBdUlaO0FBQ0E7OztBQUVBbkUsR0FBQyxDQUFDbUosTUFBRCxDQUFELENBQVV6RyxFQUFWLENBQWEsTUFBYixFQUFxQixZQUFZO0FBQy9CMUMsS0FBQyxDQUFDLG9CQUFELENBQUQsQ0FBd0JnRSxJQUF4QixDQUE2QixZQUFZO0FBQ3ZDLFVBQUlxUyxJQUFJLEdBQUdyVyxDQUFDLENBQUMsSUFBRCxDQUFaO0FBQ0EsVUFBSWlFLElBQUksR0FBR29TLElBQUksQ0FBQ3BTLElBQUwsRUFBWDtBQUVBQSxVQUFJLENBQUM4TixNQUFMLEdBQWM5TixJQUFJLENBQUM4TixNQUFMLElBQWUsRUFBN0I7QUFFQSxVQUFJOU4sSUFBSSxDQUFDbVQsWUFBTCxJQUFxQixJQUF6QixFQUErQm5ULElBQUksQ0FBQzhOLE1BQUwsQ0FBWVAsTUFBWixHQUFxQnZOLElBQUksQ0FBQ21ULFlBQTFCO0FBQy9CLFVBQUluVCxJQUFJLENBQUNrVCxTQUFMLElBQXFCLElBQXpCLEVBQStCbFQsSUFBSSxDQUFDOE4sTUFBTCxDQUFZaEIsR0FBWixHQUFxQjlNLElBQUksQ0FBQ2tULFNBQTFCO0FBRS9CclQsWUFBTSxDQUFDSSxJQUFQLENBQVltUyxJQUFaLEVBQWtCcFMsSUFBbEI7QUFDRCxLQVZEO0FBV0QsR0FaRDtBQWNELENBeEpBLENBd0pDbkUsTUF4SkQsQ0FBRCxDIiwiZmlsZSI6ImpzL3ZlbmRvci9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEJvb3RzdHJhcCB2My4zLjEgKGh0dHA6Ly9nZXRib290c3RyYXAuY29tKVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNCBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICovXG5cbmlmICh0eXBlb2YgalF1ZXJ5ID09PSAndW5kZWZpbmVkJykge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnknKVxufVxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgdmFyIHZlcnNpb24gPSAkLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJylcbiAgaWYgKCh2ZXJzaW9uWzBdIDwgMiAmJiB2ZXJzaW9uWzFdIDwgOSkgfHwgKHZlcnNpb25bMF0gPT0gMSAmJiB2ZXJzaW9uWzFdID09IDkgJiYgdmVyc2lvblsyXSA8IDEpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdCb290c3RyYXBcXCdzIEphdmFTY3JpcHQgcmVxdWlyZXMgalF1ZXJ5IHZlcnNpb24gMS45LjEgb3IgaGlnaGVyJylcbiAgfVxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogdHJhbnNpdGlvbi5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3RyYW5zaXRpb25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ1NTIFRSQU5TSVRJT04gU1VQUE9SVCAoU2hvdXRvdXQ6IGh0dHA6Ly93d3cubW9kZXJuaXpyLmNvbS8pXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoKSB7XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9vdHN0cmFwJylcblxuICAgIHZhciB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgICBXZWJraXRUcmFuc2l0aW9uIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgTW96VHJhbnNpdGlvbiAgICA6ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgIE9UcmFuc2l0aW9uICAgICAgOiAnb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnLFxuICAgICAgdHJhbnNpdGlvbiAgICAgICA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH1cblxuICAgIGZvciAodmFyIG5hbWUgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgICBpZiAoZWwuc3R5bGVbbmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4geyBlbmQ6IHRyYW5zRW5kRXZlbnROYW1lc1tuYW1lXSB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlIC8vIGV4cGxpY2l0IGZvciBpZTggKCAgLl8uKVxuICB9XG5cbiAgLy8gaHR0cDovL2Jsb2cuYWxleG1hY2Nhdy5jb20vY3NzLXRyYW5zaXRpb25zXG4gICQuZm4uZW11bGF0ZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgJGVsID0gdGhpc1xuICAgICQodGhpcykub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7IGNhbGxlZCA9IHRydWUgfSlcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IGlmICghY2FsbGVkKSAkKCRlbCkudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpIH1cbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkdXJhdGlvbilcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgJChmdW5jdGlvbiAoKSB7XG4gICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gPSB0cmFuc2l0aW9uRW5kKClcblxuICAgIGlmICghJC5zdXBwb3J0LnRyYW5zaXRpb24pIHJldHVyblxuXG4gICAgJC5ldmVudC5zcGVjaWFsLmJzVHJhbnNpdGlvbkVuZCA9IHtcbiAgICAgIGJpbmRUeXBlOiAkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQsXG4gICAgICBkZWxlZ2F0ZVR5cGU6ICQuc3VwcG9ydC50cmFuc2l0aW9uLmVuZCxcbiAgICAgIGhhbmRsZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKHRoaXMpKSByZXR1cm4gZS5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICB9XG4gICAgfVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhbGVydC5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FsZXJ0c1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEFMRVJUIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBkaXNtaXNzID0gJ1tkYXRhLWRpc21pc3M9XCJhbGVydFwiXSdcbiAgdmFyIEFsZXJ0ICAgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAkKGVsKS5vbignY2xpY2snLCBkaXNtaXNzLCB0aGlzLmNsb3NlKVxuICB9XG5cbiAgQWxlcnQuVkVSU0lPTiA9ICczLjMuMSdcblxuICBBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgQWxlcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgdmFyIHNlbGVjdG9yID0gJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgJiYgc2VsZWN0b3IucmVwbGFjZSgvLiooPz0jW15cXHNdKiQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB9XG5cbiAgICB2YXIgJHBhcmVudCA9ICQoc2VsZWN0b3IpXG5cbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAkcGFyZW50ID0gJHRoaXMuY2xvc2VzdCgnLmFsZXJ0JylcbiAgICB9XG5cbiAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2Nsb3NlLmJzLmFsZXJ0JykpXG5cbiAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICAkcGFyZW50LnJlbW92ZUNsYXNzKCdpbicpXG5cbiAgICBmdW5jdGlvbiByZW1vdmVFbGVtZW50KCkge1xuICAgICAgLy8gZGV0YWNoIGZyb20gcGFyZW50LCBmaXJlIGV2ZW50IHRoZW4gY2xlYW4gdXAgZGF0YVxuICAgICAgJHBhcmVudC5kZXRhY2goKS50cmlnZ2VyKCdjbG9zZWQuYnMuYWxlcnQnKS5yZW1vdmUoKVxuICAgIH1cblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmICRwYXJlbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAkcGFyZW50XG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIHJlbW92ZUVsZW1lbnQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChBbGVydC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICByZW1vdmVFbGVtZW50KClcbiAgfVxuXG5cbiAgLy8gQUxFUlQgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy5hbGVydCcpXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMuYWxlcnQnLCAoZGF0YSA9IG5ldyBBbGVydCh0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dLmNhbGwoJHRoaXMpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmFsZXJ0XG5cbiAgJC5mbi5hbGVydCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmFsZXJ0LkNvbnN0cnVjdG9yID0gQWxlcnRcblxuXG4gIC8vIEFMRVJUIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5hbGVydC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uYWxlcnQgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBBTEVSVCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5hbGVydC5kYXRhLWFwaScsIGRpc21pc3MsIEFsZXJ0LnByb3RvdHlwZS5jbG9zZSlcblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogYnV0dG9uLmpzIHYzLjMuMVxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jYnV0dG9uc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIEJVVFRPTiBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQnV0dG9uID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9ICQuZXh0ZW5kKHt9LCBCdXR0b24uREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgQnV0dG9uLlZFUlNJT04gID0gJzMuMy4xJ1xuXG4gIEJ1dHRvbi5ERUZBVUxUUyA9IHtcbiAgICBsb2FkaW5nVGV4dDogJ2xvYWRpbmcuLi4nXG4gIH1cblxuICBCdXR0b24ucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdmFyIGQgICAgPSAnZGlzYWJsZWQnXG4gICAgdmFyICRlbCAgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIHZhbCAgPSAkZWwuaXMoJ2lucHV0JykgPyAndmFsJyA6ICdodG1sJ1xuICAgIHZhciBkYXRhID0gJGVsLmRhdGEoKVxuXG4gICAgc3RhdGUgPSBzdGF0ZSArICdUZXh0J1xuXG4gICAgaWYgKGRhdGEucmVzZXRUZXh0ID09IG51bGwpICRlbC5kYXRhKCdyZXNldFRleHQnLCAkZWxbdmFsXSgpKVxuXG4gICAgLy8gcHVzaCB0byBldmVudCBsb29wIHRvIGFsbG93IGZvcm1zIHRvIHN1Ym1pdFxuICAgIHNldFRpbWVvdXQoJC5wcm94eShmdW5jdGlvbiAoKSB7XG4gICAgICAkZWxbdmFsXShkYXRhW3N0YXRlXSA9PSBudWxsID8gdGhpcy5vcHRpb25zW3N0YXRlXSA6IGRhdGFbc3RhdGVdKVxuXG4gICAgICBpZiAoc3RhdGUgPT0gJ2xvYWRpbmdUZXh0Jykge1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWVcbiAgICAgICAgJGVsLmFkZENsYXNzKGQpLmF0dHIoZCwgZClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoZCkucmVtb3ZlQXR0cihkKVxuICAgICAgfVxuICAgIH0sIHRoaXMpLCAwKVxuICB9XG5cbiAgQnV0dG9uLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNoYW5nZWQgPSB0cnVlXG4gICAgdmFyICRwYXJlbnQgPSB0aGlzLiRlbGVtZW50LmNsb3Nlc3QoJ1tkYXRhLXRvZ2dsZT1cImJ1dHRvbnNcIl0nKVxuXG4gICAgaWYgKCRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICB2YXIgJGlucHV0ID0gdGhpcy4kZWxlbWVudC5maW5kKCdpbnB1dCcpXG4gICAgICBpZiAoJGlucHV0LnByb3AoJ3R5cGUnKSA9PSAncmFkaW8nKSB7XG4gICAgICAgIGlmICgkaW5wdXQucHJvcCgnY2hlY2tlZCcpICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpKSBjaGFuZ2VkID0gZmFsc2VcbiAgICAgICAgZWxzZSAkcGFyZW50LmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIH1cbiAgICAgIGlmIChjaGFuZ2VkKSAkaW5wdXQucHJvcCgnY2hlY2tlZCcsICF0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSkudHJpZ2dlcignY2hhbmdlJylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZWxlbWVudC5hdHRyKCdhcmlhLXByZXNzZWQnLCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZWQpIHRoaXMuJGVsZW1lbnQudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpXG4gIH1cblxuXG4gIC8vIEJVVFRPTiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuYnV0dG9uJylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5idXR0b24nLCAoZGF0YSA9IG5ldyBCdXR0b24odGhpcywgb3B0aW9ucykpKVxuXG4gICAgICBpZiAob3B0aW9uID09ICd0b2dnbGUnKSBkYXRhLnRvZ2dsZSgpXG4gICAgICBlbHNlIGlmIChvcHRpb24pIGRhdGEuc2V0U3RhdGUob3B0aW9uKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5idXR0b25cblxuICAkLmZuLmJ1dHRvbiAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmJ1dHRvbi5Db25zdHJ1Y3RvciA9IEJ1dHRvblxuXG5cbiAgLy8gQlVUVE9OIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYnV0dG9uLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5idXR0b24gPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBCVVRUT04gREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudClcbiAgICAub24oJ2NsaWNrLmJzLmJ1dHRvbi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGVePVwiYnV0dG9uXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciAkYnRuID0gJChlLnRhcmdldClcbiAgICAgIGlmICghJGJ0bi5oYXNDbGFzcygnYnRuJykpICRidG4gPSAkYnRuLmNsb3Nlc3QoJy5idG4nKVxuICAgICAgUGx1Z2luLmNhbGwoJGJ0biwgJ3RvZ2dsZScpXG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICB9KVxuICAgIC5vbignZm9jdXMuYnMuYnV0dG9uLmRhdGEtYXBpIGJsdXIuYnMuYnV0dG9uLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZV49XCJidXR0b25cIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgJChlLnRhcmdldCkuY2xvc2VzdCgnLmJ0bicpLnRvZ2dsZUNsYXNzKCdmb2N1cycsIC9eZm9jdXMoaW4pPyQvLnRlc3QoZS50eXBlKSlcbiAgICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjYXJvdXNlbC5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2Nhcm91c2VsXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ0FST1VTRUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIENhcm91c2VsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLiRlbGVtZW50ICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGluZGljYXRvcnMgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5jYXJvdXNlbC1pbmRpY2F0b3JzJylcbiAgICB0aGlzLm9wdGlvbnMgICAgID0gb3B0aW9uc1xuICAgIHRoaXMucGF1c2VkICAgICAgPVxuICAgIHRoaXMuc2xpZGluZyAgICAgPVxuICAgIHRoaXMuaW50ZXJ2YWwgICAgPVxuICAgIHRoaXMuJGFjdGl2ZSAgICAgPVxuICAgIHRoaXMuJGl0ZW1zICAgICAgPSBudWxsXG5cbiAgICB0aGlzLm9wdGlvbnMua2V5Ym9hcmQgJiYgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5icy5jYXJvdXNlbCcsICQucHJveHkodGhpcy5rZXlkb3duLCB0aGlzKSlcblxuICAgIHRoaXMub3B0aW9ucy5wYXVzZSA9PSAnaG92ZXInICYmICEoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSAmJiB0aGlzLiRlbGVtZW50XG4gICAgICAub24oJ21vdXNlZW50ZXIuYnMuY2Fyb3VzZWwnLCAkLnByb3h5KHRoaXMucGF1c2UsIHRoaXMpKVxuICAgICAgLm9uKCdtb3VzZWxlYXZlLmJzLmNhcm91c2VsJywgJC5wcm94eSh0aGlzLmN5Y2xlLCB0aGlzKSlcbiAgfVxuXG4gIENhcm91c2VsLlZFUlNJT04gID0gJzMuMy4xJ1xuXG4gIENhcm91c2VsLlRSQU5TSVRJT05fRFVSQVRJT04gPSA2MDBcblxuICBDYXJvdXNlbC5ERUZBVUxUUyA9IHtcbiAgICBpbnRlcnZhbDogNTAwMCxcbiAgICBwYXVzZTogJ2hvdmVyJyxcbiAgICB3cmFwOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKC9pbnB1dHx0ZXh0YXJlYS9pLnRlc3QoZS50YXJnZXQudGFnTmFtZSkpIHJldHVyblxuICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgICAgY2FzZSAzNzogdGhpcy5wcmV2KCk7IGJyZWFrXG4gICAgICBjYXNlIDM5OiB0aGlzLm5leHQoKTsgYnJlYWtcbiAgICAgIGRlZmF1bHQ6IHJldHVyblxuICAgIH1cblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmN5Y2xlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IGZhbHNlKVxuXG4gICAgdGhpcy5pbnRlcnZhbCAmJiBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpXG5cbiAgICB0aGlzLm9wdGlvbnMuaW50ZXJ2YWxcbiAgICAgICYmICF0aGlzLnBhdXNlZFxuICAgICAgJiYgKHRoaXMuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgkLnByb3h5KHRoaXMubmV4dCwgdGhpcyksIHRoaXMub3B0aW9ucy5pbnRlcnZhbCkpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEl0ZW1JbmRleCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgdGhpcy4kaXRlbXMgPSBpdGVtLnBhcmVudCgpLmNoaWxkcmVuKCcuaXRlbScpXG4gICAgcmV0dXJuIHRoaXMuJGl0ZW1zLmluZGV4KGl0ZW0gfHwgdGhpcy4kYWN0aXZlKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLmdldEl0ZW1Gb3JEaXJlY3Rpb24gPSBmdW5jdGlvbiAoZGlyZWN0aW9uLCBhY3RpdmUpIHtcbiAgICB2YXIgZGVsdGEgPSBkaXJlY3Rpb24gPT0gJ3ByZXYnID8gLTEgOiAxXG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gdGhpcy5nZXRJdGVtSW5kZXgoYWN0aXZlKVxuICAgIHZhciBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLiRpdGVtcy5sZW5ndGhcbiAgICByZXR1cm4gdGhpcy4kaXRlbXMuZXEoaXRlbUluZGV4KVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnRvID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciB0aGF0ICAgICAgICA9IHRoaXNcbiAgICB2YXIgYWN0aXZlSW5kZXggPSB0aGlzLmdldEl0ZW1JbmRleCh0aGlzLiRhY3RpdmUgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpKVxuXG4gICAgaWYgKHBvcyA+ICh0aGlzLiRpdGVtcy5sZW5ndGggLSAxKSB8fCBwb3MgPCAwKSByZXR1cm5cblxuICAgIGlmICh0aGlzLnNsaWRpbmcpICAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50Lm9uZSgnc2xpZC5icy5jYXJvdXNlbCcsIGZ1bmN0aW9uICgpIHsgdGhhdC50byhwb3MpIH0pIC8vIHllcywgXCJzbGlkXCJcbiAgICBpZiAoYWN0aXZlSW5kZXggPT0gcG9zKSByZXR1cm4gdGhpcy5wYXVzZSgpLmN5Y2xlKClcblxuICAgIHJldHVybiB0aGlzLnNsaWRlKHBvcyA+IGFjdGl2ZUluZGV4ID8gJ25leHQnIDogJ3ByZXYnLCB0aGlzLiRpdGVtcy5lcShwb3MpKVxuICB9XG5cbiAgQ2Fyb3VzZWwucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlIHx8ICh0aGlzLnBhdXNlZCA9IHRydWUpXG5cbiAgICBpZiAodGhpcy4kZWxlbWVudC5maW5kKCcubmV4dCwgLnByZXYnKS5sZW5ndGggJiYgJC5zdXBwb3J0LnRyYW5zaXRpb24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcigkLnN1cHBvcnQudHJhbnNpdGlvbi5lbmQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgdGhpcy5pbnRlcnZhbCA9IGNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgnbmV4dCcpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUucHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zbGlkaW5nKSByZXR1cm5cbiAgICByZXR1cm4gdGhpcy5zbGlkZSgncHJldicpXG4gIH1cblxuICBDYXJvdXNlbC5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbiAodHlwZSwgbmV4dCkge1xuICAgIHZhciAkYWN0aXZlICAgPSB0aGlzLiRlbGVtZW50LmZpbmQoJy5pdGVtLmFjdGl2ZScpXG4gICAgdmFyICRuZXh0ICAgICA9IG5leHQgfHwgdGhpcy5nZXRJdGVtRm9yRGlyZWN0aW9uKHR5cGUsICRhY3RpdmUpXG4gICAgdmFyIGlzQ3ljbGluZyA9IHRoaXMuaW50ZXJ2YWxcbiAgICB2YXIgZGlyZWN0aW9uID0gdHlwZSA9PSAnbmV4dCcgPyAnbGVmdCcgOiAncmlnaHQnXG4gICAgdmFyIGZhbGxiYWNrICA9IHR5cGUgPT0gJ25leHQnID8gJ2ZpcnN0JyA6ICdsYXN0J1xuICAgIHZhciB0aGF0ICAgICAgPSB0aGlzXG5cbiAgICBpZiAoISRuZXh0Lmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMud3JhcCkgcmV0dXJuXG4gICAgICAkbmV4dCA9IHRoaXMuJGVsZW1lbnQuZmluZCgnLml0ZW0nKVtmYWxsYmFja10oKVxuICAgIH1cblxuICAgIGlmICgkbmV4dC5oYXNDbGFzcygnYWN0aXZlJykpIHJldHVybiAodGhpcy5zbGlkaW5nID0gZmFsc2UpXG5cbiAgICB2YXIgcmVsYXRlZFRhcmdldCA9ICRuZXh0WzBdXG4gICAgdmFyIHNsaWRlRXZlbnQgPSAkLkV2ZW50KCdzbGlkZS5icy5jYXJvdXNlbCcsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHJlbGF0ZWRUYXJnZXQsXG4gICAgICBkaXJlY3Rpb246IGRpcmVjdGlvblxuICAgIH0pXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRlRXZlbnQpXG4gICAgaWYgKHNsaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5zbGlkaW5nID0gdHJ1ZVxuXG4gICAgaXNDeWNsaW5nICYmIHRoaXMucGF1c2UoKVxuXG4gICAgaWYgKHRoaXMuJGluZGljYXRvcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLiRpbmRpY2F0b3JzLmZpbmQoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgIHZhciAkbmV4dEluZGljYXRvciA9ICQodGhpcy4kaW5kaWNhdG9ycy5jaGlsZHJlbigpW3RoaXMuZ2V0SXRlbUluZGV4KCRuZXh0KV0pXG4gICAgICAkbmV4dEluZGljYXRvciAmJiAkbmV4dEluZGljYXRvci5hZGRDbGFzcygnYWN0aXZlJylcbiAgICB9XG5cbiAgICB2YXIgc2xpZEV2ZW50ID0gJC5FdmVudCgnc2xpZC5icy5jYXJvdXNlbCcsIHsgcmVsYXRlZFRhcmdldDogcmVsYXRlZFRhcmdldCwgZGlyZWN0aW9uOiBkaXJlY3Rpb24gfSkgLy8geWVzLCBcInNsaWRcIlxuICAgIGlmICgkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdzbGlkZScpKSB7XG4gICAgICAkbmV4dC5hZGRDbGFzcyh0eXBlKVxuICAgICAgJG5leHRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICAkYWN0aXZlLmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRuZXh0LmFkZENsYXNzKGRpcmVjdGlvbilcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRuZXh0LnJlbW92ZUNsYXNzKFt0eXBlLCBkaXJlY3Rpb25dLmpvaW4oJyAnKSkuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgJGFjdGl2ZS5yZW1vdmVDbGFzcyhbJ2FjdGl2ZScsIGRpcmVjdGlvbl0uam9pbignICcpKVxuICAgICAgICAgIHRoYXQuc2xpZGluZyA9IGZhbHNlXG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoc2xpZEV2ZW50KVxuICAgICAgICAgIH0sIDApXG4gICAgICAgIH0pXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChDYXJvdXNlbC5UUkFOU0lUSU9OX0RVUkFUSU9OKVxuICAgIH0gZWxzZSB7XG4gICAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgJG5leHQuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICB0aGlzLnNsaWRpbmcgPSBmYWxzZVxuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKHNsaWRFdmVudClcbiAgICB9XG5cbiAgICBpc0N5Y2xpbmcgJiYgdGhpcy5jeWNsZSgpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBDYXJvdXNlbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcbiAgICAgIHZhciBhY3Rpb24gID0gdHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJyA/IG9wdGlvbiA6IG9wdGlvbnMuc2xpZGVcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5jYXJvdXNlbCcsIChkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdudW1iZXInKSBkYXRhLnRvKG9wdGlvbilcbiAgICAgIGVsc2UgaWYgKGFjdGlvbikgZGF0YVthY3Rpb25dKClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuaW50ZXJ2YWwpIGRhdGEucGF1c2UoKS5jeWNsZSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNhcm91c2VsXG5cbiAgJC5mbi5jYXJvdXNlbCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNhcm91c2VsLkNvbnN0cnVjdG9yID0gQ2Fyb3VzZWxcblxuXG4gIC8vIENBUk9VU0VMIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jYXJvdXNlbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY2Fyb3VzZWwgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDQVJPVVNFTCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBocmVmXG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgPSAkdGhpcy5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgaWYgKCEkdGFyZ2V0Lmhhc0NsYXNzKCdjYXJvdXNlbCcpKSByZXR1cm5cbiAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuICAgIHZhciBzbGlkZUluZGV4ID0gJHRoaXMuYXR0cignZGF0YS1zbGlkZS10bycpXG4gICAgaWYgKHNsaWRlSW5kZXgpIG9wdGlvbnMuaW50ZXJ2YWwgPSBmYWxzZVxuXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9ucylcblxuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICAkdGFyZ2V0LmRhdGEoJ2JzLmNhcm91c2VsJykudG8oc2xpZGVJbmRleClcbiAgICB9XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZV0nLCBjbGlja0hhbmRsZXIpXG4gICAgLm9uKCdjbGljay5icy5jYXJvdXNlbC5kYXRhLWFwaScsICdbZGF0YS1zbGlkZS10b10nLCBjbGlja0hhbmRsZXIpXG5cbiAgJCh3aW5kb3cpLm9uKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICQoJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRjYXJvdXNlbCA9ICQodGhpcylcbiAgICAgIFBsdWdpbi5jYWxsKCRjYXJvdXNlbCwgJGNhcm91c2VsLmRhdGEoKSlcbiAgICB9KVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBjb2xsYXBzZS5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2NvbGxhcHNlXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQ09MTEFQU0UgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgQ29sbGFwc2UgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuJGVsZW1lbnQgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsIG9wdGlvbnMpXG4gICAgdGhpcy4kdHJpZ2dlciAgICAgID0gJCh0aGlzLm9wdGlvbnMudHJpZ2dlcikuZmlsdGVyKCdbaHJlZj1cIiMnICsgZWxlbWVudC5pZCArICdcIl0sIFtkYXRhLXRhcmdldD1cIiMnICsgZWxlbWVudC5pZCArICdcIl0nKVxuICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IG51bGxcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50KSB7XG4gICAgICB0aGlzLiRwYXJlbnQgPSB0aGlzLmdldFBhcmVudCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuJGVsZW1lbnQsIHRoaXMuJHRyaWdnZXIpXG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucy50b2dnbGUpIHRoaXMudG9nZ2xlKClcbiAgfVxuXG4gIENvbGxhcHNlLlZFUlNJT04gID0gJzMuMy4xJ1xuXG4gIENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzNTBcblxuICBDb2xsYXBzZS5ERUZBVUxUUyA9IHtcbiAgICB0b2dnbGU6IHRydWUsXG4gICAgdHJpZ2dlcjogJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdJ1xuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmRpbWVuc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaGFzV2lkdGggPSB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCd3aWR0aCcpXG4gICAgcmV0dXJuIGhhc1dpZHRoID8gJ3dpZHRoJyA6ICdoZWlnaHQnXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy50cmFuc2l0aW9uaW5nIHx8IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2luJykpIHJldHVyblxuXG4gICAgdmFyIGFjdGl2ZXNEYXRhXG4gICAgdmFyIGFjdGl2ZXMgPSB0aGlzLiRwYXJlbnQgJiYgdGhpcy4kcGFyZW50LmZpbmQoJz4gLnBhbmVsJykuY2hpbGRyZW4oJy5pbiwgLmNvbGxhcHNpbmcnKVxuXG4gICAgaWYgKGFjdGl2ZXMgJiYgYWN0aXZlcy5sZW5ndGgpIHtcbiAgICAgIGFjdGl2ZXNEYXRhID0gYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScpXG4gICAgICBpZiAoYWN0aXZlc0RhdGEgJiYgYWN0aXZlc0RhdGEudHJhbnNpdGlvbmluZykgcmV0dXJuXG4gICAgfVxuXG4gICAgdmFyIHN0YXJ0RXZlbnQgPSAkLkV2ZW50KCdzaG93LmJzLmNvbGxhcHNlJylcbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoc3RhcnRFdmVudClcbiAgICBpZiAoc3RhcnRFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICBpZiAoYWN0aXZlcyAmJiBhY3RpdmVzLmxlbmd0aCkge1xuICAgICAgUGx1Z2luLmNhbGwoYWN0aXZlcywgJ2hpZGUnKVxuICAgICAgYWN0aXZlc0RhdGEgfHwgYWN0aXZlcy5kYXRhKCdicy5jb2xsYXBzZScsIG51bGwpXG4gICAgfVxuXG4gICAgdmFyIGRpbWVuc2lvbiA9IHRoaXMuZGltZW5zaW9uKClcblxuICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UnKVxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylbZGltZW5zaW9uXSgwKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy4kdHJpZ2dlclxuICAgICAgLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuXG4gICAgdGhpcy50cmFuc2l0aW9uaW5nID0gMVxuXG4gICAgdmFyIGNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2NvbGxhcHNpbmcnKVxuICAgICAgICAuYWRkQ2xhc3MoJ2NvbGxhcHNlIGluJylbZGltZW5zaW9uXSgnJylcbiAgICAgIHRoaXMudHJhbnNpdGlvbmluZyA9IDBcbiAgICAgIHRoaXMuJGVsZW1lbnRcbiAgICAgICAgLnRyaWdnZXIoJ3Nob3duLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdmFyIHNjcm9sbFNpemUgPSAkLmNhbWVsQ2FzZShbJ3Njcm9sbCcsIGRpbWVuc2lvbl0uam9pbignLScpKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgJC5wcm94eShjb21wbGV0ZSwgdGhpcykpXG4gICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoQ29sbGFwc2UuVFJBTlNJVElPTl9EVVJBVElPTilbZGltZW5zaW9uXSh0aGlzLiRlbGVtZW50WzBdW3Njcm9sbFNpemVdKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMudHJhbnNpdGlvbmluZyB8fCAhdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSkgcmV0dXJuXG5cbiAgICB2YXIgc3RhcnRFdmVudCA9ICQuRXZlbnQoJ2hpZGUuYnMuY29sbGFwc2UnKVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihzdGFydEV2ZW50KVxuICAgIGlmIChzdGFydEV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHZhciBkaW1lbnNpb24gPSB0aGlzLmRpbWVuc2lvbigpXG5cbiAgICB0aGlzLiRlbGVtZW50W2RpbWVuc2lvbl0odGhpcy4kZWxlbWVudFtkaW1lbnNpb25dKCkpWzBdLm9mZnNldEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLmFkZENsYXNzKCdjb2xsYXBzaW5nJylcbiAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2UgaW4nKVxuICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcblxuICAgIHRoaXMuJHRyaWdnZXJcbiAgICAgIC5hZGRDbGFzcygnY29sbGFwc2VkJylcbiAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAxXG5cbiAgICB2YXIgY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnRyYW5zaXRpb25pbmcgPSAwXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcygnY29sbGFwc2luZycpXG4gICAgICAgIC5hZGRDbGFzcygnY29sbGFwc2UnKVxuICAgICAgICAudHJpZ2dlcignaGlkZGVuLmJzLmNvbGxhcHNlJylcbiAgICB9XG5cbiAgICBpZiAoISQuc3VwcG9ydC50cmFuc2l0aW9uKSByZXR1cm4gY29tcGxldGUuY2FsbCh0aGlzKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgW2RpbWVuc2lvbl0oMClcbiAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkoY29tcGxldGUsIHRoaXMpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKENvbGxhcHNlLlRSQU5TSVRJT05fRFVSQVRJT04pXG4gIH1cblxuICBDb2xsYXBzZS5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXNbdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnaW4nKSA/ICdoaWRlJyA6ICdzaG93J10oKVxuICB9XG5cbiAgQ29sbGFwc2UucHJvdG90eXBlLmdldFBhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJCh0aGlzLm9wdGlvbnMucGFyZW50KVxuICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2RhdGEtcGFyZW50PVwiJyArIHRoaXMub3B0aW9ucy5wYXJlbnQgKyAnXCJdJylcbiAgICAgIC5lYWNoKCQucHJveHkoZnVuY3Rpb24gKGksIGVsZW1lbnQpIHtcbiAgICAgICAgdmFyICRlbGVtZW50ID0gJChlbGVtZW50KVxuICAgICAgICB0aGlzLmFkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhnZXRUYXJnZXRGcm9tVHJpZ2dlcigkZWxlbWVudCksICRlbGVtZW50KVxuICAgICAgfSwgdGhpcykpXG4gICAgICAuZW5kKClcbiAgfVxuXG4gIENvbGxhcHNlLnByb3RvdHlwZS5hZGRBcmlhQW5kQ29sbGFwc2VkQ2xhc3MgPSBmdW5jdGlvbiAoJGVsZW1lbnQsICR0cmlnZ2VyKSB7XG4gICAgdmFyIGlzT3BlbiA9ICRlbGVtZW50Lmhhc0NsYXNzKCdpbicpXG5cbiAgICAkZWxlbWVudC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgaXNPcGVuKVxuICAgICR0cmlnZ2VyXG4gICAgICAudG9nZ2xlQ2xhc3MoJ2NvbGxhcHNlZCcsICFpc09wZW4pXG4gICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIGlzT3BlbilcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhcmdldEZyb21UcmlnZ2VyKCR0cmlnZ2VyKSB7XG4gICAgdmFyIGhyZWZcbiAgICB2YXIgdGFyZ2V0ID0gJHRyaWdnZXIuYXR0cignZGF0YS10YXJnZXQnKVxuICAgICAgfHwgKGhyZWYgPSAkdHJpZ2dlci5hdHRyKCdocmVmJykpICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpIC8vIHN0cmlwIGZvciBpZTdcblxuICAgIHJldHVybiAkKHRhcmdldClcbiAgfVxuXG5cbiAgLy8gQ09MTEFQU0UgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQ29sbGFwc2UuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSAmJiBvcHRpb25zLnRvZ2dsZSAmJiBvcHRpb24gPT0gJ3Nob3cnKSBvcHRpb25zLnRvZ2dsZSA9IGZhbHNlXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmNvbGxhcHNlJywgKGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLmNvbGxhcHNlXG5cbiAgJC5mbi5jb2xsYXBzZSAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLmNvbGxhcHNlLkNvbnN0cnVjdG9yID0gQ29sbGFwc2VcblxuXG4gIC8vIENPTExBUFNFIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5jb2xsYXBzZS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uY29sbGFwc2UgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBDT0xMQVBTRSBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5jb2xsYXBzZS5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG5cbiAgICBpZiAoISR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgdmFyICR0YXJnZXQgPSBnZXRUYXJnZXRGcm9tVHJpZ2dlcigkdGhpcylcbiAgICB2YXIgZGF0YSAgICA9ICR0YXJnZXQuZGF0YSgnYnMuY29sbGFwc2UnKVxuICAgIHZhciBvcHRpb24gID0gZGF0YSA/ICd0b2dnbGUnIDogJC5leHRlbmQoe30sICR0aGlzLmRhdGEoKSwgeyB0cmlnZ2VyOiB0aGlzIH0pXG5cbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IGRyb3Bkb3duLmpzIHYzLjMuMVxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jZHJvcGRvd25zXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gRFJPUERPV04gQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIGJhY2tkcm9wID0gJy5kcm9wZG93bi1iYWNrZHJvcCdcbiAgdmFyIHRvZ2dsZSAgID0gJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJ1xuICB2YXIgRHJvcGRvd24gPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICQoZWxlbWVudCkub24oJ2NsaWNrLmJzLmRyb3Bkb3duJywgdGhpcy50b2dnbGUpXG4gIH1cblxuICBEcm9wZG93bi5WRVJTSU9OID0gJzMuMy4xJ1xuXG4gIERyb3Bkb3duLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyA9ICQodGhpcylcblxuICAgIGlmICgkdGhpcy5pcygnLmRpc2FibGVkLCA6ZGlzYWJsZWQnKSkgcmV0dXJuXG5cbiAgICB2YXIgJHBhcmVudCAgPSBnZXRQYXJlbnQoJHRoaXMpXG4gICAgdmFyIGlzQWN0aXZlID0gJHBhcmVudC5oYXNDbGFzcygnb3BlbicpXG5cbiAgICBjbGVhck1lbnVzKClcblxuICAgIGlmICghaXNBY3RpdmUpIHtcbiAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgISRwYXJlbnQuY2xvc2VzdCgnLm5hdmJhci1uYXYnKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gaWYgbW9iaWxlIHdlIHVzZSBhIGJhY2tkcm9wIGJlY2F1c2UgY2xpY2sgZXZlbnRzIGRvbid0IGRlbGVnYXRlXG4gICAgICAgICQoJzxkaXYgY2xhc3M9XCJkcm9wZG93bi1iYWNrZHJvcFwiLz4nKS5pbnNlcnRBZnRlcigkKHRoaXMpKS5vbignY2xpY2snLCBjbGVhck1lbnVzKVxuICAgICAgfVxuXG4gICAgICB2YXIgcmVsYXRlZFRhcmdldCA9IHsgcmVsYXRlZFRhcmdldDogdGhpcyB9XG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ3Nob3cuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpc1xuICAgICAgICAudHJpZ2dlcignZm9jdXMnKVxuICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsICd0cnVlJylcblxuICAgICAgJHBhcmVudFxuICAgICAgICAudG9nZ2xlQ2xhc3MoJ29wZW4nKVxuICAgICAgICAudHJpZ2dlcignc2hvd24uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgRHJvcGRvd24ucHJvdG90eXBlLmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmICghLygzOHw0MHwyN3wzMikvLnRlc3QoZS53aGljaCkgfHwgL2lucHV0fHRleHRhcmVhL2kudGVzdChlLnRhcmdldC50YWdOYW1lKSkgcmV0dXJuXG5cbiAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG5cbiAgICBpZiAoJHRoaXMuaXMoJy5kaXNhYmxlZCwgOmRpc2FibGVkJykpIHJldHVyblxuXG4gICAgdmFyICRwYXJlbnQgID0gZ2V0UGFyZW50KCR0aGlzKVxuICAgIHZhciBpc0FjdGl2ZSA9ICRwYXJlbnQuaGFzQ2xhc3MoJ29wZW4nKVxuXG4gICAgaWYgKCghaXNBY3RpdmUgJiYgZS53aGljaCAhPSAyNykgfHwgKGlzQWN0aXZlICYmIGUud2hpY2ggPT0gMjcpKSB7XG4gICAgICBpZiAoZS53aGljaCA9PSAyNykgJHBhcmVudC5maW5kKHRvZ2dsZSkudHJpZ2dlcignZm9jdXMnKVxuICAgICAgcmV0dXJuICR0aGlzLnRyaWdnZXIoJ2NsaWNrJylcbiAgICB9XG5cbiAgICB2YXIgZGVzYyA9ICcgbGk6bm90KC5kaXZpZGVyKTp2aXNpYmxlIGEnXG4gICAgdmFyICRpdGVtcyA9ICRwYXJlbnQuZmluZCgnW3JvbGU9XCJtZW51XCJdJyArIGRlc2MgKyAnLCBbcm9sZT1cImxpc3Rib3hcIl0nICsgZGVzYylcblxuICAgIGlmICghJGl0ZW1zLmxlbmd0aCkgcmV0dXJuXG5cbiAgICB2YXIgaW5kZXggPSAkaXRlbXMuaW5kZXgoZS50YXJnZXQpXG5cbiAgICBpZiAoZS53aGljaCA9PSAzOCAmJiBpbmRleCA+IDApICAgICAgICAgICAgICAgICBpbmRleC0tICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXBcbiAgICBpZiAoZS53aGljaCA9PSA0MCAmJiBpbmRleCA8ICRpdGVtcy5sZW5ndGggLSAxKSBpbmRleCsrICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG93blxuICAgIGlmICghfmluZGV4KSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwXG5cbiAgICAkaXRlbXMuZXEoaW5kZXgpLnRyaWdnZXIoJ2ZvY3VzJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsZWFyTWVudXMoZSkge1xuICAgIGlmIChlICYmIGUud2hpY2ggPT09IDMpIHJldHVyblxuICAgICQoYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgJCh0b2dnbGUpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgICAgICAgPSAkKHRoaXMpXG4gICAgICB2YXIgJHBhcmVudCAgICAgICA9IGdldFBhcmVudCgkdGhpcylcbiAgICAgIHZhciByZWxhdGVkVGFyZ2V0ID0geyByZWxhdGVkVGFyZ2V0OiB0aGlzIH1cblxuICAgICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKCdvcGVuJykpIHJldHVyblxuXG4gICAgICAkcGFyZW50LnRyaWdnZXIoZSA9ICQuRXZlbnQoJ2hpZGUuYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KSlcblxuICAgICAgaWYgKGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgICAkdGhpcy5hdHRyKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcbiAgICAgICRwYXJlbnQucmVtb3ZlQ2xhc3MoJ29wZW4nKS50cmlnZ2VyKCdoaWRkZW4uYnMuZHJvcGRvd24nLCByZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiBnZXRQYXJlbnQoJHRoaXMpIHtcbiAgICB2YXIgc2VsZWN0b3IgPSAkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiAvI1tBLVphLXpdLy50ZXN0KHNlbGVjdG9yKSAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIHZhciAkcGFyZW50ID0gc2VsZWN0b3IgJiYgJChzZWxlY3RvcilcblxuICAgIHJldHVybiAkcGFyZW50ICYmICRwYXJlbnQubGVuZ3RoID8gJHBhcmVudCA6ICR0aGlzLnBhcmVudCgpXG4gIH1cblxuXG4gIC8vIERST1BET1dOIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMuZHJvcGRvd24nKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLmRyb3Bkb3duJywgKGRhdGEgPSBuZXcgRHJvcGRvd24odGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXS5jYWxsKCR0aGlzKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5kcm9wZG93blxuXG4gICQuZm4uZHJvcGRvd24gICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5kcm9wZG93bi5Db25zdHJ1Y3RvciA9IERyb3Bkb3duXG5cblxuICAvLyBEUk9QRE9XTiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uZHJvcGRvd24ubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmRyb3Bkb3duID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQVBQTFkgVE8gU1RBTkRBUkQgRFJPUERPV04gRUxFTUVOVFNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCBjbGVhck1lbnVzKVxuICAgIC5vbignY2xpY2suYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnLmRyb3Bkb3duIGZvcm0nLCBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpIH0pXG4gICAgLm9uKCdjbGljay5icy5kcm9wZG93bi5kYXRhLWFwaScsIHRvZ2dsZSwgRHJvcGRvd24ucHJvdG90eXBlLnRvZ2dsZSlcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCB0b2dnbGUsIERyb3Bkb3duLnByb3RvdHlwZS5rZXlkb3duKVxuICAgIC5vbigna2V5ZG93bi5icy5kcm9wZG93bi5kYXRhLWFwaScsICdbcm9sZT1cIm1lbnVcIl0nLCBEcm9wZG93bi5wcm90b3R5cGUua2V5ZG93bilcbiAgICAub24oJ2tleWRvd24uYnMuZHJvcGRvd24uZGF0YS1hcGknLCAnW3JvbGU9XCJsaXN0Ym94XCJdJywgRHJvcGRvd24ucHJvdG90eXBlLmtleWRvd24pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IG1vZGFsLmpzIHYzLjMuMVxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jbW9kYWxzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gTU9EQUwgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIE1vZGFsID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgID0gb3B0aW9uc1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgPSAkKGRvY3VtZW50LmJvZHkpXG4gICAgdGhpcy4kZWxlbWVudCAgICAgICA9ICQoZWxlbWVudClcbiAgICB0aGlzLiRiYWNrZHJvcCAgICAgID1cbiAgICB0aGlzLmlzU2hvd24gICAgICAgID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSAwXG5cbiAgICBpZiAodGhpcy5vcHRpb25zLnJlbW90ZSkge1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAuZmluZCgnLm1vZGFsLWNvbnRlbnQnKVxuICAgICAgICAubG9hZCh0aGlzLm9wdGlvbnMucmVtb3RlLCAkLnByb3h5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2xvYWRlZC5icy5tb2RhbCcpXG4gICAgICAgIH0sIHRoaXMpKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLlZFUlNJT04gID0gJzMuMy4xJ1xuXG4gIE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04gPSAzMDBcbiAgTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiA9IDE1MFxuXG4gIE1vZGFsLkRFRkFVTFRTID0ge1xuICAgIGJhY2tkcm9wOiB0cnVlLFxuICAgIGtleWJvYXJkOiB0cnVlLFxuICAgIHNob3c6IHRydWVcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Nob3duID8gdGhpcy5oaWRlKCkgOiB0aGlzLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBlICAgID0gJC5FdmVudCgnc2hvdy5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKHRoaXMuaXNTaG93biB8fCBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgIHRoaXMuaXNTaG93biA9IHRydWVcblxuICAgIHRoaXMuY2hlY2tTY3JvbGxiYXIoKVxuICAgIHRoaXMuc2V0U2Nyb2xsYmFyKClcbiAgICB0aGlzLiRib2R5LmFkZENsYXNzKCdtb2RhbC1vcGVuJylcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJ1tkYXRhLWRpc21pc3M9XCJtb2RhbFwiXScsICQucHJveHkodGhpcy5oaWRlLCB0aGlzKSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICBpZiAodGhhdC5vcHRpb25zLmJhY2tkcm9wKSB0aGF0LmFkanVzdEJhY2tkcm9wKClcbiAgICAgIHRoYXQuYWRqdXN0RGlhbG9nKClcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgdGhhdC4kZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcbiAgICAgIH1cblxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAuYWRkQ2xhc3MoJ2luJylcbiAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgZmFsc2UpXG5cbiAgICAgIHRoYXQuZW5mb3JjZUZvY3VzKClcblxuICAgICAgdmFyIGUgPSAkLkV2ZW50KCdzaG93bi5icy5tb2RhbCcsIHsgcmVsYXRlZFRhcmdldDogX3JlbGF0ZWRUYXJnZXQgfSlcblxuICAgICAgdHJhbnNpdGlvbiA/XG4gICAgICAgIHRoYXQuJGVsZW1lbnQuZmluZCgnLm1vZGFsLWRpYWxvZycpIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCB0cnVlKVxuICAgICAgLm9mZignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuJGVsZW1lbnRbMF0gIT09IGUudGFyZ2V0ICYmICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLndoaWNoID09IDI3ICYmIHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuaGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJylcbiAgICAgIHRoYXQucmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGF0LnJlc2V0U2Nyb2xsYmFyKClcbiAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm1vZGFsJylcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wICYmIHRoaXMuJGJhY2tkcm9wLnJlbW92ZSgpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYmFja2Ryb3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgYW5pbWF0ZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/ICdmYWRlJyA6ICcnXG5cbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgdmFyIGRvQW5pbWF0ZSA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIGFuaW1hdGVcblxuICAgICAgdGhpcy4kYmFja2Ryb3AgPSAkKCc8ZGl2IGNsYXNzPVwibW9kYWwtYmFja2Ryb3AgJyArIGFuaW1hdGUgKyAnXCIgLz4nKVxuICAgICAgICAucHJlcGVuZFRvKHRoaXMuJGVsZW1lbnQpXG4gICAgICAgIC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGUuY3VycmVudFRhcmdldCkgcmV0dXJuXG4gICAgICAgICAgdGhpcy5vcHRpb25zLmJhY2tkcm9wID09ICdzdGF0aWMnXG4gICAgICAgICAgICA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMuY2FsbCh0aGlzLiRlbGVtZW50WzBdKVxuICAgICAgICAgICAgOiB0aGlzLmhpZGUuY2FsbCh0aGlzKVxuICAgICAgICB9LCB0aGlzKSlcblxuICAgICAgaWYgKGRvQW5pbWF0ZSkgdGhpcy4kYmFja2Ryb3BbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG5cbiAgICAgIHRoaXMuJGJhY2tkcm9wLmFkZENsYXNzKCdpbicpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHJldHVyblxuXG4gICAgICBkb0FuaW1hdGUgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrKClcblxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93biAmJiB0aGlzLiRiYWNrZHJvcCkge1xuICAgICAgdGhpcy4kYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICAgdmFyIGNhbGxiYWNrUmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGF0LnJlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgICAgfVxuICAgICAgJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjYWxsYmFja1JlbW92ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgICBjYWxsYmFja1JlbW92ZSgpXG5cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgLy8gdGhlc2UgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuXG4gIE1vZGFsLnByb3RvdHlwZS5oYW5kbGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5iYWNrZHJvcCkgdGhpcy5hZGp1c3RCYWNrZHJvcCgpXG4gICAgdGhpcy5hZGp1c3REaWFsb2coKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmFkanVzdEJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAuY3NzKCdoZWlnaHQnLCAwKVxuICAgICAgLmNzcygnaGVpZ2h0JywgdGhpcy4kZWxlbWVudFswXS5zY3JvbGxIZWlnaHQpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RhbElzT3ZlcmZsb3dpbmcgPSB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAgIXRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiB0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5ib2R5SXNPdmVyZmxvd2luZyA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm9keVBhZCA9IHBhcnNlSW50KCh0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcpIHx8IDApLCAxMClcbiAgICBpZiAodGhpcy5ib2R5SXNPdmVyZmxvd2luZykgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCBib2R5UGFkICsgdGhpcy5zY3JvbGxiYXJXaWR0aClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsICcnKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLm1lYXN1cmVTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7IC8vIHRoeCB3YWxzaFxuICAgIHZhciBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHNjcm9sbERpdi5jbGFzc05hbWUgPSAnbW9kYWwtc2Nyb2xsYmFyLW1lYXN1cmUnXG4gICAgdGhpcy4kYm9keS5hcHBlbmQoc2Nyb2xsRGl2KVxuICAgIHZhciBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aFxuICAgIHRoaXMuJGJvZHlbMF0ucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KVxuICAgIHJldHVybiBzY3JvbGxiYXJXaWR0aFxuICB9XG5cblxuICAvLyBNT0RBTCBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24sIF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgID0gJHRoaXMuZGF0YSgnYnMubW9kYWwnKVxuICAgICAgdmFyIG9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgTW9kYWwuREVGQVVMVFMsICR0aGlzLmRhdGEoKSwgdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb24pXG5cbiAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMubW9kYWwnLCAoZGF0YSA9IG5ldyBNb2RhbCh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKF9yZWxhdGVkVGFyZ2V0KVxuICAgICAgZWxzZSBpZiAob3B0aW9ucy5zaG93KSBkYXRhLnNob3coX3JlbGF0ZWRUYXJnZXQpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLm1vZGFsXG5cbiAgJC5mbi5tb2RhbCAgICAgICAgICAgICA9IFBsdWdpblxuICAkLmZuLm1vZGFsLkNvbnN0cnVjdG9yID0gTW9kYWxcblxuXG4gIC8vIE1PREFMIE5PIENPTkZMSUNUXG4gIC8vID09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5tb2RhbC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4ubW9kYWwgPSBvbGRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cblxuICAvLyBNT0RBTCBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT09PVxuXG4gICQoZG9jdW1lbnQpLm9uKCdjbGljay5icy5tb2RhbC5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJtb2RhbFwiXScsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgdmFyIGhyZWYgICAgPSAkdGhpcy5hdHRyKCdocmVmJylcbiAgICB2YXIgJHRhcmdldCA9ICQoJHRoaXMuYXR0cignZGF0YS10YXJnZXQnKSB8fCAoaHJlZiAmJiBocmVmLnJlcGxhY2UoLy4qKD89I1teXFxzXSskKS8sICcnKSkpIC8vIHN0cmlwIGZvciBpZTdcbiAgICB2YXIgb3B0aW9uICA9ICR0YXJnZXQuZGF0YSgnYnMubW9kYWwnKSA/ICd0b2dnbGUnIDogJC5leHRlbmQoeyByZW1vdGU6ICEvIy8udGVzdChocmVmKSAmJiBocmVmIH0sICR0YXJnZXQuZGF0YSgpLCAkdGhpcy5kYXRhKCkpXG5cbiAgICBpZiAoJHRoaXMuaXMoJ2EnKSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAkdGFyZ2V0Lm9uZSgnc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChzaG93RXZlbnQpIHtcbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVybiAvLyBvbmx5IHJlZ2lzdGVyIGZvY3VzIHJlc3RvcmVyIGlmIG1vZGFsIHdpbGwgYWN0dWFsbHkgZ2V0IHNob3duXG4gICAgICAkdGFyZ2V0Lm9uZSgnaGlkZGVuLmJzLm1vZGFsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAkdGhpcy5pcygnOnZpc2libGUnKSAmJiAkdGhpcy50cmlnZ2VyKCdmb2N1cycpXG4gICAgICB9KVxuICAgIH0pXG4gICAgUGx1Z2luLmNhbGwoJHRhcmdldCwgb3B0aW9uLCB0aGlzKVxuICB9KVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0b29sdGlwLmpzIHYzLjMuMVxuICogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vamF2YXNjcmlwdC8jdG9vbHRpcFxuICogSW5zcGlyZWQgYnkgdGhlIG9yaWdpbmFsIGpRdWVyeS50aXBzeSBieSBKYXNvbiBGcmFtZVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFRPT0xUSVAgUFVCTElDIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBUb29sdGlwID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLnR5cGUgICAgICAgPVxuICAgIHRoaXMub3B0aW9ucyAgICA9XG4gICAgdGhpcy5lbmFibGVkICAgID1cbiAgICB0aGlzLnRpbWVvdXQgICAgPVxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9XG4gICAgdGhpcy4kZWxlbWVudCAgID0gbnVsbFxuXG4gICAgdGhpcy5pbml0KCd0b29sdGlwJywgZWxlbWVudCwgb3B0aW9ucylcbiAgfVxuXG4gIFRvb2x0aXAuVkVSU0lPTiAgPSAnMy4zLjEnXG5cbiAgVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVG9vbHRpcC5ERUZBVUxUUyA9IHtcbiAgICBhbmltYXRpb246IHRydWUsXG4gICAgcGxhY2VtZW50OiAndG9wJyxcbiAgICBzZWxlY3RvcjogZmFsc2UsXG4gICAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gICAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgICB0aXRsZTogJycsXG4gICAgZGVsYXk6IDAsXG4gICAgaHRtbDogZmFsc2UsXG4gICAgY29udGFpbmVyOiBmYWxzZSxcbiAgICB2aWV3cG9ydDoge1xuICAgICAgc2VsZWN0b3I6ICdib2R5JyxcbiAgICAgIHBhZGRpbmc6IDBcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKHR5cGUsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmVuYWJsZWQgICA9IHRydWVcbiAgICB0aGlzLnR5cGUgICAgICA9IHR5cGVcbiAgICB0aGlzLiRlbGVtZW50ICA9ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICA9IHRoaXMuZ2V0T3B0aW9ucyhvcHRpb25zKVxuICAgIHRoaXMuJHZpZXdwb3J0ID0gdGhpcy5vcHRpb25zLnZpZXdwb3J0ICYmICQodGhpcy5vcHRpb25zLnZpZXdwb3J0LnNlbGVjdG9yIHx8IHRoaXMub3B0aW9ucy52aWV3cG9ydClcblxuICAgIHZhciB0cmlnZ2VycyA9IHRoaXMub3B0aW9ucy50cmlnZ2VyLnNwbGl0KCcgJylcblxuICAgIGZvciAodmFyIGkgPSB0cmlnZ2Vycy5sZW5ndGg7IGktLTspIHtcbiAgICAgIHZhciB0cmlnZ2VyID0gdHJpZ2dlcnNbaV1cblxuICAgICAgaWYgKHRyaWdnZXIgPT0gJ2NsaWNrJykge1xuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKCdjbGljay4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy50b2dnbGUsIHRoaXMpKVxuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9ICdtYW51YWwnKSB7XG4gICAgICAgIHZhciBldmVudEluICA9IHRyaWdnZXIgPT0gJ2hvdmVyJyA/ICdtb3VzZWVudGVyJyA6ICdmb2N1c2luJ1xuICAgICAgICB2YXIgZXZlbnRPdXQgPSB0cmlnZ2VyID09ICdob3ZlcicgPyAnbW91c2VsZWF2ZScgOiAnZm9jdXNvdXQnXG5cbiAgICAgICAgdGhpcy4kZWxlbWVudC5vbihldmVudEluICArICcuJyArIHRoaXMudHlwZSwgdGhpcy5vcHRpb25zLnNlbGVjdG9yLCAkLnByb3h5KHRoaXMuZW50ZXIsIHRoaXMpKVxuICAgICAgICB0aGlzLiRlbGVtZW50Lm9uKGV2ZW50T3V0ICsgJy4nICsgdGhpcy50eXBlLCB0aGlzLm9wdGlvbnMuc2VsZWN0b3IsICQucHJveHkodGhpcy5sZWF2ZSwgdGhpcykpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vcHRpb25zLnNlbGVjdG9yID9cbiAgICAgICh0aGlzLl9vcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMub3B0aW9ucywgeyB0cmlnZ2VyOiAnbWFudWFsJywgc2VsZWN0b3I6ICcnIH0pKSA6XG4gICAgICB0aGlzLmZpeFRpdGxlKClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldERlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBUb29sdGlwLkRFRkFVTFRTXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gJC5leHRlbmQoe30sIHRoaXMuZ2V0RGVmYXVsdHMoKSwgdGhpcy4kZWxlbWVudC5kYXRhKCksIG9wdGlvbnMpXG5cbiAgICBpZiAob3B0aW9ucy5kZWxheSAmJiB0eXBlb2Ygb3B0aW9ucy5kZWxheSA9PSAnbnVtYmVyJykge1xuICAgICAgb3B0aW9ucy5kZWxheSA9IHtcbiAgICAgICAgc2hvdzogb3B0aW9ucy5kZWxheSxcbiAgICAgICAgaGlkZTogb3B0aW9ucy5kZWxheVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXREZWxlZ2F0ZU9wdGlvbnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgID0ge31cbiAgICB2YXIgZGVmYXVsdHMgPSB0aGlzLmdldERlZmF1bHRzKClcblxuICAgIHRoaXMuX29wdGlvbnMgJiYgJC5lYWNoKHRoaXMuX29wdGlvbnMsIGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICBpZiAoZGVmYXVsdHNba2V5XSAhPSB2YWx1ZSkgb3B0aW9uc1trZXldID0gdmFsdWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIG9wdGlvbnNcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKG9iaikge1xuICAgIHZhciBzZWxmID0gb2JqIGluc3RhbmNlb2YgdGhpcy5jb25zdHJ1Y3RvciA/XG4gICAgICBvYmogOiAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKHNlbGYgJiYgc2VsZi4kdGlwICYmIHNlbGYuJHRpcC5pcygnOnZpc2libGUnKSkge1xuICAgICAgc2VsZi5ob3ZlclN0YXRlID0gJ2luJ1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFzZWxmKSB7XG4gICAgICBzZWxmID0gbmV3IHRoaXMuY29uc3RydWN0b3Iob2JqLmN1cnJlbnRUYXJnZXQsIHRoaXMuZ2V0RGVsZWdhdGVPcHRpb25zKCkpXG4gICAgICAkKG9iai5jdXJyZW50VGFyZ2V0KS5kYXRhKCdicy4nICsgdGhpcy50eXBlLCBzZWxmKVxuICAgIH1cblxuICAgIGNsZWFyVGltZW91dChzZWxmLnRpbWVvdXQpXG5cbiAgICBzZWxmLmhvdmVyU3RhdGUgPSAnaW4nXG5cbiAgICBpZiAoIXNlbGYub3B0aW9ucy5kZWxheSB8fCAhc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpIHJldHVybiBzZWxmLnNob3coKVxuXG4gICAgc2VsZi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoc2VsZi5ob3ZlclN0YXRlID09ICdpbicpIHNlbGYuc2hvdygpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LnNob3cpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5sZWF2ZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICB2YXIgc2VsZiA9IG9iaiBpbnN0YW5jZW9mIHRoaXMuY29uc3RydWN0b3IgP1xuICAgICAgb2JqIDogJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSlcblxuICAgIGlmICghc2VsZikge1xuICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG9iai5jdXJyZW50VGFyZ2V0LCB0aGlzLmdldERlbGVnYXRlT3B0aW9ucygpKVxuICAgICAgJChvYmouY3VycmVudFRhcmdldCkuZGF0YSgnYnMuJyArIHRoaXMudHlwZSwgc2VsZilcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQoc2VsZi50aW1lb3V0KVxuXG4gICAgc2VsZi5ob3ZlclN0YXRlID0gJ291dCdcblxuICAgIGlmICghc2VsZi5vcHRpb25zLmRlbGF5IHx8ICFzZWxmLm9wdGlvbnMuZGVsYXkuaGlkZSkgcmV0dXJuIHNlbGYuaGlkZSgpXG5cbiAgICBzZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChzZWxmLmhvdmVyU3RhdGUgPT0gJ291dCcpIHNlbGYuaGlkZSgpXG4gICAgfSwgc2VsZi5vcHRpb25zLmRlbGF5LmhpZGUpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlID0gJC5FdmVudCgnc2hvdy5icy4nICsgdGhpcy50eXBlKVxuXG4gICAgaWYgKHRoaXMuaGFzQ29udGVudCgpICYmIHRoaXMuZW5hYmxlZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICAgIHZhciBpbkRvbSA9ICQuY29udGFpbnModGhpcy4kZWxlbWVudFswXS5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgdGhpcy4kZWxlbWVudFswXSlcbiAgICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpIHx8ICFpbkRvbSkgcmV0dXJuXG4gICAgICB2YXIgdGhhdCA9IHRoaXNcblxuICAgICAgdmFyICR0aXAgPSB0aGlzLnRpcCgpXG5cbiAgICAgIHZhciB0aXBJZCA9IHRoaXMuZ2V0VUlEKHRoaXMudHlwZSlcblxuICAgICAgdGhpcy5zZXRDb250ZW50KClcbiAgICAgICR0aXAuYXR0cignaWQnLCB0aXBJZClcbiAgICAgIHRoaXMuJGVsZW1lbnQuYXR0cignYXJpYS1kZXNjcmliZWRieScsIHRpcElkKVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmFuaW1hdGlvbikgJHRpcC5hZGRDbGFzcygnZmFkZScpXG5cbiAgICAgIHZhciBwbGFjZW1lbnQgPSB0eXBlb2YgdGhpcy5vcHRpb25zLnBsYWNlbWVudCA9PSAnZnVuY3Rpb24nID9cbiAgICAgICAgdGhpcy5vcHRpb25zLnBsYWNlbWVudC5jYWxsKHRoaXMsICR0aXBbMF0sIHRoaXMuJGVsZW1lbnRbMF0pIDpcbiAgICAgICAgdGhpcy5vcHRpb25zLnBsYWNlbWVudFxuXG4gICAgICB2YXIgYXV0b1Rva2VuID0gL1xccz9hdXRvP1xccz8vaVxuICAgICAgdmFyIGF1dG9QbGFjZSA9IGF1dG9Ub2tlbi50ZXN0KHBsYWNlbWVudClcbiAgICAgIGlmIChhdXRvUGxhY2UpIHBsYWNlbWVudCA9IHBsYWNlbWVudC5yZXBsYWNlKGF1dG9Ub2tlbiwgJycpIHx8ICd0b3AnXG5cbiAgICAgICR0aXBcbiAgICAgICAgLmRldGFjaCgpXG4gICAgICAgIC5jc3MoeyB0b3A6IDAsIGxlZnQ6IDAsIGRpc3BsYXk6ICdibG9jaycgfSlcbiAgICAgICAgLmFkZENsYXNzKHBsYWNlbWVudClcbiAgICAgICAgLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHRoaXMpXG5cbiAgICAgIHRoaXMub3B0aW9ucy5jb250YWluZXIgPyAkdGlwLmFwcGVuZFRvKHRoaXMub3B0aW9ucy5jb250YWluZXIpIDogJHRpcC5pbnNlcnRBZnRlcih0aGlzLiRlbGVtZW50KVxuXG4gICAgICB2YXIgcG9zICAgICAgICAgID0gdGhpcy5nZXRQb3NpdGlvbigpXG4gICAgICB2YXIgYWN0dWFsV2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgICAgdmFyIGFjdHVhbEhlaWdodCA9ICR0aXBbMF0ub2Zmc2V0SGVpZ2h0XG5cbiAgICAgIGlmIChhdXRvUGxhY2UpIHtcbiAgICAgICAgdmFyIG9yZ1BsYWNlbWVudCA9IHBsYWNlbWVudFxuICAgICAgICB2YXIgJGNvbnRhaW5lciAgID0gdGhpcy5vcHRpb25zLmNvbnRhaW5lciA/ICQodGhpcy5vcHRpb25zLmNvbnRhaW5lcikgOiB0aGlzLiRlbGVtZW50LnBhcmVudCgpXG4gICAgICAgIHZhciBjb250YWluZXJEaW0gPSB0aGlzLmdldFBvc2l0aW9uKCRjb250YWluZXIpXG5cbiAgICAgICAgcGxhY2VtZW50ID0gcGxhY2VtZW50ID09ICdib3R0b20nICYmIHBvcy5ib3R0b20gKyBhY3R1YWxIZWlnaHQgPiBjb250YWluZXJEaW0uYm90dG9tID8gJ3RvcCcgICAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQgPT0gJ3RvcCcgICAgJiYgcG9zLnRvcCAgICAtIGFjdHVhbEhlaWdodCA8IGNvbnRhaW5lckRpbS50b3AgICAgPyAnYm90dG9tJyA6XG4gICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudCA9PSAncmlnaHQnICAmJiBwb3MucmlnaHQgICsgYWN0dWFsV2lkdGggID4gY29udGFpbmVyRGltLndpZHRoICA/ICdsZWZ0JyAgIDpcbiAgICAgICAgICAgICAgICAgICAgcGxhY2VtZW50ID09ICdsZWZ0JyAgICYmIHBvcy5sZWZ0ICAgLSBhY3R1YWxXaWR0aCAgPCBjb250YWluZXJEaW0ubGVmdCAgID8gJ3JpZ2h0JyAgOlxuICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnRcblxuICAgICAgICAkdGlwXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKG9yZ1BsYWNlbWVudClcbiAgICAgICAgICAuYWRkQ2xhc3MocGxhY2VtZW50KVxuICAgICAgfVxuXG4gICAgICB2YXIgY2FsY3VsYXRlZE9mZnNldCA9IHRoaXMuZ2V0Q2FsY3VsYXRlZE9mZnNldChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodClcblxuICAgICAgdGhpcy5hcHBseVBsYWNlbWVudChjYWxjdWxhdGVkT2Zmc2V0LCBwbGFjZW1lbnQpXG5cbiAgICAgIHZhciBjb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByZXZIb3ZlclN0YXRlID0gdGhhdC5ob3ZlclN0YXRlXG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignc2hvd24uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgICAgdGhhdC5ob3ZlclN0YXRlID0gbnVsbFxuXG4gICAgICAgIGlmIChwcmV2SG92ZXJTdGF0ZSA9PSAnb3V0JykgdGhhdC5sZWF2ZSh0aGF0KVxuICAgICAgfVxuXG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiR0aXAuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICAgICR0aXBcbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBjb21wbGV0ZSlcbiAgICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVG9vbHRpcC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNvbXBsZXRlKClcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5hcHBseVBsYWNlbWVudCA9IGZ1bmN0aW9uIChvZmZzZXQsIHBsYWNlbWVudCkge1xuICAgIHZhciAkdGlwICAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIHdpZHRoICA9ICR0aXBbMF0ub2Zmc2V0V2lkdGhcbiAgICB2YXIgaGVpZ2h0ID0gJHRpcFswXS5vZmZzZXRIZWlnaHRcblxuICAgIC8vIG1hbnVhbGx5IHJlYWQgbWFyZ2lucyBiZWNhdXNlIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBpbmNsdWRlcyBkaWZmZXJlbmNlXG4gICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlSW50KCR0aXAuY3NzKCdtYXJnaW4tdG9wJyksIDEwKVxuICAgIHZhciBtYXJnaW5MZWZ0ID0gcGFyc2VJbnQoJHRpcC5jc3MoJ21hcmdpbi1sZWZ0JyksIDEwKVxuXG4gICAgLy8gd2UgbXVzdCBjaGVjayBmb3IgTmFOIGZvciBpZSA4LzlcbiAgICBpZiAoaXNOYU4obWFyZ2luVG9wKSkgIG1hcmdpblRvcCAgPSAwXG4gICAgaWYgKGlzTmFOKG1hcmdpbkxlZnQpKSBtYXJnaW5MZWZ0ID0gMFxuXG4gICAgb2Zmc2V0LnRvcCAgPSBvZmZzZXQudG9wICArIG1hcmdpblRvcFxuICAgIG9mZnNldC5sZWZ0ID0gb2Zmc2V0LmxlZnQgKyBtYXJnaW5MZWZ0XG5cbiAgICAvLyAkLmZuLm9mZnNldCBkb2Vzbid0IHJvdW5kIHBpeGVsIHZhbHVlc1xuICAgIC8vIHNvIHdlIHVzZSBzZXRPZmZzZXQgZGlyZWN0bHkgd2l0aCBvdXIgb3duIGZ1bmN0aW9uIEItMFxuICAgICQub2Zmc2V0LnNldE9mZnNldCgkdGlwWzBdLCAkLmV4dGVuZCh7XG4gICAgICB1c2luZzogZnVuY3Rpb24gKHByb3BzKSB7XG4gICAgICAgICR0aXAuY3NzKHtcbiAgICAgICAgICB0b3A6IE1hdGgucm91bmQocHJvcHMudG9wKSxcbiAgICAgICAgICBsZWZ0OiBNYXRoLnJvdW5kKHByb3BzLmxlZnQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSwgb2Zmc2V0KSwgMClcblxuICAgICR0aXAuYWRkQ2xhc3MoJ2luJylcblxuICAgIC8vIGNoZWNrIHRvIHNlZSBpZiBwbGFjaW5nIHRpcCBpbiBuZXcgb2Zmc2V0IGNhdXNlZCB0aGUgdGlwIHRvIHJlc2l6ZSBpdHNlbGZcbiAgICB2YXIgYWN0dWFsV2lkdGggID0gJHRpcFswXS5vZmZzZXRXaWR0aFxuICAgIHZhciBhY3R1YWxIZWlnaHQgPSAkdGlwWzBdLm9mZnNldEhlaWdodFxuXG4gICAgaWYgKHBsYWNlbWVudCA9PSAndG9wJyAmJiBhY3R1YWxIZWlnaHQgIT0gaGVpZ2h0KSB7XG4gICAgICBvZmZzZXQudG9wID0gb2Zmc2V0LnRvcCArIGhlaWdodCAtIGFjdHVhbEhlaWdodFxuICAgIH1cblxuICAgIHZhciBkZWx0YSA9IHRoaXMuZ2V0Vmlld3BvcnRBZGp1c3RlZERlbHRhKHBsYWNlbWVudCwgb2Zmc2V0LCBhY3R1YWxXaWR0aCwgYWN0dWFsSGVpZ2h0KVxuXG4gICAgaWYgKGRlbHRhLmxlZnQpIG9mZnNldC5sZWZ0ICs9IGRlbHRhLmxlZnRcbiAgICBlbHNlIG9mZnNldC50b3AgKz0gZGVsdGEudG9wXG5cbiAgICB2YXIgaXNWZXJ0aWNhbCAgICAgICAgICA9IC90b3B8Ym90dG9tLy50ZXN0KHBsYWNlbWVudClcbiAgICB2YXIgYXJyb3dEZWx0YSAgICAgICAgICA9IGlzVmVydGljYWwgPyBkZWx0YS5sZWZ0ICogMiAtIHdpZHRoICsgYWN0dWFsV2lkdGggOiBkZWx0YS50b3AgKiAyIC0gaGVpZ2h0ICsgYWN0dWFsSGVpZ2h0XG4gICAgdmFyIGFycm93T2Zmc2V0UG9zaXRpb24gPSBpc1ZlcnRpY2FsID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnXG5cbiAgICAkdGlwLm9mZnNldChvZmZzZXQpXG4gICAgdGhpcy5yZXBsYWNlQXJyb3coYXJyb3dEZWx0YSwgJHRpcFswXVthcnJvd09mZnNldFBvc2l0aW9uXSwgaXNWZXJ0aWNhbClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnJlcGxhY2VBcnJvdyA9IGZ1bmN0aW9uIChkZWx0YSwgZGltZW5zaW9uLCBpc0hvcml6b250YWwpIHtcbiAgICB0aGlzLmFycm93KClcbiAgICAgIC5jc3MoaXNIb3Jpem9udGFsID8gJ2xlZnQnIDogJ3RvcCcsIDUwICogKDEgLSBkZWx0YSAvIGRpbWVuc2lvbikgKyAnJScpXG4gICAgICAuY3NzKGlzSG9yaXpvbnRhbCA/ICd0b3AnIDogJ2xlZnQnLCAnJylcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLnNldENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyICR0aXAgID0gdGhpcy50aXAoKVxuICAgIHZhciB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKVxuXG4gICAgJHRpcC5maW5kKCcudG9vbHRpcC1pbm5lcicpW3RoaXMub3B0aW9ucy5odG1sID8gJ2h0bWwnIDogJ3RleHQnXSh0aXRsZSlcbiAgICAkdGlwLnJlbW92ZUNsYXNzKCdmYWRlIGluIHRvcCBib3R0b20gbGVmdCByaWdodCcpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyICR0aXAgPSB0aGlzLnRpcCgpXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdoaWRlLmJzLicgKyB0aGlzLnR5cGUpXG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgIGlmICh0aGF0LmhvdmVyU3RhdGUgIT0gJ2luJykgJHRpcC5kZXRhY2goKVxuICAgICAgdGhhdC4kZWxlbWVudFxuICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1kZXNjcmliZWRieScpXG4gICAgICAgIC50cmlnZ2VyKCdoaWRkZW4uYnMuJyArIHRoYXQudHlwZSlcbiAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKClcbiAgICB9XG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmIChlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm5cblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2luJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJHRpcC5oYXNDbGFzcygnZmFkZScpID9cbiAgICAgICR0aXBcbiAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUb29sdGlwLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIGNvbXBsZXRlKClcblxuICAgIHRoaXMuaG92ZXJTdGF0ZSA9IG51bGxcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5maXhUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgaWYgKCRlLmF0dHIoJ3RpdGxlJykgfHwgdHlwZW9mICgkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJykpICE9ICdzdHJpbmcnKSB7XG4gICAgICAkZS5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywgJGUuYXR0cigndGl0bGUnKSB8fCAnJykuYXR0cigndGl0bGUnLCAnJylcbiAgICB9XG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5oYXNDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmdldFRpdGxlKClcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24gKCRlbGVtZW50KSB7XG4gICAgJGVsZW1lbnQgICA9ICRlbGVtZW50IHx8IHRoaXMuJGVsZW1lbnRcblxuICAgIHZhciBlbCAgICAgPSAkZWxlbWVudFswXVxuICAgIHZhciBpc0JvZHkgPSBlbC50YWdOYW1lID09ICdCT0RZJ1xuXG4gICAgdmFyIGVsUmVjdCAgICA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgaWYgKGVsUmVjdC53aWR0aCA9PSBudWxsKSB7XG4gICAgICAvLyB3aWR0aCBhbmQgaGVpZ2h0IGFyZSBtaXNzaW5nIGluIElFOCwgc28gY29tcHV0ZSB0aGVtIG1hbnVhbGx5OyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2lzc3Vlcy8xNDA5M1xuICAgICAgZWxSZWN0ID0gJC5leHRlbmQoe30sIGVsUmVjdCwgeyB3aWR0aDogZWxSZWN0LnJpZ2h0IC0gZWxSZWN0LmxlZnQsIGhlaWdodDogZWxSZWN0LmJvdHRvbSAtIGVsUmVjdC50b3AgfSlcbiAgICB9XG4gICAgdmFyIGVsT2Zmc2V0ICA9IGlzQm9keSA/IHsgdG9wOiAwLCBsZWZ0OiAwIH0gOiAkZWxlbWVudC5vZmZzZXQoKVxuICAgIHZhciBzY3JvbGwgICAgPSB7IHNjcm9sbDogaXNCb2R5ID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCB8fCBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA6ICRlbGVtZW50LnNjcm9sbFRvcCgpIH1cbiAgICB2YXIgb3V0ZXJEaW1zID0gaXNCb2R5ID8geyB3aWR0aDogJCh3aW5kb3cpLndpZHRoKCksIGhlaWdodDogJCh3aW5kb3cpLmhlaWdodCgpIH0gOiBudWxsXG5cbiAgICByZXR1cm4gJC5leHRlbmQoe30sIGVsUmVjdCwgc2Nyb2xsLCBvdXRlckRpbXMsIGVsT2Zmc2V0KVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZ2V0Q2FsY3VsYXRlZE9mZnNldCA9IGZ1bmN0aW9uIChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodCkge1xuICAgIHJldHVybiBwbGFjZW1lbnQgPT0gJ2JvdHRvbScgPyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQsICAgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggLyAyIC0gYWN0dWFsV2lkdGggLyAyICB9IDpcbiAgICAgICAgICAgcGxhY2VtZW50ID09ICd0b3AnICAgID8geyB0b3A6IHBvcy50b3AgLSBhY3R1YWxIZWlnaHQsIGxlZnQ6IHBvcy5sZWZ0ICsgcG9zLndpZHRoIC8gMiAtIGFjdHVhbFdpZHRoIC8gMiAgfSA6XG4gICAgICAgICAgIHBsYWNlbWVudCA9PSAnbGVmdCcgICA/IHsgdG9wOiBwb3MudG9wICsgcG9zLmhlaWdodCAvIDIgLSBhY3R1YWxIZWlnaHQgLyAyLCBsZWZ0OiBwb3MubGVmdCAtIGFjdHVhbFdpZHRoIH0gOlxuICAgICAgICAvKiBwbGFjZW1lbnQgPT0gJ3JpZ2h0JyAqLyB7IHRvcDogcG9zLnRvcCArIHBvcy5oZWlnaHQgLyAyIC0gYWN0dWFsSGVpZ2h0IC8gMiwgbGVmdDogcG9zLmxlZnQgKyBwb3Mud2lkdGggICB9XG5cbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFZpZXdwb3J0QWRqdXN0ZWREZWx0YSA9IGZ1bmN0aW9uIChwbGFjZW1lbnQsIHBvcywgYWN0dWFsV2lkdGgsIGFjdHVhbEhlaWdodCkge1xuICAgIHZhciBkZWx0YSA9IHsgdG9wOiAwLCBsZWZ0OiAwIH1cbiAgICBpZiAoIXRoaXMuJHZpZXdwb3J0KSByZXR1cm4gZGVsdGFcblxuICAgIHZhciB2aWV3cG9ydFBhZGRpbmcgPSB0aGlzLm9wdGlvbnMudmlld3BvcnQgJiYgdGhpcy5vcHRpb25zLnZpZXdwb3J0LnBhZGRpbmcgfHwgMFxuICAgIHZhciB2aWV3cG9ydERpbWVuc2lvbnMgPSB0aGlzLmdldFBvc2l0aW9uKHRoaXMuJHZpZXdwb3J0KVxuXG4gICAgaWYgKC9yaWdodHxsZWZ0Ly50ZXN0KHBsYWNlbWVudCkpIHtcbiAgICAgIHZhciB0b3BFZGdlT2Zmc2V0ICAgID0gcG9zLnRvcCAtIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGxcbiAgICAgIHZhciBib3R0b21FZGdlT2Zmc2V0ID0gcG9zLnRvcCArIHZpZXdwb3J0UGFkZGluZyAtIHZpZXdwb3J0RGltZW5zaW9ucy5zY3JvbGwgKyBhY3R1YWxIZWlnaHRcbiAgICAgIGlmICh0b3BFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLnRvcCkgeyAvLyB0b3Agb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEudG9wID0gdmlld3BvcnREaW1lbnNpb25zLnRvcCAtIHRvcEVkZ2VPZmZzZXRcbiAgICAgIH0gZWxzZSBpZiAoYm90dG9tRWRnZU9mZnNldCA+IHZpZXdwb3J0RGltZW5zaW9ucy50b3AgKyB2aWV3cG9ydERpbWVuc2lvbnMuaGVpZ2h0KSB7IC8vIGJvdHRvbSBvdmVyZmxvd1xuICAgICAgICBkZWx0YS50b3AgPSB2aWV3cG9ydERpbWVuc2lvbnMudG9wICsgdmlld3BvcnREaW1lbnNpb25zLmhlaWdodCAtIGJvdHRvbUVkZ2VPZmZzZXRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGxlZnRFZGdlT2Zmc2V0ICA9IHBvcy5sZWZ0IC0gdmlld3BvcnRQYWRkaW5nXG4gICAgICB2YXIgcmlnaHRFZGdlT2Zmc2V0ID0gcG9zLmxlZnQgKyB2aWV3cG9ydFBhZGRpbmcgKyBhY3R1YWxXaWR0aFxuICAgICAgaWYgKGxlZnRFZGdlT2Zmc2V0IDwgdmlld3BvcnREaW1lbnNpb25zLmxlZnQpIHsgLy8gbGVmdCBvdmVyZmxvd1xuICAgICAgICBkZWx0YS5sZWZ0ID0gdmlld3BvcnREaW1lbnNpb25zLmxlZnQgLSBsZWZ0RWRnZU9mZnNldFxuICAgICAgfSBlbHNlIGlmIChyaWdodEVkZ2VPZmZzZXQgPiB2aWV3cG9ydERpbWVuc2lvbnMud2lkdGgpIHsgLy8gcmlnaHQgb3ZlcmZsb3dcbiAgICAgICAgZGVsdGEubGVmdCA9IHZpZXdwb3J0RGltZW5zaW9ucy5sZWZ0ICsgdmlld3BvcnREaW1lbnNpb25zLndpZHRoIC0gcmlnaHRFZGdlT2Zmc2V0XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRlbHRhXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5nZXRUaXRsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdGl0bGVcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIG8gID0gdGhpcy5vcHRpb25zXG5cbiAgICB0aXRsZSA9ICRlLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnKVxuICAgICAgfHwgKHR5cGVvZiBvLnRpdGxlID09ICdmdW5jdGlvbicgPyBvLnRpdGxlLmNhbGwoJGVbMF0pIDogIG8udGl0bGUpXG5cbiAgICByZXR1cm4gdGl0bGVcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmdldFVJRCA9IGZ1bmN0aW9uIChwcmVmaXgpIHtcbiAgICBkbyBwcmVmaXggKz0gfn4oTWF0aC5yYW5kb20oKSAqIDEwMDAwMDApXG4gICAgd2hpbGUgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHByZWZpeCkpXG4gICAgcmV0dXJuIHByZWZpeFxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy4kdGlwID0gdGhpcy4kdGlwIHx8ICQodGhpcy5vcHRpb25zLnRlbXBsYXRlKSlcbiAgfVxuXG4gIFRvb2x0aXAucHJvdG90eXBlLmFycm93ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy4kYXJyb3cgPSB0aGlzLiRhcnJvdyB8fCB0aGlzLnRpcCgpLmZpbmQoJy50b29sdGlwLWFycm93JykpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbmFibGVkID0gdHJ1ZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgVG9vbHRpcC5wcm90b3R5cGUudG9nZ2xlRW5hYmxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVuYWJsZWQgPSAhdGhpcy5lbmFibGVkXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS50b2dnbGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgIGlmIChlKSB7XG4gICAgICBzZWxmID0gJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUpXG4gICAgICBpZiAoIXNlbGYpIHtcbiAgICAgICAgc2VsZiA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGUuY3VycmVudFRhcmdldCwgdGhpcy5nZXREZWxlZ2F0ZU9wdGlvbnMoKSlcbiAgICAgICAgJChlLmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2JzLicgKyB0aGlzLnR5cGUsIHNlbGYpXG4gICAgICB9XG4gICAgfVxuXG4gICAgc2VsZi50aXAoKS5oYXNDbGFzcygnaW4nKSA/IHNlbGYubGVhdmUoc2VsZikgOiBzZWxmLmVudGVyKHNlbGYpXG4gIH1cblxuICBUb29sdGlwLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpXG4gICAgdGhpcy5oaWRlKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub2ZmKCcuJyArIHRoYXQudHlwZSkucmVtb3ZlRGF0YSgnYnMuJyArIHRoYXQudHlwZSlcbiAgICB9KVxuICB9XG5cblxuICAvLyBUT09MVElQIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICAgPSAkdGhpcy5kYXRhKCdicy50b29sdGlwJylcbiAgICAgIHZhciBvcHRpb25zICA9IHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uXG4gICAgICB2YXIgc2VsZWN0b3IgPSBvcHRpb25zICYmIG9wdGlvbnMuc2VsZWN0b3JcblxuICAgICAgaWYgKCFkYXRhICYmIG9wdGlvbiA9PSAnZGVzdHJveScpIHJldHVyblxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMudG9vbHRpcCcsIChkYXRhID0ge30pKVxuICAgICAgICBpZiAoIWRhdGFbc2VsZWN0b3JdKSBkYXRhW3NlbGVjdG9yXSA9IG5ldyBUb29sdGlwKHRoaXMsIG9wdGlvbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRvb2x0aXAnLCAoZGF0YSA9IG5ldyBUb29sdGlwKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi50b29sdGlwXG5cbiAgJC5mbi50b29sdGlwICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udG9vbHRpcC5Db25zdHJ1Y3RvciA9IFRvb2x0aXBcblxuXG4gIC8vIFRPT0xUSVAgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT09PVxuXG4gICQuZm4udG9vbHRpcC5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4udG9vbHRpcCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxufShqUXVlcnkpO1xuXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogcG9wb3Zlci5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3BvcG92ZXJzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gUE9QT1ZFUiBQVUJMSUMgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIFBvcG92ZXIgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMuaW5pdCgncG9wb3ZlcicsIGVsZW1lbnQsIG9wdGlvbnMpXG4gIH1cblxuICBpZiAoISQuZm4udG9vbHRpcCkgdGhyb3cgbmV3IEVycm9yKCdQb3BvdmVyIHJlcXVpcmVzIHRvb2x0aXAuanMnKVxuXG4gIFBvcG92ZXIuVkVSU0lPTiAgPSAnMy4zLjEnXG5cbiAgUG9wb3Zlci5ERUZBVUxUUyA9ICQuZXh0ZW5kKHt9LCAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IuREVGQVVMVFMsIHtcbiAgICBwbGFjZW1lbnQ6ICdyaWdodCcsXG4gICAgdHJpZ2dlcjogJ2NsaWNrJyxcbiAgICBjb250ZW50OiAnJyxcbiAgICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwiYXJyb3dcIj48L2Rpdj48aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+PC9oMz48ZGl2IGNsYXNzPVwicG9wb3Zlci1jb250ZW50XCI+PC9kaXY+PC9kaXY+J1xuICB9KVxuXG5cbiAgLy8gTk9URTogUE9QT1ZFUiBFWFRFTkRTIHRvb2x0aXAuanNcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuICBQb3BvdmVyLnByb3RvdHlwZSA9ICQuZXh0ZW5kKHt9LCAkLmZuLnRvb2x0aXAuQ29uc3RydWN0b3IucHJvdG90eXBlKVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmdldERlZmF1bHRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBQb3BvdmVyLkRFRkFVTFRTXG4gIH1cblxuICBQb3BvdmVyLnByb3RvdHlwZS5zZXRDb250ZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGlwICAgID0gdGhpcy50aXAoKVxuICAgIHZhciB0aXRsZSAgID0gdGhpcy5nZXRUaXRsZSgpXG4gICAgdmFyIGNvbnRlbnQgPSB0aGlzLmdldENvbnRlbnQoKVxuXG4gICAgJHRpcC5maW5kKCcucG9wb3Zlci10aXRsZScpW3RoaXMub3B0aW9ucy5odG1sID8gJ2h0bWwnIDogJ3RleHQnXSh0aXRsZSlcbiAgICAkdGlwLmZpbmQoJy5wb3BvdmVyLWNvbnRlbnQnKS5jaGlsZHJlbigpLmRldGFjaCgpLmVuZCgpWyAvLyB3ZSB1c2UgYXBwZW5kIGZvciBodG1sIG9iamVjdHMgdG8gbWFpbnRhaW4ganMgZXZlbnRzXG4gICAgICB0aGlzLm9wdGlvbnMuaHRtbCA/ICh0eXBlb2YgY29udGVudCA9PSAnc3RyaW5nJyA/ICdodG1sJyA6ICdhcHBlbmQnKSA6ICd0ZXh0J1xuICAgIF0oY29udGVudClcblxuICAgICR0aXAucmVtb3ZlQ2xhc3MoJ2ZhZGUgdG9wIGJvdHRvbSBsZWZ0IHJpZ2h0IGluJylcblxuICAgIC8vIElFOCBkb2Vzbid0IGFjY2VwdCBoaWRpbmcgdmlhIHRoZSBgOmVtcHR5YCBwc2V1ZG8gc2VsZWN0b3IsIHdlIGhhdmUgdG8gZG9cbiAgICAvLyB0aGlzIG1hbnVhbGx5IGJ5IGNoZWNraW5nIHRoZSBjb250ZW50cy5cbiAgICBpZiAoISR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKS5odG1sKCkpICR0aXAuZmluZCgnLnBvcG92ZXItdGl0bGUnKS5oaWRlKClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmhhc0NvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGl0bGUoKSB8fCB0aGlzLmdldENvbnRlbnQoKVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUuZ2V0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgJGUgPSB0aGlzLiRlbGVtZW50XG4gICAgdmFyIG8gID0gdGhpcy5vcHRpb25zXG5cbiAgICByZXR1cm4gJGUuYXR0cignZGF0YS1jb250ZW50JylcbiAgICAgIHx8ICh0eXBlb2Ygby5jb250ZW50ID09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgby5jb250ZW50LmNhbGwoJGVbMF0pIDpcbiAgICAgICAgICAgIG8uY29udGVudClcbiAgfVxuXG4gIFBvcG92ZXIucHJvdG90eXBlLmFycm93ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy4kYXJyb3cgPSB0aGlzLiRhcnJvdyB8fCB0aGlzLnRpcCgpLmZpbmQoJy5hcnJvdycpKVxuICB9XG5cbiAgUG9wb3Zlci5wcm90b3R5cGUudGlwID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy4kdGlwKSB0aGlzLiR0aXAgPSAkKHRoaXMub3B0aW9ucy50ZW1wbGF0ZSlcbiAgICByZXR1cm4gdGhpcy4kdGlwXG4gIH1cblxuXG4gIC8vIFBPUE9WRVIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgICA9ICQodGhpcylcbiAgICAgIHZhciBkYXRhICAgICA9ICR0aGlzLmRhdGEoJ2JzLnBvcG92ZXInKVxuICAgICAgdmFyIG9wdGlvbnMgID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cbiAgICAgIHZhciBzZWxlY3RvciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5zZWxlY3RvclxuXG4gICAgICBpZiAoIWRhdGEgJiYgb3B0aW9uID09ICdkZXN0cm95JykgcmV0dXJuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5wb3BvdmVyJywgKGRhdGEgPSB7fSkpXG4gICAgICAgIGlmICghZGF0YVtzZWxlY3Rvcl0pIGRhdGFbc2VsZWN0b3JdID0gbmV3IFBvcG92ZXIodGhpcywgb3B0aW9ucylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghZGF0YSkgJHRoaXMuZGF0YSgnYnMucG9wb3ZlcicsIChkYXRhID0gbmV3IFBvcG92ZXIodGhpcywgb3B0aW9ucykpKVxuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnBvcG92ZXJcblxuICAkLmZuLnBvcG92ZXIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5wb3BvdmVyLkNvbnN0cnVjdG9yID0gUG9wb3ZlclxuXG5cbiAgLy8gUE9QT1ZFUiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09XG5cbiAgJC5mbi5wb3BvdmVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5wb3BvdmVyID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBzY3JvbGxzcHkuanMgdjMuMy4xXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNzY3JvbGxzcHlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNCBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBTQ1JPTExTUFkgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFNjcm9sbFNweShlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdmFyIHByb2Nlc3MgID0gJC5wcm94eSh0aGlzLnByb2Nlc3MsIHRoaXMpXG5cbiAgICB0aGlzLiRib2R5ICAgICAgICAgID0gJCgnYm9keScpXG4gICAgdGhpcy4kc2Nyb2xsRWxlbWVudCA9ICQoZWxlbWVudCkuaXMoJ2JvZHknKSA/ICQod2luZG93KSA6ICQoZWxlbWVudClcbiAgICB0aGlzLm9wdGlvbnMgICAgICAgID0gJC5leHRlbmQoe30sIFNjcm9sbFNweS5ERUZBVUxUUywgb3B0aW9ucylcbiAgICB0aGlzLnNlbGVjdG9yICAgICAgID0gKHRoaXMub3B0aW9ucy50YXJnZXQgfHwgJycpICsgJyAubmF2IGxpID4gYSdcbiAgICB0aGlzLm9mZnNldHMgICAgICAgID0gW11cbiAgICB0aGlzLnRhcmdldHMgICAgICAgID0gW11cbiAgICB0aGlzLmFjdGl2ZVRhcmdldCAgID0gbnVsbFxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ICAgPSAwXG5cbiAgICB0aGlzLiRzY3JvbGxFbGVtZW50Lm9uKCdzY3JvbGwuYnMuc2Nyb2xsc3B5JywgcHJvY2VzcylcbiAgICB0aGlzLnJlZnJlc2goKVxuICAgIHRoaXMucHJvY2VzcygpXG4gIH1cblxuICBTY3JvbGxTcHkuVkVSU0lPTiAgPSAnMy4zLjEnXG5cbiAgU2Nyb2xsU3B5LkRFRkFVTFRTID0ge1xuICAgIG9mZnNldDogMTBcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuZ2V0U2Nyb2xsSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLiRzY3JvbGxFbGVtZW50WzBdLnNjcm9sbEhlaWdodCB8fCBNYXRoLm1heCh0aGlzLiRib2R5WzBdLnNjcm9sbEhlaWdodCwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodClcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb2Zmc2V0TWV0aG9kID0gJ29mZnNldCdcbiAgICB2YXIgb2Zmc2V0QmFzZSAgID0gMFxuXG4gICAgaWYgKCEkLmlzV2luZG93KHRoaXMuJHNjcm9sbEVsZW1lbnRbMF0pKSB7XG4gICAgICBvZmZzZXRNZXRob2QgPSAncG9zaXRpb24nXG4gICAgICBvZmZzZXRCYXNlICAgPSB0aGlzLiRzY3JvbGxFbGVtZW50LnNjcm9sbFRvcCgpXG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXRzID0gW11cbiAgICB0aGlzLnRhcmdldHMgPSBbXVxuICAgIHRoaXMuc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgdmFyIHNlbGYgICAgID0gdGhpc1xuXG4gICAgdGhpcy4kYm9keVxuICAgICAgLmZpbmQodGhpcy5zZWxlY3RvcilcbiAgICAgIC5tYXAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgJGVsICAgPSAkKHRoaXMpXG4gICAgICAgIHZhciBocmVmICA9ICRlbC5kYXRhKCd0YXJnZXQnKSB8fCAkZWwuYXR0cignaHJlZicpXG4gICAgICAgIHZhciAkaHJlZiA9IC9eIy4vLnRlc3QoaHJlZikgJiYgJChocmVmKVxuXG4gICAgICAgIHJldHVybiAoJGhyZWZcbiAgICAgICAgICAmJiAkaHJlZi5sZW5ndGhcbiAgICAgICAgICAmJiAkaHJlZi5pcygnOnZpc2libGUnKVxuICAgICAgICAgICYmIFtbJGhyZWZbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsIGhyZWZdXSkgfHwgbnVsbFxuICAgICAgfSlcbiAgICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhWzBdIC0gYlswXSB9KVxuICAgICAgLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9mZnNldHMucHVzaCh0aGlzWzBdKVxuICAgICAgICBzZWxmLnRhcmdldHMucHVzaCh0aGlzWzFdKVxuICAgICAgfSlcbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kc2Nyb2xsRWxlbWVudC5zY3JvbGxUb3AoKSArIHRoaXMub3B0aW9ucy5vZmZzZXRcbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gdGhpcy5nZXRTY3JvbGxIZWlnaHQoKVxuICAgIHZhciBtYXhTY3JvbGwgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0ICsgc2Nyb2xsSGVpZ2h0IC0gdGhpcy4kc2Nyb2xsRWxlbWVudC5oZWlnaHQoKVxuICAgIHZhciBvZmZzZXRzICAgICAgPSB0aGlzLm9mZnNldHNcbiAgICB2YXIgdGFyZ2V0cyAgICAgID0gdGhpcy50YXJnZXRzXG4gICAgdmFyIGFjdGl2ZVRhcmdldCA9IHRoaXMuYWN0aXZlVGFyZ2V0XG4gICAgdmFyIGlcblxuICAgIGlmICh0aGlzLnNjcm9sbEhlaWdodCAhPSBzY3JvbGxIZWlnaHQpIHtcbiAgICAgIHRoaXMucmVmcmVzaCgpXG4gICAgfVxuXG4gICAgaWYgKHNjcm9sbFRvcCA+PSBtYXhTY3JvbGwpIHtcbiAgICAgIHJldHVybiBhY3RpdmVUYXJnZXQgIT0gKGkgPSB0YXJnZXRzW3RhcmdldHMubGVuZ3RoIC0gMV0pICYmIHRoaXMuYWN0aXZhdGUoaSlcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IG9mZnNldHNbMF0pIHtcbiAgICAgIHRoaXMuYWN0aXZlVGFyZ2V0ID0gbnVsbFxuICAgICAgcmV0dXJuIHRoaXMuY2xlYXIoKVxuICAgIH1cblxuICAgIGZvciAoaSA9IG9mZnNldHMubGVuZ3RoOyBpLS07KSB7XG4gICAgICBhY3RpdmVUYXJnZXQgIT0gdGFyZ2V0c1tpXVxuICAgICAgICAmJiBzY3JvbGxUb3AgPj0gb2Zmc2V0c1tpXVxuICAgICAgICAmJiAoIW9mZnNldHNbaSArIDFdIHx8IHNjcm9sbFRvcCA8PSBvZmZzZXRzW2kgKyAxXSlcbiAgICAgICAgJiYgdGhpcy5hY3RpdmF0ZSh0YXJnZXRzW2ldKVxuICAgIH1cbiAgfVxuXG4gIFNjcm9sbFNweS5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGhpcy5hY3RpdmVUYXJnZXQgPSB0YXJnZXRcblxuICAgIHRoaXMuY2xlYXIoKVxuXG4gICAgdmFyIHNlbGVjdG9yID0gdGhpcy5zZWxlY3RvciArXG4gICAgICAgICdbZGF0YS10YXJnZXQ9XCInICsgdGFyZ2V0ICsgJ1wiXSwnICtcbiAgICAgICAgdGhpcy5zZWxlY3RvciArICdbaHJlZj1cIicgKyB0YXJnZXQgKyAnXCJdJ1xuXG4gICAgdmFyIGFjdGl2ZSA9ICQoc2VsZWN0b3IpXG4gICAgICAucGFyZW50cygnbGknKVxuICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuXG4gICAgaWYgKGFjdGl2ZS5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICBhY3RpdmUgPSBhY3RpdmVcbiAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgIH1cblxuICAgIGFjdGl2ZS50cmlnZ2VyKCdhY3RpdmF0ZS5icy5zY3JvbGxzcHknKVxuICB9XG5cbiAgU2Nyb2xsU3B5LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKHRoaXMuc2VsZWN0b3IpXG4gICAgICAucGFyZW50c1VudGlsKHRoaXMub3B0aW9ucy50YXJnZXQsICcuYWN0aXZlJylcbiAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgfVxuXG5cbiAgLy8gU0NST0xMU1BZIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIGZ1bmN0aW9uIFBsdWdpbihvcHRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5zY3JvbGxzcHknKVxuICAgICAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvblxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnNjcm9sbHNweScsIChkYXRhID0gbmV3IFNjcm9sbFNweSh0aGlzLCBvcHRpb25zKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4uc2Nyb2xsc3B5XG5cbiAgJC5mbi5zY3JvbGxzcHkgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5zY3JvbGxzcHkuQ29uc3RydWN0b3IgPSBTY3JvbGxTcHlcblxuXG4gIC8vIFNDUk9MTFNQWSBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICAkLmZuLnNjcm9sbHNweS5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4uc2Nyb2xsc3B5ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gU0NST0xMU1BZIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09PT09PVxuXG4gICQod2luZG93KS5vbignbG9hZC5icy5zY3JvbGxzcHkuZGF0YS1hcGknLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtc3B5PVwic2Nyb2xsXCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHNweSA9ICQodGhpcylcbiAgICAgIFBsdWdpbi5jYWxsKCRzcHksICRzcHkuZGF0YSgpKVxuICAgIH0pXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBCb290c3RyYXA6IHRhYi5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI3RhYnNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNCBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBUQUIgQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBUYWIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudClcbiAgfVxuXG4gIFRhYi5WRVJTSU9OID0gJzMuMy4xJ1xuXG4gIFRhYi5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVGFiLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyAgICA9IHRoaXMuZWxlbWVudFxuICAgIHZhciAkdWwgICAgICA9ICR0aGlzLmNsb3Nlc3QoJ3VsOm5vdCguZHJvcGRvd24tbWVudSknKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciAkcHJldmlvdXMgPSAkdWwuZmluZCgnLmFjdGl2ZTpsYXN0IGEnKVxuICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgfSlcbiAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICB9KVxuXG4gICAgJHByZXZpb3VzLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdmFyICR0YXJnZXQgPSAkKHNlbGVjdG9yKVxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGhpcy5jbG9zZXN0KCdsaScpLCAkdWwpXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGFyZ2V0LCAkdGFyZ2V0LnBhcmVudCgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkcHJldmlvdXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICAgIH0pXG4gICAgICAkdGhpcy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ3Nob3duLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgKCgkYWN0aXZlLmxlbmd0aCAmJiAkYWN0aXZlLmhhc0NsYXNzKCdmYWRlJykpIHx8ICEhY29udGFpbmVyLmZpbmQoJz4gLmZhZGUnKS5sZW5ndGgpXG5cbiAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5maW5kKCc+IC5kcm9wZG93bi1tZW51ID4gLmFjdGl2ZScpXG4gICAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZW5kKClcbiAgICAgICAgLmZpbmQoJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScpXG4gICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSlcblxuICAgICAgZWxlbWVudFxuICAgICAgICAuYWRkQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcblxuICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgZWxlbWVudFswXS5vZmZzZXRXaWR0aCAvLyByZWZsb3cgZm9yIHRyYW5zaXRpb25cbiAgICAgICAgZWxlbWVudC5hZGRDbGFzcygnaW4nKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5yZW1vdmVDbGFzcygnZmFkZScpXG4gICAgICB9XG5cbiAgICAgIGlmIChlbGVtZW50LnBhcmVudCgnLmRyb3Bkb3duLW1lbnUnKSkge1xuICAgICAgICBlbGVtZW50XG4gICAgICAgICAgLmNsb3Nlc3QoJ2xpLmRyb3Bkb3duJylcbiAgICAgICAgICAgIC5hZGRDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAuZW5kKClcbiAgICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICAgIH1cblxuICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKVxuICAgIH1cblxuICAgICRhY3RpdmUubGVuZ3RoICYmIHRyYW5zaXRpb24gP1xuICAgICAgJGFjdGl2ZVxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBuZXh0KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoVGFiLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIG5leHQoKVxuXG4gICAgJGFjdGl2ZS5yZW1vdmVDbGFzcygnaW4nKVxuICB9XG5cblxuICAvLyBUQUIgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgID0gJHRoaXMuZGF0YSgnYnMudGFiJylcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy50YWInLCAoZGF0YSA9IG5ldyBUYWIodGhpcykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXSgpXG4gICAgfSlcbiAgfVxuXG4gIHZhciBvbGQgPSAkLmZuLnRhYlxuXG4gICQuZm4udGFiICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4udGFiLkNvbnN0cnVjdG9yID0gVGFiXG5cblxuICAvLyBUQUIgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09XG5cbiAgJC5mbi50YWIubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLnRhYiA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIFRBQiBEQVRBLUFQSVxuICAvLyA9PT09PT09PT09PT1cblxuICB2YXIgY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBQbHVnaW4uY2FsbCgkKHRoaXMpLCAnc2hvdycpXG4gIH1cblxuICAkKGRvY3VtZW50KVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXScsIGNsaWNrSGFuZGxlcilcbiAgICAub24oJ2NsaWNrLmJzLnRhYi5kYXRhLWFwaScsICdbZGF0YS10b2dnbGU9XCJwaWxsXCJdJywgY2xpY2tIYW5kbGVyKVxuXG59KGpRdWVyeSk7XG5cbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBhZmZpeC5qcyB2My4zLjFcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI2FmZml4XG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTQgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gQUZGSVggQ0xBU1MgREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbiAgdmFyIEFmZml4ID0gZnVuY3Rpb24gKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgQWZmaXguREVGQVVMVFMsIG9wdGlvbnMpXG5cbiAgICB0aGlzLiR0YXJnZXQgPSAkKHRoaXMub3B0aW9ucy50YXJnZXQpXG4gICAgICAub24oJ3Njcm9sbC5icy5hZmZpeC5kYXRhLWFwaScsICQucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLCB0aGlzKSlcbiAgICAgIC5vbignY2xpY2suYnMuYWZmaXguZGF0YS1hcGknLCAgJC5wcm94eSh0aGlzLmNoZWNrUG9zaXRpb25XaXRoRXZlbnRMb29wLCB0aGlzKSlcblxuICAgIHRoaXMuJGVsZW1lbnQgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuYWZmaXhlZCAgICAgID1cbiAgICB0aGlzLnVucGluICAgICAgICA9XG4gICAgdGhpcy5waW5uZWRPZmZzZXQgPSBudWxsXG5cbiAgICB0aGlzLmNoZWNrUG9zaXRpb24oKVxuICB9XG5cbiAgQWZmaXguVkVSU0lPTiAgPSAnMy4zLjEnXG5cbiAgQWZmaXguUkVTRVQgICAgPSAnYWZmaXggYWZmaXgtdG9wIGFmZml4LWJvdHRvbSdcblxuICBBZmZpeC5ERUZBVUxUUyA9IHtcbiAgICBvZmZzZXQ6IDAsXG4gICAgdGFyZ2V0OiB3aW5kb3dcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5nZXRTdGF0ZSA9IGZ1bmN0aW9uIChzY3JvbGxIZWlnaHQsIGhlaWdodCwgb2Zmc2V0VG9wLCBvZmZzZXRCb3R0b20pIHtcbiAgICB2YXIgc2Nyb2xsVG9wICAgID0gdGhpcy4kdGFyZ2V0LnNjcm9sbFRvcCgpXG4gICAgdmFyIHBvc2l0aW9uICAgICA9IHRoaXMuJGVsZW1lbnQub2Zmc2V0KClcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpXG5cbiAgICBpZiAob2Zmc2V0VG9wICE9IG51bGwgJiYgdGhpcy5hZmZpeGVkID09ICd0b3AnKSByZXR1cm4gc2Nyb2xsVG9wIDwgb2Zmc2V0VG9wID8gJ3RvcCcgOiBmYWxzZVxuXG4gICAgaWYgKHRoaXMuYWZmaXhlZCA9PSAnYm90dG9tJykge1xuICAgICAgaWYgKG9mZnNldFRvcCAhPSBudWxsKSByZXR1cm4gKHNjcm9sbFRvcCArIHRoaXMudW5waW4gPD0gcG9zaXRpb24udG9wKSA/IGZhbHNlIDogJ2JvdHRvbSdcbiAgICAgIHJldHVybiAoc2Nyb2xsVG9wICsgdGFyZ2V0SGVpZ2h0IDw9IHNjcm9sbEhlaWdodCAtIG9mZnNldEJvdHRvbSkgPyBmYWxzZSA6ICdib3R0b20nXG4gICAgfVxuXG4gICAgdmFyIGluaXRpYWxpemluZyAgID0gdGhpcy5hZmZpeGVkID09IG51bGxcbiAgICB2YXIgY29sbGlkZXJUb3AgICAgPSBpbml0aWFsaXppbmcgPyBzY3JvbGxUb3AgOiBwb3NpdGlvbi50b3BcbiAgICB2YXIgY29sbGlkZXJIZWlnaHQgPSBpbml0aWFsaXppbmcgPyB0YXJnZXRIZWlnaHQgOiBoZWlnaHRcblxuICAgIGlmIChvZmZzZXRUb3AgIT0gbnVsbCAmJiBjb2xsaWRlclRvcCA8PSBvZmZzZXRUb3ApIHJldHVybiAndG9wJ1xuICAgIGlmIChvZmZzZXRCb3R0b20gIT0gbnVsbCAmJiAoY29sbGlkZXJUb3AgKyBjb2xsaWRlckhlaWdodCA+PSBzY3JvbGxIZWlnaHQgLSBvZmZzZXRCb3R0b20pKSByZXR1cm4gJ2JvdHRvbSdcblxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgQWZmaXgucHJvdG90eXBlLmdldFBpbm5lZE9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5waW5uZWRPZmZzZXQpIHJldHVybiB0aGlzLnBpbm5lZE9mZnNldFxuICAgIHRoaXMuJGVsZW1lbnQucmVtb3ZlQ2xhc3MoQWZmaXguUkVTRVQpLmFkZENsYXNzKCdhZmZpeCcpXG4gICAgdmFyIHNjcm9sbFRvcCA9IHRoaXMuJHRhcmdldC5zY3JvbGxUb3AoKVxuICAgIHZhciBwb3NpdGlvbiAgPSB0aGlzLiRlbGVtZW50Lm9mZnNldCgpXG4gICAgcmV0dXJuICh0aGlzLnBpbm5lZE9mZnNldCA9IHBvc2l0aW9uLnRvcCAtIHNjcm9sbFRvcClcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5jaGVja1Bvc2l0aW9uV2l0aEV2ZW50TG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICBzZXRUaW1lb3V0KCQucHJveHkodGhpcy5jaGVja1Bvc2l0aW9uLCB0aGlzKSwgMSlcbiAgfVxuXG4gIEFmZml4LnByb3RvdHlwZS5jaGVja1Bvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy4kZWxlbWVudC5pcygnOnZpc2libGUnKSkgcmV0dXJuXG5cbiAgICB2YXIgaGVpZ2h0ICAgICAgID0gdGhpcy4kZWxlbWVudC5oZWlnaHQoKVxuICAgIHZhciBvZmZzZXQgICAgICAgPSB0aGlzLm9wdGlvbnMub2Zmc2V0XG4gICAgdmFyIG9mZnNldFRvcCAgICA9IG9mZnNldC50b3BcbiAgICB2YXIgb2Zmc2V0Qm90dG9tID0gb2Zmc2V0LmJvdHRvbVxuICAgIHZhciBzY3JvbGxIZWlnaHQgPSAkKCdib2R5JykuaGVpZ2h0KClcblxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0ICE9ICdvYmplY3QnKSAgICAgICAgIG9mZnNldEJvdHRvbSA9IG9mZnNldFRvcCA9IG9mZnNldFxuICAgIGlmICh0eXBlb2Ygb2Zmc2V0VG9wID09ICdmdW5jdGlvbicpICAgIG9mZnNldFRvcCAgICA9IG9mZnNldC50b3AodGhpcy4kZWxlbWVudClcbiAgICBpZiAodHlwZW9mIG9mZnNldEJvdHRvbSA9PSAnZnVuY3Rpb24nKSBvZmZzZXRCb3R0b20gPSBvZmZzZXQuYm90dG9tKHRoaXMuJGVsZW1lbnQpXG5cbiAgICB2YXIgYWZmaXggPSB0aGlzLmdldFN0YXRlKHNjcm9sbEhlaWdodCwgaGVpZ2h0LCBvZmZzZXRUb3AsIG9mZnNldEJvdHRvbSlcblxuICAgIGlmICh0aGlzLmFmZml4ZWQgIT0gYWZmaXgpIHtcbiAgICAgIGlmICh0aGlzLnVucGluICE9IG51bGwpIHRoaXMuJGVsZW1lbnQuY3NzKCd0b3AnLCAnJylcblxuICAgICAgdmFyIGFmZml4VHlwZSA9ICdhZmZpeCcgKyAoYWZmaXggPyAnLScgKyBhZmZpeCA6ICcnKVxuICAgICAgdmFyIGUgICAgICAgICA9ICQuRXZlbnQoYWZmaXhUeXBlICsgJy5icy5hZmZpeCcpXG5cbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgICBpZiAoZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICAgIHRoaXMuYWZmaXhlZCA9IGFmZml4XG4gICAgICB0aGlzLnVucGluID0gYWZmaXggPT0gJ2JvdHRvbScgPyB0aGlzLmdldFBpbm5lZE9mZnNldCgpIDogbnVsbFxuXG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5yZW1vdmVDbGFzcyhBZmZpeC5SRVNFVClcbiAgICAgICAgLmFkZENsYXNzKGFmZml4VHlwZSlcbiAgICAgICAgLnRyaWdnZXIoYWZmaXhUeXBlLnJlcGxhY2UoJ2FmZml4JywgJ2FmZml4ZWQnKSArICcuYnMuYWZmaXgnKVxuICAgIH1cblxuICAgIGlmIChhZmZpeCA9PSAnYm90dG9tJykge1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmZzZXQoe1xuICAgICAgICB0b3A6IHNjcm9sbEhlaWdodCAtIGhlaWdodCAtIG9mZnNldEJvdHRvbVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuXG4gIC8vIEFGRklYIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbikge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLmFmZml4JylcbiAgICAgIHZhciBvcHRpb25zID0gdHlwZW9mIG9wdGlvbiA9PSAnb2JqZWN0JyAmJiBvcHRpb25cblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5hZmZpeCcsIChkYXRhID0gbmV3IEFmZml4KHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oKVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5hZmZpeFxuXG4gICQuZm4uYWZmaXggICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5hZmZpeC5Db25zdHJ1Y3RvciA9IEFmZml4XG5cblxuICAvLyBBRkZJWCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4uYWZmaXgubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLmFmZml4ID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gQUZGSVggREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgJCgnW2RhdGEtc3B5PVwiYWZmaXhcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkc3B5ID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgPSAkc3B5LmRhdGEoKVxuXG4gICAgICBkYXRhLm9mZnNldCA9IGRhdGEub2Zmc2V0IHx8IHt9XG5cbiAgICAgIGlmIChkYXRhLm9mZnNldEJvdHRvbSAhPSBudWxsKSBkYXRhLm9mZnNldC5ib3R0b20gPSBkYXRhLm9mZnNldEJvdHRvbVxuICAgICAgaWYgKGRhdGEub2Zmc2V0VG9wICAgICE9IG51bGwpIGRhdGEub2Zmc2V0LnRvcCAgICA9IGRhdGEub2Zmc2V0VG9wXG5cbiAgICAgIFBsdWdpbi5jYWxsKCRzcHksIGRhdGEpXG4gICAgfSlcbiAgfSlcblxufShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
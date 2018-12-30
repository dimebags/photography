(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["js/main"],{

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

jQuery(document).ready(function ($) {
  'use strict';

  $(window).load(function () {
    // makes sure the whole site is loaded
    $(".seq-preloader").fadeOut(); // will first fade out the loading animation

    $(".sequence").delay(500).fadeOut("slow"); // will fade out the white DIV that covers the website.
  });
  $(function () {
    function showSlide(n) {
      // n is relative position from current slide
      // unbind event listener to prevent retriggering
      $body.unbind("mousewheel"); // increment slide number by n and keep within boundaries

      currSlide = Math.min(Math.max(0, currSlide + n), $slide.length - 1);
      var displacment = window.innerWidth * currSlide; // translate slides div across to appropriate slide

      $slides.css('transform', 'translateX(-' + displacment + 'px)'); // delay before rebinding event to prevent retriggering

      setTimeout(bind, 700); // change active class on link

      $('nav a.active').removeClass('active');
      $($('a')[currSlide]).addClass('active');
    }

    function bind() {
      $body.bind('false', mouseEvent);
    }

    function mouseEvent(e, delta) {
      // On down scroll, show next slide otherwise show prev slide
      showSlide(delta >= 0 ? -1 : 1);
      e.preventDefault();
    }

    $('nav a, .main-btn a').click(function (e) {
      // When link clicked, find slide it points to
      var newslide = parseInt($(this).attr('href')[1]); // find how far it is from current slide

      var diff = newslide - currSlide - 1;
      showSlide(diff); // show that slide

      e.preventDefault();
    });
    $(window).resize(function () {
      // Keep current slide to left of window on resize
      var displacment = window.innerWidth * currSlide;
      $slides.css('transform', 'translateX(-' + displacment + 'px)');
    }); // cache

    var $body = $('body');
    var currSlide = 0;
    var $slides = $('.slides');
    var $slide = $('.slide'); // give active class to first link

    $($('nav a')[0]).addClass('active'); // add event listener for mousescroll

    $body.bind('false', mouseEvent);
  });
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 100) {
      $(".header").addClass("active");
    } else {
      //remove the background property so it comes transparent again (defined in your css)
      $(".header").removeClass("active");
    }
  });
});

/***/ })

},[["./assets/js/main.js","runtime"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvbWFpbi5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJkb2N1bWVudCIsInJlYWR5IiwiJCIsIndpbmRvdyIsImxvYWQiLCJmYWRlT3V0IiwiZGVsYXkiLCJzaG93U2xpZGUiLCJuIiwiJGJvZHkiLCJ1bmJpbmQiLCJjdXJyU2xpZGUiLCJNYXRoIiwibWluIiwibWF4IiwiJHNsaWRlIiwibGVuZ3RoIiwiZGlzcGxhY21lbnQiLCJpbm5lcldpZHRoIiwiJHNsaWRlcyIsImNzcyIsInNldFRpbWVvdXQiLCJiaW5kIiwicmVtb3ZlQ2xhc3MiLCJhZGRDbGFzcyIsIm1vdXNlRXZlbnQiLCJlIiwiZGVsdGEiLCJwcmV2ZW50RGVmYXVsdCIsImNsaWNrIiwibmV3c2xpZGUiLCJwYXJzZUludCIsImF0dHIiLCJkaWZmIiwicmVzaXplIiwib24iLCJzY3JvbGxUb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBQSxNQUFNLENBQUNDLFFBQUQsQ0FBTixDQUFpQkMsS0FBakIsQ0FBdUIsVUFBU0MsQ0FBVCxFQUFZO0FBRWxDOztBQUVPQSxHQUFDLENBQUNDLE1BQUQsQ0FBRCxDQUFVQyxJQUFWLENBQWUsWUFBVztBQUFFO0FBQ3hCRixLQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQkcsT0FBcEIsR0FEc0IsQ0FDUzs7QUFDL0JILEtBQUMsQ0FBQyxXQUFELENBQUQsQ0FBZUksS0FBZixDQUFxQixHQUFyQixFQUEwQkQsT0FBMUIsQ0FBa0MsTUFBbEMsRUFGc0IsQ0FFcUI7QUFDOUMsR0FIRDtBQU1BSCxHQUFDLENBQUMsWUFBVztBQUViLGFBQVNLLFNBQVQsQ0FBbUJDLENBQW5CLEVBQXNCO0FBQ2xCO0FBRUE7QUFDQUMsV0FBSyxDQUFDQyxNQUFOLENBQWEsWUFBYixFQUprQixDQU1sQjs7QUFDQUMsZUFBUyxHQUFHQyxJQUFJLENBQUNDLEdBQUwsQ0FBU0QsSUFBSSxDQUFDRSxHQUFMLENBQVMsQ0FBVCxFQUFZSCxTQUFTLEdBQUdILENBQXhCLENBQVQsRUFBcUNPLE1BQU0sQ0FBQ0MsTUFBUCxHQUFjLENBQW5ELENBQVo7QUFFQSxVQUFJQyxXQUFXLEdBQUdkLE1BQU0sQ0FBQ2UsVUFBUCxHQUFrQlAsU0FBcEMsQ0FUa0IsQ0FVbEI7O0FBQ0FRLGFBQU8sQ0FBQ0MsR0FBUixDQUFZLFdBQVosRUFBeUIsaUJBQWlCSCxXQUFqQixHQUErQixLQUF4RCxFQVhrQixDQVlsQjs7QUFDQUksZ0JBQVUsQ0FBQ0MsSUFBRCxFQUFPLEdBQVAsQ0FBVixDQWJrQixDQWVsQjs7QUFDQXBCLE9BQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0JxQixXQUFsQixDQUE4QixRQUE5QjtBQUNBckIsT0FBQyxDQUFDQSxDQUFDLENBQUMsR0FBRCxDQUFELENBQU9TLFNBQVAsQ0FBRCxDQUFELENBQXFCYSxRQUFyQixDQUE4QixRQUE5QjtBQUVIOztBQUVELGFBQVNGLElBQVQsR0FBZ0I7QUFDWGIsV0FBSyxDQUFDYSxJQUFOLENBQVcsT0FBWCxFQUFvQkcsVUFBcEI7QUFDRjs7QUFFSCxhQUFTQSxVQUFULENBQW9CQyxDQUFwQixFQUF1QkMsS0FBdkIsRUFBOEI7QUFDMUI7QUFDQXBCLGVBQVMsQ0FBQ29CLEtBQUssSUFBSSxDQUFULEdBQWEsQ0FBQyxDQUFkLEdBQWtCLENBQW5CLENBQVQ7QUFDQUQsT0FBQyxDQUFDRSxjQUFGO0FBQ0g7O0FBRUQxQixLQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QjJCLEtBQXhCLENBQThCLFVBQVNILENBQVQsRUFBWTtBQUN0QztBQUNBLFVBQUlJLFFBQVEsR0FBR0MsUUFBUSxDQUFDN0IsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFROEIsSUFBUixDQUFhLE1BQWIsRUFBcUIsQ0FBckIsQ0FBRCxDQUF2QixDQUZzQyxDQUd0Qzs7QUFDQSxVQUFJQyxJQUFJLEdBQUdILFFBQVEsR0FBR25CLFNBQVgsR0FBdUIsQ0FBbEM7QUFDQUosZUFBUyxDQUFDMEIsSUFBRCxDQUFULENBTHNDLENBS3JCOztBQUNqQlAsT0FBQyxDQUFDRSxjQUFGO0FBQ0gsS0FQRDtBQVNBMUIsS0FBQyxDQUFDQyxNQUFELENBQUQsQ0FBVStCLE1BQVYsQ0FBaUIsWUFBVTtBQUN6QjtBQUNBLFVBQUlqQixXQUFXLEdBQUdkLE1BQU0sQ0FBQ2UsVUFBUCxHQUFrQlAsU0FBcEM7QUFDQVEsYUFBTyxDQUFDQyxHQUFSLENBQVksV0FBWixFQUF5QixpQkFBZUgsV0FBZixHQUEyQixLQUFwRDtBQUNELEtBSkQsRUExQ2EsQ0FnRGI7O0FBQ0EsUUFBSVIsS0FBSyxHQUFHUCxDQUFDLENBQUMsTUFBRCxDQUFiO0FBQ0EsUUFBSVMsU0FBUyxHQUFHLENBQWhCO0FBQ0EsUUFBSVEsT0FBTyxHQUFHakIsQ0FBQyxDQUFDLFNBQUQsQ0FBZjtBQUNBLFFBQUlhLE1BQU0sR0FBR2IsQ0FBQyxDQUFDLFFBQUQsQ0FBZCxDQXBEYSxDQXNEYjs7QUFDQUEsS0FBQyxDQUFDQSxDQUFDLENBQUMsT0FBRCxDQUFELENBQVcsQ0FBWCxDQUFELENBQUQsQ0FBaUJzQixRQUFqQixDQUEwQixRQUExQixFQXZEYSxDQXlEYjs7QUFDQWYsU0FBSyxDQUFDYSxJQUFOLENBQVcsT0FBWCxFQUFvQkcsVUFBcEI7QUFDSCxHQTNESSxDQUFEO0FBZ0VBdkIsR0FBQyxDQUFDQyxNQUFELENBQUQsQ0FBVWdDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFlBQVc7QUFDOUIsUUFBR2pDLENBQUMsQ0FBQ0MsTUFBRCxDQUFELENBQVVpQyxTQUFWLEtBQXdCLEdBQTNCLEVBQWdDO0FBQzVCbEMsT0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhc0IsUUFBYixDQUFzQixRQUF0QjtBQUNILEtBRkQsTUFFTztBQUNIO0FBQ0R0QixPQUFDLENBQUMsU0FBRCxDQUFELENBQWFxQixXQUFiLENBQXlCLFFBQXpCO0FBQ0Y7QUFDSixHQVBEO0FBVVAsQ0FwRkQsRSIsImZpbGUiOiJqcy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG4gICAgICAgICQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCkgeyAvLyBtYWtlcyBzdXJlIHRoZSB3aG9sZSBzaXRlIGlzIGxvYWRlZFxuICAgICAgICAgICAgJChcIi5zZXEtcHJlbG9hZGVyXCIpLmZhZGVPdXQoKTsgLy8gd2lsbCBmaXJzdCBmYWRlIG91dCB0aGUgbG9hZGluZyBhbmltYXRpb25cbiAgICAgICAgICAgICQoXCIuc2VxdWVuY2VcIikuZGVsYXkoNTAwKS5mYWRlT3V0KFwic2xvd1wiKTsgLy8gd2lsbCBmYWRlIG91dCB0aGUgd2hpdGUgRElWIHRoYXQgY292ZXJzIHRoZSB3ZWJzaXRlLlxuICAgICAgICB9KVxuXG5cbiAgICAgICAgJChmdW5jdGlvbigpIHtcblxuICAgICAgICBmdW5jdGlvbiBzaG93U2xpZGUobikge1xuICAgICAgICAgICAgLy8gbiBpcyByZWxhdGl2ZSBwb3NpdGlvbiBmcm9tIGN1cnJlbnQgc2xpZGVcblxuICAgICAgICAgICAgLy8gdW5iaW5kIGV2ZW50IGxpc3RlbmVyIHRvIHByZXZlbnQgcmV0cmlnZ2VyaW5nXG4gICAgICAgICAgICAkYm9keS51bmJpbmQoXCJtb3VzZXdoZWVsXCIpO1xuXG4gICAgICAgICAgICAvLyBpbmNyZW1lbnQgc2xpZGUgbnVtYmVyIGJ5IG4gYW5kIGtlZXAgd2l0aGluIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIGN1cnJTbGlkZSA9IE1hdGgubWluKE1hdGgubWF4KDAsIGN1cnJTbGlkZSArIG4pLCAkc2xpZGUubGVuZ3RoLTEpO1xuXG4gICAgICAgICAgICB2YXIgZGlzcGxhY21lbnQgPSB3aW5kb3cuaW5uZXJXaWR0aCpjdXJyU2xpZGU7XG4gICAgICAgICAgICAvLyB0cmFuc2xhdGUgc2xpZGVzIGRpdiBhY3Jvc3MgdG8gYXBwcm9wcmlhdGUgc2xpZGVcbiAgICAgICAgICAgICRzbGlkZXMuY3NzKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlWCgtJyArIGRpc3BsYWNtZW50ICsgJ3B4KScpO1xuICAgICAgICAgICAgLy8gZGVsYXkgYmVmb3JlIHJlYmluZGluZyBldmVudCB0byBwcmV2ZW50IHJldHJpZ2dlcmluZ1xuICAgICAgICAgICAgc2V0VGltZW91dChiaW5kLCA3MDApO1xuXG4gICAgICAgICAgICAvLyBjaGFuZ2UgYWN0aXZlIGNsYXNzIG9uIGxpbmtcbiAgICAgICAgICAgICQoJ25hdiBhLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICQoJCgnYScpW2N1cnJTbGlkZV0pLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYmluZCgpIHtcbiAgICAgICAgICAgICAkYm9keS5iaW5kKCdmYWxzZScsIG1vdXNlRXZlbnQpO1xuICAgICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb3VzZUV2ZW50KGUsIGRlbHRhKSB7XG4gICAgICAgICAgICAvLyBPbiBkb3duIHNjcm9sbCwgc2hvdyBuZXh0IHNsaWRlIG90aGVyd2lzZSBzaG93IHByZXYgc2xpZGVcbiAgICAgICAgICAgIHNob3dTbGlkZShkZWx0YSA+PSAwID8gLTEgOiAxKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQoJ25hdiBhLCAubWFpbi1idG4gYScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIFdoZW4gbGluayBjbGlja2VkLCBmaW5kIHNsaWRlIGl0IHBvaW50cyB0b1xuICAgICAgICAgICAgdmFyIG5ld3NsaWRlID0gcGFyc2VJbnQoJCh0aGlzKS5hdHRyKCdocmVmJylbMV0pO1xuICAgICAgICAgICAgLy8gZmluZCBob3cgZmFyIGl0IGlzIGZyb20gY3VycmVudCBzbGlkZVxuICAgICAgICAgICAgdmFyIGRpZmYgPSBuZXdzbGlkZSAtIGN1cnJTbGlkZSAtIDE7XG4gICAgICAgICAgICBzaG93U2xpZGUoZGlmZik7IC8vIHNob3cgdGhhdCBzbGlkZVxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgLy8gS2VlcCBjdXJyZW50IHNsaWRlIHRvIGxlZnQgb2Ygd2luZG93IG9uIHJlc2l6ZVxuICAgICAgICAgIHZhciBkaXNwbGFjbWVudCA9IHdpbmRvdy5pbm5lcldpZHRoKmN1cnJTbGlkZTtcbiAgICAgICAgICAkc2xpZGVzLmNzcygndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZVgoLScrZGlzcGxhY21lbnQrJ3B4KScpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBjYWNoZVxuICAgICAgICB2YXIgJGJvZHkgPSAkKCdib2R5Jyk7XG4gICAgICAgIHZhciBjdXJyU2xpZGUgPSAwO1xuICAgICAgICB2YXIgJHNsaWRlcyA9ICQoJy5zbGlkZXMnKTtcbiAgICAgICAgdmFyICRzbGlkZSA9ICQoJy5zbGlkZScpO1xuXG4gICAgICAgIC8vIGdpdmUgYWN0aXZlIGNsYXNzIHRvIGZpcnN0IGxpbmtcbiAgICAgICAgJCgkKCduYXYgYScpWzBdKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyIGZvciBtb3VzZXNjcm9sbFxuICAgICAgICAkYm9keS5iaW5kKCdmYWxzZScsIG1vdXNlRXZlbnQpO1xuICAgIH0pXG5cblxuICAgICAgXG5cbiAgICAgICAgJCh3aW5kb3cpLm9uKFwic2Nyb2xsXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpID4gMTAwKSB7XG4gICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vcmVtb3ZlIHRoZSBiYWNrZ3JvdW5kIHByb3BlcnR5IHNvIGl0IGNvbWVzIHRyYW5zcGFyZW50IGFnYWluIChkZWZpbmVkIGluIHlvdXIgY3NzKVxuICAgICAgICAgICAgICAgJChcIi5oZWFkZXJcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG5cbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
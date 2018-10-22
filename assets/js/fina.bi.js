
// Scroll to top button appear
$(document).scroll(function () {
    const scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
    } else {
        $('.scroll-to-top').fadeOut();
    }
});

// Configure tooltips globally
//$('[data-toggle="tooltip"]').tooltip();

// Smooth scrolling using jQuery easing
$(document).on('click', 'a.scroll-to-top', function (event) {
    const $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
});

function responsiveClass(target, cssClass, flag) {
    $(document).ready(function () {
        if (window.innerWidth < 780 === flag)
            $(target).addClass(cssClass);
        else
            $(target).removeClass(cssClass);
    });

    window.onresize = () => {
        if (window.innerWidth < 780 === flag)
            $(target).addClass(cssClass);
        else
            $(target).removeClass(cssClass);
    }
}
/*(function ($) {
    "use strict"; // Start of use strict
    // Configure tooltips for collapsed side navigation
    $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
        template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip" style="pointer-events: none;"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });

    // Toggle the side navigation
    $("#sidenavToggler").click(function (e) {
        e.preventDefault();
        $("body").toggleClass("sidenav-toggled");
        $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
        $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    });
    // Force the toggled class to be removed when a collapsible nav link is clicked
    $(".navbar-sidenav .nav-link-collapse").click(function (e) {
        e.preventDefault();
        $("body").removeClass("sidenav-toggled");
    });
    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function (e) {
        const e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
        this.scrollTop += (delta < 0 ? 1 : -1) * 30;
        e.preventDefault();
    });




    const g = Snap("#svg");

    g.attr({
        viewBox: [0, 0, 800, 600]
    });

    Snap.load("assets/img/map.svg", function (f) {
        function getShift(dot) {
            return "t" + (400 - dot.x) + "," + (300 - dot.y);
        }

        let gr = f.select("g"),
            wrd = f.select("#world").attr({fill: "#fff"}),
            syd = f.select("#sydney").attr({fill: "red"}),
            msk = f.select("#san_francisco").attr({fill: "red"}),
            pth = f.select("#flight"),
            pln = f.select("#plane"),
            top = g.g();
        top.attr({
            mask: g.rect(100, 0, 600, 600).attr({
                fill: "r(.5,.5,.25)#fff-#000"
            })
        });
        top.add(gr);
        const click = top.text(410, 310, "click!").attr({
            font: "20px Source Sans Pro, sans-serif",
            fill: "#fff"
        });
        pth.attr({
            display: "none"
        });
        pln = gr.g(pln, pln.clone());
        pln.attr({
            display: "none"
        });
        pln[0].attr({
            stroke: "#fff",
            strokeWidth: 2
        });
        gr.attr({
            transform: getShift({
                x: syd.attr("cx"),
                y: syd.attr("cy")
            })
        });
        var flight = gr.path().attr({
            fill: "none",
            stroke: "red",
            strokeWidth: 3,
            strokeDasharray: "5 3"
        }).insertBefore(pln);
        window.onclick = function () {
            pln.attr({
                display: ""
            });
            click.attr({
                display: "none"
            });
            var flag,
                len = Snap.path.getTotalLength(pth.attr("d"));
            Snap.animate(0, len, function (l) {
                // Safari bug workaround: forcing redraw
                g.attr({width: 100 + (flag = !flag ? 1e-5 : 0) + "%"});
                //
                var dot = pth.getPointAtLength(l);
                flight.attr({
                    d: pth.getSubpath(0, l)
                });
                pln.attr({
                    transform: "t" + [dot.x, dot.y] +
                    "r" + (dot.alpha - 90)
                });
                gr.attr({
                    transform: getShift(dot)
                });
            }, 10000);
        };
    });

})(jQuery); // End of use strict*/


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
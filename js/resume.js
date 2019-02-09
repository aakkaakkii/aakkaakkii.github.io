let lang = 'en';

(function ($) {
    "use strict"; // Start of use strict

    document.cookie.split('; ').forEach(function (d) {
        let data = d.split('=');
        if (data[0] === 'lang')
            lang = data[1];
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#sideNav'
    });


    $('.language-button-ge').each(function () {
        this.addEventListener('click', function () {
            document.cookie = 'lang=ge';
            location.reload();
        });
    });

    $('.language-button-en').each(function () {
        this.addEventListener('click', function () {
            document.cookie = 'lang=en';
            location.reload();
        });
    });

    /* $.ajax({
         url:'https://aakkaakkii.github.io/data/experience.json',
         method: 'GET',
         success: function (data) {
             console.log(data)
         }

     })*/

    $.getJSON('data/' + lang + '/education.json', function (json) {
        json.forEach(function (d) {
            $('#education-section').append(
                '<div id="education-container">\n' +
                '                <div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">\n' +
                '                    <div class="resume-content">\n' +
                '                        <h3 class="mb-0">' + d.university + '</h3>\n' +
                '                        <div class="subheading mb-3">' + d.degree + '</div>\n' +
                '                        <div>' + d.description + '</div>\n' +
                '                    </div>\n' +
                '                    <div class="resume-date text-md-right">\n' +
                '                        <span class="text-primary">' + d.date + '</span>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>'
            );
        });
    });

    $.getJSON('data/' + lang + '/experience.json', function (json) {
        json.forEach(function (d) {
            $('#experience-container').append(
                '<div class="resume-item d-flex flex-column flex-md-row justify-content-between mb-5">\n' +
                '                <div class="resume-content">\n' +
                '                    <h3 class="mb-0">' + d.position + '</h3>\n' +
                '                    <div class="subheading mb-3">' + d.company + '</div>\n' +
                '                    <p>' + d.description + '</p>\n' +
                '                </div>\n' +
                '                <div class="resume-date text-md-right">\n' +
                '                    <span class="text-primary">' + d.date + '</span>\n' +
                '                </div>\n' +
                '            </div>'
            );
        });
    });

    $.getJSON('data/' + lang + '/about&interface.json', function (json) {
        $('#about-me').html(json[0].description);
        if (lang === "ge") {
            $('#name-section').css({"padding-bottom":"30px"});
            $('#about-item').html(json[0].about);
            $('#experience-item').html(json[0].experience);
            $('#education-item').html(json[0].education);
            $('#skills-item').html(json[0].skills);
            $('#navbar-name').html(json[0].firstName + ' ' + json[0].lastName);
            $('#first_name').html(json[0].firstName);
            $('#last_name').html(json[0].lastName);
            $('#experience-title').html(json[0].experience);
            $('#education-title').html(json[0].education);
            $('#skills-title').html(json[0].skills);
            $('#skills-sub-title').html(json[0].skillsSubTitle);
        }
    })

})(jQuery); // End of use strict




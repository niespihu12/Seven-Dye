jQuery(function ($) {
    $('.slick-carousel').slick({
        // infinite: true,
        centerMode: true,
        slidesToShow: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 900,
        easing: 'easeOutSine',
        centerPadding: '0px',
        swipe: true,
    });
});
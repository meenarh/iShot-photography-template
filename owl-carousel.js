'use strict'


$(document).ready(function () {
    // Image Configuration
    const elements = $('.block-recipes-4 .img-container')
    elements.each(function () {
        const bgImage = $(this).css('background-image')
        $(this).css({
            'background': bgImage + ' #252525a1',
            'background-blend-mode': 'multiply',
            'background-position': 'center',
            'background-size': 'cover',
            'background-repeat': 'no-repeat'
        })
    })

    // Carousel Option
    const owl = $('.block-recipes-4 .owl-carousel')
    owl.owlCarousel({
        loop: true,
        center: true,
        rewind: true,
        lazyLoad: true,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 2
            },
            1200: {
                items: 4
            }
        }
    })
    AOS.refresh(true)
})

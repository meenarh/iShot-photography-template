'use strict'


// Preloader
$(window).on('load', function () {
    $("#preloder").delay(400).fadeOut()
})


// Initialize AOS
$(document).ready(function () {
    AOS.init({
        easing: 'ease-out-back',
        duration: 800,
        delay: 200,
        once: true,
        disable: 'mobile'
    })
})


// Sidebar
$(document).ready(function () {
    const slideout = new Slideout({
        'panel': $('#panel')[0],
        'menu': $('#sidebar')[0],
        'padding': 272,
        'tolerance': 70,
        'easing': 'cubic-bezier(.32,2,.55,.27)',
        'touch': false
    })

    // Toggle button
    $('.hamburger').on('click', function () {
        slideout.toggle()
        $(this).toggleClass('is-active')
    })

    // Close slideout when large screen
    $(window).resize(function () {
        if ($(window).width() > 991) {
            slideout.close()
            $('.hamburger').removeClass('is-active')
        }
    })

    if ($(window).width() > 991) {
        slideout.close()
        $('.hamburger').removeClass('is-active')
    }
})


// Sticky Navbar
$(document).ready(function () {
    const stickyNav = $('#sticky-navbar')
    $(window).scroll(function () {
        if ($(window).scrollTop() > 0) {
            stickyNav.css('box-shadow', '0 10px 75px -20px #252525ab')
        } else {
            stickyNav.css('box-shadow', 'none')
        }
    })
    if ($(window).scrollTop() > 0) {
        stickyNav.css('box-shadow', '0 10px 75px -20px #252525ab')
    } else {
        stickyNav.css('box-shadow', 'none')
    }
})


// Contact section on small screen
$(document).ready(function () {
    const topLine = $('.contact-section .section-title-1 div[class^="top-line"]')

    if ($(window).width() < 768) {
        topLine.addClass('top-line-2')
        topLine.removeClass('top-line-1')
    } else {
        topLine.addClass('top-line-1')
        topLine.removeClass('top-line-2')
    }

    $(window).resize(function () {
        if ($(window).width() < 768) {
            topLine.addClass('top-line-2')
            topLine.removeClass('top-line-1')
        } else {
            topLine.addClass('top-line-1')
            topLine.removeClass('top-line-2')
        }
    })
})


// Lazy loading image
let lazyImages = $('.lazyload-image').get();

if ("IntersectionObserver" in window && "IntersectionObserverEntry" in window && "intersectionRatio" in window.IntersectionObserverEntry.prototype) {
    let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                setTimeout(function () {
                    let lazyImage = entry.target;
                    if ($(lazyImage).hasClass('lazyload-css')) {
                        $(lazyImage).css('background-image', `url('${$(lazyImage).data('src')}')`);
                        $(lazyImage).removeClass("lazyload-1");
                    } else {
                        $(lazyImage).attr('src', $(lazyImage).data('src'));
                        $(lazyImage).removeClass("lazyload-1");
                    }
                    lazyImageObserver.unobserve(lazyImage);
                }, 1000)
            }
        });
    });

    lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
    });
} else {
    console.log('Browser not support observer');

    let active = false;

    const lazyLoad = function () {
        if (active === false) {
            active = true;

            setTimeout(function () {
                lazyImages.forEach(function (lazyImage) {
                    if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
                        $(lazyImage).css('background-image', `url('${$(lazyImage).data('src')}')`);
                        $(lazyImage).removeClass("lazyload-1");

                        lazyImages = lazyImages.filter(function (image) {
                            return image !== lazyImage;
                        });

                        if (lazyImages.length === 0) {
                            document.removeEventListener("scroll", lazyLoad);
                            window.removeEventListener("resize", lazyLoad);
                            window.removeEventListener("orientationchange", lazyLoad);
                        }
                    }
                });

                active = false;
            }, 1000);
        }
    };

    document.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    window.addEventListener("orientationchange", lazyLoad);
}


// Copyright
$('#copyright-year').text(new Date().getFullYear())

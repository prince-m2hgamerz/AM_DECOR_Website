(function ($) {
    "use strict";
    /*=================================
      JS Index Here
    ==================================*/
    /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image Color & Mask
    07. Global Slider
    08. Custom Animaiton For Slider
    09. Ajax Contact Form
    10. Search Box Popup
    11. Popup Sidemenu
    12. Magnific Popup
    13. Section Position
    14. Filter
    15. Counter Up
    16. AS Tab
    17. Shape Mockup
    18. Progress Bar Animation
    19. Price Slider
    21. Indicator
    22. Circle Progress
    00. Woocommerce Toggle
    00. Right Click Disable
  */
    /*=================================
      JS Index End
  ==================================*/
    /*

  /*---------- 01. On Load Function ----------*/
    $(window).on("load", function () {
        $(".preloader").fadeOut();
    });

    /*---------- 02. Preloader ----------*/
    if ($(".preloader").length > 0) {
        $(".preloaderCls").each(function () {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".preloader").css("display", "none");
            });
        });
    }

// ------------ Preloader -----------
  if ($(".loader-wrap").length > 0) {
$( function() {
    const svg = document.getElementById("svg");
    const tl = gsap.timeline();
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
        delay: 1.5,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
    });
    tl.to(".loader-wrap", {
        y: -1500,
    });
    tl.to(".loader-wrap", {
        zIndex: -1,
        display: "none",
    });
   
});
  };

 
    // $('select').niceSelect(); 
    if ($('.nice-select').length) {
        $('.nice-select').niceSelect();
    }


    /*---------- 03. Mobile Menu Active ----------*/
    $.fn.thmobilemenu = function (options) {
        var opt = $.extend({
                menuToggleBtn: ".th-menu-toggle",
                bodyToggleClass: "th-body-visible",
                subMenuClass: "th-submenu",
                subMenuParent: "th-item-has-children",
                subMenuParentToggle: "th-active",
                meanExpandClass: "th-mean-expand",
                appendElement: '<span class="th-mean-expand"></span>',
                subMenuToggleClass: "th-open",
                toggleSpeed: 400,
            },
            options
        );

        return this.each(function () {
            var menu = $(this); // Select menu

            // Menu Show & Hide
            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                // collapse submenu on menu hide or show
                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function () {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            // Class Set Up for every submenu
            menu.find("li").each(function () {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });

            // Toggle Submenu
            function toggleDropDown($element) {
                if ($($element).next("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).next("ul").slideToggle(opt.toggleSpeed);
                    $($element).next("ul").toggleClass(opt.subMenuToggleClass);
                } else if ($($element).prev("ul").length > 0) {
                    $($element).parent().toggleClass(opt.subMenuParentToggle);
                    $($element).prev("ul").slideToggle(opt.toggleSpeed);
                    $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
                }
            }

            // Submenu toggle Button
            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function () {
                $(this).on("click", function (e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            // Menu Show & Hide On Toggle Btn click
            $(opt.menuToggleBtn).each(function () {
                $(this).on("click", function () {
                    menuToggle();
                });
            });

            // Hide Menu On out side click
            menu.on("click", function (e) {
                e.stopPropagation();
                menuToggle();
            });

            // Stop Hide full menu on menu click
            menu.find("div").on("click", function (e) {
                e.stopPropagation();
            });
        });
    };

    $(".th-menu-wrapper").thmobilemenu();

    /*---------- 04. Sticky fix ----------*/
    // Sticky header effect
$(window).on("scroll", function () {
    var topPos = $(this).scrollTop();

    if (topPos > 500) {
        if (!$('.sticky-wrapper').hasClass('sticky')) {
            $('.sticky-wrapper')
                .addClass('sticky')
                .stop(true, true)
                .slideDown(300); // smooth slide-in
        }
    } else {
        if ($('.sticky-wrapper').hasClass('sticky')) {
            $('.sticky-wrapper')
                .stop(true, true)
                .slideUp(300, function () {
                    $(this).removeClass('sticky').show(); // remove class after hiding
                });
        }
    }
});



    /*----------- 04.1.  One Page Nav ----------*/
    function onePageNav(element) {
        if ($(element).length > 0) {
            $(element).each(function () {
                var link = $(this).find('a');
                $(this).find(link).each(function () {
                    $(this).on('click', function () {
                        var target = $(this.getAttribute('href'));
                        if (target.length) {
                            event.preventDefault();
                            $('html, body').stop().animate({
                                scrollTop: target.offset().top - 10
                            }, 1000);
                        };

                    });
                });
            })
        }
    };
    onePageNav('.onepage-nav');
    onePageNav('.scroll-down');
    //one page sticky menu  
    $(window).on('scroll', function () {
        if ($('.onepage-nav').length > 0) {};
    });

    /*---------- 04. Sticky fix ----------*/
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $('.sticky-wrapper').addClass('sticky');
            $('.category-menu').addClass('close-category');
        } else {
            $('.sticky-wrapper').removeClass('sticky')
            $('.category-menu').removeClass('close-category');
        }
    })

    $(".menu-expand").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $('.category-menu').toggleClass('open-category');
        });
    });

    /*---------- 05. Scroll To Top ----------*/
    /*---------- 05. Scroll To Top ----------*/
    // progressAvtivation
    if ($('.scroll-top')) {
        var scrollTopbtn = document.querySelector('.scroll-top');
        var progressPath = document.querySelector('.scroll-top path');
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        var updateProgress = function () {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 750;
        jQuery(window).on('scroll', function () {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass('show');
            } else {
                jQuery(scrollTopbtn).removeClass('show');
            }
        });
        jQuery(scrollTopbtn).on('click', function (event) {
            event.preventDefault();
            jQuery('html, body').animate({
                scrollTop: 0
            }, duration);
            return false;
        })
    }

    /*---------- 06. Set Background Image Color & Mask ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function () {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    if ($('[data-bg-color]').length > 0) {
        $('[data-bg-color]').each(function () {
            var color = $(this).attr('data-bg-color');
            $(this).css('background-color', color);
            $(this).removeAttr('data-bg-color');
        });
    };

    $('[data-border]').each(function () {
        var borderColor = $(this).data('border');
        $(this).css('--th-border-color', borderColor);
    });

    if ($('[data-mask-src]').length > 0) {
        $('[data-mask-src]').each(function () {
            var mask = $(this).attr('data-mask-src');
            $(this).css({
                'mask-image': 'url(' + mask + ')',
                '-webkit-mask-image': 'url(' + mask + ')'
            });
            $(this).addClass('bg-mask');
            $(this).removeAttr('data-mask-src');
        });
    };



    /*----------- 07. Global Slider ----------*/

$('.th-slider').each(function () {
    var thSlider = $(this);
    var settings = thSlider.data('slider-options') || {};

    // Navigation & Pagination setup
    var prevArrow = thSlider.find('.slider-prev');
    var nextArrow = thSlider.find('.slider-next');
    var paginationElN = thSlider.find('.slider-pagination.pagi-number');
    var paginationExternel = thSlider.siblings('.slider-controller').find('.slider-pagination');
    var paginationEl = paginationExternel.length ? paginationExternel.get(0) : thSlider.find('.slider-pagination').get(0);
    var paginationType = settings.paginationType || 'bullets';
    var autoplayCondition = settings.autoplay !== undefined ? settings.autoplay : {
        delay: 6000,
        disableOnInteraction: false
    };

    // Default Swiper settings for .th-slider
    var sliderDefault = {
        slidesPerView: 1,
        spaceBetween: settings.spaceBetween || 24,
        loop: settings.loop !== false,
        speed: settings.speed || 1000,
        autoplay: autoplayCondition,
        navigation: {
            nextEl: nextArrow.get(0),
            prevEl: prevArrow.get(0),
        },
        pagination: {
            el: paginationEl,
            type: paginationType,
            clickable: true,
            renderBullet: function (index, className) {
                var number = index + 1;
                var formattedNumber = number < 10 ? '0' + number : number;
                return paginationElN.length
                    ? '<span class="' + className + ' number">' + formattedNumber + '</span>'
                    : '<span class="' + className + '" aria-label="Go to Slide ' + formattedNumber + '"></span>';
            },
            formatFractionCurrent: function (number) {
                return number < 10 ? '0' + number : number;
            },
            formatFractionTotal: function (number) {
                return number < 10 ? '0' + number : number;
            },
            renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span> <span class="line"></span> <span class="' + totalClass + '"></span>';
            }
        },
        on: {
            init: function () {
                const swiper = this;
                for (let i = 0; i < swiper.slides.length; i++) {
                    $(swiper.slides[i]).find(".img").attr({
                        "data-swiper-parallax": 0.75 * swiper.width,
                    });
                }
            },
            resize: function () {
                this.update();
            },
            slideChange: function () {
                setTimeout(() => this.params.mousewheel.releaseOnEdges = false, 500);
            },
            reachEnd: function () {
                setTimeout(() => this.params.mousewheel.releaseOnEdges = true, 750);
            }
        }
        
    };

    // Merge with any user options passed as JSON string
    var userOptions = thSlider.attr('data-slider-options');
    if (userOptions) {
        try {
            userOptions = JSON.parse(userOptions);
            sliderDefault = $.extend({}, sliderDefault, userOptions);
        } catch (e) {
            console.warn('Invalid JSON in data-slider-options', e);
        }
    }

    new Swiper(thSlider.get(0), sliderDefault);
});



// Add class for styling if slider exists
if ($('.slider-area').length > 0) {
    $('.slider-area').closest(".container").parent().addClass("arrow-wrap");
}


    function animationProperties() {
        $('[data-ani]').each(function () {
            var animationName = $(this).data('ani');
            $(this).addClass(animationName);
        });

        $('[data-ani-delay]').each(function () {
            var delayTime = $(this).data('ani-delay');
            $(this).css('animation-delay', delayTime);
        });
    }
    animationProperties();

    // Add click event handlers for external slider arrows based on data attributes
    $('[data-slider-prev], [data-slider-next]').on('click', function () {
        var sliderSelector = $(this).data('slider-prev') || $(this).data('slider-next');
        var targetSlider = $(sliderSelector);

        if (targetSlider.length) {
            var swiper = targetSlider[0].swiper;

            if (swiper) {
                if ($(this).data('slider-prev')) {
                    swiper.slidePrev();
                } else {
                    swiper.slideNext();
                }
            }
        }
    });


    /*----------- 21. image Slider ----------*/
    $("#slider").on("input change", (e) => {
        const sliderPos = e.target.value;
        $('.foreground-img').css('width', `${sliderPos}%`)
        $('.slider-button').css('left', `calc(${sliderPos}% - 18px)`)
    });

    $(".hover-item").hover(function () {
        $(this).addClass("item-active");
        $(this).siblings().removeClass("item-active");
    });

    /*-------------- 08. Slider Tab -------------*/
    $.fn.activateSliderThumbs = function (options) {
        var opt = $.extend({
                sliderTab: false,
                tabButton: ".tab-btn",
            },
            options
        );

        return this.each(function () {
            var $container = $(this);
            var $thumbs = $container.find(opt.tabButton);
            var $line = $('<span class="indicator"></span>').appendTo($container);

            var sliderSelector = $container.data("slider-tab");
            var $slider = $(sliderSelector);

            var swiper = $slider[0].swiper;

            $thumbs.on("click", function (e) {
                e.preventDefault();
                var clickedThumb = $(this);

                clickedThumb.addClass("active").siblings().removeClass("active");
                linePos(clickedThumb, $container);

                if (opt.sliderTab) {
                    var slideIndex = clickedThumb.index();
                    swiper.slideTo(slideIndex);
                }
            });

            if (opt.sliderTab) {
                swiper.on("slideChange", function () {
                    var activeIndex = swiper.realIndex;
                    var $activeThumb = $thumbs.eq(activeIndex);

                    $activeThumb.addClass("active").siblings().removeClass("active");
                    linePos($activeThumb, $container);
                });

                var initialSlideIndex = swiper.activeIndex;
                var $initialThumb = $thumbs.eq(initialSlideIndex);
                $initialThumb.addClass("active").siblings().removeClass("active");
                linePos($initialThumb, $container);
            }

            function linePos($activeThumb) {
                var thumbOffset = $activeThumb.position();

                var marginTop = parseInt($activeThumb.css('margin-top')) || 0;
                var marginLeft = parseInt($activeThumb.css('margin-left')) || 0;

                $line.css("--height-set", $activeThumb.outerHeight() + "px");
                $line.css("--width-set", $activeThumb.outerWidth() + "px");
                $line.css("--pos-y", thumbOffset.top + marginTop + "px");
                $line.css("--pos-x", thumbOffset.left + marginLeft + "px");
            }
        });
    };

    if ($(".testi-thumb").length) {
        $(".testi-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }
    if ($(".hero-thumb").length) {
        $(".hero-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }
    if ($(".product-thumb").length) {
        $(".product-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }
    if ($(".testi-card-tab").length) {
        $(".testi-card-tab").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }
    if ($(".testi-box-tab").length) {
        $(".testi-box-tab").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }


    document.querySelectorAll('.testi-box-tab .tab-btn').forEach(function(tab) {
    tab.addEventListener('mouseenter', function() {
        // Hover করা tab-এর image src বের করো
        let newSrc = this.querySelector('img').getAttribute('src');
        
        // Main image replace করো
        document.querySelector('.testi-img img').setAttribute('src', newSrc);
    });
});

$('.testi-box-tab .tab-btn').hover(function() {
    var newSrc = $(this).find('img').attr('src');
    $('.testi-img img').attr('src', newSrc);
});



/* gallery 1 end --------------------*/

    /*----------- 09. Ajax Contact Form ----------*/
    var form = ".ajax-contact";
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
        '[name="name"],[name="email"],[name="subject"],[name="number"],[name="message"]'; // Must be use (,) without any space
    var formMessages = $(".form-messages");

    function sendContact() {
        var formData = $(form).serialize();
        var valid;
        valid = validateContact();
        if (valid) {
            jQuery
                .ajax({
                    url: $(form).attr("action"),
                    data: formData,
                    type: "POST",
                })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    formMessages.removeClass("error");
                    formMessages.addClass("success");
                    // Set the message text.
                    formMessages.text(response);
                    // Clear the form.
                    $(
                        form +
                        ' input:not([type="submit"]),' +
                        form +
                        " textarea"
                    ).val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    formMessages.removeClass("success");
                    formMessages.addClass("error");
                    // Set the message text.
                    if (data.responseText !== "") {
                        formMessages.html(data.responseText);
                    } else {
                        formMessages.html(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        }
    }

    function validateContact() {
        var valid = true;
        var formInput;

        function unvalid($validation) {
            $validation = $validation.split(",");
            for (var i = 0; i < $validation.length; i++) {
                formInput = form + " " + $validation[i];
                if (!$(formInput).val()) {
                    $(formInput).addClass(invalidCls);
                    valid = false;
                } else {
                    $(formInput).removeClass(invalidCls);
                    valid = true;
                }
            }
        }
        unvalid($validation);

        if (
            !$($email).val() ||
            !$($email)
            .val()
            .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
        ) {
            $($email).addClass(invalidCls);
            valid = false;
        } else {
            $($email).removeClass(invalidCls);
            valid = true;
        }
        return valid;
    }

    $(form).on("submit", function (element) {
        element.preventDefault();
        sendContact();
    });

    /*---------- 10. Search Box Popup ----------*/
    function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
        $($searchOpen).on("click", function (e) {
            e.preventDefault();
            $($searchBox).addClass($toggleCls);
        });
        $($searchBox).on("click", function (e) {
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
        $($searchBox)
            .find("form")
            .on("click", function (e) {
                e.stopPropagation();
                $($searchBox).addClass($toggleCls);
            });
        $($searchCls).on("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($searchBox).removeClass($toggleCls);
        });
    }
    popupSarchBox(
        ".popup-search-box",
        ".searchBoxToggler",
        ".searchClose",
        "show"
    );

    /*---------- 11. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
        // Sidebar Popup
        $($sideMunuOpen).on('click', function (e) {
            e.preventDefault();
            $($sideMenu).addClass($toggleCls);
        });
        $($sideMenu).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls)
        });
        var sideMenuChild = $sideMenu + ' > div';
        $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu).addClass($toggleCls)
        });
        $($sideMenuCls).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu).removeClass($toggleCls);
        });
    };
    popupSideMenu('.sidemenu-wrapper', '.sideMenuToggler', '.sideMenuCls', 'show');
    /*---------- 12. Popup Sidemenu ----------*/
    function popupSideMenu($sideMenu2, $sideMunuOpen2, $sideMenuCls2, $toggleCls2) {
        // Sidebar Popup
        $($sideMunuOpen2).on('click', function (e) {
            e.preventDefault();
            $($sideMenu2).addClass($toggleCls2);
        });
        $($sideMenu2).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu2).removeClass($toggleCls2)
        });
        var sideMenuChild = $sideMenu2 + ' > div';
        $(sideMenuChild).on('click', function (e) {
            e.stopPropagation();
            $($sideMenu2).addClass($toggleCls2)
        });
        $($sideMenuCls2).on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $($sideMenu2).removeClass($toggleCls2);
        });
    };
    popupSideMenu('.shopping-cart', '.sideMenuToggler2', '.sideMenuCls', 'show');

    /*----------- 12. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".th-popup-image").magnificPopup({
        type: "image",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
        mainClass: 'mfp-zoom-in',
        removalDelay: 260,
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });


    if ($('[data-theme-color]').length > 0) {
        $('[data-theme-color]').each(function () {
            var $color = $(this).attr('data-theme-color');
            $(this).get(0).style.setProperty('--theme-color', $color);
            $(this).removeAttr('data-theme-color');
        });
    };


    /************lettering js***********/
    function injector(t, splitter, klass, after) {
        var a = t.text().split(splitter),
            inject = '';
        if (a.length) {
            $(a).each(function (i, item) {
                inject += '<span class="' + klass + (i + 1) + '">' + item + '</span>' + after;
            });
            t.empty().append(inject);
        }
    }

    var methods = {
        init: function () {

            return this.each(function () {
                injector($(this), '', 'char', '');
            });

        },

        words: function () {

            return this.each(function () {
                injector($(this), ' ', 'word', ' ');
            });

        },

        lines: function () {

            return this.each(function () {
                var r = "eefec303079ad17405c889e092e105b0";
                // Because it's hard to split a <br/> tag consistently across browsers,
                // (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
                // (of the word "split").  If you're trying to use this plugin on that 
                // md5 hash string, it will fail because you're being ridiculous.
                injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
            });

        }
    };

    $.fn.lettering = function (method) {
        // Method calling logic
        if (method && methods[method]) {
            return methods[method].apply(this, [].slice.call(arguments, 1));
        } else if (method === 'letters' || !method) {
            return methods.init.apply(this, [].slice.call(arguments, 0)); // always pass an array
        }
        $.error('Method ' + method + ' does not exist on jQuery.lettering');
        return this;
    };

    $(".discount-anime").lettering();


    /*---------- 13. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10);
    }

    $.fn.sectionPosition = function (mainAttr, posAttr) {
        $(this).each(function () {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning
                    topMark = "top-half", // Pos top
                    bottomMark = "bottom-half", // Pos Bottom
                    parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css(
                        "padding-bottom",
                        parentPB + sectionHeight + "px"
                    );
                    section.css("margin-top", "-" + sectionHeight + "px");
                } else if (posData === bottomMark) {
                    $(posFor).css(
                        "padding-top",
                        parentPT + sectionHeight + "px"
                    );
                    section.css("margin-bottom", "-" + sectionHeight + "px");
                }
            }
            setPosition(); // Set Padding On Load
        });
    };

    var postionHandler = "[data-sec-pos]";
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function () {
            $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
        });
    }

    /*----------- 15. Filter ----------*/
    $(".filter-active").imagesLoaded(function () {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function () {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function (event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
        $('.load-more-btn').on('click', function () {
            var $icon = $(this).find('i');
            $icon.addClass('fa-spin-pulse');

            setTimeout(function () {
                $icon.removeClass('fa-spin-pulse');
            }, 1000);

            var $button = $(this);
            setTimeout(function () {
                var $closestLoadMoreActive = $button.prev('.load-more-active');
                if ($closestLoadMoreActive.length === 0) {
                    $closestLoadMoreActive = $button.closest('.container').find('.load-more-active');
                }
                $closestLoadMoreActive.find('.load-more.d-none, .accordion-card.style2.d-none, .filter-item.d-none').removeClass('d-none');

                var $grid = $($filter).isotope({
                    filter: "*",
                });
            }, 700);
        });
        $('.plus-button').on('click', function () {
            var $button = $(this);
            var $icon = $button.find('i');

            $icon.addClass('fa-plus');

            setTimeout(function () {
                $icon.removeClass('fa-spin-plus');
            }, 1000);

            // Find the nearest .slider-counter-wrapp and then show its .popup-more
            var $popup = $button.closest('.slider-counter-wrapp').find('.popup-more');

            $popup.removeClass('d-none');
        });
        $('.popup-close').on('click', function () {
            $(this).closest('.popup-more').addClass('d-none');
        });

    });


    $(".masonary-active").imagesLoaded(function () {
        var $filter = ".masonary-active",
            $filterItem = ".filter-item";

        if ($($filter).length > 0) {
            $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });
        }
    });

    $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(function () {
        var $filter = ".masonary-active, .woocommerce-Reviews .comment-list",
            $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

        if ($($filter).length > 0) {
            $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1,
                },
            });
        }
        $('[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            $($filter).isotope({
                filter: "*",
            });
        });
    });

    /*----------- 15. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 17. Shape Mockup ----------*/
    $.fn.shapeMockup = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }


    /*----------- 16. Shape Mockup ----------*/
    $.fn.shapeMockup2 = function () {
        var $shape = $(this);
        $shape.each(function () {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap2");
        });
    };

    if ($(".shape-mockup2")) {
        $(".shape-mockup2").shapeMockup2();
    }
    /*----------- 19. Price Slider ----------*/
    $(".price_slider").slider({
        range: true,
        min: 10,
        max: 100,
        values: [10, 75],
        slide: function (event, ui) {
            $(".from").text("$" + ui.values[0]);
            $(".to").text("$" + ui.values[1]);
        }
    });
    $(".from").text("$" + $(".price_slider").slider("values", 0));
    $(".to").text("$" + $(".price_slider").slider("values", 1));



    /*----------- 16. Progress Bar Animation ----------*/
    $('.progress-bar').waypoint(function () {
        $('.progress-bar').css({
            animation: "animate-positive 1.8s",
            opacity: "1"
        });
    }, {
        offset: '75%'
    });

    /*----------- 360 JS ----------*/
    // Check if there are any panorama images present
    const panoramaImages = $('.panorama-img');

    if (panoramaImages.length > 0) {
        const imageContainer = $('.image-container');

        // Create a new PANOLENS.Viewer instance
        const viewer = new PANOLENS.Viewer({
            container: imageContainer.get(0), // Get the DOM element from the jQuery object
            autoRotate: true,
            autoRotateSpeed: 0.5,
            controlBar: false,
        });

        // Loop through each panorama image if there are multiple
        panoramaImages.each(function () {
            // Get the image source from the current HTML element
            const panoramaImageSrc = $(this).attr('src');

            // Create a new PANOLENS.ImagePanorama instance using the image source
            const panoramaImage = new PANOLENS.ImagePanorama(panoramaImageSrc);

            // Add the panorama image to the viewer
            viewer.add(panoramaImage);
        });
    }

    /*  footer animation  */
    $(".th-screen").length && $(window).on("scroll", function () {
            ! function (t, a = 0) {
                var i = $(window).scrollTop(),
                    o = i + $(window).height(),
                    s = $(t).offset().top;
                return s + $(t).height() - parseInt(a) <= o && s >= i
            }
            (".th-screen", 200) ? $(".th-screen").removeClass("th-visible"): $(".th-screen").addClass("th-visible")
        }),

        /*----------- 00. Woocommerce Toggle ----------*/
        // Ship To Different Address
        $("#ship-to-different-address-checkbox").on("change", function () {
            if ($(this).is(":checked")) {
                $("#ship-to-different-address")
                    .next(".shipping_address")
                    .slideDown();
            } else {
                $("#ship-to-different-address").next(".shipping_address").slideUp();
            }
        });

    // Login Toggle
    $(".woocommerce-form-login-toggle a").on("click", function (e) {
        e.preventDefault();
        $(".woocommerce-form-login").slideToggle();
    });

    // Coupon Toggle
    $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
        e.preventDefault();
        $(".woocommerce-form-coupon").slideToggle();
    });

    // Woocommerce Shipping Method
    $(".shipping-calculator-button").on("click", function (e) {
        e.preventDefault();
        $(this).next(".shipping-calculator-form").slideToggle();
    });

    // Woocommerce Payment Toggle
    $('.wc_payment_methods input[type="radio"]:checked')
        .siblings(".payment_box")
        .show();
    $('.wc_payment_methods input[type="radio"]').each(function () {
        $(this).on("change", function () {
            $(".payment_box").slideUp();
            $(this).siblings(".payment_box").slideDown();
        });
    });

    // Woocommerce Rating Toggle
    $(".rating-select .stars a").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            $(this).siblings().removeClass("active");
            $(this).parent().parent().addClass("selected");
            $(this).addClass("active");
        });
    });

    // Quantity Plus Minus ---------------------------

    $(".quantity-plus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal)) {
                $qty.val(currentVal + 1);
            }
        });
    });

    $(".quantity-minus").each(function () {
        $(this).on("click", function (e) {
            e.preventDefault();
            var $qty = $(this).siblings(".qty-input");
            var currentVal = parseInt($qty.val(), 10);
            if (!isNaN(currentVal) && currentVal > 1) {
                $qty.val(currentVal - 1);
            }
        });
    });

    // /*----------- 00.Color Scheme ----------*/
    $('.color-switch-btns button').each(function () {
        // Get color for button
        const button = $(this);
        const color = button.data('color');
        button.css('--theme-color', color);

        // Change theme color on click
        button.on('click', function () {
            const clickedColor = $(this).data('color');
            $('body').css('--theme-color', clickedColor);
        });
    });
    if ($('[theme-color]').length > 0) {
        $('[theme-color]').each(function () {
            var $color = $(this).attr('theme-color');
            $(this).get(0).style.setProperty('--theme-color', $color);
            $(this).removeAttr('theme-color');
        });
    };
    if ($('[title-color]').length > 0) {
        $('[title-color]').each(function () {
            var $color = $(this).attr('title-color');
            $(this).get(0).style.setProperty('--title-color', $color);
            $(this).removeAttr('title-color');
        });
    };

    $(document).on('click', '.switchIcon', function () {
        $('.color-scheme-wrap').toggleClass('active');
    });

    // /*----------- Pricing-switch & Tab ----------*/
    var e = document.getElementById("filt-monthly"),
        d = document.getElementById("filt-yearly"),
        t = document.getElementById("switcher"),
        m = document.getElementById("monthly"),
        y = document.getElementById("yearly");


    if ($('.pricing-tabs').length) {
        e.addEventListener("click", function () {
            t.checked = false;
            e.classList.add("toggler--is-active");
            d.classList.remove("toggler--is-active");
            m.classList.remove("hide");
            y.classList.add("hide");
        });

        d.addEventListener("click", function () {
            t.checked = true;
            d.classList.add("toggler--is-active");
            e.classList.remove("toggler--is-active");
            m.classList.add("hide");
            y.classList.remove("hide");
        });

        t.addEventListener("click", function () {
            d.classList.toggle("toggler--is-active");
            e.classList.toggle("toggler--is-active");
            m.classList.toggle("hide");
            y.classList.toggle("hide");
        });
    }

    /* ==================================================
			# Wow Init
		 ===============================================*/
    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true
    });
    new WOW().init(); 


    /* Image Reveal Animation */
    if ($('.reveal').length) {
        gsap.registerPlugin(ScrollTrigger);
        let revealContainers = document.querySelectorAll(".reveal");
        revealContainers.forEach((container) => {
            let image = container.querySelector("img");
            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    toggleActions: "play none none none"
                }
            });
            tl.set(container, {
                autoAlpha: 1
            });
            tl.from(container, 1, {
                xPercent: -100,
                ease: Power2.out
            });
            tl.from(image, 1, {
                xPercent: 100,
                scale: 1,
                delay: -1,
                ease: Power2.out
            });
        });
    }


    /* Text Effect Animation */

    if ($('.text-anime').length) {
        let animatedTextElements = document.querySelectorAll('.text-anime');

        animatedTextElements.forEach((element) => {
            //Reset if needed
            if (element.animation) {
                element.animation.progress(1).kill();
                element.split.revert();
            }

            element.split = new SplitText(element, {
                type: "lines,words,chars",
                linesClass: "split-line",
            });
            gsap.set(element, {
                perspective: 400
            });

            gsap.set(element.split.chars, {
                opacity: 0,
                x: "50",
            });

            element.animation = gsap.to(element.split.chars, {
                scrollTrigger: {
                    trigger: element,
                    start: "top 90%"
                },
                x: "0",
                y: "0",
                rotateX: "0",
                opacity: 1,
                duration: 1,
                ease: Back.easeOut,
                stagger: 0.02,
            });
        });
    }


    gsap.registerPlugin(ScrollTrigger);

    const myText = new SplitType('.title-ani', {
        types: 'chars'
    });

    gsap.registerPlugin(ScrollTrigger);


    /* header  title animation start*/
    gsap.registerPlugin(ScrollTrigger, SplitText);

function initSplitTextAnimations() {
  document.querySelectorAll(".split-text").forEach((element) => {
    if (element._split) {
      element._split.revert();
      element._split = null;
    }

    const split = new SplitText(element, { type: "words" });
    element._split = split;

    // Initial set
    gsap.set(split.words, {
      opacity: 0,
      scale: (i) => (i % 2 === 0 ? 0 : 2),
      transformOrigin: "center center",
    });

    gsap.to(split.words, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none none",
        onEnter: () => ScrollTrigger.refresh(),
      },
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      onComplete: () => ScrollTrigger.refresh(),
    });
  });

  ScrollTrigger.refresh();
}

document.addEventListener("DOMContentLoaded", () => {
  initSplitTextAnimations();
});


   // hover reveal start
    if (document.querySelectorAll(".hover-reveal").length > 0) { 
        const hoverText = document.querySelectorAll(".hover-reveal");

        function moveText(e, hoverText) {
            const item = hoverText.getBoundingClientRect();
            const x = e.clientX - item.x;
            const y = e.clientY - item.y;
            if (hoverText.children[0]) {
                hoverText.children[0].style.transform = `translate(${x}px, ${y}px)`;
            }
        }
        hoverText.forEach((item, i) => {
            item.addEventListener("mousemove", (e) => {
                setInterval(moveText(e, item), 100);
            });
        });
    }
    // hover reveal end

    /* header  title animation end */
    if ($(".gallery-row").length > 0) {
        const imgzoom1 = document.querySelectorAll(".gallery-row .gallery-box");

        imgzoom1.forEach((element) => {

            gsap.set(element, {
                scale: 0
            });

            gsap.to(element, {
                duration: 1.2,
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom-=100",
                    end: "bottom top+=100",
                    toggleActions: "play reverse play reverse"
                }
            });
        })
    }


        // /*----------- 00.Gsap Cursor ----------*/
         if (document.querySelectorAll(".cursor , cursor2").length > 0) { 
    var cursor = $(".cursor"),
    follower = $(".cursor2");

    var posX = 0,
        posY = 0;

    var mouseX = 0,
        mouseY = 0;

    TweenMax.to({}, 0.016, {
    repeat: -1,
    onRepeat: function() {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
            css: {
            left: posX - 12,
            top: posY - 12
            }
        });

        TweenMax.set(cursor, {
            css: {
            left: mouseX,
            top: mouseY
            }
        });
    }
    });

    $(document).on("mousemove", function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    //circle
    $(".btn").on("mouseenter", function() {
        cursor.addClass("active");
        follower.addClass("active");
    });
    $(".btn").on("mouseleave", function() {
        cursor.removeClass("active");
        follower.removeClass("active");
    });   
}

    // CURSOR End
  
    /* ---------------- footer gsap animation ----------------*/
    if ($('.cursor-picture').length) {
        if (document.querySelectorAll('.cursor-picture').length) {
            const images = document.querySelectorAll(".cursor-picture");
            const container = document.querySelector(".gsap-cursor");
            let lastX = 0;
            let lastY = 0;
            let index = 0;
            const minDistance = 100;
            const activeImages = new Set();
            let mouseX = 0,
                mouseY = 0;
            let needsUpdate = false;
            let animationReady = false;

            // Ensure container is positioned relatively
            container.style.position = "relative";

            // Initial GSAP animation
            gsap.timeline({
                onComplete: () => {
                    animationReady = true;
                }
            })

            // On mouse move
            container.addEventListener("mousemove", (e) => {
                if (!animationReady) return;
                mouseX = e.clientX - container.getBoundingClientRect().left;
                mouseY = e.clientY - container.getBoundingClientRect().top;
                needsUpdate = true;
            });

            gsap.ticker.add(() => {
                if (!needsUpdate || !animationReady) return;
                needsUpdate = false;

                if (Math.hypot(mouseX - lastX, mouseY - lastY) < minDistance) return;

                lastX = mouseX;
                lastY = mouseY;

                if (index >= images.length) index = 0;
                const img = images[index++];

                if (activeImages.has(img)) return;
                activeImages.add(img);

                // Ensure the image is styled correctly
                gsap.set(img, {
                    position: 'absolute',
                    left: mouseX - img.naturalWidth / 2 + "px",
                    top: mouseY - img.naturalHeight / 2 + "px",
                    scale: 0.8,
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: 9999
                });

                gsap.timeline()
                    .to(img, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                    .to(img, {
                        opacity: 1,
                        duration: 0.1
                    })
                    .to(img, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: "power2.in"
                    })
                    .call(() => {
                        activeImages.delete(img);
                    });
            });
        }
    }

    
    // ---------- Smooth Scroll ----------
    gsap.registerPlugin(ScrollTrigger);

    let lenis;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function initializeLenis() {
        lenis = new Lenis({
            lerp: 0.07, // Smoothing factor
        });

        lenis.on("scroll", ScrollTrigger.update);

        // Use GSAP's ticker to sync with animations
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Allow native scroll inside specified elements
        document.querySelectorAll(".mega-scroll").forEach((el) => {
            el.addEventListener("wheel", (e) => e.stopPropagation(), {
                passive: true
            });
            el.addEventListener("touchmove", (e) => e.stopPropagation(), {
                passive: true
            });
        });
    }


    /* Main js */
    /* -----------------*/


    // /*----------- 00. Right Click Disable ----------*/
    //   window.addEventListener('contextmenu', function (e) { 
    //     // do something here... 
    //     e.preventDefault();   
    //   }, false);  

    // /*----------- 00. Inspect Element Disable ----------*/
    //   document.onkeydown = function (e) {
    //     if (event.keyCode == 123) { 
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
    //       return false;
    //     }
    //     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) { 
    //       return false;
    //     }
    //   }   

})(jQuery);

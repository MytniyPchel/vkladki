
var mainReachGoals = [];
function reachGoal(goal) {
    var YaGoal;
    if (YA_COUNTER) {
        try {
            YaGoal = eval(YA_COUNTER);
            if ($.inArray(goal, mainReachGoals) < 0) {
                mainReachGoals.push(goal);
                YaGoal.reachGoal(goal);
                console.log(goal);
            }
        } catch(e) {

        }
    }
}
// object-fit polyfill (for img)
if ('objectFit' in document.documentElement.style === false) {
    document.addEventListener('DOMContentLoaded', function () {
        Array.prototype.forEach.call(document.querySelectorAll('img[data-object-fit]'), function (image) {
            (image.runtimeStyle || image.style).background = 'url("' + image.src + '") no-repeat 50%/' + (image.currentStyle ? image.currentStyle['object-fit'] : image.getAttribute('data-object-fit'));

            image.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'' + image.width + '\' height=\'' + image.height + '\'%3E%3C/svg%3E';
        });
    });
}
// include sprite SVG from localStorage
(function (window, document) {
    'use strict';

    var file = '/images/sprite.svg',
        revision = 1;

    if (!document.createElementNS || !document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect)
        return true;

    var isLocalStorage = 'localStorage' in window && window['localStorage'] !== null,
        request,
        data,
        insertIT = function () {
            document.body.insertAdjacentHTML('afterbegin', data);
        },
        insert = function () {
            if (document.body) insertIT();
            else document.addEventListener('DOMContentLoaded', insertIT);
        };

    if (isLocalStorage && localStorage.getItem('inlineSVGrev') == revision) {
        data = localStorage.getItem('inlineSVGdata');
        if (data) {
            insert();
            return true;
        }
    }

    try {
        request = new XMLHttpRequest();
        request.open('GET', file, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = request.responseText;
                insert();
                if (isLocalStorage) {
                    localStorage.setItem('inlineSVGdata', data);
                    localStorage.setItem('inlineSVGrev', revision);
                }
            }
        }
        request.send();
    }
    catch (e) {
    }

}(window, document));
svg4everybody();

$(function() {
    // Fix для iPad и iPhone устранение скачков при фокусе инпутов
    (function () {
        var $window = $(window),
            temp = 0,
            is_touch = false;
            $body = $('body');
        $('[data-toggle="modal"]').one('click', function(event) {
            if (/(iPad|iPhone)/i.test(navigator.userAgent)) {
                is_touch = true;
            }
        });
        $('.modal').on('shown.bs.modal', function(){
            if (is_touch) {
                temp = $window.scrollTop();
                $window.scrollTop(0);
                $body.css({
                    'position': 'fixed',
                    'width': '100%'
                });
            }
        });
        $('.modal').on('hidden.bs.modal', function(){
            if (is_touch) {
                $window.scrollTop(temp);
                $body.attr('style', $body.attr('style').replace(/(.*?)(\s?position:\s?fixed;?\s?width:\s?100%;?)(.*)/ig, '$1$3'));
            }
        });
    })();

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    function setCookie(name, value, options) {
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    }

    function deleteCookie(name) {
        setCookie(name, "", {
            expires: -1
        })
    }

    // Проверка города
    // (function() {
    //     if (!getCookie('gf_master')) { // проверка, произошла ли авторизация в админку
    //         var gfRegionChecked = getCookie('gf_region_selected'),
    //             citiesContainer = document.querySelector('[data-js="header-cities"]');
    //         if (citiesContainer) {
    //             var citiesLink = citiesContainer.querySelectorAll('[class*=_list] a'),
    //                 domain = '.savannaspb.ru';

    //             if (gfRegionChecked === 'false' || gfRegionChecked === undefined) {

    //                 var templates = document.createElement('div'),
    //                     overflowActive = citiesContainer.querySelector('[data-js="overflow-active"]');
    //                 var selectRegion = overflowActive.querySelector('span').textContent;

    //                 // Проверка gf_region, если не установлен, то установка дефолтных значений
    //                 var gfRegion = getCookie('gf_region') === undefined ? 
    //                         selectRegion || 'Санкт-Петербург' 
    //                         : 
    //                         getCookie('gf_region');

    //                 templates.className = "header_cities_detector";
    //                 templates.innerHTML = 
    //                     '<div class="header_cities_detector_text">Ваше местоположение '+ gfRegion +'?</div>' +
    //                     '<div class="header_cities_detector_control">' +
    //                         '<button class="button __size-md __style-1" type="button">Да</button>' +
    //                         '<button class="link __style-2 __pseudo" type="button">Выбрать другое</button>' +
    //                     '</div>';
    //                 Array.prototype.forEach.call(templates.querySelectorAll('button'), function(button, index) {
    //                     switch(index) {
    //                         case 0:
    //                             button.addEventListener('click', function() {
    //                                 // установка gf_region если он не установлен с сервера
    //                                 if (getCookie('gf_region') === undefined) {
    //                                     setCookie('gf_region', gfRegion, {
    //                                         domain: domain,
    //                                         expires: 30*24*3600
    //                                     });
    //                                 }
    //                                 if (gfRegion !== selectRegion) {
    //                                     Array.prototype.forEach.call(citiesLink, function(link) {
    //                                         if (link.textContent === gfRegion) {
    //                                             setCookie('gf_region', link.textContent, {
    //                                                 domain: domain,
    //                                                 expires: 30*24*3600
    //                                             });
    //                                             window.location.href = link.getAttribute('href');
    //                                         }
    //                                     });
    //                                 }
    //                                 setCookie('gf_region_selected', 'true', {
    //                                     domain: domain,
    //                                     expires: 30*24*3600
    //                                 });
    //                                 removeTemplates();
    //                             });
    //                             break;
    //                         case 1:
    //                             button.addEventListener('click', function() {
    //                                 removeTemplates();
    //                                 var event = document.createEvent('HTMLEvents');
    //                                 event.initEvent('click', true, false);
    //                                 setTimeout(function() {
    //                                     overflowActive.dispatchEvent(event);
    //                                 }, 0);
    //                             });
    //                             break;
    //                     }
    //                 });

    //                 function removeTemplates() {
    //                     templates.parentNode.removeChild(templates);
    //                     templates = null;
    //                 }

    //                 citiesContainer.appendChild(templates);
    //                 setTimeout(function() {
    //                     templates.className += " is-open";
    //                 }, 500);
    //             }
                
    //             // Обработка выбора города из списка
    //             if (citiesLink.length) {
    //                 Array.prototype.forEach.call(citiesLink, function(link) {
    //                     link.addEventListener('click', function(event) {
    //                         setCookie('gf_region_selected', 'true', {
    //                             domain: domain,
    //                             expires: 30*24*3600
    //                         });
    //                         setCookie('gf_region', this.textContent, {
    //                             domain: domain,
    //                             expires: 30*24*3600
    //                         });
    //                     });
    //                 });
    //             }
    //         }
    //     }
    // })();

    // fix multiopen bootstrap modal
    $(document).on('show.bs.modal', '.modal', function () {
        var zIndex = 1040 + (10 * $('.modal:visible').length);
        $(this).css('z-index', zIndex);
        setTimeout(function() {
            $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
        }, 0);
    });
    $(document).on('hidden.bs.modal', '.modal', function () {
        if ($('.modal:visible').length)
            $('body').addClass('modal-open');
    });

    // Очистка TabNames при переходе на Главную
    var tabIdInterval = null;
    $('a[href="/"]').on('click', function(event) {
        clearInterval(tabIdInterval);
        setCookie('tabNames', '', {
            domain: '.savannaspb.ru',
            path: '/',
            expires: -1
        });
    });

    // Переключение между вкладками Физических и Юридических лиц
    var $menuTabs = $('[data-js="menu-tabs"] a');
    var changeMainTabs = function($tab, duration) {
        if ($tab.hasClass('__active')) {
            return false;
        } else {
            var tabName = $tab.data('tab');
            clearInterval(tabIdInterval);
            setCookie('tabNames', tabName, {
                domain: '.savannaspb.ru',
                path: '/'
            });
            $menuTabs.removeClass('__active');
            $('.header_tabs_i[data-tab="' + tabName + '"]')
                .addClass('__active');
            $('.f-tabs_link[data-tab="' + tabName + '"]')
                .addClass('__active');
            $('.navigation-tab')
                .stop(true, true)
                .hide();
            $('.navigation-tab[data-main-tab="' + tabName + '"]')
                .stop(true, true)
                .fadeIn(duration);
        }
    };
    $menuTabs.on('click', function() {
        var tab = $(this)
                .data('tab'),
            $runner = $('.f-tabs_runner');
        changeMainTabs($(this), 800);

        adaptiveMenuHide();
        if ($(window)
                .width() <= 1230) {
            adaptiveMenu();
            menuVisible = true;
        }
        switch (tab) {
            case 'nav-ur':
                $runner.animate({
                    left: $('.f-tabs_item')
                        .eq(0)
                        .outerWidth(true) + 'px'
                }, {queue: false});
                break;
            case 'nav-fz':
                $runner.animate({
                    left: 0 + 'px'
                }, {queue: false});
                break;
            default:
                break;
        }
        $runner.css('width', $('.f-tabs_link.__active')
            .outerWidth());
        if ($(this)
                .hasClass('f-tabs_link'))
            return false;
    });
    var tabName = getCookie('tabNames');
    if (!tabName) {
        tabName = 'nav-fz';
    }
    if (tabName === 'nav-ur') {
        tabIdInterval = setInterval(function() {
            setCookie('tabNames', tabName, {
                domain: '.savannaspb.ru',
                path: '/',
                expires: 4
            });
        }, 1000);
    }
    $('.f-tabs_link')
        .removeClass('__active');
    $('.f-tabs_link[data-tab="' + tabName + '"]')
        .addClass('__active');
    $('.navigation-tab')
        .hide();
    $('.navigation-tab[data-main-tab="' + tabName + '"]')
        .show();

    // Для футера
    function adaptiveFooterRunner() {
        var $runner = $('.f-tabs_runner');
        if (tabName === 'nav-ur') {
            $runner.css({
                left: $('.f-tabs_item')
                    .eq(0)
                    .outerWidth(true) + 'px'
            });
        }
        else if (tabName === 'nav-fz') {
            $runner.css({
                left: 0 + 'px'
            });
        }
        $runner.css('width', $('.f-tabs_link.__active')
            .outerWidth());
    }

    //*** Переключение между вкладками Физисеских и Юридических лиц
    // Перемещение блока акций на главной странице
    $(function() {
        $('.js-sales-pane')
            .append($('.js-sales-move .sales'));
        $('.js-sales-move')
            .remove();
        $('.js-sales-pane')
            .removeClass('js-sales-pane');
    });
    // Плавная прокрутка по якорям
    $('.js-scroll')
        .bind("click", function(e) {
            var anchor = $(this);
            if (anchor.attr('href') === '#top') {
                $('html, body')
                    .stop()
                    .animate({
                        scrollTop: 0
                    }, 1000);
            }
            else {
                $('html, body')
                    .stop()
                    .animate({
                        scrollTop: $(anchor.attr('href'))
                            .offset().top - 10
                    }, 1000);
            }
            e.preventDefault();
        });
    var Up = $('.js-scroll[href="#top"]');
    var Top = 400;

    function showScrollTop() {
        var document_height = $(document)
            .height();
        var window_height = $(window)
            .height();
        var window_scroll = $(window)
            .scrollTop();
        ( window_scroll > Top ) ? Up.fadeIn(600) : Up.fadeOut(600);
        if (document_height - window_scroll - window_height < 755) {
            Up.css({
                'bottom': '845px',
                'position': 'absolute'
            })
        } else {
            Up.css({
                'bottom': '6%',
                'position': 'fixed'
            })
        }
        site_up_button();
        if (window_scroll > window_height) {
            $('.site_up_button')
                .fadeIn('fast');
        } else {
            $('.site_up_button')
                .fadeOut('fast');
        }
    }

    $(window)
        .scroll(function() {
            showScrollTop()
        });
    showScrollTop();
    function site_up_button() {
        var min_margin = 55;
        var $btn = $('.site_up_button');
        var wrapper = $('.footer .container')
            .offset();
        if (wrapper.left > min_margin) {
            $btn.css('left', wrapper.left - min_margin);
        } else {
            $btn.css('left', 15);
        }
    }

    // Select language box
    var lang;
    var slided = false;
    $('.lang-select__box')
        .click(function() {
            lang = $(this)
                .data('lang');
            $('.lang-select__item[data-lang="' + lang + '"]')
                .hide();
            if (slided === false) {
                $('.lang-select__list')
                    .slideDown(200);
                slided = true;
            }
            else {
                $('.lang-select__list')
                    .slideUp(400);
                slided = false;
            }
            $(document)
                .mouseup(function(e) { // событие клика по веб-документу
                    var div = $('.lang-select__list'); // тут указываем ID элемента
                    if (!div.is(e.target) // если клик был не по нашему блоку
                        && div.has(e.target).length === 0) { // и не по его дочерним элементам
                        div.slideUp(200, function() {
                            slided = false;
                            $('.lang-select__item')
                                .show();
                        }); // скрываем его
                    }
                    $(document)
                        .off('mouseup');
                });
        });
    $('.lang-select__item')
        .click(function() {
            lang = $(this)
                .data('lang');
            $('.lang-select__box')
                .attr('data-lang', lang)
                .data('lang', lang)
                .html('<img class="lang-select__icon" src="images/lang-' + lang + '.png" alt="">' + lang.toUpperCase());
            $('.lang-select__list')
                .slideUp(300, function() {
                    slided = false;
                    $('.lang-select__item')
                        .show();
                });
        });

    // Cyties selector
    $('[data-js="overflow-menu-header-cities"]').overflowMenu();

    // Custom select
    $(".chosen, select")
        .on('chosen:ready', function(evt, params) {
            $(this)
                .parent()
                .addClass('__chosen-active');
        })
        .chosen({
            disable_search: true,
            width: '100%',
            no_results_text: 'Совпадений не найдено'
        });
    $(document)
        .ready(function() {
            $(".fancybox")
                .fancybox({
                    padding: 0, //убираем отступ
                    helpers: {
                        overlay: {
                            locked: false // отключаем блокировку overlay
                        }
                    },
                    tpl: {
                        closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>',
                        next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg class="icon icon-right_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right_arrow"></use></svg></span></a>',
                        prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg class="icon icon-left_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-left_arrow"></use></svg></span></a>'
                    }
                });
        });
    // BX SLIDER
    $(function() {
        $(document)
            .ready(function() {
                var eventsSlideshow = $('.events__slideshow')
                    .bxSlider({
                        slideWidth: 270,
                        minSlides: 1,
                        maxSlides: 4,
                        moveSlides: 1,
                        slideMargin: 30,
                        infiniteLoop: false,
                        pager: false,
                        nextSelector: '.events__next',
                        prevSelector: '.events__prev'
                    });
                if (eventsSlideshow.length !== 0) {
                    var eventsSlideQty = eventsSlideshow.getSlideCount();
                    if (eventsSlideQty < 4) {
                        $('.events__control')
                            .hide();
                    }
                }
            });
    });
    // Reviews forms tabs
    $(function() {
        $('.form-tabs span')
            .click(function(e) {
                e.preventDefault();
                //'form-tabs'
                var tab = $(this)
                    .data('link');
                $('.form-tabs span')
                    .addClass('form-tabs__link');
                $(this)
                    .removeClass('form-tabs__link');
                $('.form-tabs-pane__item')
                    .hide();
                $(tab)
                    .fadeIn(600);
                $('.form-tabs')
                    .children()
                    .removeClass('form-tabs__green');
                $(this)
                    .parent()
                    .addClass('form-tabs__green');
            });
    });
    // custom file upload
    var wrapper = $(".file_upload"),
        inp = wrapper.find("input"),
        btn = wrapper.find("button"),
        lbl = wrapper.find("div");
    btn.focus(function() {
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function() {
        wrapper.addClass("focus");
    })
        .blur(function() {
            wrapper.removeClass("focus");
        });
    // Yep, it works!
    btn.add(lbl)
        .click(function() {
            inp.click();
        });
    // Crutches for the :focus style:
    btn.focus(function() {
        wrapper.addClass("focus");
    })
        .blur(function() {
            wrapper.removeClass("focus");
        });
    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;
    inp.change(function() {
        var file_name;
        if (file_api && inp[0].files[0])
            file_name = inp[0].files[0].name;
        else
            file_name = inp.val()
                .replace("C:\\fakepath\\", '');
        if (!file_name.length)
            return;
        if (lbl.is(":visible")) {
            lbl.text(file_name);
        } else
            btn.text(file_name);
    })
        .change();
    // Read more reviews
    var reviewsAddReadMore = function() {
        $('.reviews_i')
            .each(function() {
                var haveReadMore = $(this)
                    .find('.reviews_read-more');
                if (haveReadMore.length === 0) {
                    var answerText = $(this)
                        .children('.reviews_answer')
                        .text().length;
                    if (answerText > 500) {
                        $(this)
                            .children('.reviews_answer')
                            .after('<div class="reviews_read-more"><a href="#" class="reviews_read-more_link">Читать ответ полностью</a></div>')
                            .css('height', '125px');
                    }
                }
            });
        $('.reviews_read-more_link').on('click', function() {
            var $el = $(this);
            $el
                .parent('.reviews_read-more')
                .hide();
            $el
                .parent('.reviews_read-more')
                .prev('.reviews_answer')
                .height('auto');
            return false;
        });
    };
    reviewsAddReadMore();
    (function($container) {
        if ($container.length) {
            $container.each(function(index, el) {

                var $this = $(el);
                var $link = $this.find('[class*="_more"]');

                $link.on('click', function(event) {
                    event.preventDefault();
                    $this.removeClass('__hide');
                    $link.remove();
                });
                
            });
        }
    })($('[data-js="reviews-more"]'));
    // Получение токена из мета тега csrf-token
    var metaToken = (function() {
        var token = $('meta[name="csrf-token"]')
            .attr('content');
        if (token) {
            return token;
        }
        else {
            return false;
        }
    }());
    // автоподгрузка по скроллу
    $(function() {
        if ($('.js-load').length > 0) {
            var $this = $('.js-load');
            var loadPage = 0;
            var loading = false;
            var loadType = $this.data('type');
            var loadUrl = $this.data('url');
            var loadBlock = $this.data('block');
            $(window)
                .scroll(function() {
                    var offsetTop = $(document)
                            .height() - $('.footer')
                            .height();
                    ;
                    var top = $(window)
                            .scrollTop() + $(window)
                            .height();
                    if (top >= offsetTop) {
                        if (loading == false) {
                            loading = true;
                            loadPage++;
                            $.post(loadUrl, {type: loadType, page: loadPage, _csrf: metaToken},
                                function(result) {
                                    $('.' + loadBlock)
                                        .append(result.dat);
                                    if (result.pager == 0) {
                                        $('.js-load')
                                            .remove();
                                    } else
                                        loading = false;
                                }, 'json');
                        }
                    }
                });
        }
    });
    // BX SLIDER PRICE AND SERVICES
    $(function() {
        $(document)
            .ready(function() {
                $('.js-sales-slider')
                    .bxSlider({
                        slideWidth: 210,
                        minSlides: 1,
                        maxSlides: 5,
                        moveSlides: 1,
                        slideMargin: 15,
                        infiniteLoop: true,
                        pager: false,
                        nextSelector: '.sales__btn',
                        nextText: ''
                    });
            });
    });
    // mask for all inputs
    $(function() {
        $("[data-js-mask]")
            .each(function() {
                $(this)
                    .mask($(this)
                        .data("js-mask"))
            });
        (function(factory) {
            if (typeof define === "function" && define.amd) {

                // AMD. Register as an anonymous module.
                define(["../datepicker"], factory);
            } else {

                // Browser globals
                factory(jQuery.datepicker);
            }
        }(function(datepicker) {
            datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: '&#x3C;Пред',
                nextText: 'След&#x3E;',
                currentText: 'Сегодня',
                monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
                monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                    'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
                dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
                dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
                dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
                weekHeader: 'Нед',
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''
            };
            datepicker.setDefaults(datepicker.regional['ru']);
            return datepicker.regional['ru'];
        }));
        //подключение датапикера
        $(".js-datapicker")
            .datepicker({
                altFormat: "dd.mm.yy",
                changeMonth: true,
                changeYear: true,
                yearRange: '1945:+nn',
                defaultDate: new Date(1995, 0, 1),
                showOtherMonths: true
            });
        $(".js-datapicker-no-select")
            .datepicker({
                altFormat: "dd.mm.yy",
                changeMonth: false,
                changeYear: false,
                yearRange: '1945:+nn',
                showOtherMonths: true,
                minDate: 0
            });
        // подключение базовых эелементов формы
        // TODO удалить после рефакторинга
         $('input[type="checkbox"]:not(.checkbox):not(._inited):not(.default)')
             .each(function() {
                 $(this)
                     .addClass('_inited')
                     .button()
                     .button("widget")
                     .addClass('ui-type-checkbox');
             });
         $('input[type="radio"]:not(.radio-button):not(._inited):not(.default)')
             .each(function() {
                 $(this)
                     .addClass('_inited')
                     .button()
                     .button("widget")
                     .addClass('ui-type-radio');
             });
        $('.js-toggle-map')
            .on('click', function() {
                var target = $(this)
                        .data('target'),
                    $wrapperMap = $('#' + target);
                if (!$(this)
                        .hasClass('__open')) {
                    if (!$wrapperMap.hasClass('__map-isset')) {
                        $wrapperMap.parent()
                            .show();
                        geo.initialize($(this)
                            .attr('data-coords'), $(this)
                            .parent()
                            .find('.js-address-map')
                            .text(), target);
                        $wrapperMap.addClass('__map-isset');
                    }
                    $wrapperMap.parent()
                        .show();
                    $(this)
                        .addClass('__open');
                } else {
                    $wrapperMap.parent()
                        .hide();
                    $(this)
                        .removeClass('__open');
                }
            });
    });
    var Gallery = {
        fotorama: null,
        init: function () {
            var $fotoramaDiv = $('.gallery-slideshow').fotorama();
            this.fotorama = $fotoramaDiv.data('fotorama');
            $('#gallery-popup').hide();
            this.reload();
            $('.gallery__block, .vacancies-gallery').on('click', '.gallery__item', Gallery.show);
            $('.show-gallery-more').on('click', this.more);
        },
        reload: function () {
            var data = [];
            $('.gallery__item').each(function(){
                var picId = $(this).data('ids');
                var picSrc = $(this).children('img').attr('full-src');
                if (picSrc == 'undefined') {
                    picSrc = $(this).children('img').attr('src');
                }
                data.push({img: picSrc, thumb: picSrc, id: 'wp-' + picId});
            });
            Gallery.fotorama.load(data);
        },
        more: function () {
            $('.vacancies-gallery').find('.hidden').removeClass('hidden');
            $('.vacancies-gallery .fancybox').addClass('gallery__item');
            Gallery.reload();
            $(this).remove();
            return false;
        },
        show: function() {
            Gallery.fotorama.show({
                index: 'wp-' + $(this).data('ids'),
                time: 0
            });
        }
    };
    if ($('.gallery-slideshow').length) {
        Gallery.init();
    }
    // SLIDER WALLPAPERS
    $(function() {
        $('.wallpaper-link')
            .each(function() {
                var picId = $(this)
                    .data('ids');
                var picSrc = $(this)
                    .children('.wallpaper')
                    .attr('full-src');
                if (picSrc == 'undefined')
                    picSrc = $(this)
                        .children('.wallpaper')
                        .attr('src');
                $('.wallpapers-slideshow')
                    .append('<img src="' + picSrc + '" id="wp-' + picId + '" data-picid="' + picId + '">');
            });
        // 1. Initialize fotorama manually.
        var $fotoramaDiv = $('.wallpapers-slideshow')
            .on('fotorama:show', function(e, fotorama, extra) {
                $('.wallpapers-dimensions__link')
                    .each(function() {
                        var size = $(this)
                            .data('size');
                        if (size !== undefined) {
                            $(this)
                                .attr('href', '/wallpapers/' + fotorama.activeFrame.picid + size);
                        }
                        else {
                            $(this)
                                .attr('href', '/wallpapers/' + fotorama.activeFrame.picid);
                        }
                    });
            })
            .fotorama();
        // 2. Get the API object.
        var fotorama = $fotoramaDiv.data('fotorama');
        if (fotorama) {
            fotorama.setOptions({
                width: 1280,
                height: 460,
                nav: false,
                arrows: true,
                click: false,
                swipe: false,
                fit: 'cover',
                transition: 'crossfade'
            });
        }
        $('#wallpapers-popup')
            .hide();
        $('.wallpaper-link')
            .click(function() {
                var ids = $(this)
                    .data('ids');
                fotorama.show({
                    index: 'wp-' + ids,
                    time: 0
                });
            });
        // 3. Inspect it in console.
        // console.log(fotorama);
    });
    $(document)
        .ready(function() {
            // init Masonry
            if ($('.l-wallpapers').length) {
                var $grid = $('.l-wallpapers')
                    .masonry({
                        // options...
                    });
                // layout Masonry after each image loads
                $grid.imagesLoaded()
                    .progress(function() {
                        $grid.masonry('layout');
                    });
            }
        });
    // Блок добавить примечание
    $(function() {
        $('.add-note__link')
            .click(function(e) {
                e.preventDefault();
                $(this)
                    .hide();
                $('.add-note__form')
                    .fadeIn();
            });
    });
    // страница акции попап
    $(function() {

        // Для новой страницы акций
        $('[data-fancybox-js]')
            .on('click', function() {
                var dataTarget = $(this)
                    .data('fancyboxJs');
                $.fancybox($(dataTarget), {
                    padding: 15,
                    maxWidth: 573,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    },
                    tpl: {
                        closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>',
                        next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg class="icon icon-right_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right_arrow"></use></svg></span></a>',
                        prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg class="icon icon-left_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-left_arrow"></use></svg></span></a>'
                    }
                });
                return false;
            });
        $('.js-share-fancy')
            .fancybox({
                padding: 30,
                helpers: {
                    overlay: {
                        locked: false // отключаем блокировку overlay
                    }
                },
                tpl: {
                    closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>',
                    next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg class="icon icon-right_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right_arrow"></use></svg></span></a>',
                    prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg class="icon icon-left_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-left_arrow"></use></svg></span></a>'
                }
            });
        $('#shares-popup')
            .hide();
        $('.shares-item__more')
            .click(function() {
                $('#shares-popup .shares-item')
                    .remove();
                $('#shares-popup .shares-popup')
                    .remove();
                $(this)
                    .parent('.shares-item')
                    .find('.shares-popup')
                    .clone()
                    .prependTo('#shares-popup');
                $(this)
                    .parent('.shares-item')
                    .clone()
                    .prependTo('#shares-popup');
                $('#shares-popup')
                    .find('.shares-item__more')
                    .remove();
            });
    });
    // Время в модалке обратный звонок
    (function($container) {
        if ($container.length) {
            $container.each(function(index, el) {
                var $element = $(this);
                var $radioBox = $element.find('input[type="radio"]');
                var $checkedNow = $element.find('[data-time-sheet="now"]'),
                    $checkedOther = $element.find('[data-time-sheet="other"]'),
                    $dateCall = $element.find('[data-time-sheet="date-call"]'),
                    $timeZoneOffset = $element.find('[data-time-sheet="time-zone-offset"]'),
                    $selectDay = $element.find('[data-time-sheet="select-day"]'),
                    $selectTime = $element.find('[data-time-sheet="select-time"]'),
                    $selectContainer = $element.find('.form__row.other-time');

                $selectContainer.hide();
                $timeZoneOffset.val(new Date().getTimezoneOffset() * (-60));

                $radioBox.on('change', function(event) {
                    var $this = $(this);
                    var selectDate = $this.val();
                    // если выбрано другое время, показываем селекты даты и времени
                    if ($this.data('time-sheet') == $checkedOther.data('time-sheet')) {
                        $selectContainer.fadeIn();
                        // перезаписываем дату в скрытом поле значениями из селектов
                        var date = $selectDay.val();
                        var time = $selectTime.val();
                        $dateCall.val(date + ' ' + time);
                        // перезаписываем дату в скрытом поле при изменении даты
                        $selectDay.on('change', function() {
                            var date = $(this).val();
                            var time = $selectTime.val();
                            $dateCall.val(date + ' ' + time);
                        });
                        // перезаписываем дату в скрытом поле при изменении времени
                        $selectTime.on('change', function() {
                            var time = $(this).val();
                            var date = $selectDay.val();
                            $dateCall.val(date + ' ' + time);
                        });
                    }
                    else {
                        // при выборе даты из радиобаттонов скрываем селекты и перезаписываем скрытое поле выбранным значением
                        $selectContainer.fadeOut();
                        $dateCall.val(selectDate);
                    }
                });

                function updateTime() {
                    if ($container.is(':visible')) {
                        var d = new Date();
                        var period = 15;
                        $checkedNow.each(function() {
                            var $this = $(this);
                            var $updateTime = $this.parent().find('[data-time-sheet="update"]');
                            var h = d.getHours();
                            if (h < 10) {
                                h = '0' + h;
                            }
                            var m = d.getMinutes();
                            if (m < 10) {
                                m = '0' + m;
                            }
                            var t = h + ':' + m;
                            var day = d.getDate();
                            if (day < 10) {
                                day = '0' + day;
                            }
                            var month = d.getMonth() + 1;
                            if (month < 10) {
                                month = '0' + month;
                            }
                            var year = d.getFullYear();
                            var date = day + '.' + month + '.' + year;
                            var date_call = date + ' ' + t;

                            if ($updateTime.length) {
                                $updateTime.text(t);
                            }
                            $this.val(date_call);
                            if ($this.is(':checked')) {
                                $dateCall.val(date_call);
                            }
                            d.setMinutes(d.getMinutes() + period);
                        });
                    }
                };

                $('.modal').on('shown.bs.modal', function(event) {
                    updateTime();
                });
                updateTime();
                setInterval(updateTime, 10000);
            });
        }
    })($('[data-js="time-sheet"]'));

    GGUI.textAreaOpens('[data-js="area-opens"]');

    // Благотворительность скролл
    $(function() {
        $(document)
            .ready(function() {
                if ($('.charity-popup__text h1').length) $('.charity-popup__text h1')
                    .remove();
            });
        if ($('.charity-fancybox').length) {
            $('.charity-fancybox')
                .fancybox({
                    loop: false,
                    padding: 0,
                    helpers: {
                        overlay: {
                            locked: false
                        }
                    },
                    tpl: {
                        closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>',
                        next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg class="icon icon-right_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right_arrow"></use></svg></span></a>',
                        prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg class="icon icon-left_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-left_arrow"></use></svg></span></a>'
                    }
                });
        }
        if ($('#slider1').length) {
            $('#slider1')
                .sliderRM({
                    bar: true,//горизонтальный скролл-бар
                    nav: false,//Кнопки навигации вперед-назад
                    items: 12,
                    margin: 20
                });
        }
    });
    //js - scroll - vertical
    $(function() {
        $('.js-scroll-vertical')
            .mCustomScrollbar({
                theme: "3d-thick",
                scrollButtons: {enable: true}
            });
    });
    // Дефолтные табы
    $(function() {
        var duration = 400;
        if ($('.def-tabs').length) {
            $('.def-tabs-pane')
                .hide();
            $('#def-tab-1')
                .show();
            $('.def-tabs__link')
                .click(function(e) {
                    e.preventDefault();
                    if ($(this)
                            .hasClass('def-tabs__link--active')) {
                        return false;
                    }
                    else {
                        var tabName = $(this)
                            .data('href');
                        $('.def-tabs__link')
                            .removeClass('def-tabs__link--active');
                        $(this)
                            .addClass('def-tabs__link--active');
                        $('.def-tabs-pane')
                            .stop(true, true)
                            .hide();
                        $('#' + tabName)
                            .stop(true, true)
                            .fadeIn(duration);
                        // console.log('ok');
                    }
                });
        }
    });
    // Таймпикер
    $(function() {
        $('.js-timepicker')
            .timepicker({
                template: 'dropdown',
                showInputs: false,
                minuteStep: 5,
                showMeridian: false
            });
    });
    // calc
    $(function() {
        var calc = {
            type: $('.js-calc-type.is-active')
                .data('type'),
            dist: $('input[name="dist"]:checked')
                .val(),
            vol: 0,
            price: 0,
            init: function() {
                $('#calc-range')
                    .slider({
                        range: 'min',
                        value: 0,
                        min: 0,
                        max: 26,
                        step: 1,
                        slide: function(event, ui) {
                            calc.vol = ui.value;
                            console.log('vol: ' + calc.vol);
                            $('.calc-range-tooltip__value')
                                .html('<span class="calc-range-tooltip__scale">' + calc.vol + ' м<sup>3</sup> / до 5 т</span><span class="calc-range-tooltip__price">за <span class="calc-range-tooltip__price-n">1 000 Р</span></span>');
                        }
                    });
                $('#calc-range .ui-slider-handle')
                    .html('<span class="calc-range-tooltip"><span class="calc-range-tooltip__value"></span><span class="calc-range-tooltip__triangle"></span></span>');
                $('.calc-range-tooltip__value')
                    .html('<span class="calc-range-tooltip__scale">' + calc.vol + ' м<sup>3</sup> / до 5 т</span><span class="calc-range-tooltip__price">за <span class="calc-range-tooltip__price-n">1 000 Р</span></span>');
                $('.js-calc-type')
                    .click(function(e) {
                        e.preventDefault();
                        $('.js-calc-type')
                            .removeClass('is-active');
                        calc.type = $(this)
                            .addClass('is-active')
                            .data('type');
                        console.log('type: ' + calc.type);
                    });
                $('input[name="dist"]')
                    .change(function() {
                        calc.dist = $(this)
                            .val();
                        //console.log('dist: ' + calc.dist);
                    });
            }
        };
        if ($('.calc').length) {
            calc.init();
            /*console.log('type: ' + calc.type);
             console.log('dist: ' + calc.dist);
             console.log('vol: ' + calc.vol);
             console.log('price: ' + calc.price);*/
        }
    });
    // Попап коммерческое предложение
    $(function() {
        $('.js-commercial-popup')
            .fancybox({
                padding: 30,
                helpers: {
                    overlay: {
                        locked: false // отключаем блокировку overlay
                    }
                },
                tpl: {
                    closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>',
                    next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg class="icon icon-right_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right_arrow"></use></svg></span></a>',
                    prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg class="icon icon-left_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-left_arrow"></use></svg></span></a>'
                }
            });
    });
    // Другой слайдер на главной
    $('[data-js="next-slider"]').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear'
    });
    // Слайдер на главной
    var mainSlider = $('[data-js="bxslider"]')
            .bxSlider({
                mode: 'fade',
                infiniteLoop: true,
                speed: 700,
                pause: 6500,
                controls: false,
                auto: true,
                autoHover: true,
                responsive: false,
                adaptiveHeight: false,
                slideWidth: 'auto',
                onSliderLoad: function() {
                    $('.main-slider_w')
                        .css("visibility", "visible");
                }
            }),
        reloadMainSLider = function(slider) {
            var windowPort = viewport(),
                screenMdDesktop = 992,
                curentSlide = slider.getCurrentSlide();
            if (windowPort.width >= screenMdDesktop) {
                slider
                    .reloadSlider({
                        mode: 'fade',
                        infiniteLoop: true,
                        speed: 700,
                        pause: 6500,
                        controls: false,
                        auto: true,
                        autoHover: true,
                        responsive: false,
                        adaptiveHeight: false,
                        slideWidth: 'auto'
                    });
                slider.goToSlide(curentSlide);
                $('[data-js="main-slider-wrapper"]')
                    .addClass('__desktop');
            }
            else if (windowPort.width < screenMdDesktop) {
                slider
                    .reloadSlider({
                        mode: 'fade',
                        infiniteLoop: true,
                        speed: 700,
                        pause: 6500,
                        controls: false,
                        auto: true,
                        autoHover: true,
                        responsive: true
                    });
                slider.goToSlide(curentSlide);
                $('[data-js="main-slider-wrapper"]')
                    .removeClass('__desktop');
            }
        };
    // Плавная прокрутка
    $('[data-js="smooth-scrolling"] a[href^="#"]')
        .click(function() {
            var target = $(this)
                .attr('href');
            $('html, body')
                .animate({
                    scrollTop: ($(target)
                        .offset().top - 20)
                }, 500);
            if (typeof(window.history.pushState) == 'function') {
                window.history.pushState(null, target, target);
            }
            return false;
        });
    // Контакты в шапке для мобильной версии
    $('[data-js="phone-mobile"]')
        .on('click', function() {
            var $target = $('[data-js="phone-mobile-cnt"]');
            if ($target.filter(':not(:animated)').length > 0) {
                $target
                    .slideToggle(300)
                    .toggleClass('__open');
            }
        });
    // Анимация кнопки меню
    $('[data-js="burger"]')
        .on('click', function() {
            var activeClass = '__open',
                $btn = $(this),
                $nav = $('[data-js="nav-collapsed"]'),
                tabName = getCookie('tabNames');
            if (!tabName) {
                tabName = 'nav-fz';
            }
            $nav = $nav.filter('[data-id="' + tabName + '"]');
            if ($nav.filter(':not(:animated)').length > 0) {
                if ($btn.hasClass(activeClass)) {
                    $btn.removeClass(activeClass);
                    $nav.slideUp(300);
                } else {
                    $btn.addClass(activeClass);
                    $nav.slideDown(300);
                }
            }
        });
    // Анимация меню второго уровня
    $('[data-js="nav-collapsed"] .nav-mobile_li.__parent > a[href="#"], [data-js="nav-collapsed"] .nav-mobile_li.__parent > .nav-mobile_li_arrow')
        .on('click', function() {
            var $el = $(this),
                $wrapper = $el.siblings('div'),
                $ul = $wrapper.find('ul');
            if ($ul.filter(':not(:animated)').length > 0) {
                $wrapper.toggleClass('__open');
                $ul.slideToggle(300);
            }
            return false;
        });
    // Блоки одинаковой высоты
    function oneHeight($object, timeout, callbackFunc) {
        if (!timeout)
            $object.css('height', 'auto');
        var height = 0,
            heightNodes = 0;
        $object.each(function() {
            var height = $(this)
                .height();
            if (heightNodes < height)
                heightNodes = height;
        })
            .height(heightNodes);
        if (callbackFunc)
            callbackFunc();
    }

    // Прокручивание к началу
    $('[data-js="scroll-up"]')
        .on('click', function(e) {
            e.preventDefault();
            $('html, body')
                .animate({
                    scrollTop: 0
                }, 300, 'linear');
        });

    function changeContacts() {
        $('.js-contact-city')
            .change(function() {
                location.href = $(this).val();
            });
    }

    // Подсвечивание активных пунктов меню
    // --------------------------------------
    function menuActive() {
        var pagePath = window.location.pathname;

        function setActive(link) {
            // проходимся по родительским ссылкам навигации
            $('nav a[href="' + link + '"], nav span[data-href="' + link + '"]')
                .addClass('__active')
                .parents('.header_nav_i')
                .addClass('__active');
            // проходимся по ссылкам навигации в футере
            $('.footer__right a[href="' + link + '"]')
                .addClass('active');
        }

        if ($('nav a[href="' + pagePath + '"], nav span[data-href="' + pagePath + '"]').length) {
            setActive(pagePath);
        } else {
            // делим строку на массив
            pagePath = pagePath.split('/');
            pagePath.shift();
            while (pagePath.length > 0) {
                var activeLink = '/' + pagePath.join('/');
                // проверяем есть ли ссылка с таким url
                if ($('nav a[href="' + activeLink + '"], nav span[data-href="' + activeLink + '"]').length) {
                    setActive(activeLink);
                    break;
                }
                pagePath.pop();
            }
        }
    }

    var lgHidden = function() {
        $('nav>ul')
            .each(function() {
                var $ul = $(this);
                var li = '';
                $ul.find('.visible-lg-inline-block a')
                    .each(function() {
                        var $link = $(this);
                        if ($link.attr('href') != '#') {
                            li += '<li class="header_nav_i"><a href="' + $link.attr('href') + '" title="' + $link.text() + '">' + $link.text() + '</a></li>';
                        }
                    });
                if (li != '') {
                    $ul.append('<li class="header_nav_i __parent hidden-lg"><a href="#" title="Ещё">Ещё</a><div class="header_nav_inner"><div class="header_nav_cnt"><div class="header_nav_inner-block"><ul>' + li + '</ul></div></div></li>');
                }
            })
    };
    lgHidden();
    menuActive();
    $(window)
        .on('load', function() {
            oneHeight($('[data-js="one-height-1"]'), true, false);
            // для страницы Контакты
            // cityCode - глобальная переменная с кодом города
            if (typeof cityCode !== 'undefined') {
                oneHeight($('[data-js="one-height-2"]'), true, initializeGmap(cityCode));
                oneHeight($('[data-js="one-height-3"]'), true, initializeGmap(cityCode));
                changeContacts();
            }
            adaptiveFooterRunner();
            if (mainSlider.length)
                reloadMainSLider(mainSlider);
            if (IEdetect()) {
                $('.header_bg_snow-and-stars')
                    .hide();
                $('.header_bg_trees')
                    .hide();
            }
        });
    $(window)
        .on('resize', function() {
            oneHeight($('[data-js="one-height-1"]'), false, false);
            adaptiveFooterRunner();
            if (mainSlider.length)
                reloadMainSLider(mainSlider);
        }.debounce(500));
    var callback_new = {
        count: 7000,
        delay: 40,
        initTick: 0,
        timer_text: '',
        waiting: false,
        init: function() {
            $('.modal').on('submit', '#callback-new-form', callback_new.submitForm);
        },
        timerStart: function() {
            var remaining = (callback_new.count - (callback_new.getNow() - callback_new.initTick)) / 1000;
            remaining = remaining >= 0 ? remaining : 0;
            var secs = remaining.toFixed(2);

            if (remaining)
                setTimeout(callback_new.timerStart, callback_new.delay);
            else {
                $('#js-callback-success').modal("hide");
            }
        },
        submitForm: function() {
            if (callback_new.waiting) {
                return false;
            }
            callback_new.waiting = true;
            reachGoal('callback');
            reachGoal('otpravka_zayavki');
            $.post($(this)
                .attr('action'), $(this)
                .serialize(), function(dat) {
                if (dat.success) {
                    if (typeof zvonokSoloway === "function") {
                        zvonokSoloway();
                    }

                    $('#js-popup-callback').modal('hide');

                    $('#js-callback-success')
                        .find('.modal_title + div b')
                        .text(dat.timer_text)
                        .end()
                        .modal('show');

                    setTimeout(callback_new.timerStart, 2000);
                    callback_new.initTick = callback_new.getNow();
                } else {
                    $('#js-popup-callback').modal('hide');

                    $('#js-callback-success')
                        .find('.modal_title + div')
                        .text("Возникла проблема: попробуйте еще раз через 5 минут или позвоните нам")
                        .end()
                        .modal('show');

                    setTimeout(callback_new.timerStart, 2000);
                    callback_new.initTick = callback_new.getNow();
                }
                callback_new.waiting = false;
            }, 'json');
            return false;
        },
        getNow: function() {
            return window.performance ? window.performance.now() : Date.now();
        }
    };
    callback_new.init();
    var callback_email = {
        count: 27000,
        delay: 40,
        initTick: 0,
        timer_text: '',
        waiting: false,
        init: function() {
            $('.modal').on('submit', '#callback-email-form', callback_email.submitForm);
        },
        submitForm: function() {
            reachGoal('callback');
            reachGoal('otpravka_zayavki');

            $.post($(this)
                .attr('action'), $(this)
                .serialize(), function(dat) {
                if (dat.success) {
                    $('#js-popup-callback-email').modal('hide');
                    $('#js-popup-success-email-request').modal('show');
                    callback_email.initTick = callback_email.getNow();
                }
            }, 'json');
            return false;
        },
        getNow: function() {
            return window.performance ? window.performance.now() : Date.now();
        }
    };
    callback_email.init();

    // Форма авторизации
    var auth_form = {
        count: 27000,
        delay: 40,
        initTick: 0,
        timer_text: '',
        waiting: false,
        init: function() {
            $('.modal').on('submit', '#auth-form', auth_form.submitForm);
            $('.modal').on('click', '#get_pass_by_sms', auth_form.passwordSms);
        },
        passwordSms: function() {
            var $form = $(this).closest('form');
            var $inputRequired = $form.find('input').filter('[name*="phone"]');
            sent_sms_time = 300;

            var form = $('#auth-form');
            var request_data = form.serialize();
            if ($inputRequired.val()) {
                $('#get_pass_by_sms').attr('disabled','disabled');
                $.post(
                    form.attr('action'), 
                    form.serialize() + "&request_type=SMS", 
                    function(dat) {
                        var smsbutton = $('#get_pass_by_sms');
                        if (dat.success) {
                            sms_timer = setInterval(function() {
                                smsbutton.val('Повторить через ' + sent_sms_time);
                                sent_sms_time--;
                                if (sent_sms_time < 1) {
                                    smsbutton.val('Получить пароль');
                                    smsbutton.removeAttr('disabled');
                                    clearInterval(sms_timer);
                                } 

                            }, 1000);
                        } else {
                            smsbutton.removeAttr('disabled');
                            console.log("Ошибка при обработке запроса",dat);
                        }
                }, 'json');
            } else {
                if ($inputRequired.length)
                    $inputRequired.attr('aria-invalid', true);
            }
            return false;
        },
        submitForm: function() {
            var $form = $(this);
            var $inputRequired = $form.find('input').filter('[name*="password"]');
            $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
                success: function(dat) {
                    dat = JSON.parse(dat);
                    if (dat.success !== true) {
                        console.log("Ошибка при обработке запроса",dat);
                        if (dat.success === "Wrong password") {
                            if ($inputRequired.length)
                                $inputRequired.attr('aria-invalid', true);
                        }
                    } else {
                        if (dat.redirect) {
                            window.location.href = dat.redirect;
                        }
                    }
                },
                fail: function(dat) {
                    console.log('fail');
                }
            });
            return false;
        },
        getNow: function() {
            return window.performance ? window.performance.now() : Date.now();
        }
    };
    auth_form.init();    

    // Форма сохранения профиля пользователя
    var profile_form = {
        count: 27000,
        delay: 40,
        initTick: 0,
        timer_text: '',
        waiting: false,
        init: function() {
            $('.container').on('submit', '#profile-form', profile_form.submitForm);
        },
        submitForm: function() {
            
            var form_data = new FormData(this);

            if ($(this).find('[name="SiteUser[photo][]"]').prop('files')) {
                form_data["photo"] = $(this).find('[name="SiteUser[photo][]"]').prop('files')[0];
            }

            if ($(this).find('[name="SiteUser[dogovor][]"]').prop('files')) {
                form_data["dogovor"] = $(this).find('[name="SiteUser[dogovor][]"]').prop('files')[0];
            }

            $.ajax({
                url : $(this).attr('action'),
                type : 'POST',
                processData: false,
                contentType: false,
                cache:false,
                data : form_data,
                success : function (res){
                    dat = JSON.parse(res);
                    if (dat.success) {
                        location.reload();
                    } else {
                        console.log("error:",dat);
                    }
                }
            });            

            return false;
        }
    };
    profile_form.init();  

    $('[data-js="profile-photo-uploader"]').fileUploader({maxFiles:1, inputName:'SiteUser[photo][]', accept: "image/*"});
    $('[data-js="profile-doc-uploader"]').fileUploader({maxFiles:1, inputName:'SiteUser[dogovor][]', accept: "*"});

    // Форма отправки отзыва о заказе
    var review_form = {
        count: 27000,
        delay: 40,
        initTick: 0,
        timer_text: '',
        waiting: false,
        init: function() {
            $('#review_form').on('submit', '#review-form', review_form.submitForm);
        },
        submitForm: function() {

            var order_id = $(this).find("#feedback_order_id").val();
            var rate = $(this).find("input:checked").val();
            var txt = $(this).find("#feedback-comment").val();

            var json_config = JSON.stringify({id:order_id, rate: rate, txt: txt});

            var rate_block = $("#order_id_" + order_id + " #rate_block");
            rate_block.find(".account-order_mark span.account-order_mark_count").html(rate);
            rate_block.find(".s-star-disable").attr('class','s-star-enable');
            rate_block.find('[data-target="#review_form"]').attr("review-info", json_config);

            $.post(
                $(this).attr('action'), 
                $(this).serialize(), 
                function(dat) {
                    if (dat.success) {
                        $('#review_form').modal('hide');
                        $("#js-popup-success-order-review-send").modal("show");
                    } else {
                        console.log("#review_form(result):", dat);    
                    } 
            }, 'json');

            return false;
        }
    };
    review_form.init(); 

    // Форма отправки заказа из Личного кабинета
    var cab_order_form = {
        count: 27000,
        delay: 40,
        initTick: 0,
        timer_text: '',
        waiting: false,
        init: function() {
            $('#cab_order_form').on('submit', '#cab-order-form', cab_order_form.submitForm);
        },
        submitForm: function() {
            $.post(
                $(this).attr('action'), 
                $(this).serialize(), 
                function(dat) {
                    if (dat.success) {
                        $('#cab_order_form').modal('hide');
                        $("#js-popup-success-order-form-send").modal("show");
                    } else {
                        console.log("error", dat);    
                    } 
            }, 'json');

            return false;
        }
    };
    cab_order_form.init();



    // Кнопка выхода из профиля пользователя
    $('#user_logout').on('click', function() {
        $.post(
            "/ajax/logout-profile", 
            [], 
            function(dat) {
                if (dat.success) {
                    location.href = "/";
                } else {
                    console.log("result:",dat);
                }
        }, 'json');
        return false;
    });


    // Рэндж слайдер для страницы Грузчики
    $('[data-js="range-time"]')
        .slider({
            range: "min",
            value: 0,
            min: 0,
            max: 12,
            step: 1,
            slide: function(event, ui) {
                $('[data-js="range-time-input"]')
                    .val(ui.value);
            }
        });
    $('[data-js="range-time-input"]')
        .val($('[data-js="range-time"]')
            .slider("value"));
    // start idiot-code
    $.mask.definitions['d'] ='[0-3]{1}';
    $.mask.definitions['x'] ='[0-9]{1}';
    $.mask.definitions['m'] ='[0-1]{1}';
    $('.phone-mask').mask("+7 (999) 999-99-99");
    $('.number-mask').mask("a 999 aa");
    $('.date-mask').mask("dx.mx.99");
    var callback_illbeback = {
        count: 7000,
        delay: 40,
        initTick: 0,
        waiting: false,
        init: function() {
            $(".form-form input[name='CallbacksOther[phone]']")
                .mask("+7 (999) 999-99-99");
            $('.callback-illbeback')
                .on('submit', '#callback-new-old-form', callback_illbeback.submitForm);
            $('.callback-illbeback')
                .on('click', '.callback-btn', callback_illbeback.clickBtn);
            $('.callback-hide')
                .click(callback_illbeback.hide_callback);
            $('.callback-illbeback input, .callback-illbeback select').on('change focus', function() {
                reachGoal('interaction_form_obrtaniy_zvonok');
            });
        },
        timerStart: function() {
            var remaining = (callback_illbeback.count - (callback_illbeback.getNow() - callback_illbeback.initTick)) / 1000;
            remaining = remaining >= 0 ? remaining : 0;
            var secs = remaining.toFixed(2);
            $('.callback-timer')
                .text(secs);
            if (remaining)
                setTimeout(callback_illbeback.timerStart, callback_illbeback.delay);
            else {
                $('.callback-timer')
                    .text('');
                $('#callback-new-old-form')
                    .fadeIn(500);
            }
        },
        submitForm: function() {
            if (callback_illbeback.waiting) {
                return false;
            }
            callback_illbeback.waiting = true;

            $.post($(this)
                .attr('action'), $(this)
                .serialize(), function(dat) {
                if (dat.success === true) {
                    reachGoal('submit_button_obrtaniy_zvonok');
                    $('#callback-new-old-form')
                        .fadeOut(500, function() {
                            $('.callback-timer')
                                .text('Звоним');
                        });
                    setTimeout(callback_illbeback.timerStart, 2000);
                    callback_illbeback.initTick = callback_illbeback.getNow();
                } else {
                    $('#callback-new-old-form input')
                        .css('border-color', '#cc0000');
                }
                callback_illbeback.waiting = false;
            }, 'json');
            return false;
        },
        getNow: function() {
            return window.performance ? window.performance.now() : Date.now();
        },
        clickBtn: function(e) {
            if ( !$('.form-block').hasClass('__open') ) {
                $('.form-block')
                    .addClass('__open');
                var firstClick = true;
                $('body')
                    .on('click.myEvent', function(e) {
                        if (!firstClick && $(e.target)
                                .closest($('.form-block')).length == 0) {
                            $('.form-block')
                                .removeClass('__open');
                            $('body')
                                .off('click.myEvent');
                        }
                        firstClick = false;
                    });
                reachGoal('onclick_obrtaniy_zvonok');
            }
            e.preventDefault();
        },
        hide_callback: function() {
            $(this)
                .parent()
                .hide();
        }
    };
    callback_illbeback.init();
    // end idiot-code
    // Окк
    $('[data-js="okk-tabs"]')
        .makvagaboTabs();
    // Личный кабинет
    $('[data-js="account-tabs"]')
        .makvagaboTabs();

    GGUI.tabs('[data-js="tabs"]', {
        followLink: false
    });

    GGUI.tabs('[data-js="tabs-select-pay-subcity"]', {
        selectItem: function () {
            var $this = $(this);
            var $prices = $this.closest('.prices').parent().find('.prices_section');
            $prices.removeClass('__active');
            $prices.filter($this.data('target')).addClass('__active');
        }
    });

    $('.only-letter-input')
        .on('keypress', function() {
            var that = this;
            setTimeout(function() {
                var res = /[^a-zA-ZА-Яа-яёЁ ]/g.exec(that.value);
                that.value = that.value.replace(res, '');
            }, 0);
        });

    (function() {
        var slider6;
        var slider7;
        var slider9;

        function respSizeKvPr() {
            var width = $(window)
                .width();
            var max,
                pager,
                max6,
                max9,
                width9,
                slideMargin,
                slideMargin9;
            if (width >= 1200) {
                width = 425;
                width9 = 170;
                max = 2;
                max6 = 2;
                max9 = 5;
                slideMargin = 60;
                slideMargin9 = 60;
                pager = false;
            } else if (width < 1200 && width >= 960) {
                width = 360;
                width9 = 160;
                max = 2;
                max6 = 1;
                max9 = 4;
                slideMargin = 60;
                slideMargin9 = 60;
                pager = false;
            } else if (width < 960 && width > 720) {
                width = 425;
                width9 = 190;
                max = 1;
                max6 = 1;
                max9 = 3;
                slideMargin = 60;
                slideMargin9 = 20;
                pager = true;
            } else if (width < 720 && width > 480) {
                width = 425;
                width9 = 200;
                max = 1;
                max6 = 1;
                max9 = 3;
                slideMargin = 60;
                slideMargin9 = 10;
                pager = true;
            } else {
                width = 280;
                width9 = 120;
                max = 1;
                max6 = 1;
                max9 = 2;
                pager = true;
                slideMargin = 60;
                slideMargin9 = 10;
            }
            if (slider6 && slider6.length) {
                slider6.destroySlider();
            }
            if (slider7 && slider7.length) {
                slider7.destroySlider();
            }
            if (slider9 && slider9.length) {
                slider9.destroySlider();
            }
            slider6 = $('.kvart-pereezd-section6-slider')
                .bxSlider({
                    minSlides: 1,
                    maxSlides: max6,
                    mode: 'horizontal',
                    infiniteLoop: true,
                    hideControlOnEnd: true,
                    easing: 'easeOutElastic',
                    moveSlides: 1,
                    slideWidth: width,
                    slideMargin: slideMargin,
                    adaptiveHeight: true,
                    controls: true
                });
            slider7 = $('.kvart-pereezd-section7-slider')
                .bxSlider({
                    minSlides: 1,
                    maxSlides: max,
                    mode: 'horizontal',
                    infiniteLoop: true,
                    hideControlOnEnd: true,
                    easing: 'easeOutElastic',
                    moveSlides: 1,
                    slideWidth: width,
                    slideMargin: slideMargin,
                    nextText: '',
                    prevText: '',
                    controls: true
                });
            slider9 = $('.kvart-pereezd-section9-slider')
                .bxSlider({
                    minSlides: 1,
                    maxSlides: max9,
                    mode: 'horizontal',
                    infiniteLoop: true,
                    hideControlOnEnd: true,
                    easing: 'easeOutElastic',
                    moveSlides: 1,
                    slideWidth: width9,
                    slideMargin: slideMargin9,
                    nextText: '',
                    prevText: '',
                    controls: true
                });
        }

        $(window)
            .load(respSizeKvPr);
        $(window)
            .resize(function() {
                clearTimeout(this.id);
                this.id = setTimeout(respSizeKvPr, 5);
            });
    })();
    // for css {pointer-events: none} style IE hack
    var IEdetect = function() {
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var agent = navigator.userAgent;
            if (agent.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/) != null) {
                var version = parseFloat(RegExp.$1);
                if (version < 11)
                    return true;
            }
        }
        return false;
    };
    if (IEdetect()) {
        $('.__ie-9').hide();
    }
    // About show more actions
    $('[data-js="more-facts"]')
        .on('click', function() {
            $(this)
                .addClass('hidden');
            $('[data-js="more-facts-target"]')
                .removeClass('hidden');
        });
    (function($slider) {
        if ($slider.length) {
            $slider.bxSlider({
                minSlides: 1,
                maxSlides: 1,
                mode: 'horizontal',
                infiniteLoop: true,
                hideControlOnEnd: true,
                easing: 'easeOutElastic',
                moveSlides: 1,
                slideWidth: 490,
                slideMargin: 10,
                adaptiveHeight: true,
                controls: true,
                pager: false
            });
        }
    })($('.gruzoinvest .gruzo_above .gruzo_above-slider'));
    (function($slider) {
        if ($slider.length) {
            $slider.bxSlider({
                minSlides: 1,
                maxSlides: 4,
                mode: 'horizontal',
                infiniteLoop: true,
                hideControlOnEnd: true,
                easing: 'easeOutElastic',
                moveSlides: 1,
                slideWidth: 230,
                slideMargin: 10,
                adaptiveHeight: true,
                controls: false,
                pager: false
            });
            var index = 1;
            $slider.find('.section_slider-item')
                .each(function() {
                    $(this)
                        .data('index', index);
                    index++;
                });
            $slider.on('mouseover', '.section_slider-item', function(e) {
                var $t = $(e.target);
                var popup = $('.section_slider_popup');
                var x, y;
                if ($t.hasClass('.section_slider-item')) {
                    $t.addClass('hover');
                } else {
                    $t = $t.closest('.section_slider-item');
                    $t.closest('.section_slider-item')
                        .addClass('hover');
                }
                x = $t.offset().left;
                y = $slider.offset().top - $t.height();
                popup.css({
                    left: x,
                    top: y,
                    display: 'block',
                    opacity: 1
                })
                    .find('p')
                    .text($t.text());
            });
            $slider.on('mouseout', '.section_slider-item', function(e) {
                var $t = $(e.target);
                var popup = $('.section_slider_popup');
                if ($t.hasClass('.section_slider-item')) {
                    $t.removeClass('hover');
                } else {
                    $t = $t.closest('.section_slider-item');
                    $t.closest('.section_slider-item')
                        .removeClass('hover');
                }
                popup.css({
                    display: 'none',
                    opacity: 0
                });
            });
        }
    })($('.gruzoinvest .section_slider .section_slider-items'));
    // About show more actions
    $('[data-js="more-facts"]')
        .on('click', function() {
            $(this)
                .addClass('hidden');
            $('[data-js="more-facts-target"]')
                .removeClass('hidden');
        });
    $('#section_gf-button')
        .click(function() {
            $('#section_gf-section1')
                .slideToggle();
        });
    $('#section_tf-button')
        .click(function() {
            $('#section_tf-section1')
                .slideToggle();
        });
    $('[data-js="ocenshik-uploader"]').fileUploader({maxFiles:5, inputName:'OcenshikCallbackForm[files][]'});

});
var landingReachGoal = {
    action: null,
    actions: [],
    init: function() {
        $('[data-target="#js-popup-calculator-detach"]')
            .on('click', landingReachGoal.setCalculator);
        $('#cfc__form input, #cfc__form select')
            .on('focusin', landingReachGoal.interactiveCalculator);
        $('#js-popup-calculator-detach, #callback-new-form')
            .on('hide.bs.modal', landingReachGoal.resetAction);
        $('[data-target="#js-popup-callback"]')
            .on('click', landingReachGoal.setCallback);
        $('#callback-new-form input, #callback-new-form select')
            .on('focusin', landingReachGoal.interactiveCallback);
        $('.modal')
            .on('submit', '#callback-new-form', landingReachGoal.submitCallback);
        $('#landing-order-form input, #landing-order-form textarea')
            .on('focusin', landingReachGoal.interactiveVoprosForm);
        $('body')
            .on('submit', '#landing-order-form', landingReachGoal.submitVoprosForm);
    },
    setCalculator: function() {
        landingReachGoal.action = 'callculator';
        landingReachGoal.reachGoal('zakaz_iz_shapki');
    },
    submitCalculator: function() {
        if ($('.cfc')
                .closest('.main-slider_w').length) {
            var goal = $('#cfc__form')
                .data('reachgoal_mark');
            if (goal) {
                landingReachGoal.reachGoal(goal);
            }
        } else {
            if (landingReachGoal.action) {
                landingReachGoal.reachGoal('send_zakaz_iz_shapki');
            } else {
                landingReachGoal.reachGoal('send_raschet_usluga');
            }
        }
    },
    submitSmsCalculator: function() {
        landingReachGoal.reachGoal('send_zakaz_sms');
    },
    interactiveCalculator: function() {
        if (landingReachGoal.action) {
            landingReachGoal.reachGoal('interaction_zakaz_iz_shapki');
        } else {
            landingReachGoal.reachGoal('raschet_usluga');
        }
    },
    setCallback: function() {
        if ($(this)
                .data('action')) {
            landingReachGoal.action = $(this)
                .data('action');
            switch (landingReachGoal.action) {
                case 'callback':
                    landingReachGoal.reachGoal('obratniy_zvonok');
                    break;
                case 'callback-footer':
                    landingReachGoal.reachGoal('obratniy_zvonok_footer');
                    break;
                default:
                    break;
            }
        }
    },
    submitCallback: function() {
        switch (landingReachGoal.action) {
            case 'callback' :
                landingReachGoal.reachGoal('send_obratniy_zvonok');
                break;
            case 'callback-footer':
                landingReachGoal.reachGoal('send_obratniy_zvonok_footer');
                break;
            default:
                break;
        }
    },
    interactiveCallback: function() {
        switch (landingReachGoal.action) {
            case 'callback' :
                landingReachGoal.reachGoal('interaction_obratniy_zvonok');
                break;
            case 'callback-footer' :
                landingReachGoal.reachGoal('interaction_obratniy_zvonok_footer');
                break;
            default :
                break;
        }
    },
    interactiveVoprosForm: function() {
        landingReachGoal.reachGoal('ostalis_vopros');
    },
    submitVoprosForm: function() {
        landingReachGoal.reachGoal('send_ostalis_vopros');
    },
    resetAction: function() {
        landingReachGoal.action = null;
    },
    reachGoal: function(goal) {
        if ($.inArray(goal, landingReachGoal.actions) < 0) {
            landingReachGoal.actions.push(goal);
            reachGoal(goal);
        }
    }
};

(function($el){
    var city_id = parseInt($el.data('city'));
    if (city_id) {
        $('.header__buttons').on('click', '.btn-callback', function(){
            reachGoal('nazhatie_na_knopku');
        });

        $('#js-popup-callback').on('click', 'input, a', function(){
            reachGoal('vzaimodejstvie_s_formoj');
        })
    }
})($('.header__city-select .city-select__ref'));

$(function() {
    $('[data-js="gruzovakansi-reviews-slider"]').slick({
        dots: true,
        infinite: false,
        speed: 300,
        arrows: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    });

    (function ($map) {
        if ($map.length) {
            var position = $map.data('position').split(',');
            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: new google.maps.LatLng(position[0], position[1]),
                disableDefaultUI: true,
                scrollwheel: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'custom_style']
                }
            });

            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(position[0], position[1]),
                map: map,
                title: $map.data('title')
            });
        }
    })($('.gruzo .gruzovakansi-contacts .map'));

    if ($('.build-furniture-single').length) {
        $(window)
            .scroll(function() {
                var top = $('.build-furniture_offset')
                        .offset().top,
                    scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    footerOffsetTop = $('.footer')
                        .offset().top,
                    $block = $('.build-furniture_r .build-furniture-single-cats'),
                    heightBlock = $block.height();
                if (scrollTop >= top && footerOffsetTop > (parseInt(scrollTop) + heightBlock )) {
                    $block.css({top: parseInt(scrollTop - top)});
                } else if (top <= scrollTop) {
                    $block.css('top', footerOffsetTop - heightBlock - parseInt($('window')
                            .height()));
                }
                var status = false;
                $('.build-furniture-single-cat')
                    .each(function() {
                        if (scrollTop < $(this)
                                .offset().top && !status) {
                            $('.build-furniture-single-cats')
                                .find('.build-furniture-single-cats_i')
                                .removeClass('active');
                            $('a[href="#' + $(this)
                                    .attr('id') + '"]')
                                .closest('.build-furniture-single-cats_i')
                                .addClass('active');
                            status = true;
                        }
                    });
            });
        $('.build-furniture-single-cats')
            .on('click', '[data-js="build-furniture-single-cats_i"]', function() {
                $(this)
                    .closest('.build-furniture-single-cats')
                    .find('.build-furniture-single-cats_i')
                    .removeClass('active');
                $(this)
                    .addClass('active');
            });
    }
    if ($('.gruzofact-fancy').length) {
        $('.gruzofact-fancy').fancybox({
            tpl: {
                closeBtn : '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><svg class="icon icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>',
                next     : '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><svg class="icon icon-right_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-right_arrow"></use></svg></span></a>',
                prev     : '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><svg class="icon icon-left_arrow"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-left_arrow"></use></svg></span></a>'
            }
        });
    }
    $('[data-js="show-more"]').on('click', function(){
        $('.' + $(this).data('class')).removeClass('hidden');
        $(this).remove();
        var slick_data = $(this).data('slick-data');
        if (slick_data) {
            $('[data-js="'+slick_data+'"]').slick('reinit');
        }

        return false;
    })

    $('[data-js="carousel-invest"]').slick({
        dots: false,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" data-role="none" class="carousel_prev" aria-label="Previous" tabindex="0">' +
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 0 15 42" width="15" height="42" xml:space="preserve">' +
        '<path d="M5.2,21.8l13.3,19.8c0.3,0.5,1.1,0.3,1.4-0.2s0.1-1-0.2-1.5L6.9,21L19.6,2c0.3-0.5,0.5-1.1,0.2-1.6C19.7,0.2,19.4,0,19.2,0    s-0.5,0.1-0.7,0.3L5.2,20.1C4.9,20.6,4.9,21.4,5.2,21.8z"/>' +
        '</svg>' +
        '</button>',
        nextArrow: '<button type="button" data-role="none" class="carousel_next" aria-label="Next" tabindex="0">' +
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 0 15 42" width="15" height="42" xml:space="preserve">' +
        '<path d="M19.8,20.1L6.5,0.3C6.2-0.2,5.5,0,5.1,0.4C4.8,0.9,5.1,1.5,5.4,2l12.7,19l-12.7,19c-0.3,0.5-0.5,1.1-0.2,1.6 c0.2,0.2,0.5,0.4,0.7,0.4c0.2,0,0.5-0.1,0.7-0.3l13.3-19.8C20.1,21.3,20.1,20.6,19.8,20.1z"/>' +
        '</svg>' +
        '</button>'
    });

    $('[data-js="carousel-partner"]').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: '<button type="button" data-role="none" class="carousel_prev" aria-label="Previous" tabindex="0">' +
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 0 15 42" width="15" height="42" xml:space="preserve">' +
        '<path d="M5.2,21.8l13.3,19.8c0.3,0.5,1.1,0.3,1.4-0.2s0.1-1-0.2-1.5L6.9,21L19.6,2c0.3-0.5,0.5-1.1,0.2-1.6C19.7,0.2,19.4,0,19.2,0    s-0.5,0.1-0.7,0.3L5.2,20.1C4.9,20.6,4.9,21.4,5.2,21.8z"/>' +
        '</svg>' +
        '</button>',
        nextArrow: '<button type="button" data-role="none" class="carousel_next" aria-label="Next" tabindex="0">' +
        '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="5 0 15 42" width="15" height="42" xml:space="preserve">' +
        '<path d="M19.8,20.1L6.5,0.3C6.2-0.2,5.5,0,5.1,0.4C4.8,0.9,5.1,1.5,5.4,2l12.7,19l-12.7,19c-0.3,0.5-0.5,1.1-0.2,1.6 c0.2,0.2,0.5,0.4,0.7,0.4c0.2,0,0.5-0.1,0.7-0.3l13.3-19.8C20.1,21.3,20.1,20.6,19.8,20.1z"/>' +
        '</svg>' +
        '</button>',
        responsive: [
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1230,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('[data-js="invest-autopark"]').on('click', function(event) {
        event.preventDefault();
        var id = $(this).attr('href');
        $(id).slideToggle();
    });

    (function($container) {
        if ($container.length) {
            var $button = $container.find('[data-js-tag]');
            var hash = window.location.hash.replace('#', '');
            var tags = $('[data-js-tags]');

            $button.on('click', function() {
                var $this = $(this);
                window.location.hash = $this.data('js-tag');
                updateButton($this);
                setContainer($this.data('js-tagid'));
            });

            function updateButton($curButton) {
                $button
                    .removeClass('__style-1')
                    .addClass('__style-6');
                $curButton
                    .removeClass('__style-6')
                    .addClass('__style-1');
            }

            function setContainer(tag) {
                if (tag) {
                    tags.addClass('hidden');
                    tags.each(function() {
                        var $this = $(this);
                        var tags = $this.data('js-tags').toString().split(',');
                        if ($.inArray(tag.toString(), tags) >= 0 ) {
                            $this.removeClass('hidden');
                        }
                    });
                } else {
                    tags.removeClass('hidden');
                }
            }

            updateButton($button.filter('[data-js-tag="'+hash+'"]'));
            setContainer($button.filter('[data-js-tag="'+hash+'"]').data('js-tagid'));
        }
    })($('[data-js="actions"]'));

    (function($map){
        if ($map.length) {
            var customMapTypeId = 'custom_style';
            var myLatlng = new google.maps.LatLng(59.912431, 30.295098);
            var myOptions = {
                zoom: 15,
                center: myLatlng,
                disableDefaultUI: true,
                scrollwheel: false,
                zoomControl: true,
                zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER
                },
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
                }
            };
            var map = new google.maps.Map(document.getElementById('map'), myOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: '10 Красноармейская улица 22'
            });
        }
    })($('.vacancies-contact #map'));

    $('[data-js="page-navigation"]').pageNavigation({
        parentSelector: '.build-furniture_offset',
        parentItemsSelector: '.build-furniture_w'
    });

    // Поиск
    (function(){
        var $search = $('[data-js="header-search"]');
        var $input = $search.find('input[type="text"]');
        var $reset = $search.find('button[type="reset"]');
        $input.on('focus', function() {
            $search.addClass('__focus');
        });
        $input.easyAutocomplete({

            getValue: "title",

            url:'/search/tips',

            ajaxSettings: {
                dataType: "json",
                method: "POST",
                data: {
                    dataType: "json"
                }
            },

            preparePostData: function(data,inputPhrase) {
                data.query = inputPhrase;
                return data;
            },

            requestDelay: 500,

            list: {
                maxNumberOfElements: 10,
                match: {
                    enabled: true
                },
                sort: {
                    enabled: true
                },
                onChooseEvent: function() {

                    window.location.href = $input.getSelectedItemData().url
                },
                onShowListEvent: function() {
                    $search.addClass('autocomplete-active');
                },
                onHideListEvent: function() {
                    $search.removeClass('autocomplete-active');
                }
            }
        });
        $(document).on('click.search', function(event) {

            if ( ($(event.target).is($reset) || $(event.target).closest($reset).length) && $input.val()) {
                event.stopPropagation();
                return;
            }

            if (
                $(event.target).is($search) ||
                ($(event.target).closest($search).length && !$(event.target).is($reset) && !$(event.target).closest($reset).length)
            ) return;

            $search.removeClass('__focus autocomplete-active');
            event.stopPropagation();
        });
    })();

    // offer-block
    var popstate_trigger = false;
    $('#offerModal').on('show.bs.modal', function(event) {
        var $this = $(this);
        var $container = $(event.relatedTarget).closest('.offer-block').find('[data-offer="container"]');
        var $left = $this.find('[class*="modal_left"]');
        var $right = $this.find('[class*="modal_right"]');
        var $bg = $left.parent().find('.offer-block_bg'),
            id = $container.data('id'), // настройка истории модального окна товара
            href = $container.data('href'),
            history = window.history,
            oldhref = window.location.pathname;

        if (typeof dataLayer !== 'undefined') {
            dataLayer.push({
                'event': 'form',
                'eventCategory': 'perevezem',
                'eventAction': 'openform',
                'eventLabel': $container.data('title') + ' ' + $container.data('subtitle')
            });
        }

        if (!history.state || history.state.id !== id) {
            history.pushState({id: id,  page: href}, '', oldhref + href);
        }

        $left.html($container.html());
        if (typeof $container.data('offer-modal-bg') !== 'undefined') {
            if (!$bg.length) {
                $left.parent().append('<div class="offer-block_bg"><img src="'+$container.data('offer-modal-bg')+'"></img></div>')
            } else {
                $bg.html('<img src="'+$container.data('offer-modal-bg')+'"></img>');
            }
        }

        var templateInput = 
            '<input type="hidden" name="PackageOrderForm[title]" value="'+$container.data('title')+' '+ $container.data('subtitle') +'" />'+
            '<input type="hidden" name="PackageOrderForm[cost]" value="'+$container.data('price')+'" />';

        if (!$right.find('form').find('#packageorderform_title').length) {
            $right.find('form').append('<div class="hidden" id="packageorderform_title">'+templateInput+'</div>')
        } else {
            $right.find('form').find('#packageorderform_title').html(templateInput);
        }

    }).on('hide.bs.modal', function(event) { // настройка истории модального окна товара
        if (!popstate_trigger) {
            var $this = $(this);
            var history = window.history;
            if (history && history.state) {
                history.go(-1);
            }
        }
    });

    $(window).on('popstate', function(event){ // настройка истории модального окна товара
        var state = event.originalEvent.state;
        if (state && state.id) {
            $('.offer-block_modal[data-id="' + state.id + '"]')
                .closest('.offer-block').find('button').click();
        } else {
            popstate_trigger = true;
            $('.modal').modal('hide');
            popstate_trigger = false;
        }
    }).on('load', function(event) {
        var search = window.location.search;
        if (search) {
            $('.offer-block_modal[data-href="' + search + '"]')
                .closest('.offer-block').find('button').click();
        }
    });

    // Модальное окно получения купона
    $('#get-coupon').on('show.bs.modal', function(event) {
        var $button = $(event.relatedTarget);
        var number = $button.data('num'),
            order = $button.data('order'),
            service = $button.data('service');
        var $couponCounter = $button.parent().find('[data-js="coupon-count"]');
        var $this = $(this);
        var title = '';

        if (number && order) {
            title = "Получите купон на скидку " + number + " рублей при заказе от " + order + " рублей";            
        } else if (service) {
            title = "Получите купон на скидку <br>" + service;
        }
        if (number) {
            $this.find('#coupon-num').val(number);
        }
        if ($couponCounter.length) {
            $this.find('#coupon-counter').val($couponCounter.find('input').val().replace(/[^0-9]/g, ''));
        }
        if (service) {
            $this.find('#coupon-service').val(service);
        }
        $this.find('.modal_title').html(title);

        $this.find('form').on('submit.modal', function(event) {
            event.preventDefault();
            var $form = $(this);
            setTimeout(function() {
                var success = true;
                if (success) {
                    if ($couponCounter.length) {
                        var $inputCount = $couponCounter.find('input');
                        var valueCount = parseInt($inputCount.val().replace(/[^0-9]/g, ''));
                        $inputCount.val(valueCount - 1).trigger('change');
                    }
                }
            }, 100);
            $.ajax({
                type: $form.attr('method') || 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
                success: function(data) {
                    data = JSON.parse(data);
                    if (data.success) {
                        $form[0].reset();
                        $this.modal('hide');

                        if ($couponCounter.length) {
                            var $inputCount = $couponCounter.find('input');
                            var valueCount = parseInt($inputCount.val().replace(/[^0-9]/g, ''));
                            $inputCount.val(valueCount - 1).trigger('change');
                        }
                        if ($this.find('#coupon-num').val()) {
                            $('#coupon_send_success .modal_title').html("Спасибо! Купон на скидку " + $this.find('#coupon-num').val() + " рублей отправлен Вам на электронную почту!");
                        } else {
                            $('#coupon_send_success .modal_title').html("Спасибо! Купон на скидку отправлен Вам на электронную почту!");
                        }
                        
                        $('#coupon_send_success').modal('show');
                    }
                },
                fail: function(e) {
                    console.log(e);
                }
            });
        });
    });

    $('#get-coupon').on('hide.bs.modal', function(event) {
        $(this).find('form').off('submit.modal');
    });

    // Обработчик счетчика в купонах
    (function($container) {
        if ($container.length) {
            $container.each(function(index, el) {
                var $item = $(el);
                var $input = $item.find('input'),
                    $counts = $item.find('[data-count]');
                var value = updateValue(),
                    $countsParent = $counts.parent();

                $input.on('change', function(event) {
                    value = updateValue();
                    updateCount();
                });

                updateCount();

                function updateCount() {
                    Array.prototype.forEach.call($counts, function(item, i, arr) {
                        $counts.eq(i).attr('data-count', value[i]);
                    });
                }

                function updateValue() {
                    var __value = $input.val().replace(/[^0-9]/g, '').split('');

                    switch(__value.length) {
                        case 0:
                            __value = ['0', '0', '0'];
                            break;
                        case 1:
                            __value.unshift('0', '0');
                            break;
                        case 2:
                            __value.unshift('0');
                            break;
                    }
                    
                    return __value;
                }

            });
        }

    })($('[data-js="coupon-count"]'));
    
    // Модальное окно с калькулятором (подгрузка)
    (function() {
        $('#js-popup-calculator').on('shown.bs.modal', function(event) {
            var $button = $(event.relatedTarget);
            if (typeof Calculator !== 'undefined') {
                afterLoadCalc($button.data('car-id'), $button.data('time'), $button.data('rent'));
            } else {
                var _scriptCalc = document.createElement('script');
                var _styleCalc = document.createElement('link');
                _scriptCalc.src = '/scripts/Calculator.js';
                _styleCalc.href = '/styles/calculator.css';
                _styleCalc.rel = 'stylesheet';
                // Обработка калькулятора после загрузки скрипта
                _scriptCalc.addEventListener('load', function() {
                    afterLoadCalc($button.data('car-id'), $button.data('time'), $button.data('rent'));
                });
                document.head.appendChild(_scriptCalc);
                document.head.appendChild(_styleCalc);
            }
        });

        function afterLoadCalc(id, time, rent) {
            Calculator.refs.step2.setСarById(id);
            if (time) Calculator.refs.step3.setTimeString(time);
            if (rent) Calculator.refs.step3.setTimeFixed(rent);
        }

        // Калькулятор в модальное окно и обратно, на посадочных страницах (квартирный переезд)
        $('#js-popup-calculator-detach').on('show.bs.modal hide.bs.modal', function (event) {
            var $calc = $('#containerCalculator');
            if ($calc.length) {
                var $detachCalc = $('#containerCalculator').parent().detach();
                switch (event.type) {
                    case 'show':
                        $calc.find('.clc').addClass('in-modal');
                        $detachCalc.appendTo('#js-popup-calculator-detach .modal_content');
                        break;
                    case 'hide':
                        $calc.find('.clc').removeClass('in-modal');
                        $detachCalc.appendTo('#calculator-container');
                        break;
                }
            }
        });
    })();
});
var Slider = (function () {
    var Slider = function (el, intervalTime) {
        this.el = $(el);
        this.current = 0;
        this.intervalTime = intervalTime || 3000;
        this.init();
    };
    var pt = Slider.prototype;
    pt.DIRECTION = {
        toLeft: 'left',
        toRight: 'right'
    };
    pt.bindEvent = function () {
        var me = this;
        me.el.on('mouseenter', function () {
            me.stop();
        }).on('mouseleave', function () {
            me.run();
        }).on('click', '.banner-btn-left', function () {
            me.move(me.current - 1, me.DIRECTION.toLeft);
        }).on('click', '.banner-btn-right', function () {
            me.move(me.current + 1, me.DIRECTION.toRight);
        }).on('click', '.banner-btn-indexes span:not(.current)', function () {
            var targetIndex = $(this).index();
            me.move(targetIndex, targetIndex > me.current ? me.DIRECTION.toRight : me.DIRECTION.toLeft);
        });
    };
    pt.TPL_BTN = [
        '<div class="main-content">',
        '<div class="banner-btn banner-btn-left"></div>',
        '<div class="banner-btn banner-btn-right"></div>',
        '<div class="banner-btn banner-btn-indexes">',
        '</div>',
        '</div>'
    ].join('');
    pt.init = function () {
        this.imgContainer = this.el.find('img').wrap('<div class="img-container"></div>').parent();
        this.imgContainer.eq(0).css('z-index', 2);
        this.el.prepend(this.TPL_BTN);
        this.btnIndexes = this.el.find('.banner-btn-indexes').html(new Array(this.imgContainer.length + 1).join('<span></span>')).find('span');
        this.btnIndexes.eq(0).addClass('current');
        this.bindEvent();
        this.run();
    };
    pt.move = function (target, direct) {
        var me = this;
        if (target >= me.imgContainer.length) {
            target = 0;
        } else if (target < 0) {
            target = me.imgContainer.length - 1;
        }
        if (target === me.current) {
            return false;
        }
        direct = direct || me.DIRECTION.toRight;
        var clientWidth = me.el.width();
        me.animating = true;
        me.imgContainer.eq(target).css({
            left: (direct === me.DIRECTION.toLeft ? clientWidth : -clientWidth) + 'px',
            zIndex: 3
        }).animate({
            left: 0
        }, function () {
            me.imgContainer.eq(me.current).css('zIndex', 1);
            me.imgContainer.eq(target).css('zIndex', 2);
            me.current = target;
            me.animating = false;
            me.btnIndexes.removeClass('current').eq(target).addClass('current');
        });
    };
    pt.run = function () {
        var me = this;
        if (!me.running && !me.animating) {
            me.running = setInterval(function () {
                me.move(me.current + 1);
            }, me.intervalTime);
        }
    };
    pt.stop = function () {
        var me = this;
        if (me.running) {
            clearInterval(me.running);
            me.running = null;
        }
    };
    return Slider;
})();
$(function () {
    $('.banner-slider').each(function (i, main) {
        new Slider(main);
    });
});
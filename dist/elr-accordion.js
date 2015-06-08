(function($) {
    // TODO: add feature that leaves accordion open to show current page link so that visitors
    // don't need to keep opeing the content to click to a page in the same ul
    window.elrAccordionNav = function(params) {
        var self = {};
        var spec = params || {};
        var speed = spec.speed || 300;
        var containerClass = spec.containerClass || 'elr-accordion-nav';
        var expandIconClass = spec.expandIconClass  || 'fa-plus';
        var collapseIconClass = spec.collapseIconClass  || 'fa-minus';
        var iconClass = spec.iconClass || 'elr-accordion-icon';
        var contentHolderClass = contentHolderClass || 'elr-accordion-nav-inner';
        var container = $('.' + containerClass);

        var showDefaultContent = function($expandedContent, $content) {
            $content.hide();
            $expandedContent.show();
        };

        var toggle = function(speed, $openContent) {
            var $that = $(this);
            var $nextContent = $that.next();

                $openContent.slideUp(speed);
                
                if ($nextContent.is(':hidden')) {
                    $nextContent.slideDown(speed);
                } else {
                    $nextContent.slideUp(speed);
                }
        };

        var replaceIcons = function($openContent, iconClass, expandIconClass, collapseIconClass) {
            var $that = $(this);
            var $icon = $that.find('.' + iconClass);
            var $openContentIcons = $openContent.prev().find('.' + iconClass);
            
            if ( $icon.hasClass(expandIconClass) ) {
                $icon.removeClass(expandIconClass).addClass(collapseIconClass);
            } else {
                $icon.removeClass(collapseIconClass).addClass(expandIconClass);
            }

            $openContentIcons.removeClass(collapseIconClass).addClass(expandIconClass);
        };

        // var showCurrent = function() {
            
        // };

        if ( container.length ) {
            var $label = container.children('ul').children('li').children('a');
            var $content = $label.next('ul');
            var $expandedContent = container.find('.' + contentHolderClass +'[data-state=expanded]');

            showDefaultContent($expandedContent, $content);

            $label.on('click', function(e) {
                var $openContent = $($content).not(':hidden');
                
                toggle.call(this, speed, $openContent);
                replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
                e.stopPropagation();
                e.preventDefault();
            });
        }

        return self;
    };
})(jQuery);;(function($) {
    window.elrAccordion = function(params) {
        var self = {};
        var spec = params || {};
        var containerClass = spec.containerClass || 'elr-accordion';
        var labelClass = spec.labelClass || 'elr-accordion-label';
        var contentHolderClass = spec.contentHolderClass || 'elr-accordion-inner';
        var showButtons = (typeof spec.showButtons === 'undefined') ? true : spec.showButtons;
        var speed = spec.speed || 300;
        var expandIconClass = spec.expandIconClass  || 'fa-plus';
        var collapseIconClass = spec.collapseIconClass  || 'fa-minus';
        var iconClass = spec.iconClass || 'elr-accordion-icon';
        var $container = $('.' + containerClass);

        var showDefaultContent = function($expandedContent, $content) {
            $content.hide();
            $expandedContent.show();
        };

        var toggle = function(speed, $openContent) {
            var $that = $(this);
            var $nextContent = $that.next();

            $openContent.slideUp(speed);
            
            if ( $($nextContent).is(':hidden') ) {
                $nextContent.slideDown(speed);
            } else {
                $nextContent.slideUp(speed);
            }
        };

        var replaceIcons = function($openContent, iconClass, expandIconClass, collapseIconClass) {
            var $that = $(this);
            var $icon = $that.find('.' + iconClass);
            var $openContentIcons = $openContent.prev().find('.' + iconClass);
            
            if ( $icon.hasClass(expandIconClass) ) {
                $icon.removeClass(expandIconClass).addClass(collapseIconClass);
            } else {
                $icon.removeClass(collapseIconClass).addClass(expandIconClass);
            }

            $openContentIcons.removeClass(collapseIconClass).addClass(expandIconClass);
        };

        var createButton = function(button, message, className, $container) {
            return $('<button></button>', {text: message, 'class': className}).prependTo($container);
        };
        
        var addButtons = function($container) {
            return {
                'showButton': createButton('showButton', 'Show All', 'elr-show-all elr-button-inline', $container),
                'hideButton': createButton('hideButton', 'Hide All', 'elr-hide-all elr-button-inline', $container),
            };
        };

        var showAll = function(speed, $content) {
            $content.slideDown(speed);
        };

        var hideAll = function(speed, $content) {
            $content.slideUp(speed);
        };

        if ( $container.length ) {
            var $label = $container.find('.' + labelClass);
            var $content = $container.find('.' + contentHolderClass);
            var $icons = $label.find('.' + iconClass);
            var $expandedContent = $container.find('.' + contentHolderClass + '[data-state=expanded]');

            if ( showButtons ) {
                var $buttons = addButtons($container);

                $buttons.showButton.on('click', function() {
                    showAll(speed, $content);
                    $icons.removeClass(expandIconClass).addClass(collapseIconClass);
                });

                $buttons.hideButton.on('click', function() {
                    hideAll(speed, $content);
                    $icons.removeClass(collapseIconClass).addClass(expandIconClass);
                });
            }

            showDefaultContent($expandedContent, $content);

            $label.on('click', function(e) {
                var $openContent = $($content).not(':hidden');
                
                replaceIcons.call(this, $openContent, iconClass, expandIconClass, collapseIconClass);
                toggle.call(this, speed, $openContent);
                e.stopPropagation();
            });
        }

        return self;
    };
})(jQuery);
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// import elrUtils from './elr-utilities';

var $ = require('jquery');
var elr = require('elr-utility-lib');

var elrAccordion = function elrAccordion() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var _ref$containerClass = _ref.containerClass;
    var containerClass = _ref$containerClass === undefined ? 'elr-accordion' : _ref$containerClass;
    var _ref$labelClass = _ref.labelClass;
    var labelClass = _ref$labelClass === undefined ? 'elr-accordion-label' : _ref$labelClass;
    var _ref$contentHolderCla = _ref.contentHolderClass;
    var contentHolderClass = _ref$contentHolderCla === undefined ? 'elr-accordion-content' : _ref$contentHolderCla;
    var _ref$showButtons = _ref.showButtons;
    var showButtons = _ref$showButtons === undefined ? true : _ref$showButtons;

    var self = {
        $container: $('.' + containerClass),
        toggle: function toggle($content, $label) {
            // toggle active classes on accordion label and content
            // collapse any open content so only one panel is open at a time
            var $that = $(this);
            var $openContent = $content.filter('.active');
            var $openLabel = $label.filter('.active');
            var $nextContent = $that.next();

            if (!$nextContent.hasClass('active')) {
                $that.addClass('active');
                $nextContent.addClass('active');
            }

            $openLabel.removeClass('active');
            $openContent.removeClass('active');
        },
        showAll: function showAll($content, $label) {
            $content.addClass('active');
            $label.addClass('active');
        },
        hideAll: function hideAll($content, $label) {
            $content.removeClass('active');
            $label.removeClass('active');
        }
    };

    var createButton = function createButton(button, message, className, $container) {
        return elr.createElement('button', {
            text: message,
            'class': className
        }).prependTo($container);
    };

    var addButtons = function addButtons($container) {
        return {
            'showButton': createButton('showButton', 'Show All', 'elr-show-all elr-button elr-button-primary', $container),
            'hideButton': createButton('hideButton', 'Hide All', 'elr-hide-all elr-button elr-button-primary', $container)
        };
    };

    if (self.$container.length) {
        (function () {
            var $label = self.$container.find('.' + labelClass);
            var $content = self.$container.find('.' + contentHolderClass);

            if (showButtons) {
                var $buttons = addButtons(self.$container);

                $buttons.showButton.on('click', function () {
                    self.showAll($content, $label);
                });

                $buttons.hideButton.on('click', function () {
                    self.hideAll($content, $label);
                });
            }

            // showDefaultContent($expandedContent, $content);

            $label.on('click', function (e) {
                e.preventDefault();

                self.toggle.call(this, $content, $label);
            });
        })();
    }

    return self;
};

exports.default = elrAccordion;
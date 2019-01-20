import * as $ from 'jquery';
('use strict');

let $container;
interface Config {
  message: string;
  className: string;
  $container: JQuery;
}

interface Buttons {
  hideButton: JQuery;
  showButton: JQuery;
}

const createButton = (config: Config): JQuery => {
  return $('<button></button>', {
    text: config.message,
    class: config.className
  }).prependTo(config.$container);
};

const toggle = function($label: JQuery, $content: JQuery): void {
  // toggle active classes on accordion label and content
  // collapse any open content so only one panel is open at a time
  const $that = $(this);
  const $openContent = $content.filter('.active');
  const $openLabel = $label.filter('.active');
  const $nextContent = $that.next();

  if (!$nextContent.hasClass('active')) {
    $that.addClass('active');
    $nextContent.addClass('active');
  }

  $openLabel.removeClass('active');
  $openContent.removeClass('active');
};

const showAll = ($label: JQuery, $content: JQuery): void => {
  $label.addClass('active');
  $content.addClass('active');
};

const hideAll = ($label: JQuery, $content: JQuery): void => {
  $label.removeClass('active');
  $content.removeClass('active');
};

const addButtons = ($container: JQuery): Buttons => {
  return {
    showButton: createButton({
      $container,
      message: 'Show All',
      className: 'elr-show-all elr-button elr-button-primary'
    }),
    hideButton: createButton({
      $container,
      message: 'Hide All',
      className: 'elr-hide-all elr-button elr-button-primary'
    })
  };
};

export default {
  init(): void {
    $container = $(`.elr-accordion`);
    if ($container.length) {
      const $label = $container.find(`.elr-accordion-label`);
      const $content = $container.find(`.elr-accordion-content`);
      const $buttons = addButtons($container);

      $buttons.showButton.on('click', function() {
        showAll($label, $content);
      });

      $buttons.hideButton.on('click', function() {
        hideAll($label, $content);
      });

      $label.on('click', function(e) {
        e.preventDefault();

        toggle.call(this, $label, $content);
      });
    }
  }
};

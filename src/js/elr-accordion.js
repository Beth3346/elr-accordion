import $ from 'jquery'

'use strict'

let $container

const createButton = (config) => {
  return $('<button></button>', {
      text: config.message,
      class: config.className
    })
    .prependTo(config.$container)
}

const toggle = function ($label, $content) {
  // toggle active classes on accordion label and content
  // collapse any open content so only one panel is open at a time
  const $that = $(this)
  const $openContent = $content.filter('.active')
  const $openLabel = $label.filter('.active')
  const $nextContent = $that.next()

  if (!$nextContent.hasClass('active')) {
    $that.addClass('active')
    $nextContent.addClass('active')
  }

  $openLabel.removeClass('active')
  $openContent.removeClass('active')
}

const showAll = ($label, $content) => {
  $label.addClass('active')
  $content.addClass('active')
}

const hideAll = ($label, $content) => {
  $label.removeClass('active')
  $content.removeClass('active')
}

const addButtons = ($container) => {
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
  }
}

export default {
  init() {
    $container = $(`.elr-accordion`)
    if ($container.length) {
      const $label = $container.find(`.elr-accordion-label`)
      const $content = $container.find(`.elr-accordion-content`)
      const $buttons = addButtons($container)

      $buttons.showButton.on('click', function() {
        showAll($label, $content)
      })

      $buttons.hideButton.on('click', function() {
        hideAll($label, $content)
      })

      $label.on('click', function(e) {
        e.preventDefault()

        toggle.call(this, $label, $content)
      })
    }
  }
}

import $ from 'jquery'

import elrUI from 'elr-ui'
let ui = elrUI()

const elrAccordion = function({
    containerClass = 'elr-accordion',
    labelClass = 'elr-accordion-label',
    contentHolderClass = 'elr-accordion-content',
    showButtons = true
} = {}) {
    const self = {
        $container: $(`.${containerClass}`),
        toggle($label, $content) {
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
        },
        showAll($label, $content) {
            $label.addClass('active')
            $content.addClass('active')
        },
        hideAll($label, $content) {
            $label.removeClass('active')
            $content.removeClass('active')
        },
        createButton(button, message, className, $container) {
            return ui.createElement('button', {
                text: message,
                'class': className
            }).prependTo($container)
        },
        addButtons($container) {
            return {
                'showButton': self.createButton('showButton', 'Show All', 'elr-show-all elr-button elr-button-primary', $container),
                'hideButton': self.createButton('hideButton', 'Hide All', 'elr-hide-all elr-button elr-button-primary', $container)
            }
        }
    }

    if (self.$container.length) {
        const $label = self.$container.find(`.${labelClass}`)
        const $content = self.$container.find(`.${contentHolderClass}`)

        if (showButtons) {
            const $buttons = self.addButtons(self.$container)

            $buttons.showButton.on('click', function() {
                self.showAll($label, $content)
            })

            $buttons.hideButton.on('click', function() {
                self.hideAll($label, $content)
            })
        }

        $label.on('click', function(e) {
            e.preventDefault()

            self.toggle.call(this, $label, $content)
        })
    }

    return self
}

export default elrAccordion
import 'jsdom-global/register'
import elrUI from 'elr-ui'
import elrAccordion from '../src/main.js'
import $ from 'jquery'

const ui = elrUI()
const accordion = elrAccordion()
const expect = require('chai').expect
const chai = require('chai')
const jsdom = require('mocha-jsdom')

describe('elrAccordion', function() {
    beforeEach(function () {
        document.body.innerHTML = `
            <div class="elr-accordion">
                <h2 class="elr-accordion-label active">First Section</h2>
                <div class="elr-accordion-content active">
                    <p>Some Content</p>
                </div>
                <h2 class="elr-accordion-label">Second Section</h2>
                <div class="elr-accordion-content">
                    <p>Some Content</p>
                </div>
            </div>`
    });

    it('should create a button', function() {
        const $container = $('.elr-accordion')
        const $button = accordion.createButton('showButton', 'Show All', 'elr-show-all elr-button elr-button-primary', $container)

        expect($button.hasClass('elr-show-all')).to.be.true
        expect($button.text()).to.equal('Show All')
    });

    it('should add buttons', function() {
        const $container = $('.elr-accordion')

        accordion.addButtons($container)

        expect($('.elr-button').length).to.equal(2)
    });

    it('should show all content', function() {
        const $container = $('.elr-accordion')
        accordion.showAll($('.elr-accordion-label'), $('.elr-accordion-content'))

        expect($('.elr-accordion-content.active').length).to.equal(2)
        expect($('.elr-accordion-label.active').length).to.equal(2)
    })

    it('should hide all content', function() {
        const $container = $('.elr-accordion')
        accordion.hideAll($('.elr-accordion-label'), $('.elr-accordion-content'))

        expect($('.elr-accordion-content.active').length).to.equal(0)
        expect($('.elr-accordion-label.active').length).to.equal(0)
    })

    it('should toggle content', function() {
        const $container = $('.elr-accordion')

        accordion.toggle.call($('.elr-accordion-label').eq(1), $('.elr-accordion-label'), $('.elr-accordion-content'))

        expect($('.elr-accordion-content').first().hasClass('active')).to.be.false
        expect($('.elr-accordion-label').first().hasClass('active')).to.be.false
        expect($('.elr-accordion-content').eq(1).hasClass('active')).to.be.true
        expect($('.elr-accordion-label').eq(1).hasClass('active')).to.be.true

        accordion.toggle.call($('.elr-accordion-label').first(), $('.elr-accordion-content'), $('.elr-accordion-label'))

        expect($('.elr-accordion-content').first().hasClass('active')).to.be.true
        expect($('.elr-accordion-label').first().hasClass('active')).to.be.true
        expect($('.elr-accordion-content').eq(1).hasClass('active')).to.be.false
        expect($('.elr-accordion-label').eq(1).hasClass('active')).to.be.false
    })

    it('should add buttons', function() {
        const accordion = elrAccordion()

        expect($('.elr-show-all').length).to.equal(1)
        expect($('.elr-hide-all').length).to.equal(1)
    })

    it('should not add buttons if showButtons is false', function() {
        const accordion = elrAccordion({showButtons: false})

        expect($('.elr-show-all').length).to.equal(0)
        expect($('.elr-hide-all').length).to.equal(0)
    })

    it('should show all content when show all button is clicked', function() {
        const accordion = elrAccordion()

        $('button.elr-show-all').trigger('click')

        expect($('.elr-accordion-label.active').length).to.equal(2)
        expect($('.elr-accordion-content.active').length).to.equal(2)
    })

    it('should toggle active class when label is clicked', function() {
        const accordion = elrAccordion()

        $('.elr-accordion-label').eq(1).trigger('click')

        expect($('.elr-accordion-label').eq(1).hasClass('active')).to.be.true
        expect($('.elr-accordion-content').eq(1).hasClass('active')).to.be.true

        $('.elr-accordion-label').eq(1).trigger('click')

        expect($('.elr-accordion-label').eq(1).hasClass('active')).to.be.false
        expect($('.elr-accordion-content').eq(1).hasClass('active')).to.be.false
    })

    it('should remove active class from active content if another label is clicked', function() {
        const accordion = elrAccordion()

        expect($('.elr-accordion-label').first().hasClass('active')).to.be.true
        expect($('.elr-accordion-content').first().hasClass('active')).to.be.true

        $('.elr-accordion-label').eq(1).trigger('click')

        expect($('.elr-accordion-label').first().hasClass('active')).to.be.false
        expect($('.elr-accordion-content').first().hasClass('active')).to.be.false
    })
});
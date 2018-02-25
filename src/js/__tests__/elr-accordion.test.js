import $ from 'jquery'
import accordion from '../elr-accordion'
import fs from 'fs'
import path from 'path'

const accordionHtml = path.join(__dirname, '..', 'accordion.html')
const html = fs.readFileSync(accordionHtml).toString()

beforeEach(() => {
  document.body.innerHTML = html
  accordion.init()
})

describe('init', () => {
  it('should render buttons', () => {
    expect($('.elr-show-all').text()).toEqual('Show All')
    expect($('.elr-hide-all').text()).toEqual('Hide All')
  })
  it('should add active class when label is clicked', () => {
    $('.elr-accordion-label').eq(1).click()

    expect($('.elr-accordion-label').eq(1).hasClass('active')).toBeTruthy()
    expect($('.elr-accordion-content').eq(1).hasClass('active')).toBeTruthy()
  })
  it('should only have one element active at a given time', () => {
    $('.elr-accordion-label').eq(1).click()

    expect($('.elr-accordion-label.active').length).toBe(1)
    expect($('.elr-accordion-content.active').length).toBe(1)
  })
  it('should toggle content', () => {
    $('.elr-accordion-label').eq(1).click()

    expect($('.elr-accordion-label').eq(1).hasClass('active')).toBeTruthy()
    expect($('.elr-accordion-content').eq(1).hasClass('active')).toBeTruthy()

    $('.elr-accordion-label').eq(1).click()

    expect($('.elr-accordion-label').eq(1).hasClass('active')).toBeFalsy()
    expect($('.elr-accordion-content').eq(1).hasClass('active')).toBeFalsy()
  })
  it('should show all content when show all button is clicked', () => {
    $('.elr-show-all').click()

    expect($('.elr-accordion-label.active').length).toBe(5)
    expect($('.elr-accordion-content.active').length).toBe(5)
  })
  it('should hide all content if label is clicked after show all', () => {
    $('.elr-show-all').click()

    $('.elr-accordion-label').eq(1).click()

    expect($('.elr-accordion-label.active').length).toBe(0)
    expect($('.elr-accordion-content.active').length).toBe(0)
  })
  it('should hide all content when hide all button is clicked', () => {
    $('.elr-hide-all').click()

    expect($('.elr-accordion-label.active').length).toBe(0)
    expect($('.elr-accordion-content.active').length).toBe(0)
  })
  it('should show one item if label is clicked after hide all', () => {
    $('.elr-hide-all').click()

    $('.elr-accordion-label').eq(1).click()

    expect($('.elr-accordion-label.active').length).toBe(1)
    expect($('.elr-accordion-content.active').length).toBe(1)
    expect($('.elr-accordion-label').eq(1).hasClass('active')).toBeTruthy()
    expect($('.elr-accordion-content').eq(1).hasClass('active')).toBeTruthy()
  })
})

$ ->
  intro = $('#intro')
  logo = $('#intro > img')
  spinner = $('#intro > i')
  winWidth = $(window).width()
  winHeight = $(window).height()

  intro.css 'width', winWidth + 'px'
  intro.css 'height', winHeight + 'px'

  logo.css 'margin-top', (winHeight / 2 - 60) + 'px'
  logo.css 'visibility', 'visible'
  spinner.css 'visibility', 'visible'

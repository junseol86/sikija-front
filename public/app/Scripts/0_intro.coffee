$ ->
  intro = $('#intro')
  logo = $('#intro > img')
  winWidth = $(window).width()
  winHeight = $(window).height()

  intro.css 'width', winWidth + 'px'
  intro.css 'height', winHeight + 'px'

  logo.css 'margin-top', (winHeight / 2 - 27) + 'px'
  logo.css 'visibility', 'visible'

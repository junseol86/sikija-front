outerWrapper = $('#outer_wrapper')
winWidth = $(window).width()
winHeight = $(window).height()

if (winWidth > winHeight)
  outerWrapper.css 'width', (winHeight * 3 / 4) + 'px'
else
  outerWrapper.css 'width', '100%'

outerWrapper.css 'height', winHeight


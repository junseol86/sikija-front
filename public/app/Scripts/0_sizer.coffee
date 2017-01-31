# 앱 요소들의 크기를 조정하는 스크립트

winHeight = $(window).height()

if (('#scroll_area').length != 0)
  topBarHeight = $('#top_bar').height()
  subMenuBarHeight = if $('#sub_menu_bar').length == 0 then 0 else $('#sub_menu_bar').height()
  bottomBarHeight = if $('#bottom_bar').length == 0 then 0 else $('#bottom_bar').height()
  $('#scroll_area').css 'height', (winHeight - (topBarHeight + subMenuBarHeight + bottomBarHeight)) + 'px'

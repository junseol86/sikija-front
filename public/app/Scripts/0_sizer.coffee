winHeight = $(window).height()

if (('#vertical_scroll_area').length != 0)
  topbarHeight = $('#topbar').height()
  subMenuBarHeight = if $('#sub_menu_bar').length == 0 then 0 else $('#sub_menu_bar').height()
  $('#vertical_scroll_area').css 'height', (winHeight - (topbarHeight + subMenuBarHeight)) + 'px'

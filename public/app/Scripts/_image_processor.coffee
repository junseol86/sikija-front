# 앱의 전반적 이미지 사이징을 관리하는 스크립트

@imageProcessor = () -> {

  # 이미지를 배경으로 하는 div를 부모 div에 가로 또는 세로 중 한 방향으로 스크롤 되도록 사이즈 조정
  image_scroll_in_parent: (parentId, childId) ->
    parent = $('#' + parentId)
    child = $('#' + childId)

    prntW = parent.width()
    prntH = parent.height()

    imgSrc = child.attr 'data-bgsrc'
    imageOrg = new Image()
    imageOrg.src = imgSrc
    imageOrg.onload = () ->
      imgW = imageOrg.width
      imgH = imageOrg.height

      newW = 0
      newH = 0

      if (imgW/imgH > prntW/prntH)
        newH = prntH
        newW = imgW * newH/imgH
      else
        newW = prntW
        newH = imgH * newW/imgW

      child.css 'width', newW + 'px'
      child.css 'height', newH + 'px'
      child.css 'background-size', newW + 'px ' + newH + 'px'
      child.css 'background-image', 'url("' + imgSrc + '")'

  image_fit_to_div: (div_id) ->
    div = $(div_id)
    divW = div.width()
    divH = div.height()

    imgSrc = div.attr 'data-bgsrc'
    imageOrg = new Image()
    imageOrg.src = imgSrc
    imageOrg.onload = () ->
      imgW = imageOrg.width
      imgH = imageOrg.height

      newW = 0
      newH = 0
      posX = 0
      posY = 0

      if (imgW/imgH > divW/divH)
        newH = divH
        newW = imgW * newH/imgH
        posX = -((newW - divW) / 2)
      else
        newW = divW
        newH = imgH * newW/imgW
        posY = -((newH - divH) / 2)

      div.css 'background-size', newW + 'px ' + newH + 'px'
      div.css 'background-position', posX + 'px ' + posY + 'px'
      div.css 'background-image', 'url("' + imgSrc + '")'
}

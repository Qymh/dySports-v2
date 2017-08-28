import $ from 'jquery'

var Alert = {}

export default({
    Alert
})

// 加载动画
Alert.loading = function (type, contentBox) {
  var loadHtml = $('<div class="loading animated fadeIn">' +
    '<div class="loading-content">' +
    '<div class="spinner">' +
    '<div class="cube1"></div>' +
    '<div class="cube2"></div>' +
    '</div></div></div>');
  if (type == "show") {
    if (contentBox) {
      $(contentBox).append(loadHtml);
      $(contentBox).css("position", "relateve");
      $(".loading").css("position", "absolute")
    } else {
      $("body").append(loadHtml);
    }
  } else {
    $('.loading').removeClass("fadeIn").addClass("fadeOut");
    var timer=setTimeout(function () {
      $(".loading").remove();
      clearTimeout(timer);
      timer=null;
    }, 200);
  }
  return;
}

// 提示

Alert.result=function(content){
    var libHtml=`
        <div class="resultBox animated fadeIn">
            ${content}
        </div>
    `

    $('body').append($(libHtml))

    setTimeout(function(){
        $('.resultBox').remove()
    },1500)
}
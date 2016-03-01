//-----------------------------------------------------------------------------
var slideDuration = 500;
var slideTimeout = 3000;
var navigationFadeIn = 500;
var navigationFadeOut = 500;
var navigationOpacityIn = 1.0;
var navigationOpacityOut = 0.0;
var navigationPanelOpacityIn = 1.0;
var navigationPanelOpacityOut = 0.5;
var gallerySliderImg = 0;
var gallerySliderCount = 0;
var galleryWidth = 0;
var galleryHeight = 0;
var slideBorder = 0; // 0 - inner, 1 - on right, 2 - on left
var activeButton = null;
var slideTimer = null;

//-----------------------------------------------------------------------------
$(document).ready(function()
{
  gallerySliderCount = $(".gallerySlider").children().size();
  galleryWidth = $(".gallerySlider").width();
  galleryHeight = $(".gallerySlider").height();

  var navgationStart = '\
    <div class="gallerySliderContainer"></div>\
    <a href="#" class="gallerySliderLeft"></a>\
    <a href="#" class="gallerySliderRight"></a>\
    <div class="gallerySliderSwitchPanel">';

  var navigationButton0 = '\
    <a href="#" class="gallerySliderSwitch" alt="';
  var navigationButton1 = '\
    "></a>';

  var navigationEnd = '</div>';

  var navigationButtons = "";

  // insert core elements
  for(var i = 0; i < gallerySliderCount; i++)
    navigationButtons = navigationButtons+navigationButton0+i+navigationButton1;

  $(".gallerySlider").append(navgationStart + navigationButtons + navigationEnd);

  // set navigation buttons position
  $(".gallerySliderLeft").css({ top: galleryHeight * 0.5 - $(".gallerySliderLeft").height() * 0.5 });
  $(".gallerySliderRight").css({ top: galleryHeight * 0.5 - $(".gallerySliderRight").height() * 0.5 });
  $(".gallerySliderLeft").css({ opacity: navigationOpacityOut });
  $(".gallerySliderRight").css({ opacity: navigationOpacityOut });
  $(".gallerySliderSwitchPanel").css({ opacity: navigationPanelOpacityOut });

  // set dots panel position
  $(".gallerySliderSwitchPanel").css(
  {
    left: galleryWidth * 0.5 - $(".gallerySliderSwitchPanel").width() * 0.5,
    top: galleryHeight - 50
  });

  // get max image height
  var maxImgHeight = 0;
  for(i = 0; i < gallerySliderCount; i++)
  {
    var img = $(".gallerySlider").children(":eq("+i+")").children("img");
    var imgHeight = galleryWidth * img.height() / img.width();

    if(imgHeight > maxImgHeight)
      maxImgHeight = imgHeight;
  }

  // relink images into container
  $(".gallerySliderContainer").css({ width: galleryWidth * (gallerySliderCount + 2), height: galleryHeight });
  for(i = 0; i < gallerySliderCount; i++)
  {
    img = $(".gallerySlider").children(":eq(0)");
    imgHeight = galleryWidth * img.children("img").height() / img.children("img").width();

    img.attr("class", "gallerySliderImg");
    img.children("img").css(
    {
      width: galleryWidth,
      //height: galleryHeight,
      "margin-top": galleryHeight * 0.5 - maxImgHeight * 0.5,
      "margin-bottom": (maxImgHeight - imgHeight) * 0.5
    });
    img.appendTo(".gallerySliderContainer");
  }
  $(".gallerySliderContainer").children(":eq("+(gallerySliderCount - 1)+")").clone().prependTo(".gallerySliderContainer");
  $(".gallerySliderContainer").children(":eq(1)").clone().appendTo(".gallerySliderContainer");

  slideTimer = setInterval(timeoutSlide, slideTimeout);
  setImage(gallerySliderImg);
});
//-----------------------------------------------------------------------------
$("body").on("click", ".gallerySliderLeft", function()
{
  setImage(gallerySliderImg - 1);
});
//-----------------------------------------------------------------------------
$("body").on("click", ".gallerySliderRight", function()
{
  setImage(gallerySliderImg + 1);
});
//-----------------------------------------------------------------------------
$("body").on("click", ".gallerySliderSwitch", function()
{
  setImage(parseInt($(this).attr("alt")));
});
//-----------------------------------------------------------------------------
function setImage(index)
{
  var initState = (!activeButton) ? true : false;

  if(index >= gallerySliderCount)
  {
    gallerySliderImg = 0;
    slideBorder = 1;
  }
  else if(index < 0)
  {
    gallerySliderImg = gallerySliderCount - 1;
    slideBorder = 2;
  }
  else
  {
    gallerySliderImg = index;
    slideBorder = 0;
  }

  if(activeButton)
    activeButton.attr("id", "");

  activeButton = $(".gallerySliderSwitchPanel a:eq("+gallerySliderImg+")");
  activeButton.attr("id", "gallerySliderSelected");

  if(initState)
    $(".gallerySliderContainer").css({ left: galleryWidth * -gallerySliderImg - galleryWidth });
  else if(!slideBorder)
    $(".gallerySliderContainer").animate({ left: galleryWidth * -gallerySliderImg - galleryWidth }, slideDuration);
  else if(slideBorder == 1)
    $(".gallerySliderContainer").animate({ left: galleryWidth * -(gallerySliderCount + 1) }, slideDuration, onSlideFinished);
  else if(slideBorder == 2)
    $(".gallerySliderContainer").animate({ left: 0 }, slideDuration, onSlideFinished);

  clearInterval(slideTimer);
  slideTimer = setInterval(timeoutSlide, slideTimeout);
}
//-----------------------------------------------------------------------------
function timeoutSlide()
{
  setImage(gallerySliderImg + 1);
}
//-----------------------------------------------------------------------------
function onSlideFinished()
{
  $(".gallerySliderContainer").css({ left: galleryWidth * -gallerySliderImg - galleryWidth });
}
//-----------------------------------------------------------------------------
$("body").on("mouseenter", ".gallerySlider", function()
{
  $(".gallerySliderLeft").animate({ opacity: navigationOpacityIn }, navigationFadeIn);
  $(".gallerySliderRight").animate({ opacity: navigationOpacityIn }, navigationFadeIn);
  $(".gallerySliderSwitchPanel").animate({ opacity: navigationPanelOpacityIn }, navigationFadeIn);
});
//-----------------------------------------------------------------------------
$("body").on("mouseleave", ".gallerySlider", function()
{
  $(".gallerySliderLeft").animate({ opacity: navigationOpacityOut }, navigationFadeOut);
  $(".gallerySliderRight").animate({ opacity: navigationOpacityOut }, navigationFadeOut);
  $(".gallerySliderSwitchPanel").animate({ opacity: navigationPanelOpacityOut }, navigationFadeOut);
});
//-----------------------------------------------------------------------------

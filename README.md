## Description
Simple images slider using jQuery library.

## Features:
* rolling on timeout
* auto-crop images
* navigation: side buttons, bottom panel

## Install
Insert `js/gallerySlider.js` and `images/slider` in your project.

## Preview
<a href="http://biotopia.shy.cz/" target="_blank">Demo</a>.
<p style="text-align: center;">
<img src="http://s18.postimg.org/ind24cnp5/img00.jpg" alt="Gallery">
</p>

## Usage
```html
<html>
  <head>
    ...
    <script type="text/javascript" src="js/jquery-2.1.0.min.js"></script>
    ...
    <link rel="stylesheet" type="text/css" href="css/style.css">
    ...
  </head>
  <body>
    ...
    <div class="gallerySlider">
      <a href="img00.jpg"><img src="img00.jpg" alt="image"/></a>
      <a href="img01.jpg"><img src="img01.jpg" alt="image"/></a>
      <a href="page123.html"><img src="img02.jpg" alt="image"/></a>
    </div>
    <script type="text/javascript" src="js/gallerySlider.js"></script>
    ...
  </body>
</html>
```
<!--<img src="http://s18.postimg.org/octaontvd/img01.jpg" alt="Gallery">-->

## Tweak gallery
File `js/gallerySlider.js`:
```javascript
var slideDuration = 500; // ms
var slideTimeout = 3000; // ms
var navigationFadeIn = 500; // ms
var navigationFadeOut = 500; // ms
var navigationOpacityIn = 1.0;
var navigationOpacityOut = 0.0;
var navigationPanelOpacityIn = 1.0;
var navigationPanelOpacityOut = 0.5;
```

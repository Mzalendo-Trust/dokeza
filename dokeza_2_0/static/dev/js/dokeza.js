/* Place your project specific JS here. */

var $slider = $(".images-container");
var $slides = $slider.find(".image-holder");
var $navPrev = $(".prev-img");
var $navNext = $(".next-img");
var $startAutoplay = $(".start-autoplay");
var $stopAutoplay = $(".stop-autoplay");
var slidesNum = $slides.length;
var prevSlideID = slidesNum - 1;
var currentSlideID = 0;
var isAnimating = false;
var isAutoPlay = true;

function init() {
  gsap.set($slides, {
    left: "-100%",
  });
  $navPrev.on("click", gotoPrevSlide);
  $navNext.on("click", gotoNextSlide);
  $startAutoplay.on("click", startAutoPlay);
  $stopAutoplay.on("click", stopAutoPlay);
  gotoSlide(0, 0);
}

function gotoPrevSlide() {
  var slideToGo = currentSlideID - 1;
  if (slideToGo <= -1) {
    slideToGo = slidesNum - 1;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 0.5, "prev");
}

function gotoNextSlide() {
  var slideToGo = currentSlideID + 1;
  if (slideToGo >= slidesNum) {
    slideToGo = 0;
  }
  stopAutoPlay();
  gotoSlide(slideToGo, 0.5, "next");
}

function gotoSlide(slideID, _time, _direction) {
  if (!isAnimating) {
    isAnimating = true;
    prevSlideID = currentSlideID;
    currentSlideID = slideID;
    var $prevSlide = $slides.eq(prevSlideID);
    var $currentSlide = $slides.eq(currentSlideID);
    var time = 1;
    if (_time !== null) {
      time = _time;
    }
    var direction = "next";
    if (_direction != null) {
      direction = _direction;
    }
    if (direction == "next") {
      gsap.to($prevSlide, time, {
        left: "-100%",
        ease: Power2.easeOut,
      });
      gsap.fromTo(
        $currentSlide,
        time,
        {
          left: "100%",
          ease: Power2.easeOut,
        },
        {
          left: "0",
          ease: Power2.easeOut,
        }
      );
    } else {
      gsap.to($prevSlide, time, {
        left: "100%",
        ease: Power2.easeOut,
      });
      gsap.fromTo(
        $currentSlide,
        time,
        {
          left: "-100%",
          ease: Power2.easeOut,
        },
        {
          left: "0",
          ease: Power2.easeOut,
        }
      );
    }
    gsap.delayedCall(time, function() {
      isAnimating = false;
    });
  }
}

function play() {
  gotoNextSlide();
  gsap.delayedCall(4, play);
}

function startAutoPlay(immediate) {
  if (immediate != null) {
    immediate = true;
  }

  if (immediate) {
    gotoNextSlide();
  }
  gsap.delayedCall(4, play);
}

function stopAutoPlay() {
  isAutoPlay = false;
  gsap.killTweensOf(play);
}
init();

// ---------------------------------------------
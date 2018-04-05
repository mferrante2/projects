window.pictureBook = function(update) {

  var windowAspectRatio = window.innerWidth/window.innerHeight,
      isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/.test(navigator.userAgent);

// console.log(windowAspectRatio);
  var scrollYAtScan = 0,
      // screenMeasure = windowAspectRatio < 0.7 && isMobile ? 0.8 : 0.5; // measurement point for page progress - 0.5 = vertical center of the window.
      screenMeasure = windowAspectRatio <= 0.9 || window.innerWidth < 855 ? 0.7 : 0.5; // measurement point for page progress - 0.5 = vertical center of the window.

  function getScrollY() {
    // if (isLegacyMobile) return scroller.scrollTop;
    return scrollY;
  }

  this.init = function(initialize, update, ready) {
    var that = this;
    this.books.forEach(function(book) {
      book.datum = [].slice.call(book.node.attributes)
        .filter(function(d) { return d.name.indexOf("data-pb-") === 0; })
        .map(function(d) { return {name: d.name.replace("data-pb-", ""), value: +d.value }; }); // todo do we always want to coerce here?
      
      var userDefinedScreenMeasure = null;
      book.datum.forEach(function(d) {
        if (d.name === 'screenmeasure') userDefinedScreenMeasure = d.value;
      });

      book.screenMeasure = userDefinedScreenMeasure || screenMeasure;
      
    });

    document.addEventListener("scroll", function() { that.scroll(); }, false);
    document.addEventListener("resize", function() { that.resize(); }, false);
      // document.body.addEventListener("touchstart", function() { that.scroll(); }, false);
      // document.body.addEventListener("touchmove", function() { that.scroll(); }, false);
      // document.body.addEventListener("touchend", function() { that.scroll(); }, false);
    // if (isLegacyMobile) {
    //   scroller.addEventListener("scroll", function() { that.scroll(); }, false);
    //   document.body.addEventListener("scroll", function() { that.scroll(); }, false);
    //   document.body.addEventListener("touchstart", function() { that.scroll(); }, false);
    //   document.body.addEventListener("touchmove", function() { that.scroll(); }, false);
    //   document.body.addEventListener("touchend", function() { that.scroll(); }, false);
    // }

    that.update = update;
    that.scan();

    this.books.forEach(function(book) {
      initialize(book);
      ready(book);
    });
    
    that.scroll(); // just in case user starts in middle of the page, give it an initial scroll event


  }

  this.books = [].map.call(document.querySelectorAll(".g-picture-book"), function(d) {
    return {
      node: d,
      slug: d.getAttribute("data-slug"),
      bgNode: d.querySelector(".g-picture-book__bg"),
      pages: [].map.call(d.querySelectorAll(".g-picture-book__page"), function(page) { return {node: page}; })
    };
  });

  this.scroll = function() {
    // console.time("scroll");
    var that = this;
    var cachedScrollY = getScrollY();
    var isFixed = false;
    var anyActiveBook = false;
    this.scan(); //XXX TODO fix because nyt5 resizes the page randomly
    this.books.forEach(function(book, bi) {
              
      var topDistance    = cachedScrollY - scrollYAtScan - book.rect.top,
          bottomDistance = cachedScrollY - scrollYAtScan - book.rect.bottom + book.bgRect.height;

      // book.progress=(topDistance-book.bgRect.height/2)/(book.rect.height-book.bgRect.height*2);
        // book.progress = (topDistance-bottomDistance)/2/(book.rect.height-book.bgRect.height-firstPage.rect.top-lastPage.rect.bottom);

      // Background fixing
      // Top
      if (topDistance <= 0 && bottomDistance <= 0) {
        book.bgNode.classList.remove("g-fixed");
        book.bgNode.classList.remove("g-bottom");
        // if (isLegacyMobile) book.node.querySelector(".g-zoomer-wrap").appendChild(book.bgNode);
      // Bottom
      } else if (bottomDistance > 0) {
        book.bgNode.classList.remove("g-fixed");
        book.bgNode.classList.add("g-bottom");
        // if (isLegacyMobile) book.node.querySelector(".g-zoomer-wrap").appendChild(book.bgNode);
      // Fixed
      } else {
        that.activeBook = book;
        anyActiveBook = true;
        isFixed = true;
        // if (isLegacyMobile) document.querySelector(".ftscroller_container").appendChild(book.bgNode);
        book.bgNode.classList.add("g-fixed");
        book.bgNode.classList.remove("g-bottom");

        // Pages
        if (book.pages.length) {

          var fp = book.pages[0];
          var lp = book.pages[book.pages.length-1];

          fp.pxPosition = fp.rect.middle-book.rect.top;
          lp.pxPosition = lp.rect.middle-book.rect.top;

          var bookProgressPx = topDistance - fp.pxPosition + book.bgRect.height * book.screenMeasure;
          var bookLengthPx   = (book.rect.height - fp.pxPosition) - (book.rect.height-lp.pxPosition);

          book.progress = bookProgressPx/bookLengthPx;

          book.minIndex = 0;
          book.pages.forEach(function(page, pi) {

            var topDistance    = cachedScrollY - scrollYAtScan - page.rect.top    + innerHeight * book.screenMeasure,
                midDistance    = cachedScrollY - scrollYAtScan - (page.rect.top+page.rect.height/2) + innerHeight * book.screenMeasure,
                bottomDistance = cachedScrollY - scrollYAtScan - page.rect.bottom + innerHeight * book.screenMeasure;


            page.progress = (page.rect.top + page.rect.height * book.screenMeasure)/innerHeight;
            page.midDistance = midDistance;
            if (bottomDistance >= 0) {
              page.distance = bottomDistance;
              book.minIndex = pi;
            } else if (topDistance <= 0) {
              page.distance = topDistance;
            } else if (topDistance > 0 && bottomDistance < 0) {
              page.distance = 0;
              book.minIndex = pi;
            }
          });

          book.maxIndex  = Math.min(book.minIndex + 1, book.pages.length - 1);

          book.minPage   = book.pages[book.minIndex];
          book.maxPage   = book.pages[book.maxIndex];

          book.remainder = book.minIndex === book.maxIndex ? 0 : 1 - Math.max(0, - book.minPage.distance / (book.maxPage.distance - book.minPage.distance));
          book.middleRemainder = book.minIndex === book.maxIndex ? 0 : 1 - Math.max(0, book.minPage.midDistance / innerHeight );

          book.remainder = that.easeInOutQuad(book.remainder);

          that.activePage = book.minPage;
          that.update(that.activePage);

        }
      }

    });

    if (!anyActiveBook) that.activeBook = null;

    // console.timeEnd("scroll");
  };

  this.scan = function() {
    scrollYAtScan = getScrollY();
    this.books.forEach(function(book) {
      book.rect = book.node.getBoundingClientRect();
      book.bgRect = book.bgNode.getBoundingClientRect();
      book.pages.forEach(function(page) {
        page.rect = page.node.getBoundingClientRect();
        page.rect.middle = (page.rect.top+page.rect.height/2);
        page.attributes = {};
      });
        // book.progress=(topDistance-book.bgRect.height/2)/(book.rect.height-book.bgRect.height*2);
      var fp = book.pages[0];
      var lp = book.pages[book.pages.length-1];

      book.pages.forEach(function(page) {
        // page.position = (page.rect.middle-book.rect.top)/book.rect.height;

        var attributes = page.node.attributes;

        for (var i = 0; i < attributes.length; i++) {
          var attribute = attributes[i];
          var pictureBookAttribute = attribute.name.match(/^(data-pb-)(.*)$/);

          if (pictureBookAttribute) {
            var newName = pictureBookAttribute[2];
            page.attributes[newName] = attribute.value;
          }
        };

        page.position = (page.rect.middle-fp.rect.middle) / (lp.rect.middle-fp.rect.middle);

        var pageOffsets = (innerHeight * (book.screenMeasure-0.5) );          
        page.position -= pageOffsets / (lp.rect.middle - fp.rect.middle);

        page.node.setAttribute("data-pb-pos",page.position)
      })
    });
  }

  this.resize = function() {
    this.scan();
    this.scroll();
  }

  this.easeLinear = function(t) { return t; }
  this.easeInOutSinusoidal = function(t) { return (Math.sin(t * Math.PI - Math.PI / 2) + 1) / 2; }
  this.easeInQuad = function(t) { return t * t; }
  this.easeOutQuad = function(t) { return 1 - this.easeInQuad(1 - t); }
  this.easeInOutQuad = function(t) { return (t < 0.5) ? this.easeInQuad(t * 2) / 2 : 1 - this.easeInQuad((1 - t) * 2) / 2; }
  this.easeInCubic = function(t) { return Math.pow(t, 3); }
  this.easeOutCubic = function(t) { return 1 - this.easeInCubic(1 - t); }
  this.easeInOutCubic = function(t) { return (t < 0.5) ? this.easeInCubic(t * 2) / 2 : 1 - this.easeInCubic((1 - t) * 2) / 2; }

}

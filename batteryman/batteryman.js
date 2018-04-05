window.onload = function() {

// picturebooks setup for scroller stuff
    var pb = new window.pictureBook();
    pb.init(bookInit, bookScroll, bookReady);

    function bookInit(b) {
      console.log('bookInit:', b.slug);
      if (b.slug === 'rapanui') window.rapaNuiInit = function () { window.BigMap.mapBookInit(pb, b) }; // bc we want to call it once the map is booted
    } // end bookInit

    function bookScroll(page) {
      // console.log('scroll', b, page);
      var b = pb.activeBook;
      // if (b.slug === 'rapanui') _.defer(BigMap.mapBookScroll, pb, b, page);
      if (b.slug === 'rapanui' && window.mapBooted && window.BigMap) window.BigMap.mapBookScroll(pb, b, page);
    }; // end bookScroll()

    function bookReady(b) {
      console.log('bookReady:', b.slug)
      if (b.slug === 'rapanui') window.rapaNuiReady = function () { window.BigMap.mapBookReady(pb, b) }; // bc we want to call it once the map is booted
    };

/* headline timer */

setTimeout(function(){
document.getElementById("headline").style.visibility = "visible";
},1700);
    
   setTimeout(function(){
document.getElementById("deck").style.visibility = "visible";
},3000); 


/* mute/unmute buttons */



/* mute hover thing */
  
    var covervideo = document.getelementById("cover-video");
   
    covervideo.addEventListener("mouseover", function() {
        
        covervideo.muted = "true";
        
    });
    
    
          var video1 = document.getElementById("driving-video");
          var video2 = document.getElementById("breaking-video");
          var video3 = document.getElementById("working-video");
            

          var unmuteButton1 = document.getElementById("driving-unmute");
          var unmuteButton2 = document.getElementById("breaking-unmute");
          var unmuteButton3 = document.getElementById("working-unmute");
          
          var muteButton1 = document.getElementById("driving-mute");
          var muteButton2 = document.getElementById("breaking-mute");
          var muteButton3 = document.getElementById("working-mute");
}

unmuteButton3.addEventListener("click", function() {
          
      if (video3.muted == true) {
    // Mute the video
    video3.muted = false;

    // Update the button text
    unmuteButton3.style.visibility = 'hidden';
      muteButton3.style.visibility = 'visible';
  } else {
      
      video3.muted = false;
  }
});
          
    muteButton3.addEventListener ("click", function() {
              
    if (video3.muted == false) {
    // Unmute the video
    video3.muted = true;

    // Update the button text
    muteButton3.style.visibility = 'hidden';
    unmuteButton3.style.visibility = 'visible';
                  
    } else {
                  
    video3.muted = true;
    }
              









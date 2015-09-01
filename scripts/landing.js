var pointsArray = document.getElementsByClassName('point');
 
var animatePoints = function(points) {
    function revealPoint(i) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(3)";
        points[i].style.msTransform = "scaleX(1) translateY(3)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(3)";  
    }
    for (i=0; i < 3; i++) {
        revealPoint(i);
    }
};

window.onload = function() {
     
    // Automatically animates the points on a tall screen where scrolling can't trigger the animation
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }
    window.addEventListener('scroll', function(event) {
        // console.log("Current offset from the top is " + pointsArray[0].getBoundingClientRect().top + " pixels");
        if (pointsArray[0].getBoundingClientRect().top <= 500) {
            animatePoints(pointsArray);
        }
    });
};



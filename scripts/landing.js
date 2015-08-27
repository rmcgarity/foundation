var animatePoints = function() {

    var points = document.getElementsByClassName('point');

//               var revealFirstPoint = function() {
//                   points[0].style.opacity = 1;
//                   points[0].style.transform = "scaleX(1) translateY(0)";
//                   points[0].style.msTransform = "scaleX(1) translateY(0)";
//                   points[0].style.WebkitTransform = "scaleX(2) translateY(0)";   
//               };
//
//               var revealSecondPoint = function() {
//                   points[1].style.opacity = 1;
//                   points[1].style.transform = "scaleX(1) translateY(0)";
//                   points[1].style.msTransform = "scaleX(1) translateY(0)";
//                   points[1].style.WebkitTransform = "scaleX(1) translateY(0)";   
//               };
//
//               var revealThirdPoint = function() {
//                   points[2].style.opacity = 1;
//                   points[2].style.transform = "scaleX(1) translateY(0)";
//                   points[2].style.msTransform = "scaleX(1) translateY(0)";
//                   points[2].style.WebkitTransform = "scaleX(1) translateY(0)";   
//               };
//               
    function revealPoint(i) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(3)";
        points[i].style.msTransform = "scaleX(1) translateY(3)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(3)";  
    }
    for (i=0; i < 3; i++) {
        revealPoint(i);
    }
//                revealFirstPoint();
//                revealSecondPoint();
//                revealThirdPoint();

};
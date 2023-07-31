//This function starts when the user clicks on the right arrow, the active class is removed from the current image and then applied to the next image. The z-index is also updated for both the next and current image to place the next image on top.
$(document).ready(function () {
    $('.next').on('click', function () {
        var currentImg = $('.active');
        var nextImg = currentImg.next();

        if (nextImg.length) {
            currentImg.removeClass('active').css('z-index', -10);
            nextImg.addClass('active').css('z-index', 10);
        }
    });

    //Similarly to the other function, this function works for the previous image so the user can click the left arrow to go back to the previous image.
    $('.prev').on('click', function () {
        var currentImg = $('.active');
        var prevImg = currentImg.prev();

        if (prevImg.length) {
            currentImg.removeClass('active').css('z-index', -10);
            prevImg.addClass('active').css('z-index', 10);
        }
    });
});
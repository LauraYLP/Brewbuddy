$(document).foundation()
//for scroll bar in leader board section
$(window).load(function(){
    $('#wscroll').jScrollPane();
});

function toggleNav() {
    var offCanvas = new Foundation.OffCanvas($("#nav"));
    offCanvas.toggle();
}

// Add click event listener to the hamburger menu button
document.getElementById("menu-toggle").addEventListener("click", toggleNav);
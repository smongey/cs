$(window).load(function(){
	
	pageElems();

});

function pageElems() {
	$('.slider').glide();
	var $container = $('.images');
	// initialize
	$container.masonry({
	  columnWidth: 3,
	  itemSelector: '.item',
	  gutter: 10
	});

	$(window).on('scroll', function(e){
		var scrollDist = $(window).scrollTop();
		var converted = Math.floor(-scrollDist/8);

		$('.slider').css({
			'margin-top' : converted
		});
	});

}




$(document).ready(function(){
 
    ajaxCall('h1 a, ul.main li a', '#container', '#guts', 200);

	$('a.mobile').on('click', function(e){
		e.preventDefault();
		if(!$('.mobile').hasClass('open')) {
			$('header nav').animate({
				'height': '300px'
			}, 300);
			setTimeout(function(){
				$('ul.main, a.mobile').addClass('open');
			}, 250);
		} 

		if($('.mobile').hasClass('open')) {
			setTimeout(function(){
				$('header nav').animate({
					'height': '76px'
				}, 300);
			}, 250);
			$('ul.main, a.mobile').removeClass('open');
		}

	});
 
});
 
function ajaxCall(link, container, guts, speed) {
 
    var mainContent = $(container),
    	contents = $(guts),
    	makeCall = $(link);
    
    var checkBack = function() {
        $(window).on('popstate', function(){
           _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
           loadContent(_link);
        });
    }
 
    makeCall.on("click", function(e) {
        _link = $(this).attr("href");
        $('ul.main li a').removeClass('active');
        $(this).addClass('active');
        history.pushState(null, null, _link);
        loadContent(_link);     
        e.preventDefault();
        console.log('huh');
    });
 
    function loadContent(href){
        mainContent.find(guts).fadeOut(speed, function() {
            mainContent.hide().load(href + " " + guts, function() {

                mainContent.fadeIn(speed, function() {
                	pageElems();
                });
            });
        });
        checkBack();
    }
 
};
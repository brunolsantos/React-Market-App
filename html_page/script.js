$(function() {
	$('.fa-shopping-cart').click(function(){  
		if ($(".fa-shopping-cart").css('background-color')=="rgb(68, 74, 136)"){
			var colorBefore = $(".fa-shopping-cart").css('background-color');
			var colorAfter = 'rgba(0, 0, 0, 0)';
			$(this)
            .css("backgroundColor", colorBefore)
			.animate({ backgroundColor: colorAfter }, 200);
			hidePopup();
		}else{
			var colorBefore = $(".fa-shopping-cart").css('background-color');
			var colorAfter = 'rgba(68, 74, 136, 1)';
			$(this)
            .css("backgroundColor", colorBefore)
			.animate({ backgroundColor: colorAfter }, 200);
			showPopup();	
		}
	})

	function hidePopup() {
		$(".cart-products").hide();
	}
		
	function showPopup() {
		$(".cart-products").show();
	}
	function callback() {
		setTimeout(function() {
		  $( "#effect" ).removeAttr( "style" ).hide().fadeIn();
		}, 1000 );
	  };
});

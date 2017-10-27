$(function() {
	$('.fa-shopping-cart').click(function(){  
		if ($(".fa-shopping-cart").css('background-color')=="rgb(68, 74, 136)"){
			var colorBefore = $(".fa-shopping-cart").css('background-color');
			var colorAfter = 'rgba(0, 0, 0, 0)';
			$(this)
            .css("backgroundColor", colorBefore)
            .animate({ backgroundColor: colorAfter }, 200);
		}else{
			var colorBefore = $(".fa-shopping-cart").css('background-color');
			var colorAfter = 'rgba(68, 74, 136, 1)';
			$(this)
            .css("backgroundColor", colorBefore)
            .animate({ backgroundColor: colorAfter }, 200);		
		}
	})
});

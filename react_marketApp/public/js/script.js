$(function () {
	$('.fa-shopping-cart').click(function () {
		if ($(".fa-shopping-cart").css('background-color') == "rgb(68, 74, 136)") {
			var colorBefore = $(".fa-shopping-cart").css('background-color');
			var colorAfter = 'rgba(0, 0, 0, 0)';
			$(this)
				.css("backgroundColor", colorBefore)
				.animate({ backgroundColor: colorAfter }, 200);
			hidePopup();
		} else {
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
		setTimeout(function () {
			$("#effect").removeAttr("style").hide().fadeIn();
		}, 1000);
	};

	$(".calendar").datepicker({
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		minDate: 0, 
		maxDate: "+4D",
		dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
		dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
		dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
		monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
		nextText: 'Próximo',
		prevText: 'Anterior'
	});

	$(document).on('click', '.date-picker .input', function (e) {
		var $me = $(this),
			$parent = $me.parents('.date-picker');
		$parent.toggleClass('open');
	});

	$(".calendar").on("change", function () {
		var $me = $(this),
			$selected = $me.val(),
			$parent = $me.parents('.date-picker');
		$parent.find('.result').children('span').html($selected);
	});
});

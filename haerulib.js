$.fn.haeruSelect = function(){
	var select = $(this);
	var html = '<div class="selectbox">';
	html += '<input type="hidden" name="'+$(select).attr("name")+'">';
	html += '<a href="javascript:; class="sb">';
	html += '<ul>';
	$(this).find("option").each(function(){
		var option = $(this);
		html += '<li><a href="javascript:;" data-val="'+$(option).val()+'">'+$(option).text()+'</a></li>';
	});
	html += '</ul>';
	html += '</div>';
	$(".haerulib").after();

	$(".selectbox > a").on("click", function(){
		if($(this).next().hasClass("on"))
			$(this).next().hide().removeClass("on");
		else{
			$(".selectbox ul").hide().removeClass("on");
			$(this).next().show().addClass("on");
		}
	});

	$(".selectbox li a").on("click", function(){
		$(this).parents("ul").siblings("input").val($(this).text());
		$(this).parents("ul").hide().removeClass("on");
		$(this).parents("ul").siblings("a").text($(this).text());
	});

	$(window).on("click", function(e){
		console.log(e.target);
		if(!$(e.target).hasClass("sb"))
			if($(".selectbox ul").hasClass("on"))
				$(".selectbox ul").hide().removeClass("on");
	});
}

$.fn.haeruSlide = function(){
		var targetSec = $(this),
			targetUl = targetSec.find("ul"), 
			targetFirst = targetUl.find("li:first-child"), 
			targetList = targetSec.find("li"), 
			thisWidth = targetSec.width(),
			thisHeight = targetSec.height(), 
			listSize = targetList.size(), 
			totalWidth = thisWidth*listSize,
            speed = 800;

		//Seting Button
		var buttonCode = "<button id='haeruPrev'>prev</button>"
						+ "<button id='haeruNext'>next</button>"
						+ "<ul class='bolButton'></ul>";
		targetSec.after(buttonCode);
		targetList.each(function(){
			var listIndex = $(this).index() + parseInt(1);
			$(".bolButton")
				.append($("<li/>").html("<button>"+ listIndex +"</button>"));
		});

		//Seting CSS
		targetSec.css({
			position: "relative",
			overflow : "hidden"
		});
		targetList.css({
			float: "left",
			width: thisWidth, 
			height: thisHeight 
		});
		targetUl.css({
			position: "absolute", 
			top: "0",
			left: "0",
			width: totalWidth
		});

		//current setting
		$(targetFirst).addClass("current");

		//slide(next/prev)
		$(targetSec).siblings("button").on("click", function(){
			var buttonId = $(this).attr("id"), 
				ulPosition = $(targetUl).position().left,
				current = $(".current"),
				curPosition = $(current).parent().position().left;

			if(!$(targetUl).is(":animated")){
				if(buttonId == "haeruPrev"){
					if(ulPosition < 0){
						current.removeClass("current");
						current.prev().addClass("current");
						$(targetUl).animate({
							"left" : curPosition+thisWidth
						}, speed);
					}
				}else{
					if(-ulPosition < totalWidth-thisWidth){
						current.removeClass("current");
						current.next().addClass("current");
						$(targetUl).animate({
							"left" : curPosition-thisWidth
						}, speed);
					}
				}
			}
		});

		//slide(bol)
		$(".bolButton").find("button").on("click", function(e){
			var thisIndex = $(this).parent().index() + parseInt(1);
			if(!$(targetUl).is(":animated")){
				$(".current").removeClass("current");
				$(targetUl).find(":nth-child("+ thisIndex +")").addClass("current");
				$(targetUl).animate({
					"left" : -thisWidth*(thisIndex-1)
				}, speed)
			}
		});
	}
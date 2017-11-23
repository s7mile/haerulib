var haerulib = {
	init: function(){
		this.select();
		this.imgslider();
	},
	select: function(){
		$(".haerulib").each(function(){
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
		});

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
}

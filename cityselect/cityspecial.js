/*
此插件基于Jquery
插件名：jquery.cityselect
开发者 usual2970
版本 1.0
Blog：http://t.qq.com/usual2970
*/
(function($){
	$.cityspecial=function(){
		var data={
			zx_citys:[110000,120000,310000,500000],
			provinces:["130000", "140000", "150000", "210000", "220000", "230000", "320000", "330000", "340000", "350000", "360000", "370000", "410000", "420000", "430000", "440000", "450000", "460000", "510000", "520000", "530000", "540000", "610000", "620000", "630000", "640000", "650000", "710000", "810000", "820000", "990000"],
			tdist:tdist
		};
		var arr=[];
		for(i in tdist){
			if(tdist[i][1]==1){arr.push(i)}
		}
		var tpl=$("#city_tpl").html();
		var html=juicer(tpl,data);
		$("#cityshow").html(html);

		$(document).off("mouseover",".cityspecial_wrap li").on("mouseover",".cityspecial_wrap li",function(){
			$(this).addClass("cityspecial_hover");
		})
		$(document).off("mouseout",".cityspecial_wrap li").on("mouseout",".cityspecial_wrap li",function(){
			$(this).removeClass("cityspecial_hover");
		})
		$(".cityspecial_close").off("click").on("click",function(){
			cityspecial_close();
		});

		$(document).off("click").on("click",function(e){
			if($(e.target).closest(".cityspecial_wrap").length==0 && $(e.target).closest("#edit").length==0) cityspecial_close();
		});

		$(document).off("click",".cityspecial_wrap li").on("click",".cityspecial_wrap li",function(){
			var type=$(this).attr("class");
			$(this).addClass("cityspecial_click").siblings().removeClass("cityspecial_click");
			type=type.replace(/(\w+)?\s+.+/,"$1");
			var id=$(this).attr("alt");
			if(type=="cityspecial_city"){
				comp_shippingfee(id);
				cityspecial_close();
			}
			else if(type=="cityspecial_province"){
				
				cityspecial_showcitys(id);
			}
		});
	}

	function cityspecial_close(){
		$(".cityspecial_wrap").remove();
	}

	function comp_shippingfee(id){

	}

	function cityspecial_showcitys(id){
		var data={
			id:id,
			tdist:tdist
		};
		var tpl=$("#subcity_tpl").html();
		var html=juicer(tpl,data);
		$(".cityspecial_wrap .cityspecial_bottom").html(html);

	}

	$.cityspecial.cityspecial_set=function(id){
		var pid=tdist[id][1];
		cityspecial_showcitys(pid);
		if(pid!=1){
			$("#cityspecial_province"+pid).addClass("cityspecial_click").siblings().removeClass("cityspecial_click");
		}
		
		$("#cityspecial_city"+id).addClass("cityspecial_click").siblings().removeClass("cityspecial_click");

	}
})(jQuery);
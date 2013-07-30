/*
此插件基于Jquery
插件名：jquery.cityselect
开发者 usual2970
版本 1.0
Blog：http://t.qq.com/usual2970
*/
(function($){
	$.cityselect=function(option){
		var opts=$.extend({},$.cityselect.defaults,option);
		var data={
			citylist:tdist,
			areaGroup:areaGroup
		}
		var tpl=$("#city_tpl").html();
		var html=juicer(tpl,data);
		
		$("#cityshow").html(html);
		$("#city_select_close,#city_select_cancel").off("click").on("click",cityselect_close);
		$("i#city_select_showcity").off("click").on("click",function(){
			show_cities(this);
		});
		$(".city_select_province_close input").off("click").on("click",function(){
			close_cities(this);
		});

		$("#city_select_submit").off("click").on("click",function(){
			var cids=$.cityselect.getValue();
			var cid_str=cids.join(",");
			var cname_arr=[];
			for(var i=0;i<cids.length;i++){
				cname_arr.push(tdist[cids[i]][0]);
			}
			var cname_str=cname_arr.join(",");
			$("#"+opts.t_name).html(cname_str);
			console.log({cid_str:cid_str,cname_str:cname_str});
		});
		$(".city_select_wrap input[type=checkbox]").off("click").on("click",function(){
			select_city(this);
		});
	}

	$.cityselect.getValue=function(){
		var data=$(".city_select_wrap #city_select_form").serialize();
		var data_arr=data.split("&");
		var provinces=[];
		var cities=[];
		for(var i=0;i<data_arr.length;i++){
			var temp=data_arr[i].split("=");
			switch(temp[0]){
				case "city_select_province":
					provinces.push(temp[1]);
					break;
				case "city_select_city":
					cities.push(temp[1]);
					break;
			}
		}
		for(var i=0;i<provinces.length;i++){
			for(var j=0;j<cities.length;j++){
				if(cities[j]!=0){
					var p_id=tdist[cities[j]][1];
					if(p_id==provinces[i]) cities[j]=0;
				}
				
			}
		}
		for(var j=0;j<cities.length;j++){
			if(cities[j]!=0){
				provinces.push(cities[j]);
			}
		}

		return provinces;
	}

	$.cityselect.setValue=function(arr){
		$(".city_select_wrap input[type=checkbox]").attr("checked",false);
		for(var i=0;i<arr.length;i++){
			if(tdist[arr[i]][1]==1){
				var obj=$(".city_select_wrap input[value="+arr[i]+"]");
				obj.attr("checked",true);
				obj.siblings(".city_select_cities").find("input[name=city_select_city]").attr("checked",true);
			}
			else{
				var obj=$(".city_select_wrap input[value="+arr[i]+"]");
				obj.attr("checked",true);
			}
		}
	}

	$.cityselect.defaults={
		t_position:"",
		t_value:"",
		t_name:""
	}
	function select_city(obj){
		var me=$(obj);
		var me_status=me.prop("checked");
		var checked=me_status?"checked":undefined;
		var name=me.attr("name");
		//处理name为city_select_group的情形
		if(name=="city_select_group"){
			me.parent().siblings(".city_select_provinces").find("input[type=checkbox]").attr("checked",me_status);
		}
		//处理name为city_select_province的情形
		if(name=="city_select_province"){
			var province=me.parents(".city_select_provinces").find("input[name=city_select_province]");
			var province_checked=me.parents(".city_select_provinces").find("#city_select_province:checked");
			var group=me.parents(".city_select_unit").find("#city_select_group");
			var cities=me.siblings(".city_select_cities").find("input[name=city_select_city]");
			if(province.length>province_checked.length){
				group.attr("checked",false);
				
			}else{
				group.attr("checked",true);
			}
			cities.attr("checked",me_status);
		}
		//处理name为city_select_city的情形
		if(name=="city_select_city"){
			var cities=me.parents(".city_select_cities").find("input[name=city_select_city]");
			var cities_checked=me.parents(".city_select_cities").find("input[name=city_select_city]:checked");
			var p_province=me.parents(".city_select_cities").siblings("input[name=city_select_province]");
			if(cities.length>cities_checked.length){
				p_province.attr("checked",false)
			}
			else{
				p_province.attr("checked",true);
			}
			var province=me.parents(".city_select_unit").find("input[name=city_select_province]");
			var province_checked=me.parents(".city_select_unit").find("input[name=city_select_province]:checked");
			var group=me.parents(".city_select_unit").find("input[name=city_select_group]");
			if(province.length>province_checked.length){
				group.attr("checked",false);
			}
			else{
				group.attr("checked",true);
			}
		}
	}
	function cityselect_close(){
		$(".city_select_wrap").remove();
	}

	function show_cities(obj){
		var cities=$(obj).siblings(".city_select_cities")
		var display=cities.css("display");
		$(".city_select_cities").hide();
		$(".city_select_province_div").removeClass("city_select_by");
		if(display=="none"){
			cities.addClass("city_select_by").show();
			$(obj).parent().addClass("city_select_by");
		}
		else {
			$(obj).parent().removeClass("city_select_by");
			cities.removeClass("city_select_by").hide();
		}
	}

	function close_cities(obj){
		var cities=$(obj).parents(".city_select_cities");
		cities.removeClass("city_select_by").hide().parent().removeClass("city_select_by");
	}


})(jQuery);
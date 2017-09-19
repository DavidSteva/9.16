var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			content: null
		},
		showList: true,
		title: null,
		noticeSetting: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.noticeSetting = {};
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			$.get("/sys/noticeSetting/info/"+id, function(r){
				vm.showList = false;
                vm.title = "修改";
				vm.noticeSetting = r.noticeSetting;
			});
			/*$.ajax({
		        type: "POST",
		        url: "/sys/noticeSetting/info/"+id,
		        contentType: "application/json;charset=utf-8",
		        dataType: "json",
		        success: function (r) {
		        	vm.showList = false;
	                vm.title = "修改";
					vm.noticeSetting = r.noticeSetting;
		        },
		    });*/
		},
		saveOrUpdate: function () {
            if(vm.validator()){
                return ;
            }

			var url = vm.noticeSetting.id == null ? "sys/noticeSetting/save" : "sys/noticeSetting/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.noticeSetting),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (id) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			//var ids="ids="+id;
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/noticeSetting/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'content': vm.q.content},
                page:page 
            }).trigger("reloadGrid");
		},
        validator: function () {
           if(isBlank(vm.noticeSetting.content)){
                alert("标题不能为空");
                return true;
            }

            if(isBlank(vm.noticeSetting.title)){
                alert("公告详情不能为空");
                return true;
            }

        }
	}
});
$(function () {
    $("#jqGrid").jqGrid({
        url:  baseURL + 'or/Coupon/CouponAll',
        datatype: "json",
        colName:['序号','优惠券价格','有效期(天)','查看优惠券','操作'] ,
        colModel: [	  
			{ label: '序号', name: 'cid', width: 40, key: true },
			{ label: '优惠券价格', name: 'cpprice', width: 60 },
			{ label: '有效期(天)', name: 'validityperiod', width: 60 },
			{ label: '查看优惠券', width: 60,formatter:function(value,option,row){
				return '<a href="">查看</a>'
			} },
			{ label: '操作', width: 60 ,formatter:function(value,option,row){
				return '<button class="btn btn-danger" >×</button>'
			} }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

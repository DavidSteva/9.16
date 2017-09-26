$(function () {
    $("#jqGrid").jqGrid({
        url: '/sys/syshomepage/list',
        datatype: "json",
        colModel: [			
			{ label: '主键id', name: 'id', width: 45, key: true },
			/*{ label: '客户ID', name: 'id', width: 45, formatter: function(value, options, row){
				return "<input type='hidden' value="+value+">";
			}},*/
			{ label: '编号', name: 'code', width: 75 },
			{ label: '用户', name: 'muser', width: 90,formatter:function(value,option,row){
				console.log(row);
				var temp='<a href='+url+'/'+row.id+'>'+value+'</a>';
				return temp
			} },
			{ label: '姓名', name: 'name', width: 100},
			{ label: '订单时间', name: 'time', index: "brokerid", width: 80},
			{ label: '产品信息', name: 'information', width: 75 },
			{ label: '入仓价', name: 'warehousing', width: 90 },
			{ label: '平仓价', name: 'position', width: 100 },
			{ label: '交易类型', name: 'type', width: 80, formatter: function(value, options, row){
				return value === 0 ? 
					'<span class="label label-danger">买涨</span>' : 
					'<span class="label label-success">买跌</span>';
			}},
			{ label: '交易点数', name: 'point', width: 75 },
			{ label: '交易类型', name: 'state', width: 80, formatter: function(value, options, row){
				return value === 0 ? 
					'<span class="label label-danger">建仓</span>' : 
					'<span class="label label-success">出仓</span>';
			}},
			{ label: '订单总金额', name: 'amount', width: 90 },
			{ label: '盈亏金额', name: 'profit', width: 100 },
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
            records: "page.totalCount",
			userdata:{
				page: "page.currPage",
				total: "page.totalPage",
				records: "page.totalCount"
			}
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
	$.('.ttnum').jqGrid({
		url: '/sys/syshomepage/list',
		datatype: "json",
		colModal:[{

		}],
		rowNum:4,


	})
});


var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			mname: null
		},
		showList: true,
		title: null,
		customer: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.customer = {};
		},
/*		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			console.log(1);
			$.get(baseURL + '/sys/sysCustomer/info/'+id,function(r){
				vm.showList = false;
				console.log(r);
                vm.title = "修改";
				vm.customer = r.customer;
				
			});
			 $.ajax({
		        type: "POST",
		        url: "/sys/sysCustomer/info/",
		        contentType: "application/json;charset=utf-8",
		        dataType: "json",
		        data:"id="+id,
		        success: function (r) {
		        	vm.showList = false;
	                vm.title = "修改";
					vm.customer = r.customer;
		        },
		    }); 
		},*/
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			vm.showList = false;
            vm.title = "修改";
			
			vm.getUser(id);
		},
		saveOrUpdate: function () {
            if(vm.validator()){
                return ;
            }

			var url = vm.customer.id == null ? "sys/sysCustomer/save" : "sys/sysCustomer/update";
			console.log('ASE',baseURL,url)
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.customer),
			    success: function(res){
	
			    	if(res.code === 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(res.msg);
					}
				}
				
			});
		    console.log(3);
		},
		getUser: function(id){
			$.get(baseURL + "sys/sysCustomer/info/"+id, function(r){
				vm.customer = r.customer;
			});
		},
		del: function () {
			var id = getSelectedRows();
			if(id == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/sysCustomer/delete",
                    contentType: "application/json",
				    data: JSON.stringify(id),
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
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'mname': vm.q.mname},
                page:page 
            }).trigger("reloadGrid");
		},
        validator: function () {
           if(isBlank(vm.customer.busername)){
                alert("客户名不能为空");
                return true;
            }

            if(isBlank(vm.customer.operationscenter)){
                alert("运营中心不能为空");
                return true;
            }

        },
		mounted:{
			get:function(){
				return XMLHttpRequest(function(res){
					q=res;
					return res;
				})
			}
		}
	}

});
/**
 * Created by hy1 on 2017/9/19.
 */
//var local=[
//    {"c":45,"d":1,"g":"名称","bia":"TJXAG","JY":"JINGUI","STA":"OK","dec":"chak","canz":"2"},
//    {"c":45,"d":1,"g":"名称","bia":"TJXAG","JY":"JINGUI","STA":"OK","dec":"chak","canz":"2"},
//];
$('#showTab').jqGrid({
    datatype:"json",
    url:'',
    data:'local',
    colModel:[
        {label:'uid',name:'c',align:'',width:10,hidden:true},
        {label:'编号',name:'d',align:'center',width:40},
        {label:'商品名称',name:'g',align:'center',width:120},
        {label:'显示名称',name:'bia',align:'center',width:140},
        {label:'编码',name:'JY',align:'center',width:80},
        {label:'交易所',name:'STA',align:'center',width:120},
        {label:'状态',name:'dec',align:'center',width:80},
        {label:'日历',name:'chak',align:'center',width:80},
        {label:'操作',name:'canz',align:'center',width:80,formatter:function(value,option,rowobj){
            function del(){
                $('#showTab').jqGrid('delRowData',rowid)
            }
            return '<div onclick='+del+'>'+value+'</div>';
        }}
    ]

})
/**
 * Created by hy1 on 2017/9/19.
 */
//var local=[
//    {"c":45,"d":1,"g":"����","bia":"TJXAG","JY":"JINGUI","STA":"OK","dec":"chak","canz":"2"},
//    {"c":45,"d":1,"g":"����","bia":"TJXAG","JY":"JINGUI","STA":"OK","dec":"chak","canz":"2"},
//];
$('#showTab').jqGrid({
    datatype:"json",
    url:'',
    data:'local',
    colModel:[
        {label:'uid',name:'c',align:'',width:10,hidden:true},
        {label:'���',name:'d',align:'center',width:40},
        {label:'��Ʒ����',name:'g',align:'center',width:120},
        {label:'��ʾ����',name:'bia',align:'center',width:140},
        {label:'����',name:'JY',align:'center',width:80},
        {label:'������',name:'STA',align:'center',width:120},
        {label:'״̬',name:'dec',align:'center',width:80},
        {label:'����',name:'chak',align:'center',width:80},
        {label:'����',name:'canz',align:'center',width:80,formatter:function(value,option,rowobj){
            function del(){
                $('#showTab').jqGrid('delRowData',rowid)
            }
            return '<div onclick='+del+'>'+value+'</div>';
        }}
    ]

})
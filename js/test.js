/**
 * Created by hy1 on 2017/9/17.
 */
function setTime(){
    var nowTime=new Date();
    var h=nowTime.getHours(),
        s=nowTime.getSeconds(),
        m=nowTime.getMinutes(),
        d=nowTime.getDate(),
        y=nowTime.getFullYear(),
        M=nowTime.getMonth();
    var nowTimers=y+'-'+M+'-'+d+' '+h+':'+m+':'+s;
    return nowTimers;
}
console.log(setTime());

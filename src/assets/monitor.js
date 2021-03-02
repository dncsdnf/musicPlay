// 1.0 
window.onresize = calcWidth;
// 2.0 
function calcWidth(){
    // 2.0.1 
    var html_element = document.documentElement;
    // 2.0.2 获取屏幕宽度
    var winWidth = window.innerWidth;
    // fontSize 
    var  fontSize = 20 * (winWidth / 320) + 'px';
    // 判断 如果屏幕宽度超过了 640  等于 640
    if(winWidth >= 640){
        // 固定根元素的font-size属性值
        html_element.style.fontSize =  40 + 'px' ;
        // html_element.style.fontSize =  20 * ( 640 / 320) + 'px' ;
        // 终止代码
        return ;
    }
    if(winWidth <= 320){
        // 固定根元素的font-size属性值
        html_element.style.fontSize =  20 + 'px' ;
        // html_element.style.fontSize =   20 * ( 320 / 320) + 'px' ;
        // 终止代码
        return ;
    }
    // 2.0.3 设置根元素字体大小
    // docEl.style.fontSize = 20 * (winWidth / 320) + 'px';
    html_element.style.fontSize = fontSize;
}
// 3.0
calcWidth();
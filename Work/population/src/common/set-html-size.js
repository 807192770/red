let htmlWidth = document.documentElement.clientWidth;
let htmlDom = document.getElementsByTagName('html')[0];
var htmlSize = htmlWidth / 19.2;
htmlDom.style.fontSize = Math.ceil(htmlSize) + 'px';

// export function pxToRem($px) {
//   var rem = 20;  
// 	return Math.ceil(($px / rem ) * htmlSize) + 'px'
// }

// console.log(pxToRem(18))

export function htmlSizeFn() {
	return Math.ceil(htmlSize)
}
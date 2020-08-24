/**
 * 所有模块的数据源
 */
//生产api
let apiSource = {
	HVST: "/api/HVST/v1",
	module2: "/api/module2/v1",
}

//测试环境
if(process.env.NODE_ENV === 'development') {
	apiSource.HVST = "/api/HVST/v1";
	apiSource.module2 = "/api/module2/v1";
}

export default apiSource
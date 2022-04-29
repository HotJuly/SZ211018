export default function deepFilterRoutes(asyncRoutes,routeNames){
    // 返回值:一个数组,数组中存放的是当前账号能够访问的异步路由对象
    const newRoutes = asyncRoutes.filter((routeObj)=>{
        // if(routeObj.children&&routeObj.children.length){
        if(routeObj.children?.length){
            routeObj.children = deepFilterRoutes(routeObj.children,routeNames);
        }
        return routeNames.includes(routeObj.name)
    })


    return newRoutes;
}
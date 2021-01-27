const isObject = v => typeof v=== 'object'

function reactive (obj){
    if(!isObject(obj)){
        return obj
    }
    return new Proxy(obj,{
        get(target,key){
            console.log('get ',target[key]);
            //Reflect防止异常出现
            const res = Reflect.get(target,key);
            return isObject(res)? reactive(res):res
        },
        set(target,key,val){
            console.log('set ',target[key]);
            const res = Reflect.set(target,key,val);
            return res  //布尔值
        },
        deleteProperty(target,key){
            console.log('deletProperty :>> ', key);
            const res = Reflect.deleteProperty(target,key);
            return res //布尔值
        }
    })
}

const boj=reactive({
    foo:'foo',
    a:{
        b:1
    }
})
// boj.foo
// boj.foo='foooooo'
// boj.bar = 'bar'
// delete boj.bar
// boj.a.b
boj.a.b=2

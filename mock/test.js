export default [
    {
        url:'/api/users',
        method:'get',
        response: req=>{
            return {
                code:0,
                data:[
                    {name:'tom'},
                    {name:'jerry'}
                ]
            }
        }
    }
]
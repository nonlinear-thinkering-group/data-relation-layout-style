const values = require("./values")

let relations = [
    [0,1,2]
]

module.exports = {
    get: _=>relations,
    update(from){
        relations.map((r)=>{
            let a = values.get()[r[0]]
            let b = values.get()[r[1]]
            let c = values.get()[r[2]]

            if(from === r[0]){
                b.value = parseInt(a.value) - parseInt(c.value)
            } else {
                a.value = parseInt(b.value) + parseInt(c.value)
            }
        })
    }
}

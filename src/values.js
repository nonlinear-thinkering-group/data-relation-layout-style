var values = [
    {
        value: 5,
        type: "number"
    },
    {
        value: 5,
        type: "number"
    },
    {
        value: 5,
        type: "number"
    },
    {
        value: "equals",
        type: "string"
    },
    {
        value: "plus",
        type: "string"
    },
    {
        value: "my calculation",
        type: "string"
    }
]

module.exports = {
    get: _ => values,
    add: ()=>{
        values.push({
            value: 5,
            type: "number"
        })
        return values.length-1
    }
}

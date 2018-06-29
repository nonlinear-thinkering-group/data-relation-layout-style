let view = [
    {
        style: 2,
        node: 5
    },
    {
        style: 0,
        node: 0
    },
    {
        style: 1,
        node: 3
    },
    {
        style: 0,
        node: 1
    },
    {
        style: 1,
        node: 4
    },
    {
        style: 0,
        node: 2
    }
]

module.exports = {
    get: _ => view,
    add: (node) => {
        view.push({
            style: 0,
            node: node
        })
    },
    updatestyle: (node, style)=>{
        let f = view.find(n=>n.node===node)
        if(f) {
            f.style=style
        }
    },
    getstyle: node => {
        let f = view.find(n=>n.node===node)
        if(f) {
            return f.style
        }
    },
    moveto: (from, to) => {
        let hold = view[from]
        view.splice(from, 1)
        view.splice(to, 0, hold)
    }
}

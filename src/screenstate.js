let state = {
    hoverid: -1,
    selectid: -1,
}

function getsetfactory(key){
    return (id) => {
        if(id !== undefined) {
            state[key] = id
            m.redraw()
        }
        return state[key]
    }
}

module.exports = {
    hover: getsetfactory("hoverid"),
    select: getsetfactory("selectid")
}

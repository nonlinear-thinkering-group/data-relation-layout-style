const values = require("./values")
const views = require("./views")
const styles = require("./styles")
const relations = require("./relations")
const screenstate = require("./screenstate")

const View = () => {
    return {
        view: ()=> {
            return m(".view",{
                onclick: e=>{
                    screenstate.select(-1)
                },
            },[
                m(".view-page", [
                    views.get().map((n, i)=>{
                        return m("span.view-node",{
                            class: "style-id-"+n.style + " " + (screenstate.hover()===n.node ? "hover": "") + " " + (screenstate.select()===n.node ? "select": ""),
                            onclick: e=>{
                                screenstate.select(n.node)
                                e.stopPropagation()
                            },
                            onmouseover: e=>screenstate.hover(n.node),
                            onmouseleave: e=>screenstate.hover(-1),

                            draggable: true,
                            ondragstart: e=>{
                                e.dataTransfer.setData("id", i)
                            },
                            ondrop: e=>{
                                e.preventDefault()
                                views.moveto(e.dataTransfer.getData("id"), i)
                            },
                            ondragover: e=> {
                                e.preventDefault()
                            }
                        },values.get()[n.node].value)
                    })
                ])
            ])
        }
    }
}

const Value = () => {
    return {
        view: (vnode)=> {
            let {v,i} = vnode.attrs
            return m(".value",{
                class: (screenstate.hover()===i ? "hover": "")+ " " + (screenstate.select()===i ? "select": ""),
                onclick: e=>screenstate.select(i),
                onmouseover: e=>screenstate.hover(i),
                onmouseleave: e=>screenstate.hover(-1),
            },[
                m("input.value-value",{
                    value: v.value,
                    oninput: e=>{
                        v.value = e.target.value
                        relations.update(i)
                    },
                }),
                //m(".value-type",v.type)
            ])
        }
    }
}

const Values = () => {
    return {
        view: ()=> {
            return m(".values",[
                values.get().map((v, i)=>m(Value,{v:v, i: i})),
                m(".values-add.add-button",{
                    onclick: ()=>{
                        let id = values.add()
                        views.add(id)
                    }
                },"+")
            ])
        }
    }
}

const RelationValue = () => {
    return {
        view: (vnode)=> {
            let {i} = vnode.attrs
            return m("span.relation-value",{
                class: (screenstate.hover()===i ? "hover": "")+ " " + (screenstate.select()===i ? "select": ""),
                onclick: e=>screenstate.select(i),
                onmouseover: e=>screenstate.hover(i),
                onmouseleave: e=>screenstate.hover(-1),
            },values.get()[i].value)
        }
    }
}

const Relations = () => {
    return {
        view: ()=> {
            return m(".relations",[
                relations.get().map((r)=>{
                    return m(".relation",[
                        m(RelationValue, {i: r[0]}),
                        "=",
                        m(RelationValue, {i: r[1]}),
                        "+",
                        m(RelationValue, {i: r[2]}),
                    ])
                })
            ])
        }
    }
}

const Style = () => {
    return {
        view: (vnode)=> {
            let {s,i} = vnode.attrs
            return m(".style",{
                class: (views.getstyle(screenstate.select())===i ? "select": ""),
                ondblclick: _=>{
                    if(screenstate.select() > -1){
                        views.updatestyle(screenstate.select(), i)
                    }
                }
            },[
                s.map((rule)=>{
                    return m(".rule",[
                        m(".rule-key",rule.key),
                        m("input.rule-value", {
                            value: rule.value,
                            oninput: e=>{
                                rule.value = e.target.value
                                styles.update()
                            }
                        })
                    ])
                })
            ])
        }
    }
}

const Styles = () => {
    return {
        view: ()=> {
            return m(".styles",[
                styles.get().map((s, i)=>{
                    return m(Style,{s:s, i:i},)
                }),
                m(".styles-add.add-button",{
                    onclick: ()=>{
                        let id = styles.add()
                        if(screenstate.select() > -1){
                            views.updatestyle(screenstate.select(), id)
                        }
                    }
                },"+")
            ])
        }
    }
}

const App = () => {
    return {
        view: ()=> {
            return m(".app",[
                m(View),
                m(".bar.left-bar",[
                    m(Values),
                    m(Relations),
                ]),
                m(".bar.right-bar",[
                    m(Styles),
                ])
            ])
        }
    }
}

relations.update()

m.mount(document.body, App)

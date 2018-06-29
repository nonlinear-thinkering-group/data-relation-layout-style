const underscore = require("underscore")

let elem = document.createElement('style')
elem.type = 'text/css'

document.head.appendChild(elem)
let sheet = elem.sheet
sheet.insertRule("body{}", 0);


let styles = [
    [
        {key: "font-family", value: "Arial"},
        {key: "font-size", value: "16pt"},
        {key: "display", value: "inline"},
    ],
    [
        {key: "font-family", value: "monospace"},
        {key: "font-size", value: "8pt"},
        {key: "display", value: "inline"},
    ],
    [
        {key: "font-family", value: "Arial"},
        {key: "font-size", value: "22pt"},
        {key: "display", value: "block"},
    ]
]

module.exports = {
    get: _=> styles,
    add: _=> {
        styles.push([
            {key: "font-family", value: "Arial"},
            {key: "font-size", value: "18pt"},
            {key: "display", value: "block"},
        ])
        module.exports.update()
        return styles.length-1
    },
    update: _=>{
        while(sheet.cssRules.length>0){
            sheet.deleteRule(0)
        }
        styles.forEach((styleobject, id)=>{
            let rule = ".style-id-"+id + "{"
            styleobject.forEach((o)=>{
                rule += (o.key+": "+o.value+";")
            })

            rule += "}"
            sheet.insertRule(rule, id);
        })
    }
}

module.exports.update()

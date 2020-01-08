const generateTable = (table, data) => {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            if (key == "midPrice") {
                let span = document.createElement('span');
                span.setAttribute('id', 'sparkline-' + element.name);
                cell.appendChild(span);
                Sparkline.draw(span, element[key])
            } else {
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
            }

        }
    }
}

module.exports = generateTable;
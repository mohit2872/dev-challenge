const generate_table_header = require('./generate_table_header');
const generate_table = require('./generate_table');

const draw_table = (array, table_wrapper_id) => {
    // refreshing the table
    if (document.querySelector('table'))
        document.querySelector('table').remove();
    let table = document.createElement("table");

    let table_wrapper = document.getElementById(table_wrapper_id);
    table_wrapper.appendChild(table);

    const data = array[0];
    generate_table_header(table, Object.keys(data));
    generate_table(table, array);
};

module.exports = draw_table;
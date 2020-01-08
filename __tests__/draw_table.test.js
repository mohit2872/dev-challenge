const draw_table = require('../es6/table/draw_table');

test('generate table header', () => {

    // this will set up our document body
    document.body.innerHTML =
        '<div id="table-wrapper"></div>';

    const sample_arr = [{
            "first_name": "Mohit",
            "last_name": "Gupta"
        },
        {
            "first_name": "Eden",
            "last_name": "Hazard"
        }
    ]

    // invoking the function
    draw_table(sample_arr, 'table-wrapper');

    const table = document.querySelector('table');
    const first_column = table.rows[0].cells[0].innerHTML;
    const second_column = table.rows[0].cells[1].innerHTML;
    const first_row_first_name = table.rows[1].cells[0].innerHTML;
    const first_row_second_name = table.rows[1].cells[1].innerHTML;
    const second_row_first_name = table.rows[2].cells[0].innerHTML;
    const second_row_second_name = table.rows[2].cells[1].innerHTML;

    // checking headers
    expect(first_column).toEqual('first_name');
    expect(second_column).toEqual('last_name');

    // checking first row values
    expect(first_row_first_name).toEqual('Mohit');
    expect(first_row_second_name).toEqual('Gupta');

    // checking second row 
    expect(second_row_first_name).toEqual('Eden');
    expect(second_row_second_name).toEqual('Hazard');
});
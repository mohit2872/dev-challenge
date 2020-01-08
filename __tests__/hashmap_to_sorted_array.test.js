const hashmap_to_sorted_array= require('../es6/hashmap_to_sorted_array');

test("hashmap to sorting array works for string values", () => {
    const test_hashmap = {
        "mohit": {"first_name": "Mohit", "second_name": "Gupta"},
        "eden": {"first_name": "Eden", "second_name": "Hazard"},
        "mason": {"first_name": "Mason", "second_name": "Mount"}
    }
    const expected_result_arr = [
        {"first_name": "Eden", "second_name": "Hazard"},
        {"first_name": "Mason", "second_name": "Mount"},
        {"first_name": "Mohit", "second_name": "Gupta"}
    ]
    expect(hashmap_to_sorted_array(test_hashmap, "first_name")).toEqual(expected_result_arr);
});

test("hashmap to sorting array works for integer values", () => {
    const test_hashmap = {
        "mohit": {"first_name": "Mohit", "second_name": "Gupta", "age": 23},
        "eden": {"first_name": "Eden", "second_name": "Hazard", "age": 29},
        "mason": {"first_name": "Mason", "second_name": "Mount", "age": 22}
    }
    const expected_result_arr = [
        {"first_name": "Mason", "second_name": "Mount", "age": 22},
        {"first_name": "Mohit", "second_name": "Gupta", "age": 23},
        {"first_name": "Eden", "second_name": "Hazard", "age": 29}
    ]
    expect(hashmap_to_sorted_array(test_hashmap, "age")).toEqual(expected_result_arr);
})


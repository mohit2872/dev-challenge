const hashmap_to_sorted_array = (hashmap, sorting_key) => {
    let array = [];
    for (let currency in hashmap) {
        array.push(hashmap[currency]);
    }
    array.sort((a, b) => {
        if(typeof(a[sorting_key]) == 'string'){
            const x = a[sorting_key].toLowerCase();
            const y = b[sorting_key].toLowerCase();
            if (x < y) {
                return -1;
            }
            if (x > y) {
                return 1;
            }
            return 0;
        } else if (typeof (a[sorting_key]) == 'number')
        {
            return a[sorting_key] - b[sorting_key];
        };
    });
    return array;
}

module.exports = hashmap_to_sorted_array;
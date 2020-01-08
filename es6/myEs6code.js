const hashmap_to_sorted_array = require('./hashmap_to_sorted_array');
const draw_table = require('./table/draw_table');

// Change this to get detailed logging from the stomp library
global.debug = false;

const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);
client.debug = function (msg) {
    if (global.DEBUG) {
        console.info(msg)
    }
}

client.heartbeat.outgoing = 20000; // in ms

const connectCallback = () => {
    document.getElementById('stomp-status').innerHTML = "It has now successfully connected to a stomp server serving price updates for some foreign exchange currency pairs."
    let currency_hashmap = {}; // for storing the currency and its data
    let currency_sparkline = {}; // for storing the midPrices of all currency 
    let currency_sparkline_time = {} // for storing timestamps of data in currency_sparkline
    
    const subscription = client.subscribe("/fx/prices", (response, error) => {
        if(error) console.log(error);
        else {
            const data = JSON.parse(response.body)

            // create a hashmap for the currency and their data
            if(!currency_hashmap.hasOwnProperty(data.name)){
                currency_hashmap[data.name] = data;
                currency_sparkline[data.name] = [(data["bestAsk"] + data["bestBid"])/2];
                currency_sparkline_time[data.name] = [new Date()]; // storing the end time
            } else {
                // deleting the old data from hashmaps
                delete currency_hashmap[data.name];
                currency_hashmap[data.name] = data;

                // deleting the data before 30s in sparkline array
                for(let currency in currency_sparkline_time){
                    for(let i=0; i<currency_sparkline_time[currency].length; i++){
                        const current_time = new Date();
                        if (Math.abs(currency_sparkline_time[currency][i] - current_time) / 1000 > 30) {
                            // remove the element from the time array 
                            currency_sparkline_time[currency].splice(i, 1);

                            // remove the element from the mid price array
                            currency_sparkline[currency].splice(i, 1);
                        }
                    }
                }
                
                currency_sparkline[data.name].push((data["bestAsk"] + data["bestBid"]) / 2);                
                currency_sparkline_time[data.name].push(new Date());

            }

            // add the historical data of mid prices to the hashmap
            for(let currency in currency_hashmap){
                currency_hashmap[currency]["midPrice"] = currency_sparkline[currency];
            }

            // sort the hashmap
            const sorted_currency_array = hashmap_to_sorted_array(currency_hashmap, 'lastChangeBid');
            
            // show the data in table
            draw_table(sorted_currency_array, 'currency-data');
        }    
    });

}

client.connect({}, connectCallback, function (error) {
    alert(error.headers.message)
})
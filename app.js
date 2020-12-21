

//  item controller
const ItemCtrl = (function(){
    // item constructor
    const Item = function(id, date, city, eventname, name, deal, deposit, showtime, arrival) {
        this.id = id;
        this.date = date;
        this.city = city;
        this.eventname = eventname;
        this.name = name;
        this.deal = deal;
        this.deposit = deposit;
        this.showtime = showtime;
        this.arrival = arrival;

    }

    // data structure / state
    const data = {
        items: [
            {id: 0, date: 'March 3', city: 'Atlanta', 
            eventname: 'Tabernacle', name: 'Scott Orvold', 
            deal: 10000, deposit: 5000, showtime: 01600, 
            arrival: 01200
            }
        ],
        currentItem: null
    }

    return {
        logData: function() {
            return data;
        }
    }

})();

// ui controller
const UICtrl = (function() {

    // public methods
    return {

    }

})();

// app controller
const App = (function(ItemCtrl, UICtrl){

    // public meothods
    return {
        init: function() {
            console.log('initializing app...')
        }
    }

})(ItemCtrl, UICtrl);

// initialize app
App.init();
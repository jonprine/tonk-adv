




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

    // public methods
    return {
        getItems: function() {
            return data.items;
        },
        logData: function() {
            return data;
        }
    }

})();






// ui controller
const UICtrl = (function() {

    // public methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `
                <li class="collection-item" "id=${item.id}">
                <strong>${item.date}</strong> <em>${item.city}</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i></a>
                </li>
                `;
            });

            // insert list items
            document.querySelector('#item-list').innerHTML = html;
        }

    }

})();





// app controller
const App = (function(ItemCtrl, UICtrl){

    // public meothods
    return {
        init: function() {
            console.log('initializing app...')

            // fet items from data structure
            const items = ItemCtrl.getItems();
            
            // populate list with items
            UICtrl.populateItemList(items);
        }
    }

})(ItemCtrl, UICtrl);

// initialize app
App.init();
//  item controller
const ItemCtrl = (function () {
  // item constructor
  const Item = function (
    id,
    date,
    city,
    venue,
    contactname,
    deal,
    deposit,
    showtime,
    arrival
  ) {
    this.id = id;
    this.date = date;
    this.city = city;
    this.venue = venue;
    this.contactname = contactname;
    this.deal = deal;
    this.deposit = deposit;
    this.showtime = showtime;
    this.arrival = arrival;
  };

  // data structure / state
  const data = {
    items: [
      {
        id: 0,
        date: "March 3",
        city: "Atlanta, GA",
        venue: "Tabernacle",
        contactname: "Scott Orvold",
        deal: 10000,
        deposit: 5000,
        showtime: 01600,
        arrival: 01200,
      },
    ],
    currentItem: null,
  };

  // public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function(date, city, venue, contactname,
        deal, deposit, showtime, arrival) {
            let ID;
            // create id
            if(data.items.length > 0) {
                ID = data.items[data.items.length -1].id +1;
            } else {
                ID = 0;
            }
            // number inputs to number
            deal = parseInt(deal);
            deposit = parseInt(deposit);

            // create new item
            newItem = new Item(date, city, venue, contactname,
                deal, deposit, showtime, arrival);

                // add to items array
                data.items.push(newItem);

                return newItem;
        },
    logData: function () {
      return data;
    },
  };
})();

// ui controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemDate: '#item-date',
    itemCity: '#item-city',
    itemVenue: '#item-venue',
    itemContact: '#item-name',
    itemDeal: '#item-deal',
    itemDeposit: '#item-deposit',
    itemShowtime: '#item-showtime',
    itemArrival: '#item-arrival'
  };

  // public methods
  return {
    populateItemList: function (items) {
      let html = "";

      items.forEach(function (item) {
        html += `
                <div class="card-content">
                <div class="row">
                <span class="card-title activator grey-text text-darken-4">${item.date}<i class="material-icons right">More Details</i>
                <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a></span>
                <strong>${item.city}</strong>
                <p>${item.venue}</p>
                </div>
              </div>
              <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">Date: ${item.date}<i class="material-icons right">close</i></span>
                <strong>City: ${item.city}</strong>
                <p>Venue: ${item.venue}</p>
                <p>Contact: ${item.contactname}</p>
                <p>Deal: ${item.deal}</p>
                <p>Deposit: ${item.deposit}</p>
                <p>Set Time: ${item.showtime}</p>
                <p>Arrival Time: ${item.arrival}</p>
              </div>
                </div>
                `;
      });

      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
        return {
            date: document.querySelector(UISelectors.itemDate).value,
            city: document.querySelector(UISelectors.itemCity).value,
            venue: document.querySelector(UISelectors.itemVenue).value,
            contactname: document.querySelector(UISelectors.itemContact).value,
            deal: document.querySelector(UISelectors.itemDeal).value,
            deposit: document.querySelector(UISelectors.itemDeposit).value,
            showtime: document.querySelector(UISelectors.itemShowtime).value,
            arrival: document.querySelector(UISelectors.itemArrival).value

        }
    },
    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// app controller
const App = (function (ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function () {
    // get UI selectors
    const UISelectors = UICtrl.getSelectors();

    // add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // add item submit
  const itemAddSubmit = function (e) {
      // get form input from UI controller
      const input = UICtrl.getItemInput();

     // check for field inputs
     if(input.date !== '' && input.city !== '' && input.venue !== '' 
     && input.contactname !== '' && input.deal !== '' && input.deposit !== '' 
     && input.showtime !== '' && input.arrival !== '') {
        // add item
        const newItem = ItemCtrl.addItem(input.city, input.city, input.venue, 
            input.contactname, input.deal, input.deposit, input.showtime,
            input.arrival);
     }

    e.preventDefault();
  };
  // public meothods
  return {
    init: function () {
      console.log("initializing app...");

      // fet items from data structure
      const items = ItemCtrl.getItems();

      // populate list with items
      UICtrl.populateItemList(items);

      // load event listners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

// initialize app
App.init();

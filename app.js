//  item controller
const ItemCtrl = (function () {
  // item constructor
  const Item = function (
    id,
    date,
    city,
    venue,
    address,
    contactname,
    phonenumber,
    email,
    deal,
    deposit,
    showtime,
    arrival
  ) {
    this.id = id;
    this.date = date;
    this.city = city;
    this.venue = venue;
    this.address = address;
    this.contactname = contactname;
    this.phonenumber = phonenumber;
    this.email = email;
    this.deal = deal;
    this.deposit = deposit;
    this.showtime = showtime;
    this.arrival = arrival;
  };

  // data structure / state
  const data = {
    items: [
    //   {
    //     id: 0,
    //     date: "March 3",
    //     city: "Atlanta, GA",
    //     venue: "Tabernacle",
    //     contactname: "Scott Orvold",
    //     deal: 10000,
    //     deposit: 5000,
    //     showtime: 01600,
    //     arrival: 01200,
    //   },
    ],
    currentItem: null,
  };

  // public methods
  return {
    getItems: function () {
      return data.items;
    },
    addItem: function (
      date,
      city,
      venue,
      address,
      contactname,
      phonenumber,
      email,
      deal,
      deposit,
      showtime,
      arrival
    ) {
      let ID;
      // create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // format date
      date = moment().format('MMM Do');

      // format time
      showtime = moment().format('hh:mm');
      arrival = moment().format('hh:mm');

      // number inputs to number
      deal = parseInt(deal);
      deposit = parseInt(deposit);

      // create new item
      newItem = new Item(
        ID,
        date,
        city,
        venue,
        address,
        contactname,
        phonenumber,
        email,
        deal,
        deposit,
        showtime,
        arrival
      );

      // add to items array
      data.items.push(newItem);

      return newItem;
    },
    getItemById: function(id) {
      let found = null;
      // loop through items
      data.items.forEach(function(item) {
        if(item.id === id){
          found = item;
        }
      });
      return found;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getCurrentItem: function() {
      return data.currentItem;
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
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemDate: "#item-date",
    itemCity: "#item-city",
    itemVenue: "#item-venue",
    itemAddress: "#item-address",
    itemContact: "#item-name",
    itemPhone: "#item-number",
    itemEmail: "#item-email",
    itemDeal: "#item-deal",
    itemDeposit: "#item-deposit",
    itemShowtime: "#item-showtime",
    itemArrival: "#item-arrival",
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
                <p>Deal: $${item.deal}</p>
                <p>Deposit: ${item.deposit}</p>
                <p>Set Time: ${item.showtime} PM</p>
                <p>Arrival Time: ${item.arrival} PM</p>
              </div>
                </div>
                `;
      });

      // insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function () {
      return {
        date: document.querySelector(UISelectors.itemDate).value,
        city: document.querySelector(UISelectors.itemCity).value,
        venue: document.querySelector(UISelectors.itemVenue).value,
        address: document.querySelector(UISelectors.itemAddress).value,
        contactname: document.querySelector(UISelectors.itemContact).value,
        phonenumber: document.querySelector(UISelectors.itemPhone).value,
        email: document.querySelector(UISelectors.itemEmail).value,
        deal: document.querySelector(UISelectors.itemDeal).value,
        deposit: document.querySelector(UISelectors.itemDeposit).value,
        showtime: document.querySelector(UISelectors.itemShowtime).value,
        arrival: document.querySelector(UISelectors.itemArrival).value,
      };
    },
    addListItem: function (item) {
      // create div element
      const div = document.createElement("div");
      // add class
      div.className = "card card-content";
      // add id
      div.id = `item-${item.id}`;
      // add html
      div.innerHTML = `
        <div class="row">
        <span class="card-title activator grey-text text-darken-4">${item.date}<i class="material-icons right">More Details</i>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
        <p>${item.city}</p>
        <p>${item.venue}</p>
        </span>
        </div>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Date: ${item.date}<i class="material-icons right">close</i></span>
        <strong>City: ${item.city}</strong>
        <p>Venue: ${item.venue}</p>
        <p>Address: ${item.address}</p>
        <p>Contact: ${item.contactname}</p>
        <p>Phone Number: ${item.phonenumber}</p>
        <p>email: ${item.email}</p>
        <p>Deal: $${item.deal}</p>
        <p>Deposit: $${item.deposit}</p>
        <p>Set Time: ${item.showtime} PM</p>
        <p>Arrival Time: ${item.arrival} PM</p>
      </div>
      `;
      // insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", div);
    },
    clearInput: function () {
      document.querySelector(UISelectors.itemDate).value = '';
        document.querySelector(UISelectors.itemCity).value = '';
        document.querySelector(UISelectors.itemVenue).value = '';
        document.querySelector(UISelectors.itemAddress).value = '';
        document.querySelector(UISelectors.itemContact).value = '';
        document.querySelector(UISelectors.itemPhone).value = '';
        document.querySelector(UISelectors.itemEmail).value = '';
        document.querySelector(UISelectors.itemDeal).value = '';
        document.querySelector(UISelectors.itemDeposit).value = '';
        document.querySelector(UISelectors.itemShowtime).value = '';
        document.querySelector(UISelectors.itemArrival).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemDate).value = ItemCtrl.getCurrentItem().date;
      document.querySelector(UISelectors.itemCity).value = ItemCtrl.getCurrentItem().city;
      document.querySelector(UISelectors.itemVenue).value = ItemCtrl.getCurrentItem().venue;
      document.querySelector(UISelectors.itemAddress).value = ItemCtrl.getCurrentItem().address;
      document.querySelector(UISelectors.itemContact).value = ItemCtrl.getCurrentItem().contactname;
      document.querySelector(UISelectors.itemPhone).value = ItemCtrl.getCurrentItem().phonenumber;
      document.querySelector(UISelectors.itemEmail).value = ItemCtrl.getCurrentItem().email;
      document.querySelector(UISelectors.itemDeal).value = ItemCtrl.getCurrentItem().deal;
      document.querySelector(UISelectors.itemDeposit).value = ItemCtrl.getCurrentItem().deposit;
      document.querySelector(UISelectors.itemShowtime).value = ItemCtrl.getCurrentItem().showtime;
      document.querySelector(UISelectors.itemArrival).value = ItemCtrl.getCurrentItem().arrival;
      UICtrl.showEditState();
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function () {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
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

       // edit icon click event
       document.querySelector(UISelectors.itemList).addEventListener("click", itemUpdateSubmit);
  };

 

  // add item submit
  const itemAddSubmit = function (e) {
    // get form input from UI controller
    const input = UICtrl.getItemInput();

    // check for field inputs
    if (
      input.date !== "" &&
      input.city !== "" &&
      input.venue !== "" &&
      input.address !== "" &&
      input.contactname !== "" &&
      input.phonenumber !== "" &&
      input.email !== "" &&
      input.deal !== "" &&
      input.deposit !== "" &&
      input.showtime !== "" &&
      input.arrival !== ""
    ) {
      // add item
      const newItem = ItemCtrl.addItem(
        input.date,
        input.city,
        input.venue,
        input.address,
        input.contactname,
        input.phonenumber,
        input.email,
        input.deal,
        input.deposit,
        input.showtime,
        input.arrival
      );

      // add item to UI list
      UICtrl.addListItem(newItem);

      // clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // update item submit
  const itemUpdateSubmit = function(e) {
    if(e.target.classList.contains('edit-item')) {
      // get list item id (item-0, item-1)
      const listId = e.target.parentNode.parentNode.id;

      // break into an array
      const listIdArr = listId.split('-');

      // get the actual id
      const id = parseInt(listIdArr[1]);

      // get item
      const itemToEdit = ItemCtrl.getItemById(id);

      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);

      // add item to form
      UICtrl.addItemToForm();

    }

    e.preventDefault();
  }
  // public meothods
  return {
    init: function () {
      // clear edit state / set initial state
      UICtrl.clearEditState();

      // fetch items from data structure
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

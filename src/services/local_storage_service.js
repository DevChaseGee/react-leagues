/* Class LocalStorageService- a class for persistent CRUD in LocalStorage
Some tips on order of implementation:
1.  Implement Utility Functions (cloneObject(done), getItemIndex)
2.  Implement 'size' and 'list' getters
3.  Implement localStorage functions 'reset', 'clear', 'store', 'retrieve'
4.  Implement 'read', 'create', 'update', 'delete'
5.  Implement 'sort', 'filter'
*/
export default class LocalStorageService {
  "use strict";
  constructor(data, key) {
    this.origModel = data;
    this.key = key;

    console.log("Local Storage Initialized");

    //if data is NOT in local storage, init and sort using sortCol and sortDir from the model
    if (!this.retrieve()) {
      this.model = this.cloneObject(data); //get copy of data
      this.sort(this.sortCol, this.sortDir, true); //apply default sort
    }
  }
  //Getters
  get sortCol() {
    return this.model.app.sortCol;
  }
  set sortCol(col) {
    this.model.app.sortCol = col;
  }
  get sortDir() {
    return this.model.app.sortDir;
  }
  set sortDir(dir) {
    this.model.app.sortDir = dir;
  }
  get size() {
    // Return's the number of items in model.data
    return this.model.data.length;
  }
  get filterStr() {
    return this.model.app.filterStr;
  }
  set filterStr(str) {
    this.model.app.filterStr = str;
  }

  list() {
    this.sort(this.sortCol, this.sortDir, true);
    let filterObj = {};
    if (this.filterStr) {
      filterObj[this.sortCol] = this.filterStr;
      return this.filter(filterObj);
    }

    return this.model.data;
  }

  //CRUD FUNCTIONS
  create(obj) {
    // append new object to data store
    // persist in local storage by calling store()

    this.model.data.push(obj);
    this.store();
  }
  read(getId) {
    //Returns the item in the array with id=getId, null if it is not found
    return this.model.data.find((item) => {
      if (item.id === getId) {
        return item;
      }
    });
  }
  update(obj) {
    // find index of object in array
    // update object with new contents
    // persist in local storage by calling store()
    let index = this.getItemIndex(obj.id);
    this.model.data[index] = obj;
    this.store();
  }
  delete(removeId) {
    // find index of object in array
    // remove object with specified id from model.data (splice?)
    // persist in local storage by calling store()
    let index = this.getItemIndex(removeId);
    this.model.data.splice(index, 1);
    this.store();
  }

  // LocalStorage Functions
  reset() {
    // should clear local storage
    // should restore model from origModel
    // (use utility function 'cloneObject' at bottom of file)

    localStorage.clear();
    this.model = this.cloneObject(this.origModel);
    this.store();
  }
  clear() {
    // Clears the local storage
    localStorage.clear();
  }
  store() {
    // Stores the model in local storage using this.key
    localStorage.setItem(this.key, JSON.stringify(this.model));
  }
  retrieve() {
    // should retrieve your model from localStorage using this.key
    // If data retrieved from LocalStorage, updates this.model
    // hint:  remember to 'parse' the LocalStorage string value back into an object!
    // return true if model retrieved from localStorage, false if key wasn't found in localStorage
    if (localStorage.getItem(this.key) !== null) {
      this.model = JSON.parse(localStorage.getItem(this.key));
      return true;
    }
    return false; //returning false for now
  }

  // Sorting and Filtering Functions
  sort(col, direction, perm = false) {
    // returns a copy of the model.data (util func 'cloneArray'), sorted using the 'col' and 'direction' specifications (see index.html for example)
    // storageSvc.sort('name','asc')
    // if 'perm' param is set to true, you should update the internal model.data
    // with the sorted list, and call 'store' to store in local storage
    // also, store the sort col and direction in the 'app' portion of the model

    let arrayCopy = this.model.data.map((item) => item);

    let sorted = arrayCopy.sort((a, b) => {
      if (a[col] > b[col]) {
        return 1;
      }
      if (a[col] < b[col]) {
        return -1;
      }
      return 0;
    });

    if (direction === "desc") {
      sorted.reverse();
    }

    if (perm) {
      this.model.data = sorted;
      this.store();
    }

    return sorted;
  }

  filter(filterObj) {
    // returns a copy of the filtered array
    // filterObj contains an object with all the key/value pairs you
    // will filter model.data with.
    // See MDN array 'filter' function documentation
    // Example call: storageSvc.filter({coachLicenseLevel:1,coachLast:"Jenson"});

    let filtered = this.model.data.filter((item) => {
      for (let key in filterObj) {
        if (item[key] !== filterObj[key]) {
          return false;
        }
      }
      return true;
    });

    return filtered;
  }

  getItemIndex(id) {
    //return index of team with given id. See MDN array 'find' documentation. Created separate function for this since multiple methods need to get the index of an item.
    let index = this.model.data.findIndex((item) => {
      if (item.id === parseInt(id)) {
        return item;
      }

      return false;
    });

    return index;
  }

  cloneObject(obj) {
    //util function for returning a copy of an object
    return JSON.parse(JSON.stringify(obj)); //giving you this one as of class on Feb 4
  }
}

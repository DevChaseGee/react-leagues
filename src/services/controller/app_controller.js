import LocalStorageService from "../model/local_storage_service.js";
import teamData from "../model/team_data.js";
import ListView from "../view/list_view.js";

export default class AppController {
  constructor() {
    console.log("AppController Initialized");
    this.storage = new LocalStorageService(teamData, "teamData");
    this.listView = new ListView(this.storage, { singleEntity: "team" });

    this.listView.initializeSuccessPopup();
    this.listView.initializePopovers();

    this.render();
  }

  async render() {
    console.log("AppController Rendered");
    await this.listView.render();
  }
}

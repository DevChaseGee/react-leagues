import $ from "jquery";
import { Popover } from "bootstrap";

export default class ListView {
  constructor(storage, options = {}) {
    this.storage = storage;
    this.options = options;
    this.firstRender = true;
    console.log("ListView Initialized");
  }

  getSingleEntity() {
    return this.options.singleEntity;
  }

  async render() {
    console.log("ListView Rendered");

    let data = this.storage.list;
    let allRows = "";
    data.forEach((team) => {
      let rowTemplate = `
        <tr class="popper" data-bs-toggle="popover" data-bs-trigger="hover"
        data-bs-title="${team.name}" 
        data-bs-content="Team ${team.id}"
        data-bs-placement="right"
        data-bs-html="true"
        data-bs-animation="true"
        data-bs-delay="200"
        
        >
                <th scope="row">${team.name}</th>
                <td>${team.coachName}</td>
                <td>${team.coachPhone}</td>
                <td>${team.numPlayers ? team.numPlayers : 3}</td>
                <td>
                <button type="button" class="btn btn-primary">
                  <i class="fas fa-edit table-icon"></i>
                </button>
                </td>
                <td>
                    <button type="button" id="${
                      team.id
                    }" class="btn btn-primary deleteBtn" data-bs-toggle="modal" data-bs-target="#deleteModal">
                      <i class="fas fa-trash table-icon"></i>
                    </button>
                </td>
        </tr>`;

      allRows += rowTemplate;
    });

    let html = `
    <table class="table table-dark table-hover">
            <thead>
              <tr>
                <th class="table-header" scope="col" data-col='name'>Name
                <span
                    class="hidden"
                    id="name-asc">
                    <i class="fas fa-chevron-down"></i>
                </span>
                <span
                class="hidden"
                id="name-desc">
                  <i class="fas fa-chevron-up"></i>
                </span>
                </th>
                <th class="table-header" scope="col" data-col='coachName'>Coach
                <span
                class="hidden"
                id="coachName-asc">
                    <i class="fas fa-chevron-down"></i>
                </span>
                <span
                class="hidden"
                id="coachName-desc">
                    <i class="fas fa-chevron-up"></i>
                </span>
                </th>
                <th class="table-header" scope="col" data-col='coachPhone'>Coach Phone
                <span
                class="hidden"
                id="coachPhone-asc">
                <i class="fas fa-chevron-down"></i>
                </span>
                <span
                class="hidden"
                id="coachPhone-desc">
                    <i class="fas fa-chevron-up"></i>
                </span>
                </th>
                <th class="table-header" scope="col" data-col='numPlayers'># of Players
                <span
                class="hidden"
                id="numPlayers-asc">
                    <i class="fas fa-chevron-down"></i>
                </span>
                <span
                class="hidden"
                id="numPlayers-desc">
                    <i class="fas fa-chevron-up"></i>
                </span>
                </th>
                <th class="table-header" scope="col">Edit</th>
                <th class="table-header" scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
                ${allRows}
            </tbody>
          </table>
    `;

    document.getElementById("tableContainer").innerHTML = html;
    this.bindListEvents();
    this.bindButtonEvents();
    this.bindDeleteEvents();

    if (this.firstRender) {
      this.firstRender = false;

      // Update the currently selected sort icon
      if (this.storage.sortDir === "asc") {
        document
          .getElementById(`${this.storage.sortCol}-asc`)
          .classList.remove("hidden");
        document
          .getElementById(`${this.storage.sortCol}-desc`)
          .classList.add("hidden");
      } else if (this.storage.sortDir === "desc") {
        document
          .getElementById(`${this.storage.sortCol}-asc`)
          .classList.add("hidden");
        document
          .getElementById(`${this.storage.sortCol}-desc`)
          .classList.remove("hidden");
      }
    }
  }

  bindListEvents() {
    document.querySelectorAll(".table-header").forEach((row) => {
      row.addEventListener("click", (e) => {
        let target = e.target;

        // Gotta get the actual element that has the data-col attribute
        // If the user clicks on the sprite it will be the path element
        if (e.target.tagName === "path") {
          target = e.target.parentElement.parentElement.parentElement;
        }

        let col = target.getAttribute("data-col");
        let direction = this.storage.sortDir;

        direction = direction === "asc" ? "desc" : "asc";

        this.storage.sortDir = direction;
        this.storage.sortCol = col;
        this.storage.sort(col, direction, true);

        this.render();

        // Realizing this had to be done after render took me way to many hours.... :O
        if (direction === "asc") {
          document.getElementById(`${col}-asc`).classList.remove("hidden");
          document.getElementById(`${col}-desc`).classList.add("hidden");
        } else {
          document.getElementById(`${col}-asc`).classList.add("hidden");
          document.getElementById(`${col}-desc`).classList.remove("hidden");
        }
      });
    });
  }

  bindDeleteEvents() {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      console.log(btn);
      btn.addEventListener("click", (e) => {
        let target = e.target;

        if (e.target.tagName === "path") {
          target = e.target.parentElement.parentElement;
        }

        let teamId = target.id;
        console.log(target);
        console.log("teamName: ", teamId);
        document.getElementById("deleteModalLabel").innerHTML = `Are you sure?`;

        document
          .getElementById("deleteModalBtn")
          .addEventListener("click", () => {
            this.storage.delete(teamId);
            this.render();

            // This is a hack to reset the modal button after it's been clicked
            // it prevents multiple events from being bound to the button
            $("#deleteModalBtn").replaceWith($("#deleteModalBtn").clone());
            const alertButton = document.getElementById("deleteModalBtn");
            alertButton.setAttribute("listener", "false");
            this.initializeSuccessPopup();
          });
      });
    });
  }

  deleteTeam(teamId) {
    this.storage.delete(teamId);
    this.render();
  }

  bindButtonEvents() {
    document.getElementById("resetBtn").addEventListener("click", () => {
      this.storage.reset();
      this.render();
    });
  }

  initializeSuccessPopup() {
    const alertPlaceholder = document.getElementById("alertPlaceHolder");
    const alertButton = document.getElementById("deleteModalBtn");

    if (alertPlaceholder === null || alertButton === null) {
      return;
    }

    const alert = (message, type) => {
      const wrapper = document.createElement("div");
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
      ].join("");

      alertPlaceholder.append(wrapper);
    };

    if (alertButton.getAttribute("listener") !== "true") {
      alertButton.addEventListener("click", async () => {
        alert("Team successfully deleted!", "success");
      });
      alertButton.setAttribute("listener", "true");
    }
  }

  initializePopovers() {
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new Popover(popoverTriggerEl)
    );
  }
}

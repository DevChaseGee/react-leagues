import mockTeamData from "./mockTeamData.data.js";

let AppViewModel = {
  data: mockTeamData,

  header: {
    logo: "/images/Intro.jpg",
    title: "ALGS League",
  },
  list: {
    entity: "teams", //key used for LocalStorage
    entitySingle: "team",
    listTitle: "ALGS Teams",
    tableClasses: "table table-dark table-hover mt-2",
    thClasses: "bg-black bg-gradient",
  },
};

export default AppViewModel;

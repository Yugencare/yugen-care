const pages = [
  {
    name: "yugen-face",
    id: "001af0b0-d716-11eb-bef9-59e0151d24b4",
  },
  {
    name: "yugen-body",
    id: "c29916c0-d78f-11eb-b949-f33de86b3dae",
  },
  {
    name: "yugen-health",
    id: "",
  },
  {
    name: "yugen-wellbeing",
    id: "",
  },
  {
    name: "yugen-man",
    id: "2759c4a0-d7e1-11eb-9444-91406a411ca7",
  },
  {
    name: "yugen-hair",
    id: "",
  },
  {
    name: "yugen-sensual",
    id: "",
  },
  {
    name: "yugen-dental",
    id: "6c6a6520-d711-11eb-bef9-59e0151d24b4",
  },
  {
    name: "home",
    id: "f732f950-2668-11ec-b693-69bdbf335868",
  },
  {
    name: "about",
    id: "915bbd70-d81a-11eb-b9b9-0b2f1ddca464",
  },
  {
    name: "services",
    id: "dc5b8080-d8b0-11eb-b9b9-0b2f1ddca464",
  },
  {
    name: "professionals",
    id: "016d4d40-d8b6-11eb-b9b9-0b2f1ddca464",
  },
  {
    name: "shop",
    id: "b6e43f90-d8c9-11eb-aa76-bd9c174872e3",
  },
  {
    name: "career",
    id: "43784100-d969-11eb-aa76-bd9c174872e3",
  },
  {
    name: "contact",
    id: "23182230-d703-11eb-bef9-59e0151d24b4",
  },
  {
    name: "anti-aging-treatments",
    id: "2e53ad60-d97c-11eb-aa76-bd9c174872e3",
  },
  {
    name: "anti-wrinkle treatment",
    id: "5c125410-d99d-11eb-aa76-bd9c174872e3",
  },
];

export const discernPage = (name) => {
  var pagename = pages.find((page) => page.name === name);
  return pagename.id;
};

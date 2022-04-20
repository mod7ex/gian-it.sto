import { ref, readonly, computed } from "vue";

const filter = [
  { criteria: "id", label: "По умолчанию" },
  { criteria: "surname", label: "По фамилии" },
  { criteria: "department", label: "По отделам" },
];

let order = ref({
  // show filter area
  show: false,
  // id, surname or department
  criteria: "id",
  //  asc:1 or  desc:-1 the default always is desc:-1
  mod: -1,
});

const users = ref({});

const selected = ref(false);

let selectedUser = ref({});

export default function useEmployers() {
  let usersNumber = computed(() => users.value.length);

  let orderkey = computed(
    () => `${order.value.criteria}-${order.value.mod === 1 ? "asc" : "desc"}`
  );

  let deleteUser = (id) => {
    users.value.splice(
      users.value.findIndex((user) => user.id === id),
      1
    );
  };

  let directory = computed(() => {
    if (!users.value.length) return [];

    let usersList = { _: [] };

    users.value.forEach((user) => {
      let user_item = {
        id: user.id,
        title: `${user.name} ${user.surname ? user.surname : ""}`,
        subtitle: `${user.office_position ? user.office_position : ""}`,
        image: `${user.avatar ? user.avatar : ""}`,
      };

      // group users who don't have surname
      if (!user.surname) {
        usersList._.push(user_item);
        return;
      }

      // check if the letter (user.surname[0]) doesn't exists in usersList & then add it
      if (!usersList[user.surname[0]]) {
        usersList[user.surname[0]] = [];
      }

      // put the item in his letter group (group by letter)
      usersList[user.surname[0]].push(user_item);
    });

    return Object.keys(usersList)
      .sort()
      .reduce((obj, key) => {
        obj[key] = usersList[key];
        return obj;
      }, {});
  });

  let reOrder = (ctr = "id") => {
    order.value.mod = order.value.criteria === ctr ? -order.value.mod : -1;

    order.value.criteria = ctr;

    // sort by criteria
    switch (ctr) {
      case "id":
        users.value = users.value.sort(
          (a, b) => (a.id - b.id) * order.value.mod
        );
        break;

      case "surname":
        users.value = users.value.sort((a, b) => {
          if (a.surname > b.surname) return order.value.mod;
          if (a.surname < b.surname) return -order.value.mod;
          return 0;
        });
        break;

      case "department":
        users.value = users.value.sort(
          (a, b) => (a.department?.id - b.department?.id) * order.value.mod
        );
        break;

      default:
        break;
    }

    /* // for test (visualize data)
      console.log(orderkey.value);
    
      for (let i = 0; i < 5; i++) {
        console.log(
          `id => ${users.value[i].id}`,
          `department id => ${users.value[i].department.id}`,
          `surname => ${users.value[i].surname}`
        );
      }
    */
  };

  return {
    users,
    deleteUser,
    directory,
    reOrder,
    orderkey,
    filter,
    order,
    usersNumber,
    selected,
    selectedUser,
  };
}
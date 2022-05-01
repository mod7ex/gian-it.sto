const ressources = [
  {
    title: 'Города',
    permissions: [
      {
        id: 'crud cities',
        title: 'Все действия над городами',
      },
    ],
  },
  {
    title: 'Роли',
    permissions: [
      {
        id: 'crud roles',
        title: 'Все действия над ролями',
      },
    ],
  },
  {
    title: 'Отделы',
    permissions: [
      {
        id: 'crud departments',
        title: 'Все действия над отделами',
      },
    ],
  },
  {
    title: 'Сотрудники',
    permissions: [
      {
        id: 'crud users',
        title: 'Все действия над сотрудниками',
      },
      {
        id: 'read users',
        title: 'Просмотр сотрудников',
      },
    ],
  },
  {
    title: 'Автомобили',
    permissions: [
      {
        id: 'crud cars',
        title: 'Все действия над автомобилями',
      },
      {
        id: 'crud car marks',
        title: 'Все действия над марками автомобилей',
      },
      {
        id: 'crud fuels',
        title: 'Все действия над видами топлива',
      },
      {
        id: 'crud engine volumes',
        title: 'Все действия над объемами двигателя',
      },
      {
        id: 'crud car models',
        title: 'Все действия над моделями автомобилей',
      },
    ],
  },
  {
    title: 'Клиенты',
    permissions: [
      {
        id: 'crud clients',
        title: 'Все действия над клиентами',
      },
      {
        id: 'read clients',
        title: 'Просмотр клиентов',
      },
    ],
  },
  {
    title: 'Склад',
    permissions: [
      {
        id: 'crud storages',
        title: 'Все действия со складом',
      },
    ],
  },
  {
    title: 'Финансы',
    permissions: [
      {
        id: 'crud finances',
        title: 'Все действия с финансами',
      },
    ],
  },
  {
    title: 'Воронки',
    permissions: [
      {
        id: 'crud pipelines',
        title: 'Все действия с воронками и их этапами',
      },
    ],
  },
  {
    title: 'Процессы',
    permissions: [
      {
        id: 'crud processes',
        title: 'Все действия с процессами',
      },
    ],
  },
  {
    title: 'Документы',
    permissions: [
      {
        id: 'crud document templates',
        title: 'Все действия с шаблонами документов',
      },
    ],
  },
  {
    title: 'Задачи',
    permissions: [
      {
        id: 'read tasks',
        title: 'Просмотр всех задач',
      },
      {
        id: 'read department tasks',
        title: 'Просмотр задач только своего отделения',
      },
      {
        id: 'read own tasks',
        title: 'Просмотр только своих задач',
      },
      {
        id: 'create tasks',
        title: 'Создание задач',
      },
      {
        id: 'update tasks',
        title: 'Редактирование всех задач',
      },
      {
        id: 'update department tasks',
        title: 'Редактирование задач только своего отделения',
      },
      {
        id: 'update own tasks',
        title: 'Редактирование только своих задач',
      },
      {
        id: 'delete tasks',
        title: 'Удаление любой задачи',
      },
      {
        id: 'delete department tasks',
        title: 'Удаление любой задачи своего отделения',
      },
      {
        id: 'delete own tasks',
        title: 'Удаление любой своей задачи',
      },
    ],
  },
];

let r = 0;

const bitwisedRessources = ressources.map(({ title, permissions }) => {
  const bitwisedPermissions = permissions.map((perm) => {
    r++;
    return {
      ...perm,
      bit: 2 ** (r - 1),
    };
  });

  return {
    title,
    bitwisedPermissions,
  };
});

/*
    permission example in bitwisedRessource  ==>
    {
        id: "crud cities",
        title: "Все действия над городами",
        bit: 16  <=> 00010000 (just example 2**r)
    },

    <-- user permissions will be a Number(2**r) (result of bitwise OR of some other permissions) -->
    user.permissions = permission_a.bit | permission_b.bit | permission_j.bit

    <-- in order to check if user has permission X (no need to loop through arrays... ) -->
    user has permission (X) <===>  user.permissions & X.bit <===> boolean

    ===> later we can get rid of id field the bit field will replace it
    ===> user will have a simple field (number) instead of array
    ===> no need for functions to check if user has permission ....

                          | a | b | c | d | e | f | g | h |  <== permissions
                          |---|---|---|---|---|---|---|---|
                    2 <== | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
                    4 <== | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
                    8 <== | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |  ( 1 permission exists )
                   16 <== | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |  ( 0 permission doesn't )
                   32 <== | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
                   64 <== | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
                  128 <== | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
                  254 <== | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
*/

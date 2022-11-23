export type listsContextProps = {
  addNewList: (newList: listObject) => void;
  removeItem: (listID: number) => void;
  clearList: () => void;
  reloadNewList: (newList: listObject[]) => void;
  lists: listObject[];
};

// export type currentBackendState = {
//   backEndData: {};
//   setBackEndData: (backEndData: any) => void;
// };

export type currentTasksState = {
  currentList: taskObject[];
  setCurrentList: (currentList: taskObject[]) => void;
  clearCurrentList: () => void;
};

export type infoObject = {
  date: string;
};
export type currentTask = {
  currentTask: taskObject;
  setCurrentTask: (currentTask: taskObject) => void;
};
export type taskObject = {
  taskID: number;
  taskName: string;
  info: infoObject;
  status: number;
};
export type currentListID = {
  currentListID: number;
  setCurrentListID: (currentListID: number) => void;
};

export type listObject = {
  listName: string;
  listID: number;
  completedTasks: taskObject[];
  pendingTasks: taskObject[];
  isActive: boolean;
};
export type userObject = {
  username: string;
  first: string;
  last: string;
  mail: string;
};
export type userState = {
  profile: userObject;
  setUser: (profile: userObject) => void;
};

// export type listSerial = {
//   serial: number;
//   setNewSerial: (serial: number) => void;
// };
// export type taskSerial = {
//   taskSerial: number;
//   setNewTaskSerial: (taskSerial: number) => void;
// };

export type listsContextProps = {
  addNewList: (newList: listObject) => void;
  removeItem: (listID: number) => void;
  clearList: () => void;
  reloadNewList: (newList: listObject[]) => void;
  lists: listObject[];
};

export type currentListState = {
  currentList: taskObject[];
  setCurrentList: (currentList: taskObject[]) => void;
  clearCurrentList: () => void;
};

export type infoObject = {
  date: string;
  dueDate: string | null;
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

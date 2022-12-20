export type listsContextProps = {
  addNewList: (newList: listObject) => void;
  removeItem: (listID: number) => void;
  clearList: () => void;
  reloadNewList: (newList: listObject[]) => void;
  setActiveItem: (listID: number) => void;
  lists: listObject[];
};

export type currentListState = {
  currentList: taskObject[];
  setCurrentList: (currentList: taskObject[]) => void;
  clearCurrentList: () => void;
  setActiveTask: (taskID: number) => void;
};
export type hyperlinkObject = {
  title: string;
  hyperlink: string;
};
export type infoObject = {
  date: string;
  dueDate?: string;
  link?: hyperlinkObject;
};

export type currentTask = {
  currentTask: taskObject;
  isHidden: boolean;
  link?: hyperlinkObject;
  dueDate?: string;
  setCurrentTask: (currentTask: taskObject) => void;
  setIsHidden: (isHidden: boolean) => void;
  setNewLink: (link: hyperlinkObject) => void;
  setDueDate: (dueDate: string) => void;
};
export type taskObject = {
  taskID: number;
  taskName: string;
  info: infoObject;
  status: number;
  isActive: boolean;
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

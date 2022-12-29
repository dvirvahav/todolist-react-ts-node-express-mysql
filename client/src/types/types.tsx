export type ListState = {
  addNewList: (newList: list) => void;
  removeItem: (listID: number) => void;
  clearList: () => void;
  reloadNewList: (newList: list[]) => void;
  setActiveItem: (listID: number) => void;
  removeTaskFromList: (taskItemID: number) => void;
  updateListName: (listID: number, newName: string) => void;
  lists: list[];
};

export type CurrentListState = {
  currentList: task[];
  setCurrentList: (currentList: task[]) => void;
  clearCurrentList: () => void;
  setActiveTask: (taskID: number) => void;
};
export type note = {
  title: string;
  content: string;
};
export type hyperLink = {
  title: string;
  hyperlink: string;
};
export type info = {
  date: string;
  dueDate?: string;
  link?: hyperLink;
  note?: note;
};

export type currentTask = {
  currentTask: task;
  isHidden: boolean;
  link?: hyperLink;
  note?: note;
  dueDate?: string;
  setCurrentTask: (currentTask: task) => void;
  setIsHidden: (isHidden: boolean) => void;
  setNewLink: (link: hyperLink) => void;
  setDueDate: (dueDate: string) => void;
  setNewNote: (note: note) => void;
};
export type task = {
  taskID: number;
  taskName: string;
  info: info;
  status: number;
  isActive: boolean;
};
export type currentListID = {
  currentListID: number;
  setCurrentListID: (currentListID: number) => void;
};

export type list = {
  listName: string;
  listID: number;
  tasks: task[];
  isActive: boolean;
};
export type user = {
  username: string;
  first: string;
  last: string;
  mail: string;
};
export type UserState = {
  profile: user;
  setUserProfile: (userProfile: user) => void;
};

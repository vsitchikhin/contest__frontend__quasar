import { defineStore } from 'pinia';
import { IAdminTaskDto, IGroupTaskDto, ITaskDto, ITaskHistory, IUserTaskDto } from 'src/modules/tasks/types/tasks.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';

interface ITasksState {
  taskList: ITaskDto[] | null;
  task: ITaskDto | null;

  history: ITaskHistory[] | null;

  adminTaskList: IAdminTaskDto[] | null;

  studentTaskList: IUserTaskDto[] | null;
  groupTaskList: IGroupTaskDto[] | null;

  taskListLoadingStatus: TLoadingStatus;
  taskLoadingStatus: TLoadingStatus;
  historyLoadingStatus: TLoadingStatus;

  adminTaskLoadingStatus: TLoadingStatus;

  studentTaskListLoadingStatus: TLoadingStatus;
  groupTaskListLoadingStatus: TLoadingStatus;
}

export const tasksStore = defineStore({
  id: 'tasks',

  state: (): ITasksState => ({
    taskList: null,
    task: null,

    history: null,

    adminTaskList: null,

    studentTaskList: null,
    groupTaskList: null,

    taskListLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    taskLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    historyLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    adminTaskLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    studentTaskListLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    groupTaskListLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },
  }),

  actions: {
    // ----------------------------------------------------------------
    // Методы обновления данных
    SET_TASK_PAYLOAD(payload: ITaskDto | null) {
      this.task = payload;
    },

    SET_TASK_LIST_PAYLOAD(payload: ITaskDto[] | null) {
      this.taskList = payload;
    },

    SET_TASK_HISTORY_PAYLOAD(payload: ITaskHistory[] | null) {
      this.history = payload;
    },

    SET_ADMIN_TASK_LIST_PAYLOAD(payload: IAdminTaskDto[] | null) {
      this.adminTaskList = payload;
    },

    SET_STUDENT_TASK_LIST_PAYLOAD(payload: IUserTaskDto[] | null) {
      this.studentTaskList = payload;
    },

    SET_GROUP_TASK_LIST_PAYLOAD(payload: IGroupTaskDto[] | null) {
      this.groupTaskList = payload;
    },

    // ----------------------------------------------------------------
    // Методы установки лоадинг-статусов
    SET_TASK_LOADING_STATUS(status: TLoadingStatus) {
      this.taskLoadingStatus = {
        ...this.taskLoadingStatus,
        ...status,
      };
    },

    SET_TASK_LIST_LOADING_STATUS(status: TLoadingStatus) {
      this.taskListLoadingStatus = {
        ...this.taskListLoadingStatus,
        ...status,
      };
    },

    SET_HISTORY_LOADING_STATUS(status: TLoadingStatus) {
      this.historyLoadingStatus = {
        ...this.historyLoadingStatus,
        ...status,
      };
    },

    SET_ADMIN_TASK_LIST_LOADING_STATUS(status: TLoadingStatus) {
      this.adminTaskLoadingStatus = {
        ...this.adminTaskLoadingStatus,
        ...status,
      };
    },

    SET_STUDENT_TASK_LIST_LOADING_STATUS(status: TLoadingStatus) {
      this.studentTaskListLoadingStatus = {
        ...this.studentTaskListLoadingStatus,
        ...status,
      };
    },

    SET_GROUP_TASK_LIST_LOADING_STATUS(status: TLoadingStatus) {
      this.groupTaskListLoadingStatus = {
        ...this.groupTaskListLoadingStatus,
        ...status,
      };
    },
  },
});

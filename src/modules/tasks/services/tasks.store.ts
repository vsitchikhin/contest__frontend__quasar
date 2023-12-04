import { defineStore } from 'pinia';
import { IAdminTaskDto, ITaskDto, ITaskHistory } from 'src/modules/tasks/types/tasks.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';

interface ITasksState {
  taskList: ITaskDto[] | null;
  task: ITaskDto | null;

  history: ITaskHistory[] | null;

  adminTaskList: IAdminTaskDto[] | null;

  taskListLoadingStatus: TLoadingStatus;
  taskLoadingStatus: TLoadingStatus;
  historyLoadingStatus: TLoadingStatus;

  adminTaskLoadingStatus: TLoadingStatus;
}

export const tasksStore = defineStore({
  id: 'tasks',

  state: (): ITasksState => ({
    taskList: null,
    task: null,

    history: null,

    adminTaskList: null,

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
  },
});

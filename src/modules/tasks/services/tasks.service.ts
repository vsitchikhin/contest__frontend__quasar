import { Service } from 'src/modules/service';
import { tasksStore } from 'src/modules/tasks/services/tasks.store';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum } from 'src/types/base.types';
import { ITaskDto, ITaskHistory, ITaskSolution } from 'src/modules/tasks/types/tasks.types';
// import { ITokenPlugin } from 'src/plugins/TokenPlugin';

export class TasksService extends Service {
  private store;

  public constructor() {
    super();
    this.store = tasksStore();
  }

  // ------------------------------------------------------------------
  // Геттеры
  public get taskList() {
    return this.store.taskList;
  }

  public get task() {
    return this.store.task;
  }

  public get taskListLoadingStatus() {
    return this.store.taskListLoadingStatus;
  }

  public get taskLoadingStatus() {
    return this.store.taskLoadingStatus;
  }

  public get history() {
    return this.store.history;
  }

  public get historyLoadingStatus() {
    return this.store.historyLoadingStatus;
  }

  // ------------------------------------------------------------------
  // API запросы
  public async loadTaskList(courseId: string): Promise<boolean> {
    // const tokenPlugin = <ITokenPlugin>useNuxtApp().$token;
    this.store.SET_TASK_LIST_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      // const response = await this.api.get<null, ITaskDto[]>(`${this.basePath}/api/courses/${courseId}/tasks`, null, {
      //   headers: {
      //     Authorization: `Bearer ${tokenPlugin.get()}`,
      //   },
      // });

      // this.store.SET_TASK_LIST_PAYLOAD(response);
      this.store.SET_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return true;
    } catch(e: any) {
      this.store.SET_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.statusCode,
        msg: e.errorMessage,
      });

      return false;
    }
  }

  public async loadTask(taskId: string): Promise<boolean> {
    // const tokenPlugin = <ITokenPlugin>useNuxtApp().$token;
    this.store.SET_TASK_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      // const response = await this.api.get<null, ITaskDto>(`${this.basePath}/api/tasks/${taskId}`, null, {
      //   headers: {
      //     Authorization: `Bearer ${tokenPlugin.get()}`,
      //   },
      // });

      // this.store.SET_TASK_PAYLOAD(response);
      this.store.SET_TASK_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return true;
    } catch(e: any) {
      this.store.SET_TASK_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.statusCode,
        msg: e.errorMessage,
      });

      return false;
    }
  }

  public async loadTaskHistory(taskId: string): Promise<boolean> {
    // const tokenPlugin = <ITokenPlugin>useNuxtApp().$token;
    this.store.SET_HISTORY_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      // const response = await this.api.get<null, ITaskHistory[]>(`${this.basePath}/api/history/${taskId}`, null, {
      //   headers: {
      //     Authorization: `Bearer ${tokenPlugin.get()}`,
      //   },
      // });

      // this.store.SET_TASK_HISTORY_PAYLOAD(response);
      this.store.SET_HISTORY_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return true;
    } catch(e: any) {
      this.store.SET_HISTORY_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.statusCode,
        msg: e.errorMessage,
      });

      return false;
    }
  }

  public async submitTask(solution: string): Promise<boolean> {
    // const tokenPlugin = <ITokenPlugin>useNuxtApp().$token;
    const currentTask = this.task;

    if (!currentTask) {
      return false;
    }

    try {
      // await this.api.post(
      //   `${this.basePath}/api/check`,
      //   {
      //     task_id: Number(currentTask.id),
      //     code: solution,
      //     problem: currentTask.problem,
      //   } as ITaskSolution,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${tokenPlugin.get()}`,
      //     },
      //   });

      await new Promise(resolve => resolve(true));
      return true;
    } catch(e: any) {
      return false;
    }
  }

  // ------------------------------------------------------------------
  // Методы
  public setActiveTask(taskId: string) {
    const activeTask = this.store.taskList?.find(task => task.id === taskId);

    this.store.SET_TASK_PAYLOAD(activeTask || null);
  }
}

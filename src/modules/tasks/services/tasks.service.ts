import { Service } from 'src/modules/service';
import { tasksStore } from 'src/modules/tasks/services/tasks.store';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
import {
  IAdminTaskDto,
  ITaskDto,
  ITaskHistory,
  ITaskSolution,
  TaskStatusesEnum,
} from 'src/modules/tasks/types/tasks.types';
import { api } from 'boot/axios';

export class TasksService extends Service {
  private store;

  public constructor() {
    super();
    this.store = tasksStore();
  }

  // ------------------------------------------------------------------
  // Геттеры
  public get taskList(): ITaskDto[] | null {
    return this.store.taskList;
  }

  public get task(): ITaskDto | null {
    return this.store.task;
  }

  public get taskListLoadingStatus(): TLoadingStatus {
    return this.store.taskListLoadingStatus;
  }

  public get taskLoadingStatus(): TLoadingStatus {
    return this.store.taskLoadingStatus;
  }

  public get history(): ITaskHistory[] | null {
    return this.store.history;
  }

  public get historyLoadingStatus(): TLoadingStatus {
    return this.store.historyLoadingStatus;
  }

  public get adminTaskList(): IAdminTaskDto[] | null {
    return this.store.adminTaskList;
  }

  public get adminTaskListLoadingStatus(): TLoadingStatus {
    return this.store.adminTaskLoadingStatus;
  }

  // ------------------------------------------------------------------
  // API запросы
  public async loadTaskList(courseId: string): Promise<boolean> {
    this.store.SET_TASK_LIST_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get(`/api/courses/${courseId}/tasks`, {
        headers: {
          ...this.apiHeaders,
        },
      });

      this.store.SET_TASK_LIST_PAYLOAD(response.data);
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
    this.store.SET_TASK_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    this.store.SET_HISTORY_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get(`/api/tasks/${taskId}`, {
        headers: {
          ...this.apiHeaders,
        },
      });

      this.store.SET_TASK_PAYLOAD(response.data);
      this.store.SET_TASK_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      this.store.SET_TASK_HISTORY_PAYLOAD(response.data.history);
      this.store.SET_HISTORY_LOADING_STATUS({
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
    const currentTask = this.task;

    if (!currentTask) {
      return false;
    }

    try {
      await api.post(
        '/api/check',
        {
          task_id: currentTask.id,
          code: solution,
        } as ITaskSolution,
        {
          headers: {
            ...this.apiHeaders,
          },
        });

      const historyForUpdate = this.store.history ? [...this.store.history] :  [];

      const newHistoryRecord: ITaskHistory = {
        id: Math.random() * Math.random() * 10,
        task_id: currentTask.id,
        code: '',
        score: 0,
        status: TaskStatusesEnum.zero,
        tests: [],
      };

      historyForUpdate.unshift(newHistoryRecord);

      this.store.SET_TASK_HISTORY_PAYLOAD(historyForUpdate);

      return true;
    } catch(e: any) {
      return false;
    }
  }

  public async loadAdminTaskList(courseName: string): Promise<boolean> {
    this.store.SET_ADMIN_TASK_LIST_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.post('/api/admin/courses/tasks',
        {
          course_name: courseName,
        },
        {
          headers: {
            ...this.apiHeaders,
          },
        });

      this.store.SET_ADMIN_TASK_LIST_PAYLOAD(response.data);
      this.store.SET_ADMIN_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return true;
    } catch(e: any) {
      this.store.SET_ADMIN_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.statusCode,
        msg: e.errorMessage,
      });

      return false;
    }
  }

  // ------------------------------------------------------------------
  // Методы
  public async setActiveTask(taskId: string) {
    if (!this.store.taskList) {
      return await this.loadTask(taskId);
    }

    const activeTask = this.store.taskList?.find(task => task.id === parseInt(taskId));

    if (activeTask) {
      this.store.SET_TASK_PAYLOAD(activeTask || null);
      this.store.SET_TASK_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });
      return true;
    } else {
      // todo: Обработать вариант, если вдруг задача не найдена
      return await this.loadTask(taskId);
    }
  }
}

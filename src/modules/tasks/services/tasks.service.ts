import { Service } from 'src/modules/service';
import { tasksStore } from 'src/modules/tasks/services/tasks.store';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
import {
  IAdminTaskDto,
  IGroupTaskDto,
  ITaskDto,
  ITaskHistory,
  ITaskSolution,
  IUserTaskDto,
  TaskStatusesEnum,
} from 'src/modules/tasks/types/tasks.types';
import { api } from 'boot/axios';
import { EntityTypesEnum } from 'src/modules/courses/types/entity.types';

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

  public get adminTaskList(): IAdminTaskDto[] | null {
    return this.store.adminTaskList;
  }

  public get adminTaskListLoadingStatus(): TLoadingStatus {
    return this.store.adminTaskLoadingStatus;
  }

  public get studentTaskList(): IUserTaskDto[] | null {
    return this.store.studentTaskList;
  }

  public get studentTaskListLoadingStatus(): TLoadingStatus {
    return this.store.studentTaskListLoadingStatus;
  }

  public get groupTaskList(): IGroupTaskDto[] | null {
    return this.store.groupTaskList;
  }

  public get groupTaskListLoadingStatus(): TLoadingStatus {
    return this.store.groupTaskListLoadingStatus;
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
      const task = this.task;
      const newHistoryRecord: ITaskHistory = {
        id: Math.random() * Math.random() * 10,
        task_id: currentTask.id,
        code: '',
        score: 0,
        status: TaskStatusesEnum.zero,
        tests: [],
      };

      task?.history?.unshift(newHistoryRecord);

      this.store.SET_TASK_PAYLOAD(task);

      return true;
    } catch(e: any) {
      return false;
    }
  }

  public async loadAdminTaskList(courseId: string): Promise<boolean> {
    this.store.SET_ADMIN_TASK_LIST_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get(`/api/admin/courses/${courseId}/tasks`,
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

  public async loadStudentTaskList(studentId: string, courseId: string) {
    this.store.SET_STUDENT_TASK_LIST_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get(`/api/admin/courses/${courseId}/users/${studentId}`, {
        headers: { ...this.apiHeaders },
      });

      this.store.SET_STUDENT_TASK_LIST_PAYLOAD(response.data);
      this.store.SET_STUDENT_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return true;
    } catch (e: any) {
      this.store.SET_STUDENT_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.statusCode,
        msg: e.errorMessage,
      });

      return false;
    }
  }

  public async loadGroupTaskList(groupId: string, courseId: string) {
    this.store.SET_GROUP_TASK_LIST_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      const response = await api.get(`/api/admin/courses/${courseId}/groups/${groupId}`, {
        headers: { ...this.apiHeaders },
      });

      this.store.SET_GROUP_TASK_LIST_PAYLOAD(response.data);
      this.store.SET_GROUP_TASK_LIST_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      return true;
    } catch (e: any) {
      this.store.SET_GROUP_TASK_LIST_LOADING_STATUS({
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

  public async loadEntityTaskList(entityType: EntityTypesEnum, entityId: string, courseId: string) {
    if (entityType === EntityTypesEnum.Student) {
      await this.loadStudentTaskList(entityId, courseId);
    }
    if (entityType === EntityTypesEnum.Group) {
      await this.loadGroupTaskList(entityId, courseId);
    }
  }
}

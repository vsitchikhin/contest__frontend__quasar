import { defineStore } from 'pinia';
import { ICourseShortDto } from 'src/modules/courses/types/courses.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';

interface ICoursesState {
  courses: ICourseShortDto[] | null;
  course: ICourseShortDto | null;

  coursesLoadingStatus: TLoadingStatus;
  courseLoadingStatus: TLoadingStatus;
}

export const coursesStore = defineStore({
  id: 'courses',

  state: (): ICoursesState => ({
    // ----------------------------------------------------------------
    // Данные
    courses: null,
    course: null,

    // ----------------------------------------------------------------
    // Loading статусы
    coursesLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    courseLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },
  }),

  actions: {
    // ----------------------------------------------------------------
    // Установка данных в стор
    SET_COURSES_PAYLOAD(payload: ICourseShortDto[] | null) {
      this.courses = payload;
    },

    SET_COURSE_PAYLOAD(payload: ICourseShortDto | null) {
      this.course = payload;
    },

    // ----------------------------------------------------------------
    // Установка лоадинг статусов
    SET_COURSES_LOADING_STATUS(status: TLoadingStatus) {
      this.coursesLoadingStatus = {
        ...this.coursesLoadingStatus,
        ...status,
      };
    },

    SET_COURSE_LOADING_STATUS(status: TLoadingStatus) {
      this.courseLoadingStatus = {
        ...this.courseLoadingStatus,
        ...status,
      };
    },
  },
});

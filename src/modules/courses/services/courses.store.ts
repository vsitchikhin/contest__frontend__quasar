import { defineStore } from 'pinia';
import { IAdminCourseDto, ICourseShortDto } from 'src/modules/courses/types/courses.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
import { IGroupInfo, IUserInfo } from 'src/modules/courses/types/entity.types';

interface ICoursesState {
  courses: ICourseShortDto[] | null;
  course: ICourseShortDto | null;

  adminCourses: IAdminCourseDto[] | null;

  coursesLoadingStatus: TLoadingStatus;
  courseLoadingStatus: TLoadingStatus;

  adminCoursesLoadingStatus: TLoadingStatus;

  courseStudents: IUserInfo[] | null;
  courseGroups: IGroupInfo[] | null;

  courseStudentsLoadingStatus: TLoadingStatus;
  courseGroupsLoadingStatus: TLoadingStatus;
}

export const coursesStore = defineStore({
  id: 'courses',

  state: (): ICoursesState => ({
    // ----------------------------------------------------------------
    // Данные
    courses: null,
    course: null,

    adminCourses: null,

    courseStudents: null,
    courseGroups: null,

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

    adminCoursesLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    courseStudentsLoadingStatus: {
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.noAction,
      errorCode: '',
      msg: '',
    },

    courseGroupsLoadingStatus: {
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

    SET_ADMIN_COURSES_PAYLOAD(payload: IAdminCourseDto[] | null) {
      this.adminCourses = payload;
    },

    SET_COURSE_GROUPS_PAYLOAD(payload: IGroupInfo[] | null) {
      this.courseGroups = payload;
    },

    SET_COURSE_STUDENTS_PAYLOAD(payload: IUserInfo[] | null) {
      this.courseStudents = payload;
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

    SET_ADMIN_COURSES_LOADING_STATUS(status: TLoadingStatus) {
      this.adminCoursesLoadingStatus = {
        ...this.adminCoursesLoadingStatus,
        ...status,
      };
    },

    SET_COURSE_GROUPS_LOADING_STATUS(status: TLoadingStatus) {
      this.courseGroupsLoadingStatus = {
        ...this.courseGroupsLoadingStatus,
        ...status,
      };
    },

    SET_COURSE_STUDENTS_LOADING_STATUS(status: TLoadingStatus) {
      this.courseStudentsLoadingStatus = {
        ...this.courseStudentsLoadingStatus,
        ...status,
      };
    },
  },
});

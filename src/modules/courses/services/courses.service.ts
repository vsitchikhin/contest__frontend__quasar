import { coursesStore } from 'src/modules/courses/services/courses.store';
import { Service } from 'src/modules/service';
import { ICourseShortDto } from 'src/modules/courses/types/courses.types';
import { LoadingStatusActionsEnum, LoadingStatusCodesEnum, TLoadingStatus } from 'src/types/base.types';
// import {ITokenPlugin} from "src/plugins/TokenPlugin";

export class CoursesService extends Service {
  private store;


  public constructor() {
    super();
    this.store = coursesStore();
  }

  // ------------------------------------------------------------------
  // Геттеры
  public get courses(): ICourseShortDto[] | null {
    return this.store.courses;
  }

  public get course(): ICourseShortDto | null {
    return this.store.course;
  }

  public get coursesLoadingStatus(): TLoadingStatus {
    return this.store.coursesLoadingStatus;
  }

  public get courseLoadingStatus(): TLoadingStatus {
    return this.store.courseLoadingStatus;
  }

  // ------------------------------------------------------------------
  // API запросы
  public async loadCourses(): Promise<boolean> {
    // const tokenPlugin = <ITokenPlugin>useNuxtApp().$token;
    this.store.SET_COURSES_LOADING_STATUS({
      code: LoadingStatusCodesEnum.notLoaded,
      action: LoadingStatusActionsEnum.loading,
    });

    try {
      // const data = await this.api.get<null, ICourseShortDto[]>(`${this.basePath}/api/courses`, null, {
      //   headers: {
      //     Authorization: `Bearer ${tokenPlugin.get()}`,
      //   },
      // });

      this.store.SET_COURSES_LOADING_STATUS({
        code: LoadingStatusCodesEnum.loaded,
        action: LoadingStatusActionsEnum.noAction,
      });

      // this.store.SET_COURSES_PAYLOAD(data);

      return true;
    } catch(e: any) {
      console.log(e);
      this.store.SET_COURSES_LOADING_STATUS({
        code: LoadingStatusCodesEnum.error,
        action: LoadingStatusActionsEnum.noAction,
        errorCode: e.statusCode.toString(),
        msg: e.errorMessage,
      });

      return false;
    }

  }

  // ------------------------------------------------------------------
  // Методы
  public setCourse(courseId: string) {
    const course: ICourseShortDto | undefined = this.store.courses?.find(course => course.id.toString() === courseId);

    this.store.SET_COURSE_PAYLOAD(course || null);
  }
}

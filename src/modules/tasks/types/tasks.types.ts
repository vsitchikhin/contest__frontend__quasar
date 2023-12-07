export enum TaskStatusesEnum {
  success = 'success',
  error = 'error',
  zero = 'zero',
}

export interface ITaskDto {
  id: number;
  course: string;
  number: number;
  description: string;
  problem: number;
  variant: number;
  rating: number;
  score?: number;
  max_score?: number;
  status?: TaskStatusesEnum;
}

export interface ITaskSolution {
  problem: number;
  code: string;
  task_id: number;
}

export interface ITestDto {
  id: number;
  score: number;
  test_in: string;
  test_out: string;
}

export interface ITaskHistory {
  id: number;
  task_id: number;
  code: string;
  score: number;
  status: TaskStatusesEnum;
  tests: ITestDto[];
}

export interface IAdminTaskDto {
  id: string;
  description: string;
  rating: number;
  variant_count: number;
}

export interface IUserTaskDto {
  id: number,
  description: string,
  rating: number,
  variant: number,
  status: TaskStatusesEnum,
  score: number,
  max_score: number
}

export interface IGroupTaskHistory {
  id: number,
  name: string,
  middle_name: string,
  last_name: string,
  email: string,
  vstu_id: string
}

export interface IGroupTaskDto {
  id: number,
  description: string,
  rating: number,
  variant_count: number,
  history: IGroupTaskHistory[]
}

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

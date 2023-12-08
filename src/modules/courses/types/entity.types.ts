export enum EntityTypesEnum {
  Student = 'student',
  Group = 'group',
}

export interface IUserInfo {
  id: number;
  name: string;
  middle_name: string;
  last_name: string;
  email: string;
  vstu_id: string;
}

export interface IGroupInfo {
  id: number;
  name: string;
}

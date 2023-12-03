export interface UserRequestDto {
  email: string;
  password: string;
}

export interface ParameterDto {
  id: number;
  name: string;
  slug: string;
  created_at: string; // строка вида Date().toLocaleString()
  updated_at: string; // строка вида Date().toLocaleString()
}

export interface UserActionsDto {
  has_tasks: boolean;
  delete: boolean;
  ban: boolean;
  change_roles: boolean;
  change_permissions: boolean;
}

/*
 * Текущий авторизованный пользователь
 */
export interface UserFullDto {
  id: number;
  name: string;
  middle_name?: string | null;
  last_name?: string | null;
  email: string;
  vstu_id?: string | null;
  created_at?: string | null; // строка вида Date().toLocaleString()
  updated_at?: string | null; // строка вида Date().toLocaleString()
  roles: ParameterDto[] | false;
  permissions: false | string[];
}

/*
 * Пользователь, который был выбран в админ-панели
 * Это не текущий авторизованный пользователь, а тот, над которым
 * текущий может (или не может) выполнять некие манипуляции
 */
export interface SelectedUserDto extends UserFullDto{
  ban: boolean;
  non_active: boolean;
  actions: UserActionsDto[];
}

/*
 * Интерфейс для получения списка пользователей
 * Все поля в нем нужны только для отображения на карточке пользователя
 */
export interface UserShortDto {
  id: number;
  full_name?: string | null;
  email: string;
  vstu_id?: string | null;
  ban: boolean;
  non_active: boolean;
  roles: string | null;
}

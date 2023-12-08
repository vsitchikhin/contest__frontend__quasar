import { EntityTypesEnum } from 'src/modules/courses/types/entity.types';

export interface IEntityTab {
  id: string;
  title: string;
  entityType: EntityTypesEnum;
}

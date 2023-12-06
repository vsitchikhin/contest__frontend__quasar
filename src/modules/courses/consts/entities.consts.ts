import { IEntityTab } from 'components/ConEntityTabs/tabs.types';
import { EntityTypesEnum } from 'src/modules/courses/types/entity.types';

export const entityTabs: IEntityTab[] = [
  {
    id: '1',
    title: 'Студенты',
    entityType: EntityTypesEnum.Student,
  },
  {
    id: '2',
    title: 'Группы',
    entityType: EntityTypesEnum.Group,
  },
];

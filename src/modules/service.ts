import { nanoid } from 'nanoid';
import { clientServiceContainer } from 'boot/service-container';

export class Service {
  protected apiHeaders: { [key: string]: string };

  public constructor() {
    this.apiHeaders = {};
  }
}


// -------
export interface IServiceContainer<SC> {
  _id: string;
  _services: Map<string, SC>;
}
interface IServiceConstructor<T> {
  new (): T;
}
type UseService<T> = (serviceContainer?: IServiceContainer<T> | undefined) => T;

// Создает новый объект в глобальной области видимости
export function createServiceContainer(): IServiceContainer<Service> {
  const _id = nanoid();
  return {
    _id,
    _services: new Map<string, Service>(),
  };
}

function createService<S>(serviceContainer: IServiceContainer<S>, id: string, Service: IServiceConstructor<S>): void {
  serviceContainer._services.set(id, new Service());
}

export function defineService<T extends Service>(id: string, Service: IServiceConstructor<T>): UseService<T> {
  function useService(serviceContainer?: IServiceContainer<Service>): T {
    serviceContainer = serviceContainer || clientServiceContainer || createServiceContainer();

    if (!serviceContainer._services.has(id)) {
      createService(serviceContainer, id, Service);
    }

    return serviceContainer._services.get(id) as T;
  }
  return useService;
}

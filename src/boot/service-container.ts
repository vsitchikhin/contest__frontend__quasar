import { createServiceContainer, IServiceContainer, Service } from 'src/modules/service';
import { boot } from 'quasar/wrappers';

let clientServiceContainer: IServiceContainer<Service> | undefined;

export default boot(({ app }) => {
  clientServiceContainer = createServiceContainer();
  app.config.globalProperties.$_serviceContainer = clientServiceContainer;
});

export { clientServiceContainer };

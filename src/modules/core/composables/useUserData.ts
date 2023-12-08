import { UsersService } from 'src/modules/users/services/users.service';
import { computed } from 'vue';
import { LoadingStatusCodesEnum } from 'src/types/base.types';
import { useCookie } from 'src/modules/core/utils/Cookie.utils';

export function useUserData() {
  const usersService = new UsersService();
  const userDataLoaded = computed(() => usersService.currentUserLoadingStatus.code === LoadingStatusCodesEnum.loaded);

  const token = useCookie<string>('jwt');

  if (!usersService.currentUser && !!token.value) {
    usersService.loadCurrentUser();
  }

  const showPage = computed(() => !!useCookie<string>('jwt').value && userDataLoaded.value);
  // const showPage = ref(false); // пока оставлю, для отладки компонента полноэкранной загрузки

  return {
    showPage,
  };
}

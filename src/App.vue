<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TokenService } from 'src/modules/core/services/tokens/token.service';

export default defineComponent({
  name: 'App',

  setup() {
    // В момент создания приложения необходимо инициировать TokenService. В сервисе
    // используются утилиты useCookie и useLocalStorage, которые используют vue-3 хуки onMounted
    // и onUnmounted, которые в момент первого подключения сервиса встраиваются в компонент. А также,
    // сервис используется в роутере: в хуке beforeEach роутера. А значит, первое подключение
    // useCookie и useLocalStorage сервиса должны быть до первого срабатываения beforeEach роутера.
    new TokenService();
    return {};
  },
});
</script>

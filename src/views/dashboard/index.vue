<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
    <router-link tag="li" to="/example/table">
      <a>/foo</a>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { UserModule } from '@/store/modules/user';

@Component
export default class Dashboard extends Vue {
  get name() {
    return UserModule.name;
  }

  get roles() {
    return UserModule.roles;
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 0px 30px 30px 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

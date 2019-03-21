<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container" :collapse="classObj.hideSidebar"/>
    <div class="main-container">
      <navbar/>
      <div :class="otherSideObj">
        <div class="app-main-wrapper" >
          <app-main/>
        </div>
        <OtherSide class="sidebar-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Navbar, AppMain, Sidebar, OtherSide } from './components';
import ResizeMixin from './mixin/ResizeHandler';
import { Component, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { DeviceType, AppModule } from '@/store/modules/app';

@Component({
  components: {
    Navbar,
    Sidebar,
    AppMain,
    OtherSide
  },
})
export default class Layout extends mixins(ResizeMixin) {
  get classObj() {
    return {
      hideSidebar: !this.sidebar.opened,
      openSidebar: this.sidebar.opened,
      withoutAnimation: this.sidebar.withoutAnimation,
      mobile: this.device === DeviceType.Mobile,
    };
  }

  get otherSideObj(){
    return {
      hideOtherSide: !this.otherSide.opened,
      openOtherSide: this.otherSide.opened,
      divOverOtherSide: true,
    }
  }

  private handleClickOutside() {
    AppModule.CloseSideBar(false);
  }
}
</script>

<style lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @import "src/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100vh;
    width: 100%;
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .main-container {
    height: 100vh;
    min-height: 100%;
    transition: margin-left .28s;
    margin-left: $sideBarWidth;
    position: relative;
    
  }

  .app-main-wrapper {
    height: 100vh;
    margin-top: 1px;
    background-color: rgba(255, 255, 255, 1);
    transition: margin-right .28s;
    margin-right: $sideBarWidth;
    position: relative;
    z-index: 1000;
  }

  .sidebar-container {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100vh;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
  }

  .sidebar-right {
    transition: width 0.28s;
    width: $sideBarWidth !important;
    height: 100vh;
    position: absolute;
    font-size: 0px;
    top: $navHeight +5px;
    bottom: 0;
    right: 0;
    z-index: 999;
    overflow: hidden;
  }

  .divOverOtherSide {
    z-index: 998
  }

  .hideOtherSide {
    .app-main-wrapper {
      height: 100vh;
      margin-right: 0px
    }
    .sidebar-right{
      width: 0px;
    }
  }

  .hideSidebar {
    .main-container {
      margin-left: 36px;
    }

    .sidebar-container {
      width: 36px !important;
    }
  }

  /* for mobile response 适配移动端 */
  .mobile {
    .main-container {
      margin-left: 0px;
    }

    .sidebar-container {
      transition: transform .28s;
      width: $sideBarWidth !important;
    }

    &.openSidebar {
      position: fixed;
      top: 0;
    }

    &.hideSidebar {
      .sidebar-container {
        transition-duration: 0.3s;
        transform: translate3d(-$sideBarWidth, 0, 0);
      }
    }
  }

  .withoutAnimation {
    .main-container,
    .sidebar-container {
      transition: none;
    }
  }
</style>

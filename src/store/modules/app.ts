import Cookies from 'js-cookie';
import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType {
  Mobile,
  Desktop,
}

export interface IAppState {
  device: DeviceType;
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
  otherside: {
    opened: boolean;
    withoutAnimation: boolean;
  }
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public sidebar = {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false,
  };

  public otherside = {
    opened: Cookies.get('othersideStatus') !== 'closed',
    withoutAnimation: false,
  }

  public device = DeviceType.Desktop;

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  public ToggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Action({ commit: 'CLOSE_SIDEBAR' })
  public CloseSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Action({ commit: 'TOGGLE_OTHERSIDE' })
  public ToggleOtherSide(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Action({ commit: 'CLOSE_OTHERSIDE' })
  public CloseOtherSide(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Action({ commit: 'TOGGLE_DEVICE' })
  public ToggleDevice(device: DeviceType) {
    return device;
  }

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed');
    } else {
      Cookies.set('sidebarStatus', 'opened');
    }
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed');
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private TOGGLE_OTHERSIDE(withoutAnimation: boolean) {
    if (this.otherside.opened) {
      Cookies.set('othersideStatus', 'closed');
    } else {
      Cookies.set('othersideStatus', 'opened');
    }
    this.otherside.opened = !this.otherside.opened;
    this.otherside.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private CLOSE_OTHERSIDE(withoutAnimation: boolean) {
    Cookies.set('othersideStatus', 'closed');
    this.otherside.opened = false;
    this.otherside.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }
}

export const AppModule = getModule(App);

import Vue, { defineComponent, Transition } from 'vue';
import './index.less';

import { EnumServiceResultStatus } from 'form-designer-types/enum/request';
import { EnumAppMode } from 'form-designer-types/enum';
import DesignerLeft from '../components/leftPanel';
import DesignerMain from '../components/mainPanel';
import classNames from 'classnames';
import { utils, funcFactory } from 'form-designer-utils';
import { commit_app_setAppInfo, commit_app_changeMode } from 'form-designer-vuex/src/store';
import { apps } from 'form-designer-utils/service';
import { mapGetters } from 'vuex';
const thisRefs: any = {};
export default defineComponent({
    name: 'designer-index-view',
    components: {
        DesignerLeft,
        Transition,
    },
    created() {
        const func = funcFactory.init();
        const appInfo = func.getAppInfo();
        const appId = utils.$getQueryString('appId') || appInfo.appId;
        const projectId = func.getAppInfo().projectId;
        apps.appService.getAppById(appId, projectId).then(res => {
            if (res.status === EnumServiceResultStatus.success) {
                this.$store.commit(commit_app_setAppInfo, {
                    projectId: res.data.projectId,
                    appId,
                    appName: res.data.appName,
                    appContent: res.data.appContent,
                });
                func.setAppInfo({
                    appId: appId,
                    appName: res.data.appName,
                });
            } else {
                console.warn('获取app信息错误', res.message);
            }
        });
    },
    mounted() {
        this.$store.commit(commit_app_changeMode, { mode: EnumAppMode.design });
    },
    data() {
        return {
            showLeft: true,
        };
    },
    computed: {
        ...mapGetters('designer', {
            pages: 'pages',
            selectedPage: 'selectedPage',
        }),
    },
    provide() {
        const $this = this;
        return {
            selectComponent(componentKey: string) {
                const compElement = document.getElementById(componentKey);
                const mainRef = thisRefs['designerMain'] as typeof DesignerMain;
                if (compElement && mainRef) {
                    mainRef.handleClick({ target: compElement });
                }
            },
            unselectComponent() {
                const mainRef = thisRefs['designerMain'] as typeof DesignerMain;
                if (mainRef) {
                    mainRef.unselect();
                }
            },
            setRefs(key: string, value: Vue.ComponentPublicInstance) {
                thisRefs[key] = value;
            },
            displayAppLeft(show: boolean) {
                $this.showLeft = show;
            },
        };
    },
    render() {
        return (
            <div class="form-designer-framework">
                <div class="form-designer-header">
                    <div class="header-left">
                        <img class="logo" src={require('@/assets/logo.svg')} />
                        <div class="logo-text">Form Designer</div>
                    </div>
                    <div class="header-right">
                        <i class="iconfont bangzhu" />
                        <i class="iconfont user" />
                        <i class="iconfont yuyan1" />
                        <i class="iconfont gengduo" />
                    </div>
                </div>
                <div class="form-designer-content">
                    <designer-left
                        class={classNames({ left: true, hide: !this.showLeft })}
                        ref="designerLeft"
                    />
                    <div class="main-content">
                        {/* <router-view
                            v-slots={{
                                default: (com: any) => (
                                    <transition name="slide-fade" duration={500}>
                                        <Component is={com} />
                                    </transition>
                                ),
                            }}
                        ></router-view> */}
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        );
    },
});

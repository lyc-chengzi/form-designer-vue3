import Vue, { defineComponent, inject } from 'vue';
import './index.less';
import { EnumComponentGroup, EnumComponentType } from 'form-designer-types/enum/components';
import { EnumAppMode } from 'form-designer-types/enum';
import { IDesignerComponent } from 'form-designer-types/interface/designer';

import {
    commit_designer_deleteComponent,
    commit_designer_dragAddComponent,
    commit_designer_selectedComponent,
} from 'form-designer-vuex/src/store/modules/designer.module';
import PageView from 'form-designer-components/src/page.vue';
import { utils } from 'form-designer-utils';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'designer-main-panel',
    components: {
        PageView,
    },
    setup() {
        const setIndexRefs = inject(
            'setRefs',
            (key: string, comInstance: Vue.ComponentPublicInstance) =>
                console.info('setRefs', key, comInstance)
        );
        return {
            setIndexRefs,
        };
    },
    computed: {
        ...mapGetters('designer', {
            selectedPage: 'selectedPage',
        }),
        ...mapGetters({ appMode: 'mode' }),
    },
    data() {
        return {
            dragContainerClassName: 'main-panel-container',
            dragComponent: undefined as IDesignerComponent | undefined,
            dragList: [] as IDesignerComponent[],
            // 用户选中的组件
            selectedTargetHtmlElement: null as HTMLElement | null,
            // 组件操作区
            actionBox: null as HTMLElement | null,
        };
    },
    mounted() {
        this.setIndexRefs('designerMain', this);
        this.actionBox = document.getElementById('designer-main-action-box');
    },
    provide() {
        const $this = this;
        return {
            getAppMode(): EnumAppMode {
                return $this.appMode;
            },
        };
    },
    methods: {
        dragChange(e: any): void {
            if (e && e.added) {
                const element = e.added.element;
                this.dragComponent = element;
            }
        },
        dragAdd(e: any): void {
            const to: HTMLDivElement = e.to;
            const fromItem: HTMLLIElement = e.item;
            const fromGroup: EnumComponentGroup = fromItem.dataset[
                'compgroup'
            ] as EnumComponentGroup;
            // const fromType = fromItem.dataset["comptype"];
            // 向根添加容器组件
            if (
                to.className.includes(this.dragContainerClassName) &&
                fromGroup === EnumComponentGroup.layout
            ) {
                this.$store.commit(`designer/${commit_designer_dragAddComponent}`, {
                    component: this.dragComponent,
                    parent: this.selectedPage,
                });
            }
        },
        // 组件选中代理事件
        handleClick(e: any): void {
            if (this.appMode !== EnumAppMode.design) return;
            const _targetNode = this.getTargetNode(e.target);
            if (_targetNode) {
                const dataset = _targetNode.dataset;
                // 如果触发元素是组件
                if (dataset.id) {
                    if (this.selectedTargetHtmlElement) {
                        this.selectedTargetHtmlElement.classList.remove('designer-component-ck');
                    }
                    const componentElement = document.getElementById(dataset.id);
                    if (!componentElement) return;
                    this.selectedTargetHtmlElement = componentElement;
                    this.setTargetAction();
                    const currentComponent: IDesignerComponent[] =
                        utils.$findTreeItem([this.selectedPage], dataset.id) || [];
                    if (currentComponent && currentComponent.length > 0) {
                        // 如果选中了组件，设置vuex的选中组件，并添加样式
                        this.$store.commit(`designer/${commit_designer_selectedComponent}`, {
                            component: currentComponent[0],
                        });
                    } else {
                        this.unselect();
                    }
                } else if (dataset.type === EnumComponentType.page) {
                    console.log('page');
                } else {
                    this.unselect();
                }
            } else {
                this.unselect();
            }
        },
        getTargetNode(target?: any): HTMLElement | undefined {
            if (!target) return undefined;
            if (target.dataset && target.dataset.id) {
                return target;
            } else {
                return this.getTargetNode(target.parentNode);
            }
        },
        //设置组件操作区域显示
        setTargetAction() {
            if (this.selectedTargetHtmlElement && this.actionBox) {
                // 单独处理页面
                if (this.selectedTargetHtmlElement.dataset.type === EnumComponentType.page) {
                    this.actionBox.style.display = 'none';
                    return;
                }
                this.selectedTargetHtmlElement.classList.add('designer-component-ck');
                const targetWidth = this.selectedTargetHtmlElement.offsetWidth;
                const targetHeight = this.selectedTargetHtmlElement.offsetHeight;
                const container = document.getElementById('designer-main-panel')!;
                const containerRect = container.getBoundingClientRect();
                const offsetLeft = containerRect.left; // 设计窗口的偏移量
                const offsetTop = containerRect.top - container.scrollTop;

                const rect = this.selectedTargetHtmlElement.getBoundingClientRect();
                const boxTop = rect.top - offsetTop;
                const boxLeft = rect.left - offsetLeft;
                this.actionBox.style.top = boxTop + targetHeight + 'px';
                this.actionBox.style.left = boxLeft + targetWidth - 30 + 'px';
                this.actionBox.style.display = 'block';
            }
        },
        // 取消选中组件
        unselect() {
            if (this.actionBox) {
                this.actionBox.style.display = 'none';
            }
            if (this.selectedTargetHtmlElement) {
                this.selectedTargetHtmlElement.classList.remove('designer-component-ck');
            }
            this.selectedTargetHtmlElement = null;
            this.$store.commit(`designer/${commit_designer_selectedComponent}`, {
                component: undefined,
            });
        },
        // 删除所选组件
        deleteComponent() {
            if (this.selectedTargetHtmlElement && this.actionBox) {
                const id = this.selectedTargetHtmlElement.dataset.id;
                this.actionBox.style.display = 'none';
                this.selectedTargetHtmlElement = null;
                this.$store.commit(`designer/${commit_designer_deleteComponent}`, {
                    id,
                });
            }
        },
    },
    render() {
        return (
            <div
                id="designer-main-panel"
                class="designer-main-panel"
                onClick={this.handleClick}
                data-app="true"
            >
                <div class="designer-main-action" id="designer-main-action-box">
                    <div class="action-bars">
                        <i class="iconfont del" onClick={this.deleteComponent} />
                    </div>
                </div>
                {this.selectedPage ? (
                    <div class="main-panel-container">
                        {(this.selectedPage.list || []).length === 0 ? (
                            <div class="main-panel-empty">
                                <h3>form designer</h3>
                                <h5>请拖入容器组件</h5>
                            </div>
                        ) : null}
                        <page-view
                            json={this.selectedPage}
                            appMode={EnumAppMode.design}
                        ></page-view>
                    </div>
                ) : null}
            </div>
        );
    },
});

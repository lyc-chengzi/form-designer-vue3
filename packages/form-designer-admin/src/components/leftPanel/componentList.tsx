import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import Draggable from 'vuedraggable';
import { message as $message } from 'ant-design-vue';
import { PlusCircleOutlined } from '@ant-design/icons-vue';
import './componentList.less';
import { IDesignerComponent } from 'form-designer-types/interface/designer';
import { EnumComponentGroup } from 'form-designer-types/enum/components';
import {
    commit_designer_doubleAddComponent,
    commit_designer_setDragComponent,
} from 'form-designer-vuex/src/store/modules/designer.module';
import { utils } from 'form-designer-utils';

const delayError = utils.$getDelayFunction((message: string) => {
    $message.warn(message);
}, 200);

type componentMenu = {
    name: string;
    components: IDesignerComponent[];
};

export default defineComponent({
    name: 'designer-component-list',
    components: {
        draggable: Draggable,
        PlusCircleOutlined,
    },
    computed: {
        ...mapGetters('designer', {
            componentList: 'componentList',
            selectedComponent: 'selectedComponent',
            selectedPage: 'selectedPage',
        }),
        componentGroup() {
            const group = [] as componentMenu[];
            (this.componentList as IDesignerComponent[]).forEach(c => {
                const groupItem = group.find(g => g.name === (c.listGroup || 'normal'));
                if (groupItem) {
                    groupItem.components.push(c);
                } else {
                    group.push({
                        name: c.listGroup || 'normal',
                        components: [c],
                    });
                }
            });
            return group;
        },
    },
    methods: {
        getGroupName(name: string) {
            if (name === 'business') {
                return '业务组件';
            } else if (name === 'high') {
                return '高级组件';
            } else {
                return '普通组件';
            }
        },
        dragStart(): void {
            const actionBox = document.getElementById('designer-main-action-box');
            if (actionBox) {
                actionBox.style.display = 'none';
            }
        },
        // 判断哪些组件可以拖动到设计面板
        dragMove(e: any): boolean {
            const toDesignerPanel = e.to && e.to.className === 'main-panel-container';
            const dragElement = (e.draggedContext && e.draggedContext.element) || {};
            // 如果向容器拖入非容器组件
            if (toDesignerPanel && dragElement.group !== EnumComponentGroup.layout) {
                delayError('请拖入容器组件');
                return false;
            }
            const element = e.draggedContext.element;
            this.$store.commit(`designer/${commit_designer_setDragComponent}`, {
                component: element,
            });
            return true;
        },
        // 向设计面板拖入组件时，生成新的id
        dragCloneData(originData: IDesignerComponent) {
            const newId = utils.$getUUID(originData.type);
            // eslint-disable-next-line
            const { propsConfigs, cssConfigs, getDefaultCss, getDefaultProps, ...newProps } = originData;
            const newComponent = {
                ...newProps,
                key: newId,
                name: newId,
                list: [],
            };
            // 如果添加的组件是form组件，追加formInfo属性
            if (originData.group === EnumComponentGroup.form) {
                newComponent.formInfo = {
                    formFieldName: newId,
                    rules: [],
                };
            }
            // 设置默认属性
            if (getDefaultProps && JSON.stringify(getDefaultProps()) !== '{}') {
                newComponent.props = getDefaultProps();
            }
            // 设置默认样式
            if (getDefaultCss && JSON.stringify(getDefaultCss()) !== '{}') {
                newComponent.css = getDefaultCss();
            }
            return newComponent;
        },
        // 双击向选中组件中添加组件
        doubleClickComponent(originData: IDesignerComponent) {
            const parent = this.selectedComponent ? this.selectedComponent : this.selectedPage;
            const newComponent = this.dragCloneData(originData);
            this.$store.commit(`designer/${commit_designer_doubleAddComponent}`, {
                parent,
                component: newComponent,
            });
        },
        dragableSlots_item(record: any) {
            const c = record.element;
            return (
                <li
                    class="li-component"
                    data-compType={c.type}
                    key={c.type}
                    data-compGroup={c.group}
                    title={c.label}
                >
                    <div class="comp-icon">
                        <i class={`iconfont ${c.icon}`} />
                    </div>
                    <div class="comp-name">
                        {c.label}
                        <a-button
                            class={'btn-add'}
                            type="primary"
                            shape="circle"
                            v-slots={{
                                icon: () => <plus-circle-outlined />,
                            }}
                            size="small"
                            onClick={() => this.doubleClickComponent(c)}
                        ></a-button>
                    </div>
                </li>
            );
        },
    },
    render() {
        return (
            <ul class="fd-ul-component">
                <h3>组件</h3>
                <a-collapse activeKey={this.componentGroup.map(g => g.name)}>
                    {this.componentGroup.map(group => (
                        <a-collapse-panel key={group.name} header={this.getGroupName(group.name)}>
                            <draggable
                                class="components"
                                list={group.components}
                                itemKey="name"
                                handle=".li-component"
                                group={{
                                    name: 'componentDesigner',
                                    pull: 'clone',
                                }}
                                sort={false}
                                onStart={this.dragStart}
                                move={this.dragMove}
                                clone={this.dragCloneData}
                                v-slots={{
                                    item: this.dragableSlots_item,
                                }}
                            ></draggable>
                        </a-collapse-panel>
                    ))}
                </a-collapse>
            </ul>
        );
    },
});

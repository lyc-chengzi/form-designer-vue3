import { VNode, defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import {
    OrderedListOutlined,
    EditOutlined,
    DeleteOutlined,
    FormOutlined,
} from '@ant-design/icons-vue';
import classnames from 'classnames';
import DesignerComponentList from './componentList';
import './index.less';

import { IMenus } from 'form-designer-types/interface/designer/leftPanel';
import { IPageModuleState } from 'form-designer-types/interface/designer';
import { commit_leftMenu_selectMenu } from 'form-designer-vuex/src/store/modules/leftMenu.module';
import { IDesignerComponent } from 'form-designer-types/interface/designer';
import {
    commit_designer_delete_page,
    commit_designer_setSelectPage,
} from 'form-designer-vuex/src/store/modules/designer.module';
import { EnumComponentType } from 'form-designer-types/enum/components';

import NewPageModal from './newPageModal.vue';

export default defineComponent({
    name: 'designer-left-panel',
    components: {
        NewPageModal,
        DesignerComponentList,
        OrderedListOutlined,
        EditOutlined,
        DeleteOutlined,
        FormOutlined,
    },
    inject: ['selectComponent'],
    computed: {
        ...mapGetters(['appInfo']),
        ...mapGetters('designer', {
            selectedComponent: 'selectedComponent',
            pages: 'pages',
            selectedPage: 'selectedPage',
        }),
        ...mapGetters('leftMenu', {
            menus: 'menus',
        }),
        __treeData(): any[] {
            if (this.selectedPage) {
                return [this.selectedPage];
            } else {
                return [];
            }
        },
    },
    data() {
        return {
            showAddPageShadow: false,
        };
    },
    methods: {
        renderMenus(): VNode[] {
            const MENUS = this.menus as IMenus[];
            const menu_pageList = MENUS[0]; // 表单列表菜单项
            const pageListChildren = menu_pageList.list || []; // 表单列表菜单的所有子菜单
            const firstMenu = (
                <div class="first-menu">
                    <ul>
                        {MENUS.map(c => {
                            return (
                                <li
                                    class={classnames({ selected: c.selected })}
                                    key={c.key}
                                    onClick={() => this.selectFirstMenu(c)}
                                    title={c.title}
                                >
                                    <i class={`iconfont ${c.icon}`} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            );
            const secondMenu = (
                <div class="second-menu">
                    {/* 页面列表 */}
                    <div
                        style={{
                            display: menu_pageList.selected === true ? 'block' : 'none',
                        }}
                        class="pages"
                    >
                        <h3>
                            {pageListChildren.find(c => c.selected === true)?.title}
                            <div class="pages-action">
                                <i class="iconfont icontianjia" onClick={this.addPage} />
                                <i
                                    class={classnames('iconfont', 'icon_40tree', {
                                        selected: pageListChildren[1].selected,
                                    })}
                                    onClick={() => {
                                        pageListChildren[0].selected =
                                            !pageListChildren[0].selected;
                                        pageListChildren[1].selected =
                                            !pageListChildren[1].selected;
                                    }}
                                />
                            </div>
                        </h3>
                        <ul
                            class="pages-list"
                            style={{
                                display: MENUS[0].list![0].selected === true ? 'block' : 'none',
                            }}
                        >
                            {(this.pages as IPageModuleState[]).map(c => {
                                const form = c.list![0];
                                const formId =
                                    form && form.type === EnumComponentType.form
                                        ? form.props?.formId
                                        : '';
                                return (
                                    <li
                                        class={classnames({
                                            'li-page': true,
                                            selected: c.selected,
                                        })}
                                        data-compType={c.type}
                                        key={c.key}
                                        onClick={() => this.selectPage(c.key)}
                                    >
                                        {c.label}
                                        <span class="page-action">
                                            <router-link to={`/?appId=${this.appInfo.appId}`}>
                                                <ordered-list-outlined />
                                            </router-link>
                                            <router-link to={`/table?formId=${formId}`}>
                                                <form-outlined />
                                            </router-link>
                                            <edit-outlined />
                                            <delete-outlined
                                                type="delete"
                                                onClick={(e: any) => this.deletePage(e, c.key)}
                                            />
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <ul
                            class="tree-component"
                            style={{
                                display: MENUS[0].list![1].selected === true ? 'block' : 'none',
                            }}
                        >
                            <a-tree
                                class="draggable-tree"
                                defaultExpandAll={true}
                                showIcon
                                fieldNames={{
                                    key: 'key',
                                    title: 'label',
                                    children: 'list',
                                }}
                                // onDragenter={this.onTreeDragEnter}
                                // onDrop={this.onTreeDrop}
                                onSelect={this.onTreeSelect}
                                treeData={this.__treeData}
                                v-slots={{
                                    title: this.treeSlots_title,
                                    icon: this.treeSlots_icon,
                                }}
                            ></a-tree>
                        </ul>
                    </div>
                    <designer-component-list
                        style={{
                            display: MENUS[1].selected === true ? 'block' : 'none',
                        }}
                    />
                </div>
            );
            return [firstMenu, secondMenu];
        },
        treeSlots_title(node: IDesignerComponent) {
            const title = (node.props && (node.props as any)!['label']) || node.label;
            return <span title={node.key}>{title}</span>;
        },
        treeSlots_icon(node: IDesignerComponent) {
            console.log('icon-----------', node);
            const icon = (node.props && (node.props as any)!['icon']) || '';
            return <i class={`iconfont ${icon}`} />;
        },
        loopTreeData(nodes?: IDesignerComponent[]): VNode[] | null {
            if (nodes && nodes.length && nodes[0]) {
                return nodes.map(node => {
                    return (
                        <a-tree-node
                            key={node.key}
                            v-slots={{
                                title: () => (
                                    <span title={node.key}>
                                        {(node.props && (node.props as any)!['label']) ||
                                            node.label}
                                    </span>
                                ),
                                icon: () => <i class={`iconfont ${node.icon}`} />,
                            }}
                        >
                            {this.loopTreeData(node.list as any[])}
                        </a-tree-node>
                    );
                });
            } else {
                return null;
            }
        },
        selectFirstMenu(menu: IMenus): void {
            this.$store.commit(`leftMenu/${commit_leftMenu_selectMenu}`, { menu });
        },
        selectPage(pageId: string): void {
            this.$store.commit(`designer/${commit_designer_setSelectPage}`, {
                pageId,
            });
        },
        addPage(): void {
            this.showAddPageShadow = true;
        },
        onTreeDragEnter() {
            console.log('onTreeDragEnter');
        },
        onTreeDrop() {
            console.log('onTreeDragEnter');
        },
        onTreeSelect(selectedKeys: string[]) {
            // @ts-ignore
            if (this.selectComponent) {
                // @ts-ignore
                this.selectComponent(selectedKeys[0]);
            }
        },
        deletePage(e: any, pageKey: string) {
            e.stopPropagation();
            this.$store.commit(`designer/${commit_designer_delete_page}`, { pageKey });
        },
    },
    render(): VNode {
        return (
            <div class="designer-left-panel">
                {this.renderMenus()}
                <new-page-modal v-model:visible={this.showAddPageShadow} />
            </div>
        );
    },
});

<template>
    <div class="table-list">
        <div class="table-actions">
            <!-- <div class="nav">所有</div> -->
            <div class="toolbar">
                <div class="t-left">
                    <a-button type="primary" @click="addTableData">新增</a-button>
                    <a-button>导入</a-button>
                    <a-button>导出</a-button>
                    <a-button type="primary" html-type="submit">保存</a-button>
                </div>
                <div class="t-right">
                    <a-button @click="getTableData()">
                        <i class="fd-font icon-shuaxin" />
                        刷新
                    </a-button>
                    <a-popover trigger="click">
                        <template slot#content>
                            <div class="table-order-pop-content">
                                <div class="p-title">排序</div>
                                <div class="p-header">请选择排序字段，设置排序方式</div>
                                <VueDragable
                                    class="dragable-order"
                                    v-model="origin_orders"
                                    chosen-class="chosen"
                                    force-fallback="true"
                                    group="people"
                                    animation="300"
                                    handle=".f3"
                                >
                                    <div
                                        class="order-item"
                                        v-for="item in origin_orders"
                                        :key="item.key"
                                    >
                                        <div class="f1">{{ item.label }}</div>
                                        <div class="f2">
                                            <a-radio-group
                                                :options="[
                                                    { label: '升序', value: 'ASC' },
                                                    { label: '降序', value: 'DESC' },
                                                ]"
                                                v-model="item.order"
                                            />
                                        </div>
                                        <div class="f3">拖动排序</div>
                                    </div>
                                </VueDragable>
                                <div class="p-addButton">
                                    <a-button type="link">
                                        <plus-circle-outlined />
                                        增加排序字段
                                    </a-button>
                                </div>
                                <div class="p-buttons">
                                    <a-button>清空</a-button>
                                    <a-button type="primary">确认</a-button>
                                </div>
                            </div>
                        </template>
                        <a-button>
                            <i class="fd-font icon-a-paixu_huaban1" />
                            排序
                        </a-button>
                    </a-popover>
                    <a-popover trigger="click">
                        <template slot#content>
                            <div class="table-column-pop-content">
                                <div class="p-title">显示字段</div>
                                <div class="p-header">请选择排序字段，设置排序方式</div>
                                <VueDragable
                                    class="dragable-column"
                                    v-model="origin_orders"
                                    chosen-class="chosen"
                                    force-fallback="true"
                                    group="people"
                                    animation="300"
                                    handle=".f3"
                                >
                                    <div
                                        class="column-item"
                                        v-for="item in origin_columns"
                                        :key="item.key"
                                    >
                                        <div class="f1">
                                            <a-checkbox
                                                :checked="item.display"
                                                @change="showColumnsChange($event, item)"
                                            >
                                                {{ item.label }}
                                            </a-checkbox>
                                        </div>
                                        <div class="f2">
                                            <a-input
                                                v-model="item.colWidth"
                                                placeholder="设置列宽"
                                                size="small"
                                            />
                                        </div>
                                        <div class="f3">拖动排序</div>
                                    </div>
                                </VueDragable>
                            </div>
                        </template>
                        <a-button>
                            <i class="fd-font icon-xianshiziduan" />
                            列显示
                        </a-button>
                    </a-popover>
                    <a-button @click="showFilterForm = !showFilterForm">
                        <i class="fd-font icon-zuixin" />
                        筛选
                    </a-button>
                </div>
            </div>
            <div class="filter" v-show="showFilterForm">
                <a-form-model
                    class="filter-form"
                    ref="dynamicFilterForm"
                    :model="dynamicFilterForm"
                    layout="vertical"
                >
                    <a-row :gutter="10">
                        <a-col
                            v-for="(domain, index) in dynamicFilterForm.domains"
                            :key="domain.key"
                            :xs="24"
                            :sm="8"
                            :md="6"
                        >
                            <a-form-model-item
                                class="filter-form-item"
                                :label="domain.label"
                                :prop="`domains.${index}.value`"
                            >
                                <template v-if="domain.type !== 'fd-date-picker'">
                                    <a-select class="item-condition" v-model="domain.condition">
                                        <a-select-option value="equal">等于</a-select-option>
                                        <a-select-option value="like">包含</a-select-option>
                                    </a-select>
                                    <a-input
                                        class="item-input"
                                        v-model="domain.value"
                                        placeholder="请输入筛选条件"
                                    />
                                </template>
                                <template v-else-if="domain.type === 'fd-date-picker'">
                                    <a-select
                                        class="item-condition"
                                        v-model="domain.condition"
                                        @change="domain.value = null"
                                    >
                                        <a-select-option value="equal">等于</a-select-option>
                                        <a-select-option value=">">大于</a-select-option>
                                        <a-select-option value="<">小于</a-select-option>
                                        <a-select-option value="range">范围</a-select-option>
                                    </a-select>
                                    <a-range-picker
                                        v-if="domain.condition === 'range'"
                                        class="item-input"
                                        v-model="domain.value"
                                        :placeholder="['开始日期', '结束日期']"
                                    />
                                    <a-date-picker
                                        v-else
                                        class="item-input"
                                        v-model="domain.value"
                                        placeholder=""
                                    />
                                </template>
                            </a-form-model-item>
                        </a-col>
                    </a-row>
                    <a-form-model-item class="filter-form-buttons">
                        <a-button
                            type="primary"
                            html-type="submit"
                            @click="submitForm('dynamicFilterForm')"
                        >
                            搜索
                        </a-button>
                        <a-button @click="resetFormFilter('dynamicFilterForm')"> 重置 </a-button>
                        <a-button type="primary" html-type="submit"> 设置 </a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
        <div class="table-content">
            <a-spin :spinning="tableLoading" :delay="300">
                <vxe-grid ref="xTable" v-bind="gridOptions">
                    <template #dateShow="{ row, column }">
                        <span>{{ formatDate(row[column.property]) }}</span>
                    </template>
                    <template #operate="{ row }">
                        <a-button type="link" @click="editRow(row)">编辑</a-button>
                        <a-button type="link" @click="deleteRow(row)">删除</a-button>
                    </template>
                </vxe-grid>
                <vxe-pager
                    background
                    size="small"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="gridOptions.total"
                    :page-sizes="[10, 20, 100]"
                    :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
                    @page-change="handlePageChange"
                >
                </vxe-pager>
            </a-spin>
        </div>
        <a-modal v-model="showFormView" width="80%" :footer="null" forceRender>
            <FormView ref="formView" :json="selectedPage" :appMode="viewMode" />
        </a-modal>
    </div>
</template>

<style lang="less">
@import url(../../styles/var/index.less);
.table-order-pop-content {
    width: 450px;
    color: #333333;
    .p-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .p-header {
        font-size: 14px;
        margin-bottom: 10px;
    }
    .p-addButton {
        .anticon-plus-circle {
            font-size: 16px;
        }
    }
    .p-buttons {
        text-align: right;
        button + button {
            margin-left: 10px;
        }
    }
    .dragable-order {
        .order-item {
            padding: 6px;
            background-color: #fdfdfd;
            border: solid 1px #eee;
            margin-bottom: 10px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            .f1 {
                flex: 1;
            }
            .f2 {
                flex: 0 0 auto;
                width: 150px;
            }
            .f3 {
                flex: 0 0 auto;
                width: 80px;
                cursor: move;
            }
        }

        .order-item:hover {
            background-color: #f1f1f1;
        }

        .chosen {
            border: solid 2px #3089dc !important;
        }
    }
}
.table-column-pop-content {
    width: 350px;
    color: #333333;
    .p-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
    }
    .p-header {
        font-size: 14px;
        margin-bottom: 10px;
    }
    .dragable-column {
        .column-item {
            padding: 6px;
            background-color: #fdfdfd;
            border: solid 1px #eee;
            margin-bottom: 10px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            .f1 {
                flex: 1;
            }
            .f2 {
                flex: 0 0 auto;
                width: 150px;
                margin: 0 10px;
            }
            .f3 {
                flex: 0 0 auto;
                width: 80px;
                cursor: move;
            }
        }

        .column-item:hover {
            background-color: #f1f1f1;
        }

        .chosen {
            border: solid 2px #3089dc !important;
        }
    }
}
.table-list {
    position: relative;
    padding: 20px;
    .table-actions {
        position: relative;
        .nav {
            color: @primary-color;
        }
        .toolbar {
            height: 44px;
            line-height: 44px;
            background-color: #eceff2;
            padding: 0 10px;
            .t-left {
                float: left;
                text-align: left;
                button + button {
                    margin-left: 5px;
                }
            }
            .t-right {
                float: right;
                .ant-btn {
                    margin-left: 5px;
                    .fd-font {
                        line-height: 1;
                        font-weight: 400;
                        font-size: 14px;
                        margin-right: 2px;
                    }
                }
            }
        }
        .filter {
            background: #ffffff;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
            margin-top: 10px;
            .ant-row.ant-form-item {
                margin: 2px;
            }
            .filter-form {
                padding: 10px;
            }
            .filter-form-item {
                .ant-form-item-children {
                    display: flex;
                    flex-flow: row nowrap;
                    justify-content: flex-start;
                    align-items: center;
                    .item-condition {
                        flex: 0 0 auto;
                        width: 30%;
                    }
                    .item-input {
                        flex: 0 0 auto;
                        width: 70%;
                    }
                }
            }
            .filter-form-buttons {
                button + button {
                    margin-left: 10px;
                }
            }
        }
    }
    .table-content {
        position: relative;
        margin-top: 10px;
    }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import VueDragable from 'vuedraggable';
import { message } from 'ant-design-vue';
import FormView from 'form-designer-components/src/page.vue';
import { forms } from 'form-designer-utils/service';
import { utils } from 'form-designer-utils';
import dayjs from 'dayjs';

import { IPageForm } from 'form-designer-types/interface/designer/pageForm';
import { EnumAppMode } from 'form-designer-types/enum';
import { EnumServiceResultStatus } from 'form-designer-types/enum/request';
import { commit_app_setAppInfo } from 'form-designer-vuex/src/store/index';
import { EnumComponentType } from 'form-designer-types/enum/components';

interface IColumnList {
    label: string;
    key: string;
    type: EnumComponentType;
    display: boolean;
    colWidth: number;
}

interface IOrderList {
    key: string;
    label: string;
    order: 'ASC' | 'DESC';
}

interface IFilterList {
    key: string;
    type: EnumComponentType;
    display: boolean;
    condition: 'EQUAL' | 'LIKE';
}

export default defineComponent({
    name: 'table-list-page',
    components: {
        FormView: FormView as any,
        VueDragable,
    },
    provide() {
        return {
            formSubmited: this.formSubmited,
        };
    },
    computed: {
        ...mapGetters('designer', {
            selectedPage: 'selectedPage',
        }),
        _tableData(): any[] {
            return this.gridOptions.data.slice(
                (this.currentPage - 1) * this.pageSize,
                this.currentPage * this.pageSize
            );
        },
    },
    mounted() {
        this.getFormDetial();
        this.getTableData();
    },
    data() {
        return {
            formId: utils.$getQueryString('formId'),
            checkedFormContentId: '',
            viewMode: EnumAppMode.view,
            tableLoading: false,
            // 是否显示表单填写弹窗
            showFormView: false,
            // 是否显示筛选form
            showFilterForm: false,
            // 是否显示排序设置弹窗
            showOrdersModal: false,
            // 是否显示
            showColumnsModal: false,
            // 筛选条件form对象
            dynamicFilterForm: {
                domains: [{ key: 'name', value: '', label: '姓名', condition: 'equal' }] as any[],
            },
            // 所有列集合
            origin_columns: [] as IColumnList[],
            // 排序条件集合
            origin_orders: [] as IOrderList[],
            // 筛选条件集合
            origin_filters: [] as IFilterList[],

            gridOptions: {
                size: 'mini',
                round: true,
                border: true,
                resizable: true,
                height: 500,
                align: 'left',
                'header-align': 'center',
                'row-config': { isCurrent: true, isHover: true },
                columns: [
                    { type: 'checkbox', width: 50 },
                    { type: 'seq', width: 50 },
                ] as any[],
                data: [] as any[],
                total: 0,
            } as any,
            currentPage: 1,
            pageSize: 20,
        };
    },
    methods: {
        formatDate(dateStr: string) {
            return dayjs(dateStr).format('YYYY-MM-DD');
        },
        formSubmited(success: boolean, msg: string): void {
            if (success) {
                this.showFormView = false;
                if (this.viewMode === EnumAppMode.add) {
                    message.success('新增成功');
                } else if (this.viewMode === EnumAppMode.edit) {
                    message.success('修改成功');
                }
                this.getTableData();
            } else {
                message.warning(`操作失败 ${msg}`);
            }
        },
        //获取当前表单的原始信息
        async getFormDetial() {
            const res = await forms.formService.getFormDetail(this.formId);
            if (res.status === EnumServiceResultStatus.success) {
                this.dataFormat(res.data.formInfo as any);
                this.$store.commit(commit_app_setAppInfo, {
                    appId: res.data.appId,
                    projectId: res.data.projectId,
                });
            } else {
                this.$message.warning('表单未生成');
            }
        },
        addTableData() {
            this.showFormView = true;
            this.viewMode = EnumAppMode.add;
            this.resetFormView();
        },
        // 重置表单填写数据
        resetFormView() {
            const $formView = this.$refs['formView'] as any;
            if ($formView) {
                $formView.resetFormFields();
            }
        },
        // 格式化form数据结构
        dataFormat(pageForm: IPageForm) {
            if (pageForm) {
                this.dynamicFilterForm.domains = [];
                this.gridOptions.columns = [
                    { type: 'checkbox', width: 60, align: 'center', fixed: 'left' },
                    { type: 'seq', width: 60, title: '序号', align: 'center', fixed: 'left' },
                ];
                for (let i = 0; i < pageForm.column.length; i++) {
                    const field = pageForm.column[i];
                    // 添加过滤条件
                    this.dynamicFilterForm.domains.push({
                        key: field.key,
                        label: field.label,
                        value: '',
                        type: field.type,
                        condition: 'equal',
                    });

                    // 添加columns配置
                    this.gridOptions.columns.push({
                        width: 200,
                        title: field.label,
                        field: field.key,
                        showOverflow: false,
                        slots:
                            field.type === EnumComponentType.datePicker
                                ? { default: 'dateShow' }
                                : undefined,
                    });

                    this.origin_columns.push({
                        label: field.label,
                        type: field.type,
                        key: field.key,
                        display: true,
                        colWidth: 200,
                    });

                    this.origin_orders.push({
                        key: field.key,
                        label: field.label,
                        order: 'ASC',
                    });
                }
                this.gridOptions.columns.push({
                    title: '操作',
                    width: 150,
                    slots: { default: 'operate' },
                    fixed: 'right',
                });
            }
        },
        submitForm(formName: string) {
            const $form: any = this.$refs[formName];
            $form.validate((valid: boolean) => {
                if (valid) {
                    this.getTableData();
                } else {
                    return false;
                }
            });
        },
        // 重置搜索条件
        resetFormFilter(formName: string) {
            const $form: any = this.$refs[formName];
            $form.resetFields();
        },
        handlePageChange(page: { currentPage: number; pageSize: number }) {
            this.currentPage = page.currentPage;
            this.pageSize = page.pageSize;
        },
        async getTableData() {
            // const ff = funcFactory.init();
            // const appInfo = ff.getAppInfo();
            this.tableLoading = true;
            const res = await forms.formDataService.queryFormData({
                page: this.currentPage,
                size: this.pageSize,
                formId: utils.$getQueryString('formId'),
            });
            this.tableLoading = false;
            if (res.status === EnumServiceResultStatus.success) {
                this.gridOptions.data = res.data.rows;
                this.gridOptions.total = res.data.total;
            } else {
                this.$message.warning('查询失败');
            }
        },
        /**
         *编辑行数据
         *row: 行数据
         */
        editRow(row: any) {
            this.checkedFormContentId = row.id;
            localStorage.setItem('fd_formContentId', this.checkedFormContentId);
            this.showFormView = true;
            this.viewMode = EnumAppMode.edit;
            const $formView = this.$refs['formView'] as any;
            if ($formView) {
                $formView.initFormFields(row);
            }
        },
        // 删除表单内容
        async deleteRow(row: any) {
            const res = await forms.formDataService.deleteFormData(row.id);
            if (res.status === EnumServiceResultStatus.success) {
                message.success('删除成功');
                this.getTableData();
            } else {
                message.warning(`删除失败 ${res.message}`);
            }
        },
        // 显示字段弹框选中事件
        showColumnsChange(e: any, item: IColumnList) {
            if (e && e.target) {
                item.display = e.target.checked;
            }
        },
    },
});
</script>

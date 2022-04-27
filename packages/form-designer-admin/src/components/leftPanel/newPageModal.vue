<template>
    <a-modal :visible="visible" title="新建页面" :width="800" :footer="null" @cancel="clickCancel">
        <div class="new-page-modal">
            <template v-if="step === -1">
                <div class="form-item">
                    <div class="label">页面名称:</div>
                    <div class="value">
                        <a-input v-model:value="pageName"></a-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="label">页面编码:</div>
                    <div class="value">
                        <a-input v-model:value="pageCode"></a-input>
                    </div>
                </div>
                <div class="form-item">
                    <div class="label">页面类型:</div>
                    <div class="value">
                        <div
                            class="type-item"
                            v-for="item in pageTypeList"
                            :key="item.key"
                            :class="{ selected: item.selected }"
                            @click.stop="clickPageType(item.key)"
                        >
                            <div class="item-icon"></div>
                            <div class="item-info">
                                <div class="item-title">{{ item.title }}</div>
                                <div class="item-des">{{ item.des }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else-if="step > -1">
                <ImportCSV v-model="step" ref="$csvRef" />
            </template>
            <div class="buttons">
                <a-button v-if="step > -1" @click="clickPre">上一步</a-button>
                <a-button @click="clickCancel">取消</a-button>
                <a-button v-if="step !== 0" type="primary" @click="clickOk">
                    {{ okButtonText }}
                </a-button>
            </div>
        </div>
    </a-modal>
</template>
<style lang="less">
.new-page-modal {
    position: relative;
    .form-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        line-height: 44px;
        transition: all 0.3s;
        .label {
            width: 80px;
            flex: 0 0 auto;
        }
        .value {
            flex: 1;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
        }
        .type-item {
            width: 49%;
            display: flex;
            flex-flow: row wrap;
            justify-content: flex-start;
            align-items: center;
            border-radius: 4px;
            cursor: pointer;
            border: 1px solid #e1e1e1;
            &.selected {
                border-color: #1890ff;
            }
            .item-icon {
                width: 80px;
                height: 50px;
                flex: 0 0 auto;
                margin: 10px;
                background-color: salmon;
            }
            .item-info {
                flex: 1;
                line-height: 22px;
            }
        }
    }
    .buttons {
        margin-top: 20px;
        text-align: right;
        button + button {
            margin-left: 10px;
        }
    }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import {
    commit_designer_add_page,
    dispatch_designer_importCsvData,
} from 'form-designer-vuex/src/store/modules/designer.module';
import ImportCSV from './importCSV.vue';
import { IPageModuleState } from 'form-designer-types/interface/designer';

enum EnumPageType {
    emptyForm = 'emptyForm',
    csvOrExcel = 'csvOrExcel',
}

export default defineComponent({
    name: 'new-page-modal',
    components: {
        ImportCSV,
    },
    props: {
        visible: {
            required: true,
            type: Boolean,
            defualt: () => false,
        },
    },
    emits: {
        ['update:visible'](newVisible: boolean): boolean {
            console.log('update:visible ------------->', newVisible);
            return newVisible;
        },
    },
    computed: {
        ...mapGetters('designer', {
            componentList: 'componentList', // IDesignerComponent[]
        }),
        okButtonText() {
            if (this.pageType === EnumPageType.emptyForm) {
                return '确定';
            } else if (this.step >= 2) {
                return '确定';
            } else {
                return '下一步';
            }
        },
    },
    data() {
        return {
            step: -1,
            pageName: '',
            pageCode: '',
            pageType: EnumPageType.emptyForm,
            pageTypeList: [
                {
                    key: EnumPageType.emptyForm,
                    title: '新建表单',
                    des: '基于空白页面创建表单',
                    selected: true,
                },
                {
                    key: EnumPageType.csvOrExcel,
                    title: '从CSV/Excel导入',
                    des: '导入现有数据创建表单',
                    selected: false,
                },
            ],
        };
    },
    methods: {
        clickPageType(type: EnumPageType) {
            this.pageType = type;
            this.pageTypeList.forEach(t => {
                t.selected = t.key === type;
            });
        },
        clickPre() {
            if (this.step > -1) this.step--;
        },
        clickOk() {
            // 创建空form
            if (this.pageType === EnumPageType.emptyForm) {
                this.$store.commit(`designer/${commit_designer_add_page}`, {
                    page: {
                        label: this.pageName,
                        code: this.pageCode,
                    } as IPageModuleState,
                });
                this.$emit('update:visible', false);
                this.resetForm();
            }
            // 从csv导入
            else {
                if (this.step < 2) {
                    this.step++;
                } else {
                    if (this.$refs.$csvRef) {
                        const form = (this.$refs.$csvRef as any).getFormDesign();
                        this.$store.dispatch(`designer/${dispatch_designer_importCsvData}`, {
                            pageName: this.pageName,
                            pageCode: this.pageCode,
                            data: form,
                        });
                    }
                    this.$emit('update:visible', false);
                    this.resetForm();
                }
            }
        },
        resetForm() {
            this.pageName = '';
            this.pageCode = '';
            this.pageType = EnumPageType.emptyForm;
            this.step = -1;
        },
        clickCancel() {
            this.step = -1;
            this.$emit('update:visible', false);
        },
    },
});
</script>

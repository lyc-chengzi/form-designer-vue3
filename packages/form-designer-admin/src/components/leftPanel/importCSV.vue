<template>
    <div class="import-csv">
        <div class="steps-bar">
            <h3>从Excel中导入</h3>
            <a-steps :current="step" labelPlacement="vertical">
                <a-step title="选择文件" />
                <a-step title="配置表单类型" />
                <a-step title="新建表格" />
            </a-steps>
        </div>
        <div class="steps-content">
            <div class="step-one" v-if="step === 0">
                <ul>
                    <li>支持2MB以内的csv、xls、xlsx格式文件</li>
                    <li>文件中数据不能超过50,000行、200列</li>
                    <li>更多导入说明和示例，请查看帮助文档</li>
                </ul>
                <div class="upload-area">
                    <a-upload-dragger
                        name="file"
                        action="/import/csv"
                        accept=".csv"
                        :showUploadList="false"
                        @change="importCsv"
                    >
                        <p class="ant-upload-drag-icon">
                            <inbox-outlined />
                        </p>
                        <p class="ant-upload-text">将文件拖到此处或点击上传</p>
                    </a-upload-dragger>
                </div>
            </div>
            <div class="step-two" v-else-if="step === 1">
                <a-table :columns="tableColumns" :data-source="tableData" bordered>
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 0">
                            <a-select style="margin: -5px 0; width: 100%">
                                <!-- <a-select-option
                                    v-for="type in typesList"
                                    :key="type.key"
                                    :value="type.key"
                                >
                                    {{ type.label }}
                                </a-select-option> -->
                            </a-select>
                        </template>
                        <template v-else>
                            {{ record.text }}
                        </template>
                    </template>
                </a-table>
            </div>
            <div class="step-three" v-else-if="step === 2">
                <a-result status="success" title="导入完成!"></a-result>
            </div>
        </div>
    </div>
</template>
<style lang="less" scoped>
.import-csv {
    position: relative;
    .steps-bar {
        margin: 0 auto 20px auto;
        h3 {
            text-align: center;
            margin-bottom: 20px;
        }
    }
    .steps-content {
        margin: 20px auto;
        overflow: auto;
        .step-one {
            ul {
                margin-bottom: 20px;
                padding: 0 20px;
            }
        }
    }
}
</style>
<script lang="ts">
import { defineComponent } from 'vue';
import { EnumComponentType } from 'form-designer-types/enum/components';
export default defineComponent({
    name: 'import-csv',
    props: {
        step: {
            required: true,
            type: Number,
        },
    },
    data() {
        return {
            fileData: [] as any[][],
            tableData: [] as any[],
            typesList: [
                { key: EnumComponentType.textField, label: '文本框' },
                { key: EnumComponentType.textarea, label: '多行文本' },
                { key: EnumComponentType.number, label: '数字' },
                { key: EnumComponentType.integer, label: '整数' },
                { key: EnumComponentType.select, label: '下拉框' },
            ],
        };
    },
    emits: {
        ['update:step'](newStep: number) {
            return newStep;
        },
    },
    computed: {
        tableColumns(): any[] {
            if (this.fileData.length) {
                return this.fileData[0].map((title: string) => {
                    return {
                        title,
                        dataIndex: title,
                        scopedSlots: { customRender: title },
                    };
                });
            } else {
                return [];
            }
        },
    },
    methods: {
        // 获取用户导入的文件结构
        getFormDesign() {
            if (this.step === 2 && this.tableData.length > 0) {
                const item = this.tableData[0];
                const result: any = {};
                for (let k in item) {
                    if (k !== 'key') {
                        result[k] = item[k];
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        formatTableData() {
            if (this.fileData.length > 1) {
                const result: any[] = [];
                const typesData: any = { key: 'row0' };
                // 把类型选择放到第一行数据
                this.fileData[0].forEach(title => {
                    typesData[title] = EnumComponentType.textField;
                });
                result.push(typesData);

                //展示文件中的数据
                for (let i = 1; i < this.fileData.length; i++) {
                    const element = this.fileData[i];
                    let record: any = { key: `row${i}` };
                    element.forEach((e, index) => {
                        record[this.tableColumns[index].dataIndex] = e;
                    });
                    result.push(record);
                }
                this.tableData = result;
            } else {
                this.tableData = [];
            }
        },
        importCsv(info: any) {
            const file = info.file || {};
            const response = file.response || {};
            if (file.status === 'done' && file.response.success) {
                const fileData: any[] = response.data || [];
                if (fileData && fileData.length) {
                    this.fileData = fileData;
                    this.formatTableData();
                }
                // message.success(`${info.file.name} file uploaded successfully`);
                this.$emit('update:step', 1);
            }
        },
    },
});
</script>

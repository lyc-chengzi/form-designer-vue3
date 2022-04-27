import { defineComponent, PropType } from 'vue';
import './index.less';

import { EnumApiType } from 'form-designer-types/enum/components';
import { EnumServiceResultStatus } from 'form-designer-types/enum/request';

import { IComponentApi } from 'form-designer-types/interface/components';
import {
    IDataModlerApiDetail,
    IDataModlerApiResponse,
    IDataModlerApiRow,
} from 'form-designer-types/interface/request/api';

import { apiDomain, apis } from 'form-designer-utils/service';
import { request, apiFactory } from 'form-designer-utils';
import { EnumHttpMethod } from 'form-designer-types/enum';
import { IDesignerComponent } from 'form-designer-types/interface/designer';

export default defineComponent({
    name: 'designer-data-panel',
    props: {
        element: {
            type: Object as PropType<IDesignerComponent>,
            required: false,
        },
    },
    mounted() {
        this.getApiList();
    },
    computed: {
        dataSourceApi(): IComponentApi | null {
            const dataApi = apiFactory.getApiValueByType(this.element!, EnumApiType.data);
            if (dataApi.length) {
                return dataApi[0];
            } else {
                return null;
            }
        },
    },
    data() {
        return {
            showApiList: false, // 显示api列表
            apiList: [] as IDataModlerApiRow[], // api列表数据
            apiLoading: false, // api列表加载状态
            apiType: EnumApiType.data, // 数据api
            selectedApi: {} as IDataModlerApiDetail,
            apiTableColumns: [
                {
                    dataIndex: 'name',
                    title: '名称',
                    width: '30%',
                },
                {
                    dataIndex: 'path',
                    title: '路径',
                    width: '70%',
                },
            ],
            previewData: {
                data: [] as any,
                columns: [] as any,
                loading: false,
            },
        };
    },
    methods: {
        bindApi() {
            if (this.element && this.selectedApi) {
                apiFactory.pushApiValue(this.element!, {
                    method: this.selectedApi.method as EnumHttpMethod,
                    name: 'dataSource',
                    path: this.selectedApi.path,
                    type: this.apiType,
                });
                this.showApiList = false;
            }
        },
        // 数据预览
        async dataPreview() {
            if (this.selectedApi) {
                this.previewData.loading = true;
                const res = await request.$fetch<IDataModlerApiResponse>({
                    method: this.selectedApi.method as any,
                    url: `${apiDomain.domain}${this.selectedApi.path}`,
                });
                if (res.status === EnumServiceResultStatus.success) {
                    this.previewData.data = res.data.rows || [];
                    this.previewData.columns = (res.data.columns || []).map(c => {
                        return {
                            dataIndex: c.name,
                            title: c.name,
                        };
                    });
                } else {
                    this.previewData.data = [];
                    this.previewData.columns = [];
                }
                this.previewData.loading = false;
            }
        },
        async getApiDetail(id: number) {
            const res = await apis.apiService.getApiDetail(id);
            if (res.status === EnumServiceResultStatus.success) {
                this.selectedApi = res.data;
                this.dataPreview();
            } else {
                this.$message.warn('没有查询到api信息');
            }
        },
        async getApiList() {
            this.apiLoading = true;
            const res = await apis.apiService.getApiList();
            if (res.status === EnumServiceResultStatus.success) {
                this.apiLoading = false;
                this.apiList = res.data.rows || [];
            }
        },
    },
    render() {
        return (
            <div class="designer-data-panel">
                <div class="section">
                    <h3>绑定接口</h3>
                    <div class="item">
                        <div class="label">数据绑定</div>
                        <div class="value">
                            <a-input
                                placeholder="请选择要绑定的api"
                                readOnly
                                onClick={() => (this.showApiList = true)}
                                value={this.dataSourceApi && this.dataSourceApi.name}
                            />
                        </div>
                    </div>
                </div>
                <a-modal
                    v-model={this.showApiList}
                    title="绑定API"
                    width="1000px"
                    onOk={this.bindApi}
                >
                    <div class="data-designer-model-api-list">
                        <div class="api-table">
                            <a-table
                                scroll={{ y: 400 }}
                                columns={this.apiTableColumns}
                                rowKey="id"
                                data-source={this.apiList}
                                loading={this.apiLoading}
                                size="small"
                                customRow={(record: IDataModlerApiRow) => {
                                    return {
                                        on: {
                                            click: () => {
                                                this.getApiDetail(record.id);
                                            },
                                        },
                                    };
                                }}
                            ></a-table>
                        </div>
                        <div class="api-detail">
                            <div class="detail-item">
                                描述：{this.selectedApi && this.selectedApi.desc}
                            </div>
                            <div class="detail-item">
                                {this.selectedApi && this.selectedApi.method}&nbsp;{' '}
                                {this.selectedApi && this.selectedApi.path}
                            </div>
                            <div class="detail-item">
                                <a-button type="primary" onClick={this.dataPreview}>
                                    数据预览
                                </a-button>
                            </div>
                            <a-table
                                scroll={{ y: 200 }}
                                columns={this.previewData.columns}
                                rowKey="id"
                                data-source={this.previewData.data}
                                loading={this.previewData.loading}
                                size="small"
                            ></a-table>
                        </div>
                    </div>
                </a-modal>
            </div>
        );
    },
});

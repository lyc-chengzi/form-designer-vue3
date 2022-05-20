import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import './index.less';
import fileSaver from 'file-saver';

import { EnumAppMode } from 'form-designer-types/enum';

import { IPageModuleState } from 'form-designer-types/interface/designer';

import DesignerRight from '../../components/rightPanel';
import DesignerMain from '../../components/mainPanel';
import Preview from 'form-designer-components/src/page.vue';
import {
    commit_designer_import_config,
    commit_designer_init_designer_page,
} from 'form-designer-vuex/src/store/modules/designer.module';
import { commit_app_changeMode } from 'form-designer-vuex/src/store';
import { EnumServiceResultStatus } from 'form-designer-types/enum/request';
import { EnumComponentType } from 'form-designer-types/enum/components';
import { IComponentState } from 'form-designer-types/interface/components';
import { IFormField } from 'form-designer-types/interface/components/form';
import { propsFactory } from 'form-designer-utils';
import { IPageForm } from 'form-designer-types/interface/designer/pageForm';
import { IFormProps } from 'form-designer-components/src/components/form/interface';

import classNames from 'classnames';
import FdComponent from 'form-designer-components/src/component';
import { forms, apps } from 'form-designer-utils/service';
import {
    CloudUploadOutlined,
    LoadingOutlined,
    ImportOutlined,
    ExportOutlined,
    SaveOutlined,
} from '@ant-design/icons-vue';

export default defineComponent({
    name: 'designer-page',
    components: {
        DesignerRight,
        DesignerMain,
        Preview,
        CloudUploadOutlined,
        LoadingOutlined,
        ExportOutlined,
        ImportOutlined,
        SaveOutlined,
    },
    inject: ['displayAppLeft'],
    mounted() {
        this.$store.commit(commit_app_changeMode, { mode: EnumAppMode.design });
        this.$store.commit(`designer/${commit_designer_init_designer_page}`);
    },
    computed: {
        ...mapGetters({ appInfo: 'appInfo', appMode: 'mode' }),
        ...mapGetters('designer', {
            pages: 'pages',
            selectedPage: 'selectedPage',
        }),
    },
    data() {
        return {
            showPreviewModal: false, // 是否显示预览弹窗
            components: new Map() as Map<string, FdComponent>, // 当前页面所有组件的实例集合
            showRight: true,
            submitLoading: false,
        };
    },
    methods: {
        exportJson() {
            const jsonString = JSON.stringify(this.pages);
            const blob = new Blob([jsonString], { type: '' });
            fileSaver.saveAs(blob, 'form.json');
        },
        importJson(info: any) {
            const file = info.file || {};
            const response = file.response || {};
            if (file.status === 'done' && file.response.success) {
                const pages = response.data || [];
                this.$store.commit(`designer/${commit_designer_import_config}`, { pages: pages });
            }
        },
        // 根据页面json结构获取form结构
        getPageForm(page?: IPageModuleState) {
            const _formInfo: IPageForm = {
                key: '',
                formId: '',
                column: [],
            } as IPageForm;
            if (page && page.list && page.list[0].type === EnumComponentType.form) {
                const formState = page.list[0] as IComponentState<IFormProps>;
                const formKey = formState.key;
                const formId = propsFactory.getPropsValue(formState, 'formId');
                const formInstance: any = this.components.get(formKey)?.$$ref;
                _formInfo.key = formKey;
                _formInfo.formId = formId || '';
                ((formInstance.formFields || []) as IFormField[]).forEach(field => {
                    _formInfo.column.push({
                        key: field.key,
                        type: field.type,
                        dataType: '',
                        label:
                            (propsFactory.getPropsValue(field.state, 'label') as string) ||
                            field.key,
                        rules: field.rules,
                        dataSize: 100,
                        relationFormId: null,
                        relationColumnKey: null,
                    });
                });
            }
            return _formInfo;
        },
        // 保存表单
        async saveForm() {
            const page = this.selectedPage;
            if (page && page.list && page.list[0].type === EnumComponentType.form) {
                const res = await apps.appService.updateApp(
                    this.appInfo.appId,
                    this.appInfo.projectId,
                    {
                        appContent: JSON.stringify(this.pages),
                    }
                );
                if (res.status === EnumServiceResultStatus.success) {
                    // const formInfo = this.getPageForm(page);
                    // this.$store.commit(`designer/${commit_designer_setPageForm}`, {
                    //     pageForm: formInfo,
                    // });
                    page.submitState = 'saved';
                    this.$message.success('保存成功');
                }
            }
        },
        // 提交表单
        async submitForm() {
            const page = this.selectedPage;
            if (page && page.list && page.list[0].type === EnumComponentType.form) {
                this.submitLoading = true;
                const formState = page.list[0] as IComponentState<IFormProps>;
                const formId = propsFactory.getPropsValue(formState, 'formId');
                const formInfo = this.getPageForm(page);

                const $form = {
                    id: formId || '',
                    projectId: this.appInfo.projectId,
                    appId: this.appInfo.appId,
                    formDescription: '',
                    name: this.selectedPage.label,
                    content: this.selectedPage,
                    formInfo: { column: formInfo.column },
                };
                const res = await forms.formService.addOrUpdateForm($form);
                if (res.status === EnumServiceResultStatus.success) {
                    propsFactory.setPropsValue(formState, 'formId', res.data.formId);
                    page.submitState = 'submited';
                    this.$message.success({ content: '提交成功' });
                } else {
                    this.$message.warn({ content: res.message });
                }
                this.submitLoading = false;
            }
        },
    },
    render() {
        return (
            <div
                class={classNames('form-designer-index', {
                    preview: this.appMode === EnumAppMode.preview,
                })}
            >
                <div class="designer-index-toolbar">
                    <div class="toolbar-left">
                        <ExportOutlined title="导出" onClick={this.exportJson} />
                        <a-upload
                            name="file"
                            action="/import/config"
                            accept=".json"
                            showUploadList={false}
                            onChange={this.importJson}
                        >
                            <ImportOutlined title="导入" />
                        </a-upload>
                        <SaveOutlined onClick={this.saveForm} title="保存" />
                    </div>
                    <div class="toolbar-right">
                        <a-button
                            type="primary"
                            onClick={() => {
                                this.$store.commit(commit_app_changeMode, {
                                    mode: EnumAppMode.preview,
                                });
                                this.showPreviewModal = !this.showPreviewModal;
                            }}
                        >
                            <i class="iconfont Preview" />
                            预览
                        </a-button>
                        <a-switch
                            class="switch-designer"
                            checkedChildren="设计"
                            unCheckedChildren="预览"
                            checked={this.appMode === EnumAppMode.design}
                            onChange={(checked: boolean) => {
                                if (checked) {
                                    this.$store.commit(commit_app_changeMode, {
                                        mode: EnumAppMode.design,
                                    });
                                    this.showRight = true;
                                    // @ts-ignore
                                    this.displayAppLeft && this.displayAppLeft(true);
                                } else {
                                    this.$store.commit(commit_app_changeMode, {
                                        mode: EnumAppMode.preview,
                                    });
                                    this.showRight = false;
                                    // @ts-ignore
                                    this.displayAppLeft && this.displayAppLeft(false);
                                }
                            }}
                        />
                        <a-button type="primary" onClick={this.submitForm}>
                            {this.submitLoading ? <loading-outlined /> : <cloud-upload-outlined />}
                            生成列表
                        </a-button>
                    </div>
                </div>
                <div class="designer-index-main">
                    {/*// @ts-ignore */}
                    <DesignerMain class="designer-body" ref="designerMain" />
                    {/*// @ts-ignore */}
                    <DesignerRight
                        class={classNames({ 'designer-right': true, hide: !this.showRight })}
                        ref="designerRight"
                    />
                </div>
                <a-modal
                    dialogClass="preview-dialog"
                    v-model={this.showPreviewModal}
                    afterClose={() =>
                        this.$store.commit(commit_app_changeMode, {
                            mode: EnumAppMode.design,
                        })
                    }
                    footer={null}
                >
                    {/*// @ts-ignore */}
                    <Preview json={this.selectedPage} appMode={EnumAppMode.preview}></Preview>
                </a-modal>
            </div>
        );
    },
});

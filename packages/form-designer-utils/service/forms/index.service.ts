import API_Domain from '../apiDomain';
import { $fetch } from '../../request';
import { IFormDetail, IFormAdd, IFormUpdate } from 'form-designer-types/interface/service/form';
import { EnumServiceResultStatus } from 'form-designer-types/enum/request';

type addFormResult = {
    formId: string;
};

const service = {
    getFormDetail: async (formId: string) => {
        const res = await $fetch<IFormDetail>({
            method: 'GET',
            url: `${API_Domain.formService}/api/v1.0/forms/${formId}`,
        });
        // 做一些错误处理
        if (res.status !== EnumServiceResultStatus.success) {
            res.data = {} as IFormDetail;
        }
        return res;
    },
    addForm: async (form: IFormAdd) => {
        const res = await $fetch<addFormResult>({
            method: 'POST',
            url: `${API_Domain.formService}/api/v1.0/form`,
            data: form,
        });
        return res;
    },
    updateForm: async (form: IFormUpdate) => {
        const res = await $fetch<addFormResult>({
            method: 'PUT',
            url: `${API_Domain.formService}/api/v1.0/form`,
            data: form,
        });
        return res;
    },
    async addOrUpdateForm(form: IFormUpdate) {
        if (form.id) {
            return this.updateForm(form);
        } else {
            // @ts-ignore
            delete form.id;
            return this.addForm(form);
        }
    },
};

export default service;

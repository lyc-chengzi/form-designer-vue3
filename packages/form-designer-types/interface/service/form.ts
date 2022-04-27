export interface IFormAdd {
    projectId: string;
    appId: string;
    name: string;
    formDescription: string;
    content: Object;
    formInfo: Object;
}

export interface IFormUpdate {
    id: string;
    projectId: string;
    appId: string;
    name: string;
    formDescription: string;
    content: Object;
    formInfo: Object;
}

export interface IFormDetail extends IFormAdd {
    id: string;
    createBy: string;
    createAt: string;
}

export interface IFormDataAdd {
    projectId: string;
    appId: string;
    formId: string;
    content: Object;
}

export interface IFormDataUpdate {
    id: string;
    content: Object;
}

export interface IFormDataQuery {
    projectId?: string;
    appId?: string;
    formId?: string;
    page: number;
    size: number;
}

// api描述的详细信息
export interface IDataModlerApiDetail {
    apiOwner: string;
    apiResColId: number;
    apiStatus: string;
    apiUri: string;
    createTime: string;
    createUser: string;
    customFieldValue?: any;
    desc: string;
    gwCre?: any;
    gwCreValue?: string;
    gwRoute: string;
    id: number;
    index: 0;
    method: string;
    name: string;
    path: string;
    projectAlias: string;
    projectId: string;
    projectName: string;
    protocol: string;
    providerType: string;
    providerVersion: string;
    publishDate: string;
    publishUser: string;
    queryPath: { path: string; params: any[] };
    reqBodyForm: any[];
    reqBodyIsJsonSchema: boolean;
    reqBodyOther: string;
    reqBodyType: string;
    reqHeaders: { name: string; value: string }[];
    reqParams: any[];
    reqQuery: any[];
    resBody: string;
    resBodyIsJsonSchema: boolean;
    resBodyType: string;
    resHeaders: { name: string; value: string }[];
    retireTime?: string;
    retireUser?: string;
    serviceUrl?: string;
    tag: string[];
    type: string;
    updateTime: string;
    updateUser: string;
    version: string;
}

export interface IDataModlerApiRow {
    apiResColId: number;
    apiResColName: string;
    apiStatus: string;
    createTime: string;
    createUser: string;
    id: number;
    index: number;
    method: string;
    name: string;
    path: string;
    projectId: string;
    projectName?: string;
    protocol: string;
}

// data modler 查询api列表返回结构
export interface IDataModlerApiResponse<Row = IDataModlerApiRow> {
    page: {
        page: number;
        size: number;
        totalElements: number;
    };
    rows: Row[];
    columns: any[];
}

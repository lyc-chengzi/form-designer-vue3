export interface IAppDetail {
    appContent: string;
    appCreatedAt: string;
    appCreator: string;
    appCreatorName: string;
    appDescription: string;
    appIcon: string;
    appId: string;
    appName: string;
    appStatus: number;
    appUpdatedAt: string;
    appUpdater: string;
    appUpdaterName: string;
    appVersion: string;
    filePath: string;
    id: string;
    projectId: string;
}

export interface IAppUpdate {
    appContent: string;
    appName?: string;
    appDescription?: string;
    filePath?: string;
}

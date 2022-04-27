import { IDesignerComponent } from './designer';

export interface IPageModuleState extends IDesignerComponent {
    selected?: boolean;
    apiDatas?: any[];
    eventsDatas?: any[];
    nodes?: any[];
}

import { EnumComponentGroup, EnumComponentType } from 'form-designer-types/enum/components';
import { EnumCssProerty, EnumPropsSelector } from 'form-designer-types/enum/designer';
import { IDesignerComponent, registerComponentFunc } from 'form-designer-types/interface/designer';
import { ILayoutProps } from './interface';
import './layout.less';
import Layout from './layoutRenderer.vue';
export default Layout;

export const register: registerComponentFunc = function () {
    const layout: IDesignerComponent<ILayoutProps> = {
        key: '',
        code: '',
        label: '卡片',
        icon: 'Cards',
        group: EnumComponentGroup.layout,
        type: EnumComponentType.layout,
        order: 100,
        listGroup: 'normal',
        showInList: false,
        propsConfigs: [
            { key: 'showShadow', label: '显示阴影', selector: EnumPropsSelector.switch },
        ],
        cssConfigs: [EnumCssProerty.position, EnumCssProerty.width, EnumCssProerty.height],
    };
    return layout;
};

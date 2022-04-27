import Vue from 'vue';
import createDesignerStore from '../store';
import DesignerMainPanel from '../components/mainPanel';
import DesignerRightPanel from '../components/rightPanel';
import DesignerComponentList from '../components/leftPanel/componentList';
import {
    commit_designer_add_components,
    commit_designer_init_designer_page,
} from 'form-designer-vuex/src/store/modules/designer.module';
import 'form-designer-components/src/styles/index.less';
import { IDesignerComponent } from 'form-designer-types/interface/designer';

const initDefaultPage = function (vue: Vue.ComponentPublicInstance, list: IDesignerComponent[]) {
    vue.$store.commit(`designer/${commit_designer_init_designer_page}`);
    vue.$store.commit(`designer/${commit_designer_add_components}`, { list });
};
const addComponents = function (vue: Vue.ComponentPublicInstance, list: IDesignerComponent[]) {
    vue.$store.commit(`designer/${commit_designer_add_components}`, { list });
};
export {
    createDesignerStore,
    DesignerMainPanel,
    DesignerRightPanel,
    DesignerComponentList,
    initDefaultPage,
    addComponents,
};

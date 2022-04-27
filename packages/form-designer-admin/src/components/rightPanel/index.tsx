import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import './index.less';
import DesignerUXPanel from './UXDesigner';
import DesignerPropsPanel from './propsDesigner';
import DesignerDataPanel from './dataDesigner';
import { IDesignerComponent } from 'form-designer-types/interface/designer';

export default defineComponent({
    name: 'designer-right-panel',
    components: {
        DesignerPropsPanel,
        DesignerDataPanel,
        DesignerUXPanel,
    },
    computed: {
        ...mapGetters('designer', {
            selectedComponent: 'selectedComponent',
        }),
    },
    render() {
        const selectedComponent: IDesignerComponent = this.selectedComponent;
        return (
            <a-tabs class="designer-right-box">
                <a-tab-pane key="props" tab="属性">
                    {/*// @ts-ignore */}
                    <DesignerPropsPanel element={selectedComponent} />
                </a-tab-pane>
                <a-tab-pane key="ux" tab="高级">
                    {/*// @ts-ignore */}
                    <DesignerUXPanel element={selectedComponent} />
                    {/*// @ts-ignore */}
                    <DesignerDataPanel element={selectedComponent} />
                </a-tab-pane>
            </a-tabs>
        );
    },
});

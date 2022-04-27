import Vue from 'vue';
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';

export default function useVxeTable(app: Vue.App) {
    app.use(VXETable);
}

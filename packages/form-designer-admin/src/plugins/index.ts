import type { App } from 'vue';
import useAntdV from './antdv';
import useClipboard from './clipborad';
import useVxeTable from './vxeTable';
export default function usePlugin(app: App) {
    useAntdV(app);
    useVxeTable(app);
    useClipboard(app);
}

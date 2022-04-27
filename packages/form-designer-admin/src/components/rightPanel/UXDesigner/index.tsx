import { defineComponent, PropType } from 'vue';
import { DeleteOutlined } from '@ant-design/icons-vue';
import './index.less';

import { IComponentState } from 'form-designer-types/interface/components';
import { EnumEventType } from 'form-designer-types/enum/components';

import { eventFactory } from 'form-designer-utils';

import pm from '../paramsModal.vue';

export default defineComponent({
    name: 'designer-ux-panel',
    components: {
        pm,
        DeleteOutlined,
    },
    props: {
        element: {
            type: Object as PropType<IComponentState>,
            required: false,
        },
    },
    data() {
        return {
            showPm: false,
            eventTypeList: [
                { key: EnumEventType.click, label: EnumEventType.click },
                { key: EnumEventType.focus, label: EnumEventType.focus },
                { key: EnumEventType.mouseOver, label: EnumEventType.mouseOver },
                { key: EnumEventType.mouseLeave, label: EnumEventType.mouseLeave },
                { key: EnumEventType.change, label: EnumEventType.change },
            ],
            eventIndex: 0,
        };
    },
    methods: {
        // 添加事件
        addEvent() {
            eventFactory.pushEvent(this.element!, {
                eventType: this.eventTypeList[0].key,
                funcName: '',
                funcStr: '',
            });
        },
        deleteEvent(index: number) {
            eventFactory.removeEvent(this.element!, index);
        },
        showParamsModal(index: number) {
            this.eventIndex = index;
            this.showPm = true;
        },
        onParamCheck(paramInfo: any) {
            if (this.element && this.element.events) {
                if (paramInfo.type !== 'function') {
                    alert('事件只能绑定方法，请重新选择!');
                    return;
                }
                this.element!.events[this.eventIndex].funcName = paramInfo.name;
                this.showPm = false;
            }
        },
        renderEventList() {
            if (this.element && this.element.events) {
                return this.element.events.map((event, index) => {
                    return (
                        <div class="item">
                            <div class="label">
                                <a-select v-model={event.eventType}>
                                    {this.eventTypeList.map(name => (
                                        <a-select-option value={name.key}>
                                            {name.label}
                                        </a-select-option>
                                    ))}
                                </a-select>
                            </div>
                            <div class="value">
                                {!event.funcName ? (
                                    <a-button onClick={() => this.showParamsModal(index)}>
                                        选择方法
                                    </a-button>
                                ) : (
                                    <span>{event.funcName}</span>
                                )}
                                <delete-outlined onClick={() => this.deleteEvent(index)} />
                            </div>
                        </div>
                    );
                });
            } else return undefined;
        },
    },
    render() {
        return (
            <div class="designer-ux-panel">
                <div class="section ux">
                    <h3>事件绑定</h3>
                    {this.renderEventList()}
                </div>
                <a-button type="primary" class="btn-add-event" onClick={this.addEvent}>
                    添加
                </a-button>
                <pm
                    visible={this.showPm}
                    element={this.element}
                    forceRender={true}
                    onParamCheck={(info: any) => this.onParamCheck(info)}
                    onVisibleChanged={(v: boolean) => (this.showPm = v)}
                />
            </div>
        );
    },
});

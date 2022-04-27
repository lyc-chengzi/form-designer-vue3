import { IComponentState, IComponentEvent } from 'form-designer-types/interface/components';
import { EnumEventType } from 'form-designer-types/enum/components';

const EventFactory = {
    getEventByIndex: (state: IComponentState, index: number) => {
        if (state && state.events && state.events[index]) {
            return state.events[index];
        } else return undefined;
    },
    getEventsByType: (state: IComponentState, type: EnumEventType) => {
        if (state && state.events) {
            return state.events.filter(event => event.eventType === type);
        } else return [];
    },
    pushEvent: (state: IComponentState, event: IComponentEvent) => {
        if (state && event) {
            if (state.events) {
                state.events.push(event);
            } else {
                state.events = [event];
            }
        }
    },
    // 删除某个event
    removeEvent(state: IComponentState, index: number): void {
        if (state && state.events && state.events.length > index) {
            state.events.splice(index, 1);
        }
    },
};

export default EventFactory;

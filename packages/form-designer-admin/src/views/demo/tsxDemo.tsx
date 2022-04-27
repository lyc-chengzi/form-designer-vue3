import { defineComponent } from 'vue';
import DemoTest1 from '../demo/test1';
import DemoTest2 from './test2.vue';

export default defineComponent({
    name: 'tsx-demo',
    components: {
        DemoTest1,
        DemoTest2,
    },
    render() {
        return (
            <div class="demo-tsx-page" style="padding: 20px;">
                <demo-test1
                    v-slots={{
                        default: (props: any) => {
                            return (
                                <div class="test1-slot-default">test 1 scopedSlot {props.text}</div>
                            );
                        },
                        header: (props: any) => <h3>test1 Header: {props.text}</h3>,
                        content: (props: any) => <h3>test1 Content: {props.text}</h3>,
                    }}
                />
                <demo-test2
                    v-slots={{
                        default: (props: any) => <p>test2 defualt: {props.content.text} </p>,
                        header: (props: any) => <h3>test2 Header: {props.content.text}</h3>,
                        content: (props: any) => <p>test2 content: {props.content.text}</p>,
                    }}
                />
            </div>
        );
    },
});

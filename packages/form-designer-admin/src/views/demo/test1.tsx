import { defineComponent } from 'vue';

export default defineComponent({
    name: 'demo-component-test1',
    render() {
        return (
            <div class="demo-component-test1" style="padding: 20px;">
                {this.$slots.header && this.$slots.header({ text: 'header Text' })}
                {this.$slots.default && this.$slots.default({ text: 'default Text' })}
                {this.$slots.content && this.$slots.content({ text: 'content Text' })}
            </div>
        );
    },
});

<script>
import { ref } from 'vue';

export default {
    props: {
        data: {
            type: [Array, Object],
            required: false,
            default: () => {
                return [];
            }
        },
        tag: {
            type: String,
            required: false,
            default: 'div'
        },
        colspan: {
            type: Number,
            required: false,
            default: 1
        }
    },
    setup(props, { slots }) {
        const hasNoData = ref(false);

        if (props.data && (Array.isArray(props.data) ? props.data.length : Object.keys(props.data).length) === 0) {
            hasNoData.value = true;
        }

        return {
            hasNoData
        };
    },
    template: `
        <component :is="tag" v-bind="$attrs">
            <template v-if="hasNoData">
                <td v-if="tag === 'tr'" :colspan="colspan" class="text-center">No data available!</td>
                <slot></slot>
            </template>
            <template v-else>
                <slot></slot>
            </template>
        </component>
    `
}
</script>

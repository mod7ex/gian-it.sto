import { defineComponent, h } from 'vue';
import Select from '@/UI/Select.vue';

export default (state, fields) => defineComponent({
  props: {
    index: Number,
    modelValue: [Number, String],
    pipeline_id: [Number, String],
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    return () => h(
      Select,
      {
        options: state.raw.find(({ id }) => id == props.pipeline_id)?.stages.map(({ id, name }) => ({ label: name, value: id })),
        class: 'mr-3 pipeline w-full',
        label: `Этап Воронки ${props.index + 1}`,
        modelValue: fields.pipelines[props.index].stage_id,
        disabled: !props.pipeline_id,
        'onUpdate:modelValue': (v) => emit('update:modelValue', v),
      },
    );
  },
});

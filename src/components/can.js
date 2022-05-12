import { defineComponent, h } from 'vue';
import { userHasPermission } from '~/lib/permissions.js';

// const rights = [];
// we might use some directive for permission names , but there should be a pattern

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },

    ability: {
      type: String,
    },

    orIf: {
      type: Boolean,
      default: false,
    },

    cClass: {
      type: String,
    },
  },

  setup({ ability, cClass, tag, orIf }, { slots }) {
    let show = orIf;
    if (ability) show = show || userHasPermission(ability);

    // return () => (show ? h(tag, { class: cClass }, { default: () => slots }) : null);
    return () => (show ? h(tag, { class: cClass }, [slots.default()]) : null);
  },
});

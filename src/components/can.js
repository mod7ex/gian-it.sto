import { defineComponent, h } from 'vue';
import { userHasPermission } from '~/lib/permissions.js';

// const rights = [];
// we might use some directive for permission names

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },

    ability: {
      type: String,
    },

    cClass: {
      type: String,
    },
  },

  setup({ ability, cClass, tag }, { slots }) {
    const show = userHasPermission(ability);

    // return () => (show ? h(tag, { class: cClass }, { default: () => slots }) : null);
    return () => (show ? h(tag, { class: cClass }, [slots.default()]) : null);
  },
});

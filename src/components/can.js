import { defineComponent, h } from 'vue';
import { userHasPermission, userHasAtLeastOnePermission } from '~/lib/permissions.js';

// const rights = [];
// we might use some directive for permission names , but there should be a pattern

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'div',
    },

    ability: {
      type: [String, Array],
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

    if (Array.isArray(ability)) {
      if (ability.length) {
        show = show || userHasAtLeastOnePermission(ability);
      }
    } else if (ability) show = show || userHasPermission(ability);

    // return () => (show ? h(tag, { class: cClass }, { default: () => slots }) : null);
    return () => (show ? h(tag, { class: cClass }, [slots.default()]) : null);
  },
});

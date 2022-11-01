import { onScopeDispose, watchEffect } from 'vue';

/**
 *
 * make sure you want to use watchEffect because if the target keeps changing for example because of a v-if="x"
 * then the handler will keep being registered and cleared whenever x changes (because target.value changes)
 *
 * so you might want to use just a simple composable and clean up onScopeDispose to reduce the rate
 *
 */
export default function useClickOutside(ref, cb, scope = true) {
  if (!scope) {
    watchEffect((cleanUp) => {
      const target = ref.value;

      const handler = (e) => {
        if (target == null || target.contains(e.target)) return;

        cb(e);
      };

      console.log('listener registered'); /* this will happen many times ;) */
      document.addEventListener('click', handler);

      cleanUp(() => { console.log('event cleared'); /* this will happen many times ;) */ document.removeEventListener('click', handler); });
    });
  } else {
    const handler = (e) => {
      const target = ref.value;

      if (target == null || target.contains(e.target)) return;

      cb(e);
    };

    console.log('listener registered'); /* this will happen once ;) */
    document.addEventListener('click', handler);

    onScopeDispose(() => { console.log('event cleared'); /* this will happen once ;) */ document.removeEventListener('click', handler); });
  }
}

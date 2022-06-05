import { onMounted, ref, h, defineComponent } from 'vue';

export default function (cb, condition) {
  const container = ref();
  const target = ref();

  const pixel = defineComponent({
    setup() {
      return () => h('div', { class: 'bg-blue-600 p-1', ref: (v) => { target.value = v; } });
    },
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (!condition.value) return;

    if (!entry.isIntersecting) return;

    cb();
  }, {
    root: container.value,
    rootMargin: '0px',
    threshold: 1,
  });

  onMounted(() => {
    observer.observe(target.value);
  });

  return { target, container, pixel };
}

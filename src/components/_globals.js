// const UIComponents = import.meta.glob('./UI/*.vue'); // Lazy
const UIComponents = import.meta.globEager('./UI/*.vue'); // Eager

export default UIComponents;

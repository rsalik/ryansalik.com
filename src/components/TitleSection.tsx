import { createSignal, onMount } from 'solid-js';
import TitleCanvas from './TitleCanvas';

export default function TitleSection(props: any) {
  const [opacity, setOpacity] = createSignal(0);

  onMount(() => {
    // Increase opacity on scroll
    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      const maxScroll = 0.5 * window.innerHeight;
      const newOpacity = scroll / maxScroll;

      setOpacity(newOpacity);
    });
  });

  return (
    <div class="title-wrapper" ref={props.ref}>
      <TitleCanvas />
      <div class="section title" style={{ opacity: 1 - opacity() }}>
        <div class="text">Ryan Salik</div>
      </div>
      <div class="section title-invert" style={{ opacity: opacity() }}>
        <div class="text">Ryan Salik</div>
      </div>
    </div>
  );
}
import { children, createEffect, createSignal, JSX, onCleanup, onMount } from 'solid-js';
import Header from './Header';

export default function TitlePageContentWrapper(props: { children: JSX.Element }) {
  const c = children(() => props.children);
  const [top, setTop] = createSignal(-1000);

  let contentRef;

  function onScroll() {
    setTop(Math.min(-50 - contentRef.getBoundingClientRect().top, 0));
  }

  onMount(() => window.addEventListener('scroll', onScroll));
  onCleanup(() => window.removeEventListener('scroll', onScroll));

  return (
    <>
      <div class="section empty"></div>
      <Header top={top()} />
      <div class="title-content" ref={contentRef}>
        {c()}
      </div>
    </>
  );
}

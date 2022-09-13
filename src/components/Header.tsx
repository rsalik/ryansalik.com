import { For, Show } from 'solid-js';
import { useLocation } from 'solid-start';

export default function Header(props: { top?: number }) {
  const pathArr = useLocation().pathname.substring(1).split('/');

  return (
    <header style={props.top !== undefined ? { top: `${props.top}px`, position: 'fixed' } : {}}>
      <a href="/">
        <div class="title">Ryan Salik</div>
      </a>
      <div class="path">
        <Show when={pathArr.length > 0 && pathArr[0]}>
          <For each={pathArr}>
            {(path) => (
              <>
                <span class="path-separator">/</span>
                <span class="path-segment">{path}</span>
              </>
            )}
          </For>
        </Show>
      </div>
    </header>
  );
}

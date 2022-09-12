export default function Header(props: { top?: number }) {
  return (
    <header style={(props.top !== undefined) ? { top: `${props.top}px`, position: 'fixed' } : {}}>
      <a href="/"><div class="title">Ryan Salik</div></a>
    </header>
  );
}

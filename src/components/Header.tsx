export default function Header(props: { top?: number }) {
  return (
    <header style={props.top ? { top: `${props.top}px` } : {}}>
      <div class="title">Ryan Salik</div>
    </header>
  );
}

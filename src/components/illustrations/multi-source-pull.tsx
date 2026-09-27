export function MultiSourcePullIllustration() {
  return (
    <div className="il-pull">
      <ul className="il-sources">
        <li>Recent emails</li>
        <li>Last 4 syncs</li>
        <li>Project notes</li>
      </ul>
      <span className="il-pull-edge" aria-hidden />
      <div className="il-hub">claude</div>
    </div>
  );
}

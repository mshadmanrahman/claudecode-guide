import { Children, cloneElement, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

/**
 * Splits a heading into words that slide up one after another (the homepage hero
 * entrance). Nested spans and <br /> keep their markup; only the text inside is
 * split. Motion lives in globals.css (.hm-word) and stops under reduced motion.
 */
export function KineticText({ children }: { children: ReactNode }) {
  let i = 0;

  const splitString = (text: string, key: string): ReactNode[] =>
    text.split(/(\s+)/).map((part, j) => {
      if (part === "" || /^\s+$/.test(part)) return part;
      const style = { "--i": i++ } as CSSProperties;
      return (
        <span key={`${key}-${j}`} className="hm-word">
          <span style={style}>{part}</span>
        </span>
      );
    });

  const walk = (node: ReactNode, key: string): ReactNode => {
    if (typeof node === "string") return splitString(node, key);
    if (typeof node === "number") return splitString(String(node), key);
    if (Array.isArray(node)) return node.map((n, j) => walk(n, `${key}.${j}`));
    if (isValidElement(node)) {
      const el = node as ReactElement<{ children?: ReactNode }>;
      if (el.props.children === undefined) return el;
      return cloneElement(el, undefined, walk(el.props.children, key));
    }
    return node;
  };

  return <>{Children.toArray(children).map((c, j) => walk(c, `k${j}`))}</>;
}

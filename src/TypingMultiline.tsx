import { Fragment, useCallback, useState } from 'react';
import Typing, { TypingProps } from './Typing';

const getSource = (source: string | string[] | undefined) => {
  if(typeof source === 'string') {
    return source.split('\n');
  } else {
    return source;
  }
}

type TypingMultilineProps = Omit<TypingProps, 'str' | 'children'> & {
  lines?: string | string[]
  strs?: string | string[]
  children?: string | string[]
  ContainerTag?: TypingProps['Tag']
}
const TypingMultiline = ({
  lines,
  strs,
  children,
  ContainerTag,
  disabled,
  onDone,

  speed,
  preDelay,
  postDelay,
  cursor,
  fixedWidth,
  Tag,

  ...props
}: TypingMultilineProps) => {
  const source = getSource(lines || strs || children);
  if(!Array.isArray(source)) {
    throw new Error("children, strs or lines must be string[]");
  }
  const [active, setActive] = useState(0);
  const onDoneItem = useCallback((idx: number) => {
    if(source.length === idx + 1) {
      onDone && onDone();
    }
    setActive(idx + 1);
  }, [source, onDone]);

  const Container = ContainerTag || Fragment

  return (
    <Container {...props}>
      {source.map((line, i) =>
        <Typing
          key={i}
          str={line}
          disabled={disabled || i > active}
          onDone={() => onDoneItem(i)}
          speed={speed}
          preDelay={preDelay}
          postDelay={postDelay}
          cursor={cursor}
          fixedWidth={fixedWidth}
          Tag={Tag}
          />
      )}
    </Container>
  );
}

export default TypingMultiline;

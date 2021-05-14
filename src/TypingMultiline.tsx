import { Fragment, useCallback, useState } from 'react';

import Typing from './Typing';
import { TypingMultilineProps } from './types';

const getSource = (source: string | string[] | undefined) => {
  if(typeof source === 'string') {
    return source.split('\n');
  } else {
    return source;
  }
}

const TypingMultiline = ({
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
  const source = getSource(strs || children);
  if(!Array.isArray(source)) {
    throw new Error("children or strs must be string[]");
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

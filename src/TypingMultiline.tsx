import { Fragment, useCallback, useState } from 'react';
import Typing, { TypingProps } from './Typing';

const getSource = (source: string | string[] | undefined) => {
  if(typeof source === 'string') {
    return source.split('\n');
  } else {
    return source;
  }
}

export type TypingMultilineProps = {
  /**
   * 애니메이션에 사용될 문구들.
   * string[] 이거나 `\n` 문자를 갖고 있는 string 이어야 한다.
   * `strs` 혹은 `children` 둘 중 하나는 값이 있어야 한다.
   */
  strs?: string | string[]
  /**
   * 애니메이션에 사용될 문구들.
   * string[] 이거나 `\n` 문자를 갖고 있는 string 이어야 한다.
   * `strs` 혹은 `children` 둘 중 하나는 값이 있어야 한다.
   */
  children?: string | string[]
  /**
   * 컨테이너 엘리먼트에 사용될 태그
   */
  ContainerTag?: TypingProps['Tag']
} & Omit<TypingProps, 'str' | 'children'>
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

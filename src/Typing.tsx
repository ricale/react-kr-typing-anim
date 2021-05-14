import { useEffect, useState, useMemo } from 'react';
import * as Hangul from 'hangul-js';

import './Typing.css';

type TypingStatus = 'disabled' | 'preDelaying' | 'doing' | 'postDelaying' | 'done';

const getProgress = (disassembled: string[][], length: number) => {
  let result = '';
  let charCount = 0;
  for(let i = 0; i < disassembled.length; i++) {
    const item = disassembled[i];
    if((charCount + item.length) <= length) {
      result += Hangul.assemble(item)
      charCount += item.length;
      
    } else {
      result += Hangul.assemble(
        item.slice(0, length - (charCount + item.length))
      );
      break;
    }
  }
  return result;
}

const getClassName = (
  fixedWidth: boolean,
  cursor: boolean,
  status: TypingStatus | undefined
) => {
  const baseClassName = `typing ${fixedWidth ? 'typing_fixed' : 'typing_volatile'}`;
  if(!cursor) {
    return baseClassName;
  }
  if(status === 'doing') {
    return `${baseClassName} typing_with-cursor`;
  }
  if(status === 'preDelaying') {
    return `${baseClassName} typing_with-blinking-cursor`;
  }
  if(status === 'postDelaying') {
    return `${baseClassName} typing_with-blinking-cursor`;
  }
  return baseClassName;
}

export type TypingProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 애니메이션에 사용될 문구. `str` 혹은 `children` 둘 중 하나는 값이 있어야 한다.
   */
  str?: string
  /**
   * 애니메이션에 사용될 문구. `str` 혹은 `children` 둘 중 하나는 값이 있어야 한다.
   */
  children?: string
  /**
   * 타이핑 애니메이션 속도. (ms)
   */
  speed?: number
  /**
   * 타이핑 애니메이션 시작 전 딜레이. (ms)
   */
  preDelay?: number
  /**
   * 타이핑 애니메이션 종료 후 딜레이. (ms)
   */
  postDelay?: number
  /**
   * 동작 여부.
   * `true` 라면 애니메이션이 시작하지 않는다.
   * 애니메이션 시작 이후에는 어떤 값을 주어도 적용되지 않는다.
   */
  disabled?: boolean
  /**
   * 커서 깜빡임 애니메이션 실행 여부.
   */
  cursor?: boolean
  /**
   * 고정된 폭으로 동작할지 여부.
   * `true` 라면 애니메이션 시작 전부터 너비가 고정된다.
   * `false` 라면 애니메이션 상태에 따라 크기가 변경된다.
   */
  fixedWidth?: boolean
  /**
   * 어떤 태그로 문구를 감쌀 것인지 결정.
   */
  Tag?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span' | 'strong'
  /**
   * `postDelay` 까지 끝난 후 호출되는 콜백
   */
  onDone?: () => void
}
const Typing = ({
  str,
  children,
  speed = 100,
  preDelay,
  postDelay = 1000,
  disabled,
  cursor,
  fixedWidth,
  Tag = 'p',
  onDone,
  ...props
}: TypingProps) => {
  const source = (children || str);
  if(typeof source !== 'string') {
    throw new Error("children or str must be string");
  }
  const disassembled = useMemo(() =>
    source.trim().split('').map(ch => Hangul.disassemble(ch))
  , [source]);

  const [status, setStatus] = useState<TypingStatus>();

  useEffect(() => {
    if(disassembled?.length) {
      setStatus(
        disabled       ? 'disabled' :
        preDelay !== 0 ? 'preDelaying' :
                         'doing'
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disassembled/*, disabled, preDelay */]);

  useEffect(() => {
    if(disassembled?.length && status === 'disabled' && !disabled) {
      setStatus(preDelay !== 0 ? 'preDelaying' : 'doing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled/*, disassembled, status, preDelay */]);


  useEffect(() => {
    let timeout = (
      status === 'preDelaying' &&
      setTimeout(() => setStatus('doing'), preDelay)
    );
    return () => { timeout && clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, disassembled/*, preDelay */]);

  const [result, setResult] = useState('');

  useEffect(() => {
    if(status !== 'doing') {
      return;
    }

    setResult('');
    const length = disassembled.reduce((acc, char) => char.length + acc, 0);
    let currentLength = 1;
    let interval = setInterval(() => {
      setResult(getProgress(disassembled, currentLength));
      currentLength += 1;
      if(currentLength > length) {
        clearInterval(interval);
        setStatus(postDelay ? 'postDelaying' : 'done');
      }
    }, speed);

    return () => { clearInterval(interval); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disassembled, status/*, postDelay, speed */]);

  useEffect(() => {
    let timeout = (
      status === 'postDelaying' &&
      setTimeout(() => setStatus('done'), postDelay)
    );
    return () => { timeout && clearTimeout(timeout); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, disassembled/*, postDelay */]);

  useEffect(() => {
    if(status === 'done') {
      onDone && onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status/*, onDone*/]);

  const className = getClassName(!!fixedWidth, !!cursor, status);

  if(fixedWidth) {
    return (
      <Tag {...props} className={`${props.className || ''} ${className}`}>
        {status !== 'done' ?
          <>
            <div className='typing__source'>{source}</div>
            <div className='typing__result'>{result}</div>
          </> :
          result
        }
      </Tag>
    )
  }

  return (
    <Tag {...props} className={`${props.className || ''} ${className}`}>
      {result}
    </Tag>
  );
}

export default Typing;

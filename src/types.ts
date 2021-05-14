import { HTMLAttributes } from 'react';

export type TypingProps = HTMLAttributes<HTMLDivElement> & {
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

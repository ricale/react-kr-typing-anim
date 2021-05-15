# React Korean Typing Animation

한글 타이핑 애니메이션 컴포넌트

## 설치

```sh
yarn add react-kr-typing-anim
```

## 문서 및 예제

[Storybook](http://ricale.kr/react-kr-typing-anim/)

## 사용

```js
import Typing, { TypingMultiline } from 'react-kr-typing-anim';

const MyComp = () => {
  return (
    <div>
      <Typing
        Tag='div'
        preDelay={1000}
        postDelay={1000}
        cursor
        fixedWidth
        onDone={() => console.log('done')}>
        환영합니다!
      </Typing>

      <TypingMultiline
        strs={
          `환영합니다!
          즐거운 하루 되세요!`
        }
        />
    </div>
  );
}
```

## 주의

- 이 컴포넌트는 [Hangul.js](https://github.com/e-/Hangul.js/)를 사용해 구현되었습니다. 해당 라이브러리로 한글의 자모음을 분해한 뒤 애니메이션에 사용합니다.
- 알파벳에도 쓸 수 있지만, 알파벳은 CSS 만으로도 괜찮은 타이핑 애니메이션을 구현할 수 있습니다. ([이 링크](https://css-tricks.com/snippets/css/typewriter-effect/)를 비롯해서, 구글링하면 많이 나옵니다.) 굳이 이 라이브러리를 사용하실 필요가 없습니다.
- 아래의 기능은 아직 구현되지 않았습니다.
  - 애니메이션 재실행
  - 애니메이션 반복
  - 애니메이션 중단 혹은 즉시 완료

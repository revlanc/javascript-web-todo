# Todo App with React hooks

> React hooks로 구현한 Todo App  
>
> 사용 기술 : React hooks, styled-components, express, node.js, babel, webpack


### Index

- [기능](https://github.com/revlanc/javascript-web-todo#1-기능)
- [설계](https://github.com/revlanc/javascript-web-todo#2-설계)
- [고민한 점](https://github.com/revlanc/javascript-web-todo#3-고민한-점)
- [느낀 점](https://github.com/revlanc/javascript-web-todo#4-느낀-점)


------

## 1. 기능

### 1-1. 할일 관리 기능

![할일관리](https://user-images.githubusercontent.com/42905468/65814392-0d343e00-e21c-11e9-99c4-14bade818d4d.gif)

​    

- 할 일 추가, 삭제, 진행상태 업데이트, 업데이트 취소 기능
- 할 일 목록 접기, 펼치기 기능
- 진행 상태 업데이트 시 표시부분 하이라이팅


### 1-2. 리액트 라우터를 활용한 라우팅

![라우터](https://user-images.githubusercontent.com/42905468/65814390-0c9ba780-e21c-11e9-860e-f74bf3eff4a1.gif)

- 리액트 라우터의 Router, Switch, Route 컴포넌트를 활용하여 라우팅하였습니다.
- Express서버에서 history-fallback 처리하여 url로 직접 접근이 가능합니다.
- 일치하는 url이 없는 경우는 Switch의 마지막 컴포넌트(NoMatch) 렌더링합니다.

------

## 2. 설계

![투두 설계](https://user-images.githubusercontent.com/42905468/65815426-4378ba00-e22a-11e9-8d74-dbe48bfc910a.jpeg)

- Context API와 Reducer를 이용하여 상태를 관리합니다.
- 컴포넌트간 전달이 필요 없는 state는 useState를 이용하여 상태를 관리하였습니다.(todoInput 및 folded)

------

## 3. 고민한 점

### 3-1. 상태를 관리하는 hooks의 적절한 사용에 대한 고민

useState, useReducer, useContext의 3가지 hooks로 상태를 관리할 때, 각각의 장단점에 대한 고민이 많았습니다.

#### 3-1-1. Reducer만 사용하는 경우

- **<각 컴포넌트 역할>**
  - **reducer : 로직 보유 함수**
  - **최상위 컴포넌트 : state, dispatch보유, view컴포넌트 렌더링**
  - **view컴포넌트 : view렌더링, 액션 트리거**
- 비지니스 로직을 분리 가능합니다.
- props를 통해 dispatch 메서드를 전달하여 사용합니다.
- useState만 사용할 때에 비해 state와 dispatch 2가지만 전달하면 되므로 코드가 보다 간결해집니다.
- 핸들러 함수는 view컴포넌트에 위치하고 dispatch를 핸들러 내에서 실행합니다.
- 각 view컴포넌트에서 어떤 action을 트리거해야하는지는 알아야 합니다.  
  (바닐라에서 어떤 이벤트가 트리거 되었을 때, model에 이벤트 발생 내용을 메시지로 전달해주는 것과 비슷한 느낌)


#### 3-1-2. Context만 사용하는 경우

##### case1 : Provider를 분리하지 않는 경우

- **<각 컴포넌트 역할>**
  - **context : 단순 전역 객체**
  - **최상위 컴포넌트 : state보유, view컴포넌트 렌더링, (로직 보유)**
  - **view컴포넌트 : view렌더링, (로직 보유)**
- context 자체는 거의 아무 역할도 하지 않게 됩니다.
- state를 소유하는 컴포넌트의 역할이 커지는 경향이 있습니다.  
  (state보유, view렌더링, 로직 보유-로직은 뷰에 위치할 수도 있음)
- 로직이 view에 위치하는 경우 : setState를 context에서 받아서 사용
- 로직이 state와 함께 위치하는 경우 : 로직(핸들러함수)을 context에서 받아서 사용
- state를 provider로 분리할 수 있음(분리하는게 context의 역할을 보다 명확하게 하는 것 같아서 좋아보입니다)


##### case 2 : Provider 분리하고 로직을 view에 위치하는 경우

- **<각 컴포넌트 역할>**
  - **context : 전역 객체, state보유**
  - **최상위 컴포넌트 : view컴포넌트 렌더링**
  - **view컴포넌트 : view렌더링, 로직 보유(setState를 context에서 받아서 사용)**
- 비지니스 로직은 각 view에 나누어 관리합니다.
- setState를 context로 넘겨서 각 view에서 전달받아 사용합니다.
- 각 컴포넌트의 크기가 적당하게 나눠집니다.
- context의 역할은 작아집니다.(state만 보유하고 로직을 갖지 않기 때문)
- view컴포넌트의 재사용성은 떨어질 수 있습니다.(로직을 보유하기 때문)



##### case 3: Provider 분리하고 로직을 Provider에 위치하는 경우

- **<각 컴포넌트 역할>**

  - **context : 전역 객체, state보유, 로직(핸들러함수) 보유**
  - **최상위 컴포넌트 : view컴포넌트 렌더링**
  - **view컴포넌트 : view렌더링, (핸들러함수를 context에서 받아서 사용)**

- context의 역할이 조금 커집니다.(state보유 + 로직 보유)

- view컴포넌트 자체의 재사용성은 올라갑니다.(로직에 대한 의존성을 주입받는 느낌)



#### 3-1-3. 둘 다 사용하는 경우(+ provider 분리)

- **<각 컴포넌트 역할>**

  - **reducer : 로직 보유 함수**
  - **context : 전역 객체, state, dispatch보유**
  - **최상위 컴포넌트 : view컴포넌트 렌더링**
  - **view컴포넌트 : view렌더링, 액션 트리거**

- 컴포넌트의 역할이 작게 나누어집니다.

- **관심사의 분리**에 가장 어울리는 케이스라고 여겨집니다.

  <img width="573" alt="reducer" src="https://user-images.githubusercontent.com/42905468/65819261-594fa480-e255-11e9-9319-be8792a7a086.png">

- reducer는 오로지 로직에만 신경쓰게됩니다.

<img width="729" alt="context" src="https://user-images.githubusercontent.com/42905468/65819287-a3388a80-e255-11e9-8fa7-f3a5b4f03de7.png">

- context는 컴포넌트간 전달이 필요한 state의 관리에 집중하게 됩니다.

<img width="532" alt="App" src="https://user-images.githubusercontent.com/42905468/65819259-58b70e00-e255-11e9-8627-1494dfcc149c.png">

- 최상위 컴포넌트는 전체적인 컴포넌트 구조를 확인하기 쉽게 렌더링 하는 역할을 담당합니다.

  <img width="629" alt="view" src="https://user-images.githubusercontent.com/42905468/65819263-594fa480-e255-11e9-8dca-0f3b91e9ef0c.png">

- 각각의 view 컴포넌트는 '상태를 어떻게 보여줄 지'와 '액션을 트리거'하는 데에만 집중합니다.

> 필요에 따라 적절하게 사용하는 것이 좋겠지만, 일단 reducer를 사용하면 dispatch 메서드가 강제 되고,
> view컴포넌트에서 액션을 트리거하는 일관된 메시지 흐름을 갖게되어 코드가 정돈되는 효과가 있다고 느꼈습니다.
> (dispatch메서드를 props로 전달하고, 이벤트가 발생하는 view컴포넌트에서 핸들러 함수를 정의하는 패턴으로 정돈됨)


### 3-2. context로 관리하는 상태와 관련한 렌더링 성능 최적화

- 기본적으로 useCallback()과 React.memo()를 활용하여 최적화를 시도하였는데요,  
  context로 관리되는 상태는 React.memo()로 최적화되지 않아서 방법이 없나 많이 고민했습니다.

- 결론적으로는 context를 분리하여 최적화가 가능했습니다.

  ------

1. context에 할 일 목록(todos)과 todos를 변경하는 dispatch함수를 두고 view컴포넌트에서 받아서 사용하고 있었습니다.
2. TodoInput 컴포넌트 : 새로운 할 일을 입력받아서 todos를 변경하기 위해 dispatch함수를 받아서 사용  
   TodoList 컴포넌트 : 할 일 목록을 보여주고 상태를 업데이트 하기 위해 todos와 dispatch를 받아서 사용
3. 문제는, TodoList에서 상태 업데이트가 발생할 때, TodoInput컴포넌트가 불필요하게 렌더링되는 것이었습니다.
   <img width="640" alt="view" src="https://user-images.githubusercontent.com/42905468/65827958-a9b81800-e2d0-11e9-9b36-cc6737c54f94.jpeg">

4. TodoInput은 props로 받는 상태는 없이 context로 부터 객체형태의 value를 받아서 사용하고 있었는데요,  
   context가 렌더링되면서 매번 새로운 객체를 만들기 때문에 렌더링이 발생한다고 판단하고 필요한 부분을 '객체'가 아닌 '값'으로 분리하기로 했습니다.

![변경전](https://user-images.githubusercontent.com/42905468/65828866-990c9f80-e2da-11e9-8fb1-3bc83e3091cd.jpeg)
![변경후](https://user-images.githubusercontent.com/42905468/65828871-9e69ea00-e2da-11e9-9e24-92f83532f2a4.jpeg)

5. 처음에는 dispatch함수를 useCallback으로 감싸서 리턴했었습니다.  
   하지만 확인해본 결과 useReducer가 리턴하는 dispatch함수는 항상 같은 함수라는 것을 확인하고 dispatch함수를 그대로 context의 value로 전달하였습니다.
6. 결과적으로 아래 프로파일링 결과처럼 todos 상태가 변하더라도 TodoInput은 렌더링되지 않도록 최적화에 성공했습니다.

<img width="640" alt="view" src="https://user-images.githubusercontent.com/42905468/65827965-b76d9d80-e2d0-11e9-9335-8d6e85b715a1.jpeg">



##### 

### 3-3. useMemo와 useEffect의 차이

- 처음에 useMemo를 접했을 때는 단순히 *useCallback은 함수에 사용하고 useMemo는 값에 사용되는 메모이제이션 hooks이다!* 라고 생각을 했습니다.
- 그런데 같이 공부하는 친구 하나가 *useMemo랑 useEffect랑 비슷한 것 같지 않아요?* 라는 질문을 던졌고 useMemo를 잘못 이해했다는 것을 깨달았습니다.  
  그 차이를 이해하기 위해 공식문서 등 여러 자료도 찾아보고 예제코드도 만들어보면서 글을 하나 써봤습니다.([useMemo vs. useEffect](https://github.com/revlanc/letswrite/blob/master/useMemo와 useEffect.md))
- 두 hooks의 동작을 살펴보면서 useEffect의 콜백은 렌더링 이후에 실행되고 useMemo의 콜백은 렌더링 도중에 실행된다는 점, useEffect의 콜백에서 state를 변경할 경우 추가적인 렌더링을 발생시킨다는 점 등을 배웠습니다.

##### 

------

## 4. 느낀 점

### 배운 점

####  babel과 webpack을 이용한 개발환경 설정

리액트 앱을 만들면서 CRA를 사용하지 않고 babel과 webpack을 이용하여 개발환경 설정을 직접해보았습니다.  
공식문서를 찾아가면서 config파일 작성법, 개발 편의성을 높여주는 여러 플러그인의 사용법 등을 익혔습니다.

##### 

#### webpack.config 분리하고 성능 최적화 적용하는 법

앱을 개발하면서 webpack.config를 개발용과 배포용 2개로 나누어서 사용하였습니다.  
배포용 config는 splitChunks를 적용하여 브라우저 캐시를 활용한 성능 최적화를 시도해보았습니다.

##### 

#### 여러가지 React hooks 활용법

상태 관리에 필요한 hooks 를 다양하게 사용해보면서 특징을 느껴보았습니다.  
커스텀 hooks도 몇개 만들어보았는데, 로직을 hooks로 분리하는 걸 자꾸 시도해보아야겠다는 생각이 들었습니다.

##### 

### 아쉬운 점 & 개선할 점

#### 레이지로딩 적용하기

리액트 라우터의 switch 컴포넌트를 사용해서 초기화면 진입 시에 다른 컴포넌트의 렌더링을 막기는 했습니다.  
그런데 chunk를 분리해서 컴포넌트 파일 자체를 나중에 받는 방법이 있다고 하더군요!  
규모가 큰 어플리케이션을 구현할 때 보다 나은 사용자 경험을 위해 꼭 필요한 기능이라 생각되어 추후에 적용해볼 생각입니다.

##### 

#### atomic design의 적용이 어설펐던 점

시작할 때 프로젝트 구조를 어떻게 잡아야하나 고민하던 중 atomic design을 접했는데요, 리액트에 딱 알맞지 않을까? 싶어서 나름 따라해보려 했지만 안 한것만 못하게 되어버린 것 같습니다.  
구조 고민하다가 개발이 더뎌지는 경험을 했는데요, 다음에는 처음부터 완벽한 구조를 만들려하지 말고 만들어나가면서 재사용 가능한 부분은 분리하는 방식으로 진행해볼 생각입니다.

##### 

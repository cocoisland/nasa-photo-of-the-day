# useEffect, useState, styled-components

### Javascript DRY (don't repeat yourself) similars to Java Immutable.
> ReactJS adheres to both principles.

### What are “side effects”? 
> A side effect is anything that affects something outside the scope of the function being executed. Fetching data from an API, timers, logging, and manually manipulating the DOM are all examples of side effects. There are two categories of side effects in React components - those that don’t require cleanup and those that do require cleanup. We will discuss effects which require cleanup later in this module.

### A React component without side effects is called a pure component. 
> A component is considered pure if it always renders the same output for the same state and props. Similarly, a side effect is something that can cause a component to return a different output for the same state and props. Pure components don’t have any side effects. React offers us tools for managing side effects so we can avoid bugs and inconsistencies in our app. The effect hook (useEffect()) is one of those.

### ReactJS will render DOM whenever setState changes state.
> const [state, setState] = useState( [] );

### Dependency array 
  > useEffect( (),[] ); // effect only run once the first time loading.
  > useEffect( (),[state] ); // effect run whenever state changes.

### Cleanup Effect
  > A return statement inside Effect scope to remove any running effect before exiting scope.

### Destructure
> {},props={params}

## Sequence of processes.
  1. CRA - create-react-app
  2. JSX calls each components in App.js.
  3. Component consists of ICE - import, component, export.
    * component - class, function, const x=()=>{}
    * component first return JSX html structure.
    * after component finish return, effect run and return cleanup effect.
    
  4. Default export vs Name export
    > export default componentA -> 'import comp from 'componentA'
    > export componentA -> 'import {componentA} from 'componentA'


## Pro Tips:

### You may run into an error where your components try to access object properties before your data is finished being fetched - 
> ie. `Cannot read property 'url' of undefined`. 
> This means that the data you passed as props is undefined, when you were expecting it to be an object. You can fix this by simply adding something like this to any component that needs to read data from your state object:

```js
// Display a loading message while the data is fetching
if (!props.photoOfTheDay) return <h3>Loading...</h3>;

// Display your component as normal after the data has been fetched
return (
  {* your normal JSX here *}
);
```

### Fetching Data Multiple Times with Synced Effect Hooks
> Often, we will want to make the same fetch call multiple times during the life of a component, all based on when certain data changes. It can be tempting to write a function outside of the effect hook that calls an API, then call that function from the effect hook during the mounting stage, and then subsequently call it from a handler function later. Like this:

```js
  const [data, setData] = useState();
  const [query, setQuery] = useState("react");

  // This effect will only fire once when the component mounts
  useEffect(() => {
    fetchData(); // calls an external function that is dependent on state or props ⚠️
  }, []);

  // external function that relies on (or is dependent on) query
  const fetchData = () => {
    axios.get("some/api/endpoint/" + query)
      .then(res => setData(res.data));
  }

  const handleChange = e => {
    setQuery(e.target.value)
    fetchData(); // calls same external function after setting query
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      ...
    </>
  );
}
```

> This is not safe, as the effect hook calls fetchData which relies on query. According to the React docs

> It’s difficult to remember which props or state are used by functions outside of the effect. This is why usually you’ll want to declare functions needed by an effect inside of it. Then it’s easy to see what values from the component scope that effect depends on.

> Let’s put the fetchData function inside the effect hook, and sync the hook with query:

```js
  const [data, setData] = useState();
  const [query, setQuery] = useState("react");

  // This effect will fire when the component mounts, AND each time "query" is updated! ✅
  useEffect(() => {
    const fetchData = () => {
      axios.get("some/api/endpoint/" + query)
        .then(res => setData(res.data));
    }

    fetchData(); // calls an external function
  }, [query]);


  const handleChange = e => {
    setQuery(e.target.value)
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      ...
    </>
  );
}
```

# Styled-components
### Learn to use styled-components to add functional styles to their React Components
> So far through the React unit, we have learned how we can write our HTML in JavaScript using JSX. Now, we’re going to ask the question that many React devs have asked - why can’t we write our CSS in JavaScript as well? The answer… We can! With a library called Styled Components, we are going to build reusable components that get passed the styling we want via JavaScript! 

> Styled Components is a library for writing CSS in our JS files. As mentioned in the article above, it’s not that the idea of having HTML or CSS written in JS is bad, it’s more that the implementation isn’t properly implemented for either. React introduced JSX as a better tool for writing HTML in JS, and now we have great libraries to write CSS in JS.

> To get started with styled-components we run npm install styled-components. And that’s it! Now you’re ready to roll! We can import it into our js files, and start building components.

> Now that I have installed styled-components Let’s look at how you can use them.

> First, import the styled default object from styled-components . This gives you access to every property on that object. Each property is a React component that will print out whatever property you reference as a DOM element.

```js
import styled from 'styled-components'
Copy
// div
const StyledDiv = styled.div``;

// paragraph
const StyledP = styled.p``;

// section
const StyledSection = styled.section``;

// headers h1 - h6
const StyledHeading = styled.h1``;

// a
const StyledA = styled.a``;
```

> Hopefully, you’re starting to get the point. You’ll notice that I’m using that fancy template literal syntax. That’s because each one of the properties found on the styled objects are actually methods. In JS, we can pass in string arguments using string literals.

### Lets build out div component
> To import styled-components, add import styled from 'styled-components'; to your js file. Then we will use styled.div to create a new component. Look at how we set this up, then we’ll talk about the funny syntax:

```js
import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
    width: 100%;
    height: 100%;
`;

function SomeComponent() {
  return (
    <div className="wrapper">
      <h1>Hello From the Home Component</h1>
    </div>
  );
}
export default SomeComponent;
```

> We have created a component called WrapperDiv that is going to take the place of the .wrapper div. We have passed two css properties and values - width and height. But what is up with the backtick syntax?

> From their docs: “This unusual backtick syntax is a new JavaScript feature called a tagged template literal. You know how you can call functions with parenthesis? (myFunc()) Well, now you can also call functions with backticks!”

> So we are just invoking a function! And when we invoke this function, we are passing a string with our styles to it. Under the hood, styled-components is going to render a div with a funny looking class name, and apply the styles that we passed to it. Now we can take our new component, and put it into the JSX.

```js
import React from 'react';
import styled from 'styled-components';

const WrapperDiv = styled.div`
    width: 100%;
    height: 100%;
`;

function SomeComponent() {
  return (
    <WrapperDiv>
      <h1>Hello From the Home Component</h1>
    </WrapperDiv>
  );
}

export default SomeComponent;
```

> While this is all really cool, it seems like a little too much work if that is all we are gaining from style-components, right? Until we realize that there is so much more we can do! How about passing in props to change the color of buttons?

```js
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    padding: 6px 10px;
    margin: 5px;
    border: none;
    border-radius: 3px;
    color: white;

    ${props => (props.type === 'primary' ? `background: #2196f3;` : null)}
    ${props => (props.type === 'success' ? `background: #4caf50;` : null)}
    ${props => (props.type === 'danger' ? `background: #f44336;` : null)}
    ${props => (props.type === 'warning' ? `background: #fdd835;` : null)}
`;

function SomeComponent() {
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button type="success">Success</Button>
      <Button type="danger">Danger</Button>
      <Button type="warning">Warning</Button>
    </div>
  );
}

export default SomeComponent;
```

> Note that inside the ${} we are running a function that takes in props, and returns the correct background color based on props.type. This has endless possibilities!

> So we just created a single, reusable <Button /> component that will change colors based on what we pass to the type prop! But wait… there’s more!!! Let’s create a “base” Button component, then create a TomatoButton component that extends some extra styles to it (this example is straight out of the docs)!

```js
import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

function SomeComponent() {
  return (
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);

export default SomeComponent;
```

> (You may have noticed that we are invoking a function, passing in a component, and it is returning a new component with added functionality… styled is an HOC!!!!)


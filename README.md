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
    
  4a. Default export
  'export default componentA' -> 'import comp from 'componentA'

  4b. Name export
  'export componentA' -> 'import {componentA} from 'componentA'


## Pro Tips:

- You may run into an error where your components try to access object properties before your data is finished being fetched - ie. `Cannot read property 'url' of undefined`. This means that the data you passed as props is undefined, when you were expecting it to be an object. You can fix this by simply adding something like this to any component that needs to read data from your state object:

```js
// Display a loading message while the data is fetching
if (!props.photoOfTheDay) return <h3>Loading...</h3>;

// Display your component as normal after the data has been fetched
return (
  {* your normal JSX here *}
);
```

Fetching Data Multiple Times with Synced Effect Hooks
Often, we will want to make the same fetch call multiple times during the life of a component, all based on when certain data changes. It can be tempting to write a function outside of the effect hook that calls an API, then call that function from the effect hook during the mounting stage, and then subsequently call it from a handler function later. Like this:

Copy
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
This is not safe, as the effect hook calls fetchData which relies on query. According to the React docs

It’s difficult to remember which props or state are used by functions outside of the effect. This is why usually you’ll want to declare functions needed by an effect inside of it. Then it’s easy to see what values from the component scope that effect depends on.

Let’s put the fetchData function inside the effect hook, and sync the hook with query:

Copy
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

import React, { useState, useContext, createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import componentIndex from "../components/componentIndex";

// mockWrapper.js is code to mock the Lesson-builder environment.

// Mocking a shared context living within CraftJS
const WidgetContext = createContext();

// For testing, mocking an initial canvas state from the DB (add all props for a component even if empty)
const mockedSavedCanvas = [
  { name: "Callout", heading: "saved heading", body: "", calloutType: "" },
];

export const WidgetContextProvider = ({ children }) => {
  // Mocking what the AuthApp's canvas will do to create the initial state
  const initialState = {
    // Setting selection to null, will be ID of element, just a mock of what AuthApp does
    selectedComponentId: null,
  };
  mockedSavedCanvas.forEach((component, index) => {
    // Creating entry in state with initial component props
    Object.assign(initialState, { [`id-${index}`]: { ...component } });
    if (!initialState.ROOT) initialState.ROOT = [];
    // Setting order of components in ROOT
    initialState.ROOT.push(`id-${index}`);
  });

  // TODO: Alter setter, add selectedUUID for testing on this page, or add to config panel wrapper?
  const [canvasState, setCanvasState] = useState(initialState);

  return (
    <WidgetContext.Provider value={[canvasState, setCanvasState]}>
      {children}
    </WidgetContext.Provider>
  );
};

export const ComponentStateWrapper = ({ id, name, ...componentState }) => {
  //error boundary is added to each component
  const OurFallbackComponent = ({ error, resetErrorBoundary }) => {
    return (
      <div>
        <h1>An error occurred: {error.message}</h1>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    );
  };
  /*
  Wrapper mocking the wrapper in Authoring Application that passes in a setter and state from context,
  primary difference is context in AuthApp is created by CraftJS.
  */
  const [state, setState] = useContext(WidgetContext);

  const handleChange = (newState) => {
    console.log(`Updating state for ${id} ->`, state, newState);
    setState((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], ...newState },
    }));
  };

  const Component = componentIndex[name]?.Component;
  if (!Component) {
    console.warn(`Component name "${name}" not present in componentIndex`);
    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={OurFallbackComponent}>
      <Component setProp={handleChange} {...componentState} />
    </ErrorBoundary>
  );
};

export const ConfigStateWrapper = () => {
  /*
  Wrapper mocking the wrapper in Authoring Application that passes in a setter and state from context,
  the wrapper handles which component is "selected" and passes in a setter that only affects one component
  TODO: If Components have to be able to "select" themselves for configuration, a second setter that sets the selected component could be passed in.  Current understanding is that "selected" state would be managed by parent application
  */
  const [state, setState] = useContext(WidgetContext);

  if (!state.selectedComponentId) return null;
  console.log("Selected component", state.selectedComponentId);

  const selectedComponentState = state[state.selectedComponentId];

  const ComponentConfigPanel =
    componentIndex[selectedComponentState.name].ConfigPanel;
  if (!ComponentConfigPanel) {
    console.log(
      `Selected component "${selectedComponentState.name}" has no config panel`
    );
    return null;
  }

  const setComponentState = (stateUpdate) => {
    console.log("Updating state", stateUpdate);
    setState((prevState) => ({
      ...prevState,
      [prevState.selectedComponentId]: {
        ...prevState[prevState.selectedComponentId],
        ...stateUpdate,
      },
    }));
  };

  return (
    <ComponentConfigPanel
      componentState={selectedComponentState}
      setState={setComponentState}
    />
  );
};

export const ComponentSelector = () => {
  /*
  Mock for testing to allow selected state of component changing, populating the config panel with that component
  */
  const [state, setState] = useContext(WidgetContext);

  return (
    <div>
      <label htmlFor="component-selector">Select a component:</label>
      <select
        name="component selector"
        id="component-selector"
        onChange={(e) =>
          setState((state) => ({
            ...state,
            selectedComponentId: e.target.value,
          }))
        }
      >
        {state.ROOT.map((componentId, index) => (
          <option key={index} value={componentId}>{state[componentId].name}</option>
        ))}
      </select>
    </div>
  );
};

export const Canvas = ({ unwrappedComponents = null }) => {
  // Pass any components to this that you'd like rendered for now but without state management through "unwrappedComponents"

  const [state, setState] = useContext(WidgetContext);

  if (!state.ROOT || !state.ROOT.length > 0)
    throw new Error(`Canvas created with no components present in ROOT`);

  const addComponent = (componentName) => () => {
    console.log(`Adding component to mock canvas: ${componentName}`);
    setState((state) => {
      const newComponentId = `id-${state.ROOT.length}`;
      const ROOT = [...state.ROOT];
      ROOT.push(newComponentId);
      state[newComponentId] = {
        name: componentName,
        ...componentIndex[componentName].defaultProps,
      };
      return { ...state, ROOT };
    });
  };

  return (
    <div
      className="canvas"
      style={{ border: "2px solid black", minWidth: "650px" }}
    >
      {state.ROOT.map((componentId) => {
        const { name, ...props } = state[componentId];
        return (
          <ComponentStateWrapper key={componentId} id={componentId} name={name} {...props} />
        );
      })}
      {unwrappedComponents}
      {Object.keys(componentIndex).map((componentName, index) => {
        return (
          <button key={index} onClick={addComponent(componentName)}>
            Add {componentIndex[componentName].readableName}
          </button>
        );
      })}
    </div>
  );
};

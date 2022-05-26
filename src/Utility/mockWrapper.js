import React, { useState, useContext, createContext } from "react";
import { ErrorBoundary } from "react-error-boundary";
import componentIndex from "../components/componentIndex";

// mockWrapper.js is code to mock the Lesson-builder environment.

// Mocking a shared context living within CraftJS
const WidgetContext = createContext();

// For testing, mocking an initial canvas state from the DB (add all props for a component even if empty)
const mockedSavedCanvas = [
  { name: "FormattedText", body: null },
  {
    name: "Tab",
    tabs: [
      { id: 1, names: "Maths", content: "" },
      {
        id: 2,
        names: "Geography",
        content: "",
      },
    ],
    currentTab: { id: 1, names: "Tab 1", content: "" }
  },
  {
    name: "FormattedText",
    body: {
      blocks: [
        {
          key: "da26v",
          text: "Testing data loaded from DB.  About Juno, because that's the theme of this page now?  No one should leave me alone with their repo.",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [
            { offset: 8, length: 4, style: "BOLD" },
            { offset: 13, length: 6, style: "ITALIC" },
          ],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
  {
    name: "Callout",
    heading: "Juno is best dog",
    body: "In this essay, we explore why Golden Retrievers and in particular Juno are superb.  Please see https://www.tvo.org/files/s3fs-public/styles/hero_image/public/media-library/2_3_juno_1.jpg",
    calloutType: "",
  },
  { name: "Callout", heading: "saved heading", body: "", calloutType: "" },
  {
    name: "Image",
    alt: "",
    longDesc: "Saved long description",
    imgLink:
      "https://www.tvo.org/files/s3fs-public/styles/hero_image/public/media-library/2_3_juno_1.jpg",
    creditLink: "",
    uploadedImg:
      "https://www.tvo.org/files/s3fs-public/styles/hero_image/public/media-library/2_3_juno_1.jpg",
    imgSize: "default",
  },
  { name: "Callout", heading: "", body: "", calloutType: "" },
  { name: "Callout", heading: "", body: "saved body", calloutType: "" },
  { name: "Callout", heading: "", body: "", calloutType: "" },
  {
    name: "QuoteBox",
    quoteBoxBody: {
      blocks: [
        {
          key: "d3ktl",
          text: "Sam",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
    quoteBoxCitation: {
      blocks: [
        {
          key: "8abs2",
          text: "James",
          type: "unstyled",
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  },
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
  const OurFallbackComponent = ({
    error,
    componentStack,
    resetErrorBoundary,
  }) => {
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
        {state.ROOT.map((componentId) => (
          <option value={componentId}>{state[componentId].name}</option>
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
          <ComponentStateWrapper id={componentId} name={name} {...props} />
        );
      })}
      {unwrappedComponents}
      {Object.keys(componentIndex).map((componentName) => {
        return (
          <button onClick={addComponent(componentName)}>
            Add {componentIndex[componentName].readableName}
          </button>
        );
      })}
    </div>
  );
};

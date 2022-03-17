import { createContext, useContext, useReducer } from "react";

export const TopicContext = createContext();

export const useTopicContext = () => useContext(TopicContext);

const initialState = {
  widgetType: "",
  componentConfig: {},
  nodeId: null,
  configComponent: null,
  selectedWidgetProps: {},
  selectedWidgetType: null
};

export const TopicContextProvider = ({ children }) => {
  const topicReducer = (state = initialState, action) => {
    console.log("topicReducer called", action);
    switch (action.type) {
      case "UPDATE_WIDGET":
        return Object.assign({}, state, {
          widgetType: action.widgetType,
        });
      case "UPDATE_COMPONENT_CONFIG":
        return Object.assign({}, state, {
          componentConfig: action.componentConfig,
        });
      case "DELETE_NODE":
        console.log("Delete Node called", action);
        return Object.assign({}, state, { nodeId: initialState.nodeId, selectedWidgetProps: initialState.selectedWidgetProps });
      case "SET_NODE_ID":
        const { nodeId, configComponent, selectedWidgetProps } = action;
        if (!nodeId) {
          console.log("Error: Invalid nodeId provided to topicReducer", action);
          return state;
        }
        return Object.assign({}, state, { nodeId: action.nodeId, configComponent, selectedWidgetProps });
      case "UPDATE_WIDGET_PROPS":
        return Object.assign({}, state, {selectedWidgetProps: action.selectedWidgetProps})
      default:
        console.log("Unknown action called", action.type);
        return state;
    }
  };

  const [topicEditorState, dispatch] = useReducer(topicReducer, initialState);
  return <TopicContext.Provider value={[topicEditorState, dispatch]}>{children}</TopicContext.Provider>;
};
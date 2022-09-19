import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabsMain from "../components/Tabs/TabsMain";
import { layoutConfig } from "../components/Tabs/TabContext";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const testLayout = [
  {
    type: "TAB",
    id: 0,
    title: "Polkaroo",
    components: [],
  },
  {
    type: "TAB",
    id: 1,
    title: "Juno",
    components: [
      { componentName: "Text", componentProps: { body: null } },
      { componentName: "Text", componentProps: { body: null } },
    ],
  },
];

describe("Tabs", () => {
  it("Renders Tab Component with default 2 tabs", async () => {
    render(<TabsMain layoutState={testLayout} />);

    expect(screen.getByText(/polkaroo/i)).toBeInTheDocument();
    expect(screen.getByText(/juno/i)).toBeInTheDocument();
  });

  it("Displays placeholder text", async () => {
    render(<TabsMain layoutState={testLayout} />);
    expect(screen.getByText(/accepted components/i)).toBeInTheDocument();
  });

  it("On click displays active tab", async () => {
    render(<TabsMain layoutState={testLayout} />);
    const tabLabel = screen.getByText(/juno/i);
    const placeholder = screen.getByText(/accepted components/i);

    expect(tabLabel).toBeInTheDocument();
    expect(placeholder).toBeInTheDocument();

    fireEvent.click(tabLabel);
    expect(placeholder).not.toBeInTheDocument();
  });

  it("adds a new tab", async () => {
    render(<TabsMain layoutState={testLayout} />);
    layoutConfig(testLayout, {
      func: "ADD_TAB",
      id: 2,
    });
    expect(testLayout.length).toBeGreaterThan(2);
    expect(testLayout).toHaveLength(3);
  });

  it("removes a tab", async () => {
    render(<TabsMain layoutState={testLayout} />)
    layoutConfig(testLayout, {
      func: "REMOVE_TAB",
      currentTab: 2,
    });
    expect(testLayout).toHaveLength(2);
  })
  
  it("adds a component", async () => {;
    render(<TabsMain layoutState={testLayout} />)
    layoutConfig(testLayout, {
      func: "ADD_COMPONENT",
      tabIndex: 1,
      component: {
        componentName: "Text",
      },
    });
    expect(testLayout[1].components).toHaveLength(3)
  });

  it("updates the component state", async () => {
    render(<TabsMain layoutState={testLayout} />)
    layoutConfig(testLayout, {
      func: "UPDATE_COMPONENT",
      compIndex: 0,
      tabIndex: 1,
      stateUpdate: { newValue: "I updated the state of a component!!!"}
    })

    expect(testLayout[1].components[0].componentProps.newValue).toBe("I updated the state of a component!!!");
  })

  it("drags a component from index 0 to index 2 in the testLayout.components array", async () => {
    render(<TabsMain layoutState={testLayout}/>)
    layoutConfig(testLayout, {
      func: "DRAG_COMPONENT",
      tabIndex: 1,
      dragIndex: 0,
      hoverIndex: 2,      
    })

    expect(testLayout[1].components[0].componentProps).toStrictEqual({body: null});
    expect(testLayout[1].components[2].componentProps.newValue).toBe("I updated the state of a component!!!");
  })

  it("duplicates a component within a tab", async () => {
    render(<TabsMain layoutState={testLayout}/>)
    layoutConfig(testLayout, {
      func: "DUPLICATE_COMPONENT",
      tabIndex: 1,
      compIndex: 2
    })

    expect(testLayout[1].components.length).toBe(4);
    expect(testLayout[1].components[2]).toStrictEqual(testLayout[1].components[3]);
  })

  it("update the tab title", async () => {
    render(<TabsMain layoutState={testLayout}/>)
    layoutConfig(testLayout, {
      func: "CHANGE_TITLE",
      title: "Web Solutions Component Team",
      id: 0,
    })

    expect(testLayout[0].title).toBe("Web Solutions Component Team");
  })

  it("move a component up by 1 position and move it back down by 1", async () => {
    render(<TabsMain layoutState={testLayout}/>)

    const component = testLayout[1].components[1]

    layoutConfig(testLayout, {
      func: 'MOVE_COMPONENT_UP',
      tabIndex: 1,
      compIndex: 1,
    })

    expect(testLayout[1].components[0]).toStrictEqual(component);

    layoutConfig(testLayout, {
      func: 'MOVE_COMPONENT_DOWN',
      tabIndex: 1,
      compIndex: 0,
    })

    expect(testLayout[1].components[1]).toStrictEqual(component);
  })

  it("move a tab right by 1 position and move it back left by 1", async () => {
    render(<TabsMain layoutState={testLayout}/>)

    const tab = testLayout[0]

    layoutConfig(testLayout, {
      func: "MOVE_TAB_RIGHT",
      tabIndex: 0,
    })

    expect(testLayout[1]).toStrictEqual(tab);

    layoutConfig(testLayout, {
      func: "MOVE_TAB_LEFT",
      tabIndex: 1,
    })

    expect(testLayout[0]).toStrictEqual(tab);
  })

  const acceptListComp = (item) => {
    return ['Text', 'Table', 'Video', 'Image'].indexOf(item) >= 0
  }

  it("adds an unacceptable component", async () => {
    render(<TabsMain layoutState={testLayout} />)
    if (acceptListComp("Callout")) {
    layoutConfig(testLayout, {
      func: "ADD_COMPONENT",
      tabIndex: 1,
      component: {
        componentName: "Callout",
      },
    })
    expect(testLayout[1].components).toHaveLength(4)
  } else if (acceptListComp("Text")) {
    layoutConfig(testLayout, {
      func: "ADD_COMPONENT",
      tabIndex: 1,
      component: {
        componentName: "Text",
      },
    })
    expect(testLayout[1].components).toHaveLength(5)
  };
  });

});

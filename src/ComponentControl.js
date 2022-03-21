import React, { useRef, useState, Fragment } from "react";
import { useEditor } from "@craftjs/core";
import styled from "styled-components";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ArrowDoubleUpIcon from "@mui/icons-material/Publish";
import ArrowDoubleDownIcon from "@mui/icons-material/GetApp";
import { useNodeInfo } from "../src/hooks/useNodeInfo";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useTopicContext } from "./hooks/useTopicContext";

const ControlButton = styled.button`
  background: none;
  border: none;
  display: inline-block;
  margin-right: 5px;
  padding: 0;
  cursor: pointer;

  &:hover {
    transform: scale(1.1); 
  }

  &:focus {
    outline: 3px solid #ffc46b !important;
  }

  ${({ hideUnderSize }) =>
    hideUnderSize &&
    `
    @media (max-width: ${hideUnderSize}) {
      display: none;
    }
  `}
`;

const ControlLink = styled.a`
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`;

const ControlPanel = styled.div`
  display: flex;
`;

const ResponsiveMenuItem = styled(MenuItem)`
  @media (max-width: ${(props) => props.hideUnderSize}) {
    display: none;
  }
`;

const ResponsiveMenu = styled(Menu)`
  @media (max-width: ${(props) => props.hideUnderSize}) {
    display: none;
  }
`;

const getPositionControls = (
  { pushMessage, actions },
  { nodeId, node, nodeEle, title, getNodes, getCanvas, parentId, siblings, parentPrev, parentNext }
) => {
  let prevUnitBtn = "";
  if (siblings.findIndex((id) => id === nodeId) > 0) {
    prevUnitBtn = (
      <Fragment>
        <ControlButton
          aria-label={`Move ${node.custom.type} up`}
          onClick={async (e) => {
            await actions.move(nodeId, getCanvas(parentId), siblings.findIndex((id) => id === nodeId) - 1);
            // nodeEle.querySelector("input").focus();
            pushMessage({ message: `${node.custom.type} ${title} moved up`, level: "screenReader" });
            // if(ref.current) ref.current.scrollIntoView();
          }}
        >
          <ArrowUpwardIcon alt="" />
        </ControlButton>
        <br />
      </Fragment>
    );
  } else if (parentPrev) {
    prevUnitBtn = (
      <Fragment>
        <ControlButton
          aria-label={`Move ${node.custom.type} up to previous section`}
          onClick={async (e) => {
            await actions.move(nodeId, getCanvas(parentPrev), getNodes(parentPrev).length);
            pushMessage({ message: `${node.custom.type} ${title} moved to previous section`, level: "screenReader" });
          }}
        >
          <ArrowDoubleUpIcon alt="" />
        </ControlButton>
        <br />
      </Fragment>
    );
  }

  let nextUnitBtn = "";
  if (siblings.findIndex((id) => id === nodeId) !== siblings.length - 1) {
    nextUnitBtn = (
      <Fragment>
        <ControlButton
          aria-label={`Move ${node.custom.type} down`}
          onClick={async (e) => {
            // We need to do +2 because CraftJS removes the original element AFTER inserting the new one
            await actions.move(nodeId, getCanvas(parentId), siblings.findIndex((id) => id === nodeId) + 2);
            pushMessage({ message: `${node.custom.type} ${title} moved down`, level: "screenReader" });
          }}
        >
          <ArrowDownwardIcon alt="" />
        </ControlButton>
        <br />
      </Fragment>
    );
  } else if (parentNext) {
    nextUnitBtn = (
      <Fragment>
        <ControlButton
          aria-label={`Move ${node.custom.type} down to next section`}
          onClick={async (e) => {
            // We need to do +2 because CraftJS removes the original element AFTER inserting the new one
            await actions.move(nodeId, getCanvas(parentNext), 0);
            pushMessage({ message: `${node.custom.type} ${title} moved to next section`, level: "screenReader" });
          }}
        >
          <ArrowDoubleDownIcon alt="" />
        </ControlButton>
        <br />
      </Fragment>
    );
  }
  return { prevUnitBtn, nextUnitBtn };
};

const handleMenuTab = (e) => {
  const isValidMenuItem = (node) => {
    return node && window.getComputedStyle(node, null).getPropertyValue("display") !== "none";
  };
  if (e.key === "Tab") {
    if (e.getModifierState("Shift")) {
      if (!isValidMenuItem(e.target.previousSibling)) return;
      e.key = "ArrowUp";
      e.code = "ArrowUp";
    } else {
      if (!isValidMenuItem(e.target.nextSibling)) return;
      e.key = "ArrowDown";
      e.code = "ArrowDown";
    }
  }
};

export const ComponentControl = ({ nodeId, usesEditPanel = false }) => {
  const ref = useRef(null);
  const { pushMessage } = useMessageContext();
  const { actions } = useEditor();
  const [ dispatch ] = useTopicContext();

  const nodeInfo = useNodeInfo(nodeId);
  const { node } = nodeInfo;

  const [extrasListEle, setExtrasListEle] = useState(null);

  if (!node) return <Fragment />;

  const { prevUnitBtn, nextUnitBtn } = getPositionControls({ pushMessage, actions }, nodeInfo);

  return (
    <>
      {usesEditPanel ? (
        <>
          {prevUnitBtn}

          {nextUnitBtn}
          <ControlButton
            href="#"
            aria-label={`Delete ${node.custom.type}`}
            onClick={async (e) => {
              dispatch({ type: "DELETE_NODE" });
              await actions.delete(nodeId);
              pushMessage({ message: `${node.custom.type} ${title} deleted`, level: "screenReader" });
            }}
          >
            <DeleteIcon alt="" />
          </ControlButton>
        </>
      ) : (
        <ControlPanel aria-label={`${node.custom.type} position controls`} className="controls" ref={ref}>
          {prevUnitBtn}

          {nextUnitBtn}

          <ControlButton
            aria-label="more options"
            aria-controls={`more-options-menu-${nodeId}`}
            aria-haspopup="true"
            onClick={(e) => setExtrasListEle(e.target)}
          >
            <MoreVertIcon alt="" />
          </ControlButton>
          {/* <Popper open={Boolean(extrasListEle)} anchorEl={extrasListEle} placement="top-start" transition> */}
          <Menu
            anchorEl={extrasListEle}
            keepMounted
            id={`more-options-menu-${nodeId}`}
            open={Boolean(extrasListEle)}
            onClose={(e) => setExtrasListEle(null)}
          >
            <MenuItem onClose={(e) => setExtrasListEle(null)}>
              <ControlButton
                href="#"
                aria-label={`Delete ${node.custom.type}`}
                onClick={async (e) => {
                  await actions.delete(nodeId);
                  pushMessage({ message: `${node.custom.type} ${title} deleted`, level: "screenReader" });
                }}
              >
                <DeleteIcon alt="" />
              </ControlButton>
            </MenuItem>
          </Menu>
          {/* </Popper> */}
        </ControlPanel>
      )}
    </>
  );
};
import React, { useContext, useEffect, useRef, useCallback } from "react";
import PropTypes from "prop-types";

import { useMutation } from "@apollo/client";

import styled from "@emotion/styled";

import ErrorFallback from "../ErrorFallback";
import { UPDATE_COMPONENTCONTAINER } from "../../apolloQueries";
import { AuthoringContext, AuthoringDispatchContext } from "./AuthoringContext";
import { sortByKey } from "./utils";
import Section from "./Section";
import List from "../AccessibleList";
import AddSections from "./AddSections";

import MaxWidthContainer from "../MaxWidthContainer";
import AuthoringMenu from "./AuthoringMenu";
import DebugComponent from "./DebugComponent";

const RootDiv = styled("div")({
  paddingTop: "40px",
  paddingBottom: "70px",
  textAlign: "center",
});

const ContentContainerSizer = styled("div")(() => ({
  flexGrow: "9",
  width: "auto",
  alignSelf: "center",
}));

const FakeOutFocus = styled("div")({
  visibility: "hidden",
});

const AuthoringEditor = ({ id, title, setLastSavedTime, setIsSaving }) => {
  const state = useContext(AuthoringContext);

  const dispatch = useContext(AuthoringDispatchContext);

  const endRef = useRef(null);

  const handleAdd = useCallback(
    (sectionType) => () => {
      dispatch({
        type: "addSection",
        sectionType,
        message: `Added section to canvas`,
        end: true,
      });
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [endRef]
  );

  const [updateComponentContainerPatches, { error: mutationError }] =
    useMutation(UPDATE_COMPONENTCONTAINER, {
      variables: { id },
    });

  // SAVING STATE
  useEffect(async () => {
    if (!state.forwardPatches || state.forwardPatches.length <= 0) return;
    // If there's something stored in the "forwardsPatches" send it to server, save it, update local state from reply and clear the forwards state (if there's debouncing there's a potential to send an array of changes)
    // Note: Inverse patches won't be kept in sync with other user's changes, they should be in some way normalized with the returned state?  Or should the server keep the history, to prevent normalization issues

    setIsSaving(true);

    const { data, error } = await updateComponentContainerPatches({
      variables: {
        patches: state.forwardPatches,
      },
    });

    if (error || !data.updateComponentContainerPatches.success) {
      // eslint-disable-next-line no-console
      console.warn(error || data);
      return;
    }

    // TODO: This clears all forward patches, it should get some data from the server with the IDs of the patches applied and only remove those, to prevent race conditions and lost data
    dispatch({
      type: "setCanvas",
      canvas: data.updateComponentContainerPatches.componentContainer,
    });

    setLastSavedTime(
      data.updateComponentContainerPatches.componentContainer.updatedAt
    );

    setIsSaving(false);
  }, [state.forwardPatches]);

  if (mutationError) return <ErrorFallback error={mutationError} />;

  return (
    <>
      <ContentContainerSizer>
        <List>
          {/* TODO: Is there a way to reorder them based on order, but prevent rerenders of components?  Maybe passing no props here, and using the hooked context data exclusively based on ID? */}
          {/* TODO: Try reaching into the state in context for each by ID to prevent rerender blocking / unneeded rerenders */}
          {[...state.sections]
            .sort(sortByKey("position"))
            .map(
              (
                { id, components, type, locked, position },
                orderIndex,
                orderedSections
              ) => (
                <Section
                  key={id || orderIndex}
                  id={id}
                  orderIndex={orderIndex}
                  components={components}
                  type={type}
                  locked={locked}
                  // Showing title on the first container
                  authoringTitle={orderIndex === 0 ? title : null}
                  position={position}
                  leftPosition={orderedSections[orderIndex - 1]?.position}
                  rightPosition={orderedSections[orderIndex + 1]?.position}
                  // TODO: Calculating length on each map causes extra microtasks, should move to sortedSections component that grabs from context?
                  lastSection={orderIndex === orderedSections.length - 1}
                  leftIsLocked={
                    orderedSections[orderIndex - 1]?.locked === true
                  }
                />
              )
            )}
        </List>
        <AddSections handleAdd={handleAdd} />
        <DebugComponent />
      </ContentContainerSizer>{" "}
    </>
  );
};

AuthoringEditor.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setLastSavedTime: PropTypes.func.isRequired,
  setIsSaving: PropTypes.func.isRequired,
};

export default AuthoringEditor;

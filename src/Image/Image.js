import { useNode } from "@craftjs/core";
import { Paper } from "@mui/material";
import React, { useEffect, Fragment, useRef, useState } from "react";
import { ComponentControl } from "components/Control";
import { useTopicContext } from "components/TopicEditor/topicContext";
import { useConfigContext, useMessageContext } from "context";
import ImageUploader from "react-images-upload";
import axios from "axios";
import styles from "./Image.module.scss";
import ImageIcon from "@mui/icons-material/ImageOutlined";
import background from './assets/imageIcon.svg'

const Image = (props) => {
  const uploaderRef = useRef(null);
  const { config } = useConfigContext();
  const { publicURI, assetKey, alt, caption, width, height, isAdd } = props;

  const { pushMessage } = useMessageContext();
  const {
    id,
    connectors: { connect, drag },
    actions: { setProp, setCustom },
    isHovered,
  } = useNode((node) => ({ isHovered: node.events.hovered }));
  const [topicEditorState, dispatch] = useTopicContext();
  const clearImage = () => {
    setProp((props) =>
      Object.assign(props, {
        publicURI: null,
        assetKey: null,
        caption: null,
        alt: null,
        width: null,
        height: null,
      })
    );
    dispatch({
      type: "UPDATE_WIDGET_PROPS",
      selectedWidgetProps: {
        publicURI: null,
        assetKey: null,
        caption: null,
        alt: null,
        width: null,
        height: null,
      },
    });
  };

  useEffect(() => {
    // This method isn't performant, all widgets will get an update on each keypress.  This is a test.
    if (topicEditorState.nodeId !== id) return;
    setProp((props) =>
      Object.assign(props, {
        ...props,
        ...topicEditorState.selectedWidgetProps,
      })
    );
  }, [topicEditorState.selectedWidgetProps]);

  useEffect(() => {
    setCustom((custom) =>
      Object.assign(custom, { type: "image", name: "Image" })
    );
  }, []);

  useEffect(() => {
    if (!uploaderRef || !uploaderRef.current) return;
    // Inject aria-label
    const uploaderEle = uploaderRef.current.inputElement;
    uploaderEle.previousSibling.setAttribute("tabindex", "0");
    uploaderEle.previousSibling.focus();
  }, [uploaderRef]);

  useEffect(() => {
    if (isAdd) {
      dispatch({
        type: "SET_NODE_ID",
        nodeId: id,
        //selected widget type maps to the WidgetEditPanelConfig.js object
        //selectedWidgetType: "image",
        //alternate option for doing this
        selectedWidgetProps: props,
        configComponent: <ImageConfig />,
      });
    }
  }, []);

  const convertToMB = (bytes) => Math.round(bytes / Math.pow(1024, 2), 2);

  const ImageConfig = (props) => {
    const [{ selectedWidgetProps }, dispatch] = useTopicContext();
    // const [selectedFile, setSelecteFile] = useState(selectedWidgetProps.publicURI);

    const clearImage = () => {
      dispatch({
        type: "UPDATE_WIDGET_PROPS",
        selectedWidgetProps: {
          ...selectedWidgetProps,
          publicURI: null,
          assetKey: null,
          caption: null,
          alt: null,
          width: null,
          height: null,
        },
      });
    };

    const onFileSelect = async (fileInfos, base64Files) => {
      if (fileInfos.length === 0) return;
      const fileInfo = fileInfos[0];
      const base64String = base64Files[0];
      if (fileInfo.type === "image/svg+xml") {
        // extract viewBox width and height
        const imageData = new Buffer.from(
          base64String.replace(/^data:image\/[\w\+]+;name=[^;]+;base64,/, ""),
          "base64"
        ).toString();
        // Put SVG XML into object element, and get attributes with size info from SVG
        const container = document.createElement("object");
        container.innerHTML = imageData;
        const viewBoxString = container.children[0].getAttribute("viewBox");
        const styleStringMatches = container.children[0]
          .getAttribute("style")
          .match(/(\-?\d+(?:\.\d+)?(?:\s|$|\;)){4}/g);
        const styleString = styleStringMatches
          ? styleStringMatches[0].replace(";", "")
          : null;
        const sizeString = viewBoxString || styleString;
        const [top, left, width, height] = sizeString
          .split(" ")
          .map((n) => Math.round(parseFloat(n)));
        setProp((props) => Object.assign(props, { width, height }));
      }
      const resp = await axios.post(process.env.REACT_APP_AWS_MEDIA_MANAGER, {
        filePath: fileInfo.name,
        base64String,
      });
      const { message } = resp.data;
      if (message !== "Success") {
        pushMessage({ message, level: "error" });
      } else {
        const {
          data: { location, key },
        } = resp.data;
        dispatch({
          type: "UPDATE_WIDGET_PROPS",
          selectedWidgetProps: {
            ...selectedWidgetProps,
            publicURI: location,
            assetKey: key,
          },
        });
      }
    };

    // Edit Panel begins
    return (
      <div className={styles.Image__editPanelPreview}>
        {selectedWidgetProps.publicURI ? (
          <Fragment>
            <img
              src={selectedWidgetProps.publicURI}
              alt={selectedWidgetProps.alt || ""}
              tabIndex="0"
              onLoad={(e) => {
                const img = e.target;
                img.parentElement.focus();
                if (
                  selectedWidgetProps.width === null ||
                  selectedWidgetProps.height === null
                ) {
                  // setProp((props) => Object.assign(props, { width: img.naturalWidth, height: img.naturalHeight }));
                  dispatch({
                    type: "UPDATE_WIDGET_PROPS",
                    selectedWidgetProps: {
                      ...selectedWidgetProps,
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    },
                  });
                }
              }}
              className={styles.Image__img}
            />
            <ImageUploader
              {...selectedWidgetProps}
              ref={uploaderRef}
              withIcon={false}
              buttonText="Replace Image"
              onChange={onFileSelect}
              label={`Max file size: ${convertToMB(
                config.image.maxFileSize
              )}mb, accepted: ${config.image.allowedFileExts.join(", ")}`}
              labelClass={styles.Image__uploaderLabel}
              imgExtension={config.image.allowedFileExts}
              maxFileSize={config.image.maxFileSize}
              singleImage={true}
              aria-label="replace image"
              aria-hidden="true"
              className={styles.Image__uploader}
              buttonClassName={styles.Image__replaceButton}
              fileContainerStyle={{
                margin: "0",
                padding: "0",
                boxShadow: "none",
              }}
            />
          </Fragment>
        ) : (
          <div>
            <ImageUploader
              {...selectedWidgetProps}
              ref={uploaderRef}
              withIcon={false}
              buttonText="Upload"
              onChange={onFileSelect}
              label={`Max file size: ${convertToMB(
                config.image.maxFileSize
              )}mb, accepted: ${config.image.allowedFileExts.join(", ")}`}
              labelClass={styles.Image__uploaderLabel}
              imgExtension={config.image.allowedFileExts}
              maxFileSize={config.image.maxFileSize}
              singleImage={true}
              aria-label="upload image"
              className={styles.Image__uploader}
              buttonClassName={styles.Image__uploaderButton}
              fileContainerStyle={{
                margin: "0",
                padding: "0",
                boxShadow: "none",
              }}
            />
          </div>
        )}
        <h2 className={styles.Image__altTextH2}>Alt Text</h2>
        <p className={styles.Image__altTextP}>
          This text will be used by screen readers, search engines, or when the
          image can't be loaded.
        </p>
        <textarea
          name={`image-alt`}
          id={`image-alt`}
          aria-label="Add alt text to image"
          rows="4"
          value={selectedWidgetProps.alt || ""}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_WIDGET_PROPS",
              selectedWidgetProps: {
                ...selectedWidgetProps,
                alt: e.target.value,
              },
            })
          }
          className={styles.Image__input}
          placeholder="Type alt text here..."
        ></textarea>
      </div>
    );
  };

  // Canvas image component begins
  return (
    // Displayed when no image is uploaded
    <Paper
      ref={(ref) => connect(drag(ref))}
      className={styles.Image__container}
      elevation={0}
      style={
        isHovered
          ? { border: "3px solid #7422D1" }
          : { border: "3px solid #FFF" }
      }
    >
    {/* ComponentControl is conditionally rendered on hover */}
      {isHovered ? (
        <>
          <div className={styles.Image__tab}>
            {/* left tab with component name */}
            <ImageIcon />
            <p>image</p>
          </div>
          <div className={styles.Image__delete_tab}>
            {/* up, down and delete button in right tab*/}
            <ComponentControl nodeId={id} usesEditPanel={true} />
          </div>
        </>
      ) : null}

      {publicURI !== null ? (
        // Display when image IS uploaded
        <Fragment>
          <div className={styles.Image__uploadHover}>
            <img
              src={publicURI}
              alt={alt || ""}
              tabIndex="0"
              onClick={() => {
                dispatch({
                  type: "SET_NODE_ID",
                  nodeId: id,
                  selectedWidgetProps: props,
                  configComponent: <ImageConfig />,
                });
              }}
              onLoad={(e) => {
                const img = e.target;
                img.parentElement.focus();
                if (width === null || height === null) {
                  setProp((props) =>
                    Object.assign(props, {
                      width: img.naturalWidth,
                      height: img.naturalHeight,
                    })
                  );
                }
              }}
              onClick={() => {
                dispatch({
                  type: "SET_NODE_ID",
                  nodeId: id,
                  selectedWidgetProps: props,
                  configComponent: <ImageConfig />,
                });
                console.log('box clicked');
              }}
              onKeyDown={(e) => {
                const key = e.nativeEvent.code;
                if (key === 'Enter') {
                  dispatch({
                    type: "SET_NODE_ID",
                    nodeId: id,
                    selectedWidgetProps: props,
                    configComponent: <ImageConfig />,
                  });
                 }
                }
              }
              className={styles.Image__img}
            />
            <textarea
              id={`image-caption-${id}`}
              placeholder="Type caption here..."
              aria-label="Add caption text to image"
              value={caption || ""}
              onChange={(e) =>
                setProp((props) =>
                  Object.assign(props, { caption: e.target.value })
                )
              }
              onClick={() => {
                dispatch({
                  type: "SET_NODE_ID",
                  nodeId: id,
                  selectedWidgetProps: props,
                  configComponent: <ImageConfig />,
                });
                console.log('box clicked');
              }}
              onKeyDown={(e) => {
                const key = e.nativeEvent.code;
                if (key === 'Enter') {
                  dispatch({
                    type: "SET_NODE_ID",
                    nodeId: id,
                    selectedWidgetProps: props,
                    configComponent: <ImageConfig />,
                  });
                 }
                }
              }
              className={(styles.Image__input, styles.Image__caption)}
            ></textarea>
          </div>
        </Fragment>
      ) : (
        <div className={styles.Image__holdingbox}>
          <div 
            style={{ backgroundImage: `url(${background})`, backgroundRepeat:'no-repeat', backgroundPosition:'center'}}
            tabIndex="0"
            className={styles.Image__outline}
            onClick={() => {
              dispatch({
                type: "SET_NODE_ID",
                nodeId: id,
                selectedWidgetProps: props,
                configComponent: <ImageConfig />,
              });
            }}
            onKeyDown={(e) => {
              const key = e.nativeEvent.code;
              if (key === 'Enter') {
                dispatch({
                  type: "SET_NODE_ID",
                  nodeId: id,
                  selectedWidgetProps: props,
                  configComponent: <ImageConfig />,
                });
               }
              }
            }>
          </div>
          <textarea
            id={`image-caption-${id}`}
            placeholder="Type caption here..."
            aria-label="Add caption text to image"
            value={caption || ""}
            rows={2}
            onChange={(e) =>
              setProp((props) =>
                Object.assign(props, { caption: e.target.value })
              )
            }
            onClick={() => {
              dispatch({
                type: "SET_NODE_ID",
                nodeId: id,
                selectedWidgetProps: props,
                configComponent: <ImageConfig />,
              });
              console.log('box clicked');
            }}
            onKeyDown={(e) => {
              const key = e.nativeEvent.code;
              if (key === 'Enter') {
                dispatch({
                  type: "SET_NODE_ID",
                  nodeId: id,
                  selectedWidgetProps: props,
                  configComponent: <ImageConfig />,
                });
               }
              }
            }
            className={(styles.Image__input, styles.Image__caption)}
          ></textarea>
        </div>
      )}

      {/* Below is alternate method of connecting to side panel 
      
        <ShowPanelButton
        nodeId={id}
        configComponents={[
          <input value={testState} onChange={testSetterFunction} />,
        ]}
        openComponentConfigPanel={props.openComponentConfigPanel}
        configPanelOpen={props.configPanelOpen}
      /> */}
    </Paper>
  );
};

export default Image;

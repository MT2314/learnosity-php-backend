import React from "react";

import ImageUploader from "./ImageUploader";
import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/ImageConfig.module.scss";

import { NativeSelect } from "@mui/material/";
import { ImageOutlined } from "@mui/icons-material/";

// Component will be wrapped with something that handles which component is selected
function ImageConfig({
  componentState = {},
  setState = () => console.error("Setter function not passed in"),
}) {

  const { alt = "", longDesc = "", imgLink } = componentState;

  const altTextCounter = alt.length + "/200";

  const handleSubmit = (e) => {
    e.preventDefault();
    setState({ imgLink });
  };

  return (
    <section className={styles.ImageConfig__editPanelContainer}>
      <EditPanelIcon title="Image" icon={<ImageOutlined />} />

      <ImageUploader state={componentState} setState={setState} />

      <form onSubmit={handleSubmit} className={styles.ImageConfig__validationForm}>
        <div className={styles.ImageConfig__section}>
          <h2 className={styles.ImageConfig__imageH2}>Alt Text</h2>
          <label className={styles.ImageConfig__imageLabel} htmlFor="image-alt">
            This text will be used by screen readers, search engines, or when the image can't be loaded (Maximum 200
            characters).
          </label>
          <textarea
            name="image-alt"
            id="image-alt"
            required
            maxLength="200"
            aria-label="Add alt text to image"
            rows="4"
            value={alt}
            onChange={(e) => setState({ alt: e.target.value })}
            className={styles.ImageConfig__altTextInput}
            placeholder="Type alt text here..."
            onInvalid={(e) => e.target.setCustomValidity("Alt text is required for all uploaded images.")}
            onInput={(e) => e.target.setCustomValidity("")}
          ></textarea>
          <span className={styles.ImageConfig__altCount}>{altTextCounter || 200}</span>
        </div>
        <div className={styles.ImageConfig__section}>
          <h2 className={styles.ImageConfig__imageH2}>Long Description</h2>
          <label className={styles.ImageConfig__imageLabel} htmlFor="long-desc">
            This text will be used by screen readers, search engines, or when the image can't be loaded.
          </label>
          <textarea
            name="long-desc"
            id="long-desc"
            aria-label="Add a long description to the uploaded image"
            rows="4"
            value={longDesc}
            onChange={(e) => setState({ longDesc: e.target.value })}
            className={styles.ImageConfig__altTextInput}
            placeholder="Type long description here..."
          ></textarea>
        </div>
        <div className={styles.ImageConfig__section}>
          <h2 className={styles.ImageConfig__imageH2}>Image Size</h2>
          <label htmlFor="img-size" className={styles.ImageConfig__imageLabel}>
            Change the size of your uploaded image.
          </label>
          <NativeSelect
            id="img-size"
            name="img-size"
            className={styles.ImageConfig__imageSizeDropdown}
            onChange={(e) => setState({ imgSize: e.target.value })}
            defaultValue={"select"}
          >
            <option value={"select"} disabled>
              Select Size
            </option>
            <option value={"default"}>Default</option>
            <option value={"small"}>Small</option>
            <option value={"medium"}>Medium</option>
            <option value={"large"}>Large</option>
          </NativeSelect>
        </div>
        <div className={styles.ImageConfig__section}>
          <h2 className={styles.ImageConfig__imageH2}>Add Link To Image</h2>
          {/* <form className={styles.ImageConfig__linkForm}> */}
          <label htmlFor="urlImg" className={styles.ImageConfig__imageLabel}>
            Turn image into link to external webpage.
          </label>
          <input
            type="url"
            name="urlImg"
            id="urlImg"
            placeholder="https://example.com"
            pattern="https?://.+"
            value={imgLink}
            className={styles.ImageConfig__linkFormInput}
            onChange={(e) => setState({ imgLink: e.target.value })}
            onInvalid={(e) =>
              e.target.setCustomValidity("Invalid URL.  Please make sure URL begins with 'http://' or 'https://")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
        </div>
        <button className={styles.ImageConfig__validationButton} type="submit">
          Apply to Image
        </button>
      </form>
    </section>
  );
}

export default ImageConfig;

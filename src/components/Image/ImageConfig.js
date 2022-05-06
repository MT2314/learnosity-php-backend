import React from "react";

import ImageUploader from "./ImageUploader";
import EditPanelIcon from "../EditPanelIcon";
import styles from "./styles/ImageConfig.module.scss";

import NativeSelect from "@mui/material/NativeSelect";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

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
    <section className={styles.imageConfigContainer}>
      <EditPanelIcon title="Image" icon={<InsertPhotoOutlinedIcon />} />

      <ImageUploader state={componentState} setState={setState} />

      <form onSubmit={handleSubmit} className={styles.validationForm}>
        <div className={styles.imageConfigSection}>
          <h2 className={styles.imageH2}>Alt Text</h2>
          <label className={styles.imageConfigLabel} htmlFor="image-alt">
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
            className={styles.imageConfigTextArea}
            placeholder="Type alt text here..."
            onInvalid={(e) => e.target.setCustomValidity("Alt text is required for all uploaded images.")}
            onInput={(e) => e.target.setCustomValidity("")}
          ></textarea>
          <span className={styles.altCount}>{altTextCounter || 200}</span>
        </div>
        <div className={styles.imageConfigSection}>
          <h2 className={styles.imageH2}>Long Description</h2>
          <label className={styles.imageConfigLabel} htmlFor="long-desc">
            This text will be used by screen readers, search engines, or when the image can't be loaded.
          </label>
          <textarea
            name="long-desc"
            id="long-desc"
            aria-label="Add a long description to the uploaded image"
            rows="4"
            value={longDesc}
            onChange={(e) => setState({ longDesc: e.target.value })}
            className={styles.imageConfigTextArea}
            placeholder="Type long description here..."
          ></textarea>
        </div>
        <div className={styles.imageConfigSection}>
          <h2 className={styles.imageH2}>Image Size</h2>
          <label htmlFor="img-size" className={styles.imageConfigLabel}>
            Change the size of your uploaded image.
          </label>
          <NativeSelect
            id="img-size"
            name="img-size"
            className={styles.imageSizeDropdown}
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
        <div className={styles.imageConfigSection}>
          <h2 className={styles.imageH2}>Add Link To Image</h2>
          <label htmlFor="urlImg" className={styles.imageConfigLabel}>
            Turn image into link to external webpage.
          </label>
          <input
            type="url"
            name="urlImg"
            id="urlImg"
            placeholder="https://example.com"
            pattern="https?://.+"
            value={imgLink}
            className={styles.urlInput}
            onChange={(e) => setState({ imgLink: e.target.value })}
            onInvalid={(e) =>
              e.target.setCustomValidity("Invalid URL.  Please make sure URL begins with 'http://' or 'https://")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
        </div>
        <button className={styles.validationButton} type="submit">
          Apply to Image
        </button>
      </form>
    </section>
  );
}

export default ImageConfig;

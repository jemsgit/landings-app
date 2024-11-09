import { useRef, useState } from "react";
import styles from "./index.module.css";

const ImageOverlayComponent = () => {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [fontSize1, setFontSize1] = useState(60); // Font size for text1
  const [fontSize2, setFontSize2] = useState(15); // Font size for text2
  const [image, setImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null); // Reference for the image element

  const [position1, setPosition1] = useState({ x: 50, y: 50 });
  const [position2, setPosition2] = useState({ x: 200, y: 200 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const [dragging, setDragging] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startContinuousResize = (textIndex: string, increment: number) => {
    intervalRef.current = setInterval(() => {
      if (textIndex === "text1") {
        setFontSize1((size) => Math.max(1, size + increment));
      } else if (textIndex === "text2") {
        setFontSize2((size) => Math.max(1, size + increment));
      }
    }, 150); // adjust the interval time as needed for speed
  };

  const stopContinuousResize = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    textIndex: string
  ) => {
    if (!imageRef.current) {
      return;
    }
    const imageRect = imageRef.current.getBoundingClientRect();
    const offsetX =
      e.clientX -
      imageRect.left -
      (textIndex === "text1" ? position1.x : position2.x);
    const offsetY =
      e.clientY -
      imageRect.top -
      (textIndex === "text1" ? position1.y : position2.y);
    setOffset({ x: offsetX, y: offsetY });
    setDragging(textIndex);
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && imageRef.current) {
      const imageRect = imageRef.current.getBoundingClientRect();
      const x = e.clientX - imageRect.left - offset.x;
      const y = e.clientY - imageRect.top - offset.y;

      if (dragging === "text1") {
        setPosition1({ x, y });
      } else if (dragging === "text2") {
        setPosition2({ x, y });
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    } else {
      setImage(null);
    }
  };

  const increaseFontSize = (textIndex: string) => {
    if (textIndex === "text1") setFontSize1((size) => size + 1);
    else if (textIndex === "text2") setFontSize2((size) => size + 1);
  };

  const decreaseFontSize = (textIndex: string) => {
    if (textIndex === "text1") setFontSize1((size) => Math.max(1, size - 1));
    else if (textIndex === "text2")
      setFontSize2((size) => Math.max(1, size - 1));
  };

  return (
    <div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Заголовок"
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <button
            className={styles.fontButton}
            onMouseDown={() => {
              increaseFontSize("text1");
              startContinuousResize("text1", 1);
            }}
            onMouseUp={stopContinuousResize}
            onMouseLeave={stopContinuousResize}
          >
            +
          </button>
          Размер {fontSize1}
          <button
            className={styles.fontButton}
            onClick={() => decreaseFontSize("text1")}
            onMouseDown={() => {
              decreaseFontSize("text1");
              startContinuousResize("text1", -1);
            }}
            onMouseUp={stopContinuousResize}
            onMouseLeave={stopContinuousResize}
          >
            -
          </button>
        </div>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Текст"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            style={{ marginBottom: "10px", width: "100%", padding: "8px" }}
          />
          <button
            className={styles.fontButton}
            onMouseDown={() => {
              increaseFontSize("text2");
              startContinuousResize("text2", 1);
            }}
            onMouseUp={stopContinuousResize}
            onMouseLeave={stopContinuousResize}
          >
            +
          </button>
          Размер {fontSize2}
          <button
            className={styles.fontButton}
            onMouseDown={() => {
              decreaseFontSize("text2");
              startContinuousResize("text2", -1);
            }}
            onMouseUp={stopContinuousResize}
            onMouseLeave={stopContinuousResize}
          >
            -
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ marginBottom: "20px" }}
        />
      </div>

      {image && (
        <div className={styles.result}>
          <img
            ref={imageRef}
            src={image}
            alt="Uploaded"
            style={{ width: "100%" }}
          />

          {/* Text 1 */}
          <div
            style={{
              position: "absolute",
              top: position1.y,
              left: position1.x,
              cursor: "move",
              color: "white",
              fontSize: fontSize1,
              fontWeight: "bold",
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              maxWidth: "90%",
              overflowWrap: "break-word",
            }}
            onMouseDown={(e) => handleMouseDown(e, "text1")}
          >
            {text1}
          </div>

          {/* Text 2 */}
          <div
            style={{
              position: "absolute",
              top: position2.y,
              left: position2.x,
              cursor: "move",
              color: "white",
              fontSize: fontSize2,
              fontWeight: "bold",
              textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              maxWidth: "90%",
              overflowWrap: "break-word",
            }}
            onMouseDown={(e) => handleMouseDown(e, "text2")}
          >
            {text2}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOverlayComponent;

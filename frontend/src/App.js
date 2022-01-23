import "./App.css";
import { useImageUpload } from "./components/hooks";
const preventDefaultBrowserBehavior = (e) => {
  e.preventDefault();
  e.stopPropagation();
};

function App() {
  //get vars from hook
  const {
    handleImageUpload,
    dataAvailable,
    imagePaths,
    price,
    vintedURL,
    vindetUsername,
    isLoading,
    errorMassage,
  } = useImageUpload({ apiURL: "http://localhost:5000/api/v1/process-image" });

  return (
    <>
      {/* Example File Drop / Einfach mit eurem ersetzen */}
      <div
        style={{
          width: "500px",
          height: "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: isLoading ? "gray" : "green",
        }}
        onDrag={preventDefaultBrowserBehavior}
        onDragStart={preventDefaultBrowserBehavior}
        onDragEnd={preventDefaultBrowserBehavior}
        onDragOver={preventDefaultBrowserBehavior}
        onDragEnter={preventDefaultBrowserBehavior}
        onDragLeave={preventDefaultBrowserBehavior}
        onDrop={(e) => {
          preventDefaultBrowserBehavior(e);

          //get the file
          const file = e.dataTransfer.files[0];

          //handle upload
          handleImageUpload(file);
        }}
      >
        Drop file here
      </div>

      {/* Show Error, if we have any */}
      {errorMassage && (
        <div style={{ backgroundColor: "red" }}>{errorMassage}</div>
      )}

      {/* Example how to use the data from hook */}
      {dataAvailable && (
        <div>
          {imagePaths.map((imagePath) => (
            <img
              key={imagePath}
              src={imagePath}
              alt="uploaded"
              style={{ width: "200px", height: "200px" }}
            />
          ))}

          <ul>
            <li>
              isLoading:
              {isLoading.toString()}
            </li>
            <li>
              price:
              {price}
            </li>
            <li>
              vintedURL:
              {vintedURL}
            </li>
            <li>
              vindetUsername:
              {vindetUsername}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default App;

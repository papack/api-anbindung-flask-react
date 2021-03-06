import axios from "axios";
import { useState } from "react";

export const useImageUpload = ({ apiURL }) => {
  const [imagePaths, setImagePaths] = useState([]);
  const [price, setPrice] = useState(0);
  const [vintedURL, setVintedURL] = useState("");
  const [vindetUsername, setVindetUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const [dataAvailable, setDataAvailable] = useState(false); // wurden Daten abgerufen? sollen dem user eine Rückmeldung angezeigt werden?

  const handleImageUpload = async (file) => {
    //prepare request / set loading / remove previous error message
    setIsLoading(true);
    setErrorMassage("");

    //upload file to server as multipart/form-data
    const formData = new FormData();
    formData.append("imagefile", file);

    //send the file to the server
    try {
      const {
        data: { imagePaths, price, vintedURL, vintedUsername },
      } = await axios.post(apiURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //set the data to state
      setPrice(price);
      setImagePaths(imagePaths);
      setVintedURL(vintedURL);
      setVindetUsername(vintedUsername);
      setIsLoading(false);
      setDataAvailable(true);
    } catch ({ message }) {
      setErrorMassage(message);
      setPrice(0);
      setImagePaths([]);
      setVintedURL("");
      setVindetUsername("");
      setIsLoading(false);
      setDataAvailable(false);
    }
  };

  return {
    handleImageUpload,
    dataAvailable,
    imagePaths,
    price,
    vintedURL,
    vindetUsername,
    isLoading,
    errorMassage,
  };
};

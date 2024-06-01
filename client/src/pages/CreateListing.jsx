import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { app } from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
 

  const handleImageSubmit = () => {
    if (files.length > 0 && formData.imageUrls.length + files.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError("Image upload faild (2 mb max per image)", error);
          setUploading(false);
        });
    } else {
      setImageUploadError("You can only upload 6 images per listing");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <div className="min-h-[100vh] ">
        <h1 className="text-3xl text-center font-semibold text-slate-500 my-7">
          Create Listing
        </h1>

        <form className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              maxLength="62"
              minLength="10"
              required
            />
            <textarea
              type="text"
              placeholder="description"
              className="border p-3 rounded-lg"
              id="description"
              required
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg"
              id="address"
              required
            />

            <div className="flex gap-6 flex-wrap">
              <div className="flex gap-2 items-center">
                <input type="checkbox" id="sale" className="w-5" />
                <span>Sell</span>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" id="rent" className="w-5" />
                <span>Rent</span>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" id="parking" className="w-5" />
                <span>Parking spot</span>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" id="furnished" className="w-5" />
                <span>Furnished</span>
              </div>

              <div className="flex gap-2 items-center">
                <input type="checkbox" id="offer" className="w-5" />
                <span>Offer</span>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="bathrooms"
                    id="bathrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <p>Baths</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="bedrooms"
                    id="bedrooms"
                    min="1"
                    max="10"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <p>Beds</p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="regular price"
                    min="1"
                    id="regularPrice"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex flex-col items-center">
                    <p>Regular Price </p>
                    <span className="text-xs">($/month)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="discounted price"
                    id="discountedPrice"
                    min="1"
                    required
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                  <div className="flex flex-col items-center">
                    <p>Discounted Price </p>
                    <span className="text-xs">($/month)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1 ">
            <p className="font-semibold">
              Images:
              <span className="font-normal text-gray-600 ml-2">
                The first image will be the cover (max 6)
              </span>
            </p>

            <div className="flex gap-4">
              <input
                type="file"
                className="p-3 border border-gray-300 rounded w-full"
                name="images"
                id="imageUrls"
                accept="image/*"
                multiple
                onChange={(e) => setFiles(e.target.files)}
              />
              <button
                type="button"
                onClick={() => handleImageSubmit(files)}
                className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <p className="text-red-700 text-sm">
              {imageUploadError && imageUploadError}
            </p>
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between p-3 border border-gray-300 items-center rounded-lg"
                >
                  <img
                    src={url}
                    alt="listing image"
                    className=" h-20 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => handleImageDelete(index)}
                    className="text-red-700 rounded-lg p-2 bg-transparent border border-red-700 hover:text-red-800 hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button className="border bg-slate-700 text-white p-3 rounded-lg shadow-md uppercase hover:opacity-95 disabled:opacity-80">
              Create Listing
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListing;

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const Profile = () => {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track upload progress and handle errors
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercentage(Math.round(progress));
        console.log(filePercentage);
      },
      (error) => {
        setFileUploadError(true);
        console.log(error);
      }
    );

    // Retrieve download URL after upload completes
    uploadTask.then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((downloadURL) => {
          setFormData({ ...formData, profile: downloadURL });
          console.log(formData);
        })
        .catch((error) => {
          setFileUploadError(true);
          console.log(error);
        });
    });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return (
    <div className="min-h-[100vh] max-w-lg mx-auto">
      <p className="text-3xl font-semibold text-center my-7">Profile</p>
      <form action="" className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profile || currentUser.user.profile}
          alt="avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePercentage > 0 && filePercentage < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercentage}%`}</span>
          ) : filePercentage === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg shadow-md "
          id="username"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg shadow-md"
          id="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg shadow-md"
          id="password"
          required
        />
        <button className="border bg-slate-700 text-white p-3 rounded-lg shadow-md uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>

        <button className="border bg-green-700 text-white p-3 rounded-lg shadow-md uppercase hover:opacity-95 disabled:opacity-80">
          Create Listing
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;

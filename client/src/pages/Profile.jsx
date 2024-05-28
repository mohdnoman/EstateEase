import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="min-h-[100vh] max-w-lg mx-auto">
      <p className="text-3xl font-semibold text-center my-7">Profile</p>
      <form action="" className="flex flex-col gap-4">
        <img
          src={currentUser.user.profile}
          alt="avatar"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg shadow-md "
          id="username"
          onChange={""}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg shadow-md"
          id="email"
          onChange={""}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg shadow-md"
          id="password"
          onChange={""}
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

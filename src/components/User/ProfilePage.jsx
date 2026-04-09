import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressActions from "./AddressActions";
import Custominputfields from "../Custominputfields";

const ProfilePage = ({ user }) => {
  const [userpic, setUserpic] = useState(user?.userpic);
  const [firstname, setFirstName] = useState();
  const [lastname, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState("Not Provided Yet");
  const [country, setCountry] = useState("Not Provided Yet");

  const [addresses, setAddresses] = useState([
    {
      country: "Not Provided Yet",
      city: "Not Provided Yet",
      zip: "Not Provided Yet",
      district: "Not Provided Yet",
      street: "Not Provided Yet",
      building: "Not Provided Yet",
      floor: "Not Provided Yet",
      location: "Not Provided Yet",
    },
  ]);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstname);
      setLastName(user.lastname);
      setEmail(user.email);
      console.log(user);
      if (user?.phone) {
        setPhone(user.phone);
      }
      if (user?.addresses && user.addresses.length > 0) {
        setAddresses(user.addresses);
      }
    }
  }, [user]);

  return (
    <div className="w-full md:w-[78vw] px-4 md:px-0">
      <div className="flex w-full items-center flex-col">
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-start pl-4 md:pl-20 mt-6 md:mt-10 w-full border-b pb-2 border-black font-bold">
          Personal Information
        </h1>
        
        <div className="w-full gap-4 md:gap-10 flex flex-col md:flex-row pl-4 md:pl-20 pt-3 relative pb-3 border-b border-black">
          <div className="size-[80px] md:size-[100px] relative rounded-full overflow-hidden w-fit mx-auto md:mx-0">
            <img
              src={user?.userpic}
              className="size-[80px] md:size-[100px] rounded-full object-cover"
              alt="User profile"
            />
          </div>
          
          <div className="w-full md:w-[70%]">
            <p className="text-2xl md:text-4xl font-semibold mb-2">About me</p>
            <textarea
              name=""
              value={
                user?.about
                  ? user.about.replace(/\*\*(.*?)\*\*/g, '$1')
                  : "didn't get so much yet about you"
              }
              className="w-full h-[20vh] md:h-[32vh] resize-none focus:ring-0 focus:outline-none text-sm md:text-base"
              readOnly
              id=""
            ></textarea>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row w-full justify-around gap-6 md:gap-0 px-4 md:px-20 mt-6 md:mt-4">
          <div className="w-full md:w-1/3">
            <p className="text-sm text-gray-600 font-medium mb-1">First Name</p>
            <p className="text-lg md:text-xl font-semibold">{firstname || "Not Provided"}</p>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-sm text-gray-600 font-medium mb-1">Last Name</p>
            <p className="text-lg md:text-xl font-semibold">{lastname || "Not Provided"}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row w-full justify-around gap-6 md:gap-0 px-4 md:px-20 mt-6 md:mt-4">
          <div className="w-full md:w-1/3">
            <p className="text-sm text-gray-600 font-medium mb-1">Email</p>
            <p className="text-lg md:text-xl font-semibold break-words">{email || "Not Provided"}</p>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-sm text-gray-600 font-medium mb-1">Phone</p>
            <p className="text-lg md:text-xl font-semibold">{phone}</p>
          </div>
        </div>

        <div className="w-full mt-4 flex items-start justify-around flex-wrap px-4 md:px-0">
          <AddressActions />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
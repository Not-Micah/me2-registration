"use client";

// Library Imports
import { useState, useEffect } from "react";

import Select from "react-select";
import { selectStyles } from "@/data";

import { useRouter } from "next/navigation";
import { DocumentData } from "firebase/firestore";
import { FaHome } from "react-icons/fa";

// Own Function Imports
import { curriculums, hobbies, locations } from "@/data";
import { editUser } from "@/utils/userfunctions";
import { useData } from "@/providers/DataProvider";

// Component Imports
import Loader from "../components/Loader";

const Settings = () => {
  const router = useRouter();
  const { user, users } = useData();

  const [clicked, setClicked] = useState(false);

  // Getting Initial User Data
  const [userData, setUserData] = useState<DocumentData | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Storing Form Values
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");

  // Setting User Value
  useEffect(() => {
    if (users && user) {
      setUserData(users.find((u) => u.uid === user.uid));
      setLoading(false);
    }
  }, [users, user]);

  // Setting Default Values
  useEffect(() => {
    if (userData) {
      setUserName(userData.userName || "");
      setUserAge(userData.age ? String(userData.age) : "");
      setUserCurriculum(userData.curr || "");
      setUserLocation(userData.location || "");
      setUserHobbies(userData.hobbies || []);
      setInstagram(userData.instagram || "");
      setDiscord(userData.discord || "");
      setSnap(userData.snap || "");
    }
  }, [userData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      userName &&
      userAge &&
      userCurriculum &&
      userLocation &&
      userHobbies &&
      (instagram || discord || snap)
    ) {
      editUser(
        user?.uid,
        userName,
        Number(userAge),
        userCurriculum,
        userLocation,
        userHobbies,
        instagram,
        discord,
        snap
      );
      setClicked(true);
      router.replace("./");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-[#D5E6FF] w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="w-[calc(100vw-8rem)] h-[calc(100vh-4rem)] flex flex-row shadow-md max-xl:w-full max-xl:h-full max-xl:flex-col">
        <div className="w-[500px] h-full bg-[#54ACFD] flex flex-col justify-center items-start gap-y-2 px-16 max-xl:max-w-[100vw] max-xl:w-full max-xl:py-14">
          <button className="mb-6 shadow-none text-sm
          bg-secondary text-white py-2 px-6 rounded-md" onClick={() => router.replace("./")}>
            <FaHome size={20} color="white" />
          </button>
          <h3 className="dynamic-subheading text-white font-semibold">
            Edit Your Information
          </h3>
          <p className="text-white/70">
            Me2 ensures your data is kept safe and not used in malpractice.
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex-grow h-full bg-white px-52 max-[1920px] pt-40 pb-20 flex flex-col justify-center items-center gap-y-3 overflow-y-scroll max-xl:overflow-y-visible max-xl:items-start max-xl:px-28 max-lg:px-12"
        >
          <h3 className="dynamic-subheading font-semibold text-center max-xl:text-left">
            Edit Your Profile Information
          </h3>
          <p className="dynamic-text text-gray-700 italic text-center max-xl:text-left">
            All edits must be saved before applied.
          </p>
          <input
            type="text"
            value={userName}
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            className="input-field"
          />
          <div className="w-full grid grid-cols-2 gap-x-3">
            <input
              type="number"
              value={userAge}
              placeholder="Age"
              onChange={(e) => setUserAge(e.target.value)}
              className="input-field"
            />
            <Select
              options={locations}
              value={locations.find((loc) => loc.value === userLocation)}
              onChange={(loc) => {
                if (loc) {
                  setUserLocation(loc.value);
                }
              }}
              styles={selectStyles}
            />
          </div>
          <Select
            className="w-full"
            options={curriculums}
            value={curriculums.find((curr) => curr.value === userCurriculum)}
            onChange={(curr) => {
              if (curr) {
                setUserCurriculum(curr.value);
              }
            }}
            styles={selectStyles}
          />
          <Select
            options={hobbies}
            isMulti
            className="w-full"
            value={hobbies.filter((hobby) => userHobbies.includes(hobby.value))}
            onChange={(hobbies) => {
              if (hobbies) {
                const addedHobbies = hobbies.map((option) => option.value);
                setUserHobbies(addedHobbies);
              } else {
                setUserHobbies([]);
              }
            }}
            styles={selectStyles}
          />
          <input
            type="text"
            value={instagram}
            placeholder="Instagram"
            onChange={(e) => setInstagram(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            value={discord}
            placeholder="Discord"
            onChange={(e) => setDiscord(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            value={snap}
            placeholder="Snap Chat"
            onChange={(e) => setSnap(e.target.value)}
            className="input-field"
          />
          <div className="w-full flex justify-end max-xl:justify-start">
            <button
              className="dynamic-text font-semibold bg-[#FFD99F] py-2 px-6 rounded-md mt-5"
              type="submit"
              disabled={clicked}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;

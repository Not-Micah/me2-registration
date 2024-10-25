"use client";

// Library Imports
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Drop Down Imports
import Select from "react-select";
import { selectStyles } from "@/data";

// Icons
import { IoMdArrowRoundBack } from "react-icons/io";

// Database / Data Imports
import { curriculums, hobbies, locations } from "@/data";
import { editUser } from "@/utils/userfunctions";
import { useData } from "@/providers/DataProvider";

// Component Imports
import Loader from "../components/Loader";

const Settings = () => {
  const router = useRouter();
  const { user, users } = useData();

  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  ////////////////////////////////////
  const [userData, setUserData] = useState<any>();
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");
  ////////////////////////////////////

  // Setting User Data
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
    <section
      className="
      w-[100vw] h-[100vh] 
      flex justify-center items-start"
    >
      <form 
        onSubmit={handleSubmit}
        className="
        max-w-[1000px] w-full
        px-4 py-8
        flex flex-col gap-y-4"
      >

        <div className="w-full flex mb-6">
          <button
            onClick={() => router.replace("./")}
            className="
            w-[40px] h-[40px] 
            bg-header text-white
            rounded-full
            flex justify-center items-center"
          >
            <IoMdArrowRoundBack size={22.5} />
          </button>
        </div>

        <h3 className="dynamic-subheading font-title text-header font-semibold">Edit Your Information</h3>

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
            placeholder="Location"
            options={locations}
            value={locations.find((loc) => loc.value === userLocation)}
            onChange={(loc) => loc && setUserLocation(loc.value)}
            styles={selectStyles}
          />
        </div>

        <Select
          placeholder="Curriculum"
          className="w-full"
          options={curriculums}
          value={curriculums.find((curr) => curr.value === userCurriculum)}
          onChange={(curr) => curr && setUserCurriculum(curr.value)}
          styles={selectStyles}
        />

        <Select
          placeholder="Hobbies"
          options={hobbies}
          isMulti
          className="w-full"
          value={hobbies.filter((hobby) => userHobbies.includes(hobby.value))}
          onChange={(selected) => {
            setUserHobbies(selected ? selected.map((option) => option.value) : []);
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

        <div className="
        w-full flex">
          <button
            type="submit"
            disabled={clicked}
            className="
            bg-header text-white dynamic-text font-medium
            rounded-lg
            mt-10
            py-1 px-4
            flex justify-center items-center
            "
          >
            Submit
          </button>
        </div>

      </form>
    </section>
  );
};

export default Settings;

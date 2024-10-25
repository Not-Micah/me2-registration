"use client";

// Library Imports
import { useState } from "react";
import { useRouter } from "next/navigation";

// Drop Down Imports
import Select from "react-select";
import { selectStyles } from "@/data";

// Icons
import { IoMdArrowRoundBack } from "react-icons/io";

// Database / Data Imports
import { curriculums, locations, hobbies } from "@/data";
import { addUser } from "@/utils/userfunctions";
import { getUserAuth, signOut } from "@/utils/databasefunctions";

const RegisterUser = () => {
  const [clicked, setClicked] = useState(false);

  /////////////
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userCurriculum, setUserCurriculum] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userHobbies, setUserHobbies] = useState<string[]>([]);

  /////////////
  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [snap, setSnap] = useState("");

  const auth = getUserAuth(false);
  const router = useRouter();

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
      addUser(
        userName,
        Number(userAge),
        userCurriculum,
        userLocation,
        userHobbies,
        auth.currentUser?.photoURL,
        instagram,
        discord,
        snap
      );
      setClicked(true);
      router.refresh();
    }
  };

  return (
    <section
    className="
    w-[100vw] h-[100vh] 
    flex justify-center items-center">
      <form 
      onSubmit={handleSubmit}
      className="
      max-w-[1000px] w-full
      px-4 py-8
      flex flex-col gap-y-4">

        <div className="
        w-full flex mb-6">
          <button
          onClick={signOut}
          className="
          w-[40px] h-[40px] 
          bg-header text-white
          rounded-full
          flex justify-center items-center">
            <IoMdArrowRoundBack size={22.5} />
          </button>
        </div>

        <h3 className="dynamic-subheading font-title text-header font-semibold">Register for Me2</h3>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          className="input-field"
        />

        <div className="w-full grid grid-cols-2 gap-x-3">
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setUserAge(e.target.value)}
            className="input-field"
          />
          <Select
            placeholder="Location"
            options={locations}
            onChange={(loc) => {
              if (loc) {
                setUserLocation(loc.value);
              }
            }}
            styles={selectStyles}
          />
        </div>

        <Select
          placeholder="Curriculum"
          className="w-full"
          options={curriculums}
          onChange={(curr) => {
            if (curr) {
              setUserCurriculum(curr.value);
            }
          }}
          styles={selectStyles}
        />

        <Select
          placeholder="Hobbies"
          options={hobbies}
          className="w-full"
          isMulti
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

        <p className="dynamic-text text-gray-700 italic text-center">
          *Fill out at least one of these forms below.
        </p>

        <input
          type="text"
          placeholder="Instagram"
          onChange={(e) => setInstagram(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Discord"
          onChange={(e) => setDiscord(e.target.value)}
          className="input-field"
        />

        <input
          type="text"
          placeholder="Snap Chat"
          onChange={(e) => setSnap(e.target.value)}
          className="input-field"
        />

        <div className="
        w-full flex mb-6">
          <button
          type="submit"
          disabled={clicked}
          className="
          bg-header text-white dynamic-text font-medium
          rounded-lg
          mt-10
          py-1 px-4
          flex justify-center items-center">
            Submit
          </button>
        </div>

      </form>
    </section>
  );
};

export default RegisterUser;
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageContainer, { fadeIn, staggerContainer } from "../components/PageContainer";

const initialProfile = {
  name: "Jane Doe",
  email: "janedoe@email.com",
  cookingPreferences: "Quick meals, meal prep",
  dietaryPreferences: "Vegetarian",
  favoriteCuisines: ["Italian", "Mexican"],
  allergies: "Peanuts",
  skillLevel: "Intermediate",
  bio: "Home cook exploring world flavors.",
  avatar: "",
};

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Professional"];

export default function RecipeProfilePage() {
  const [profile, setProfile] = useState(initialProfile);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(initialProfile);

  const handleEdit = () => {
    setForm(profile);
    setEditMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCuisineChange = (e, idx) => {
    const favoriteCuisines = [...form.favoriteCuisines];
    favoriteCuisines[idx] = e.target.value;
    setForm((prev) => ({ ...prev, favoriteCuisines }));
  };

  const addCuisine = () => {
    setForm((prev) => ({
      ...prev,
      favoriteCuisines: [...prev.favoriteCuisines, ""],
    }));
  };

  const removeCuisine = (idx) => {
    setForm((prev) => ({
      ...prev,
      favoriteCuisines: prev.favoriteCuisines.filter((_, i) => i !== idx),
    }));
  };

  const handleSave = () => {
    setProfile(form);
    setEditMode(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, type: "spring" } },
  };

  return (
    <>
        <Header/>
        <motion.div
      className="min-h-screen bg-[#191d24] text-gray-100 px-4 py-8 min-w-[100vw]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-3xl mx-auto bg-[#202430] rounded-2xl shadow-lg p-8">
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-green-500 to-lime-400 flex items-center justify-center text-2xl font-bold">
            {profile.avatar
              ? <img src={profile.avatar} alt="avatar" className="rounded-full w-full h-full object-cover" />
              : profile.name.split(" ").map((s) => s[0]).join("")}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-gray-400">{profile.email}</p>
          </div>
          <button
            onClick={handleEdit}
            className="ml-auto bg-green-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-green-400 transition"
            disabled={editMode}
          >
            Edit
          </button>
        </div>
        <form
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${editMode ? "opacity-80" : ""}`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <ProfileField
            label="Cooking Preferences"
            value={profile.cookingPreferences}
            editMode={editMode}
            formValue={form.cookingPreferences}
            name="cookingPreferences"
            onChange={handleChange}
          />
          <ProfileField
            label="Dietary Preferences"
            value={profile.dietaryPreferences}
            editMode={editMode}
            formValue={form.dietaryPreferences}
            name="dietaryPreferences"
            onChange={handleChange}
          />
          <div>
            <label className="block uppercase text-xs font-medium text-gray-400 mb-1">Favorite Cuisines</label>
            {editMode ? (
              <div>
                {form.favoriteCuisines.map((c, idx) => (
                  <div key={idx} className="flex items-center mb-1">
                    <input
                      className="bg-[#262a36] border border-gray-700 text-gray-100 px-3 py-2 rounded w-full mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={c}
                      onChange={(e) => handleCuisineChange(e, idx)}
                    />
                    <button
                      type="button"
                      onClick={() => removeCuisine(idx)}
                      className="text-red-400 hover:text-red-300 px-2"
                      aria-label="Remove Cuisine"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCuisine}
                  className="mt-2 text-sm bg-[#262a36] px-3 py-1 rounded text-green-400 hover:bg-[#22262f]"
                >
                  Add Cuisine
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profile.favoriteCuisines.map((c, idx) => (
                  <span key={idx} className="bg-green-600 bg-opacity-20 text-green-300 px-3 py-1 rounded-full text-xs">{c}</span>
                ))}
              </div>
            )}
          </div>
          <ProfileField
            label="Allergies"
            value={profile.allergies}
            editMode={editMode}
            formValue={form.allergies}
            name="allergies"
            onChange={handleChange}
          />
          <div>
            <label className="block uppercase text-xs font-medium text-gray-400 mb-1">Skill Level</label>
            {editMode ? (
              <select
                className="bg-[#262a36] border border-gray-700 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                name="skillLevel"
                value={form.skillLevel}
                onChange={handleChange}
              >
                {skillLevels.map(lvl => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            ) : (
              <div className="bg-[#262a36] text-gray-200 px-4 py-2 rounded">{profile.skillLevel}</div>
            )}
          </div>
          <ProfileField
            label="Bio"
            value={profile.bio}
            editMode={editMode}
            formValue={form.bio}
            name="bio"
            onChange={handleChange}
            type="textarea"
          />
          {editMode && (
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <button
                type="button"
                className="bg-[#262a36] text-gray-400 px-6 py-2 rounded-full hover:bg-[#202430] transition"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-black px-6 py-2 rounded-full hover:bg-green-400 transition font-semibold"
              >
                Save
              </button>
            </div>
          )}
        </form>
      </div>
    </motion.div>
    </>
  );
}

function ProfileField({ label, value, editMode, formValue, onChange, name, type }) {
  if (!editMode) {
    return (
      <div>
        <label className="block uppercase text-xs font-medium text-gray-400 mb-1">{label}</label>
        <div className="bg-[#262a36] text-gray-200 px-4 py-2 rounded">{value}</div>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block uppercase text-xs font-medium text-gray-400 mb-1">{label}</label>
        <textarea
          name={name}
          rows={3}
          className="bg-[#262a36] border border-gray-700 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formValue}
          onChange={onChange}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block uppercase text-xs font-medium text-gray-400 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        className="bg-[#262a36] border border-gray-700 text-gray-100 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
        value={formValue}
        onChange={onChange}
      />
    </div>
  );
}

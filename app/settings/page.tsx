"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input, Textarea, Avatar } from "@nextui-org/react";

const supabase = createClient();

interface ProfileData {
  id: string;
  user_id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;
  area_of_interest: string[];
  description: string;
  username: string;
}

const Settings: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [formData, setFormData] = useState<Partial<ProfileData>>({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", "1") // Replace with dynamic ID
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data);
      setFormData(data);
    }
  };

  const handleChange = (field: keyof ProfileData, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveChanges = async () => {
    const { error } = await supabase
      .from("profiles")
      .update(formData)
      .eq("id", profile?.id);

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      alert("Profile updated successfully!");
      fetchProfile();
    }
  };

  if (!profile) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Settings Container */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-screen-md w-full relative">
        {/* Profile Header */}
        <div className="text-center mb-8 pt-16"> {/* Added padding to avoid overlap */}
          <div className="w-36 h-36 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <Avatar
              src="https://via.placeholder.com/150"
              name={`${formData.first_name || ""} ${formData.last_name || ""}`}
              className="w-full h-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong>Joined on:</strong> {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <Input
                placeholder="Enter your first name"
                value={formData.first_name || ""}
                onChange={(e) => handleChange("first_name", e.target.value)}
                variant = "bordered"
                size="lg"
                className="rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <Input
                placeholder="Enter your last name"
                value={formData.last_name || ""}
                onChange={(e) => handleChange("last_name", e.target.value)}
                variant = "bordered"
                size="lg"
                className="rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300">Username</label>
            <Input
              placeholder="Enter your username"
              value={formData.username || ""}
              onChange={(e) => handleChange("username", e.target.value)}
              variant = "bordered"
              size="lg"
              className="rounded-lg shadow-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300">Major</label>
              <Input
                placeholder="Enter your major"
                value={formData.major || ""}
                onChange={(e) => handleChange("major", e.target.value)}
                variant = "bordered"
                size="lg"
                className="rounded-lg shadow-sm"
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-700 dark:text-gray-300">Minor</label>
              <Input
                placeholder="Enter your minor"
                value={formData.minor || ""}
                variant = "bordered"
                onChange={(e) => handleChange("minor", e.target.value)}
                size="lg"
                className="rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Area of Interest
            </label>
            <Input
              placeholder="Enter interests separated by commas"
              value={(formData.area_of_interest || []).join(", ")}
              variant = "bordered"
              onChange={(e) =>
                handleChange(
                  "area_of_interest",
                  e.target.value.split(",").map((interest) => interest.trim())
                )
              }
              size="lg"
              className="rounded-lg shadow-sm"
            />
          </div>

          <div>
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <Textarea
              placeholder="Tell us about yourself..."
              value={formData.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              variant = "bordered"
              size="lg"
              className="rounded-lg shadow-sm"
            />
          </div>

          <button
            type="button"
            className="w-full py-3 font-bold text-lg rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={saveChanges}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

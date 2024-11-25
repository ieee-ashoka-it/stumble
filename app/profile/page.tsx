"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Input, Textarea, Button, Avatar } from "@nextui-org/react";

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
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", "1") // Replace with dynamic ID if needed
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfile(data);
        setFormData(data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (field: keyof ProfileData, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveChanges = async () => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update(formData)
        .eq("id", profile?.id);

      if (error) {
        console.error("Error updating profile:", error);
      } else {
        alert("Profile updated successfully!");
        fetchProfile(); // Refresh data
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 p-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mb-8">
        <Avatar
          src="https://via.placeholder.com/150"
          name={`${formData.first_name || ""} ${formData.last_name || ""}`}
          className="w-32 h-32 mb-4 border-4 border-primary rounded-full"
        />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">
          Edit Profile
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-600 mt-4">
          <strong>Joined on:</strong>{" "}
          {new Date(profile.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Settings Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
        <form>
          <Input
            label="First Name"
            placeholder="Enter your first name"
            value={formData.first_name || ""}
            onChange={(e) => handleChange("first_name", e.target.value)}
            className="mb-4"
          />
          <Input
            label="Last Name"
            placeholder="Enter your last name"
            value={formData.last_name || ""}
            onChange={(e) => handleChange("last_name", e.target.value)}
            className="mb-4"
          />
          <Input
            label="Username"
            placeholder="Enter your username"
            value={formData.username || ""}
            onChange={(e) => handleChange("username", e.target.value)}
            className="mb-4"
          />
          <Input
            label="Major"
            placeholder="Enter your major"
            value={formData.major || ""}
            onChange={(e) => handleChange("major", e.target.value)}
            className="mb-4"
          />
          <Input
            label="Minor"
            placeholder="Enter your minor"
            value={formData.minor || ""}
            onChange={(e) => handleChange("minor", e.target.value)}
            className="mb-4"
          />
          <Input
            label="Area of Interest"
            placeholder="Comma-separated values"
            value={(formData.area_of_interest || []).join(", ")}
            onChange={(e) =>
              handleChange(
                "area_of_interest",
                e.target.value.split(",").map((interest) => interest.trim())
              )
            }
            className="mb-4"
          />
          <Textarea
            label="Description"
            placeholder="Tell us about yourself..."
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            className="mb-4"
          />
          <Button className="w-full" onPress={saveChanges}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;

"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Chip, Avatar } from '@nextui-org/react';

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

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', '1') // Replace with dynamic ID if needed
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 p-6">
      {/* Profile Card */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full mb-8">
        <Avatar
          src="https://via.placeholder.com/150" // Replace with dynamic profile image if available
          name={`${profile.first_name} ${profile.last_name}`} // Fallback initials
          className="w-32 h-32 mb-4"
          size="xl"
          color="primary"
          bordered
        />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200 mb-2">{profile.first_name} {profile.last_name}</h1>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-400 mb-1">@{profile.username}</p>
        
        <p className="text-base text-gray-600 dark:text-gray-400 mb-2"><strong>Major:</strong> {profile.major}</p>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-2"><strong>Minor:</strong> {profile.minor}</p>
        <p className="text-base text-gray-600 dark:text-gray-500 mb-2">{profile.description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-600 mt-4"><strong>Joined on:</strong> {new Date(profile.created_at).toLocaleDateString()}</p>
      </div>

      {/* Areas of Interest */}
      <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-200 mb-4">Areas of Interest</h2>
        <div className="flex flex-wrap justify-center gap-2">
          {profile.area_of_interest.map((interest, index) => (
            <Chip key={index} variant="flat">
              {interest}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;

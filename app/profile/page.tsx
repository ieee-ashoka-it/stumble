"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserRoundPen } from "lucide-react";
import Link from "next/link";
import {
  Chip,
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Button,
} from "@nextui-org/react";

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
      .from("profiles")
      .select("*")
      .eq("id", "1") // Replace with dynamic ID if needed
      .single();

    if (error) {
      console.error("Error fetching profile:", error);
    } else {
      setProfile(data);
    }
  };

  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-6">
        <CardHeader className="flex flex-col sm:flex-row gap-4 p-6">
          <Avatar
            src="https://via.placeholder.com/150"
            name={`${profile.first_name} ${profile.last_name}`}
            className="w-24 h-24 sm:w-32 sm:h-32 text-large"
            size="lg"
            color="primary"
            isBordered
            showFallback
          />
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {profile.first_name} {profile.last_name}
                </h1>
                <p className="text-default-500">@{profile.username}</p>
              </div>
              <Button
                as={Link}
                href="/settings"
                variant="light"
                color="primary"
                isIconOnly
              >
                <UserRoundPen />
              </Button>
            </div>
            <p className="mt-4 text-default-500">{profile.description}</p>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Academic Details</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-default-500">Major:</span>
                  <span className="font-medium">{profile.major}</span>
                </div>
                {profile.minor && (
                  <div className="flex items-center gap-2">
                    <span className="text-default-500">Minor:</span>
                    <span className="font-medium">{profile.minor}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-3">Areas of Interest</h2>
              <div className="flex flex-wrap gap-2">
                {profile.area_of_interest.map((interest, index) => (
                  <Chip
                    key={index}
                    variant="flat"
                    color="warning"
                    className="capitalize"
                  >
                    {interest}
                  </Chip>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-default-400">
            Member since {new Date(profile.created_at).toLocaleDateString()}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;

"use client";
import React, { useState, useRef } from "react";
import TinderCard from "react-tinder-card";
import ReactCardFlip from "react-card-flip";
import { Card, CardBody, Avatar, Chip } from "@nextui-org/react";

interface UserProfile {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  major: string;
  minor: string;
  avatar_url: string;
  areasOfInterest: string[];
  description: string;
}

// Mock data - replace with actual API call
const db: UserProfile[] = [
  {
    id: "1",
    username: "john_doe",
    firstName: "John",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=1",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
  {
    id: "2",
    username: "jane_doe",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
  {
    id: "3",
    username: "jane_doe",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
  {
    id: "4",
    username: "jane_doe",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
  {
    id: "5",
    username: "jane_doe",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
  {
    id: "6",
    username: "jane_doe",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
  {
    id: "7",
    username: "jane_doe",
    firstName: "Jane",
    lastName: "Doe",
    major: "Computer Science",
    minor: "Mathematics",
    avatar_url: "https://i.pravatar.cc/150?u=2",
    areasOfInterest: ["AI", "Web Development", "Machine Learning"],
    description: "Looking to collaborate on exciting projects!",
  },
];

export default function MatchingPage() {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [isFlipped, setIsFlipped] = useState(false);
  const touchStartTime = useRef<number>(0);

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
  };

  const swiped = (direction: string, idToDelete: string, index: number) => {
    setTimeout(() => {
      updateCurrentIndex(index - 1);
    }, 300);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleTouchStart = () => {
    touchStartTime.current = Date.now();
  };

  const handleTouchEnd = () => {
    const touchDuration = Date.now() - touchStartTime.current;
    if (touchDuration < 150) {
      handleFlip();
    }
  };

  // Get 1 swiped card + 4 unseen cards + 1 new card
  const visibleCards = db.slice(
    Math.max(0, currentIndex - 5),
    Math.min(db.length, currentIndex + 2)
  );
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="relative w-full max-w-sm md:max-w-md h-[600px]">
        {visibleCards.map((profile, index) => (
          <TinderCard
            key={profile.id}
            onSwipe={(dir) =>
              swiped(
                dir,
                profile.id,
                currentIndex - (visibleCards.length - 1 - index)
              )
            }
            preventSwipe={["up", "down"]}
            className="absolute w-full h-full"
            swipeRequirementType="position"
            swipeThreshold={150}
          >
            <div
              onClick={handleFlip}
              className="w-full h-full"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <ReactCardFlip
                isFlipped={isFlipped}
                flipDirection="horizontal"
                containerClassName="w-full h-full"
              >
                {/* Front of card */}
                <Card className="w-full h-full flex flex-col justify-center items-center">
                  <CardBody className="text-center flex flex-col items-center justify-center">
                    <Avatar
                      src={profile.avatar_url}
                      className="w-48 h-48 mb-4"
                      isBordered
                    />
                    <h2 className="text-2xl font-bold">
                      {profile.firstName} {profile.lastName}
                    </h2>
                    <p className="text-gray-600">@{profile.username}</p>
                    <p className="font-semibold">{profile.major}</p>
                    {profile.minor && (
                      <p className="text-sm">Minor: {profile.minor}</p>
                    )}
                  </CardBody>
                </Card>

                {/* Back of card */}
                <Card className="w-full h-full flex flex-col justify-center items-center">
                  <CardBody className="text-center flex flex-col items-center justify-center">
                    <h3 className="text-xl font-semibold mb-4">About Me</h3>
                    <p>{profile.description}</p>
                    <hr className="w-full my-4 border-t border-gray-500" />
                    <div className="mb-4 flex flex-col items-center">
                      <div className="flex flex-wrap gap-2 justify-center">
                        {profile.areasOfInterest.map((interest, i) => (
                          <Chip key={i} variant="flat" color="warning">
                            {interest}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </ReactCardFlip>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
}

// MyMatches.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Trash2,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import { Card, CardBody, Button, Avatar, Chip } from "@nextui-org/react";

interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  researchInterests?: string[];
  mutualConnections?: number;
}

const likedUsers: UserProfile[] = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
    description:
      "Researching quantum computing and its applications in cryptography. Always excited to collaborate on innovative projects! I'm a big fan of the future of AI and quantum computing",
    researchInterests: ["Quantum Computing", "Cryptography", "AI"],
    mutualConnections: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=2",
    description: "Consectetur adipiscing elit.",
    researchInterests: ["Machine Learning", "Data Science"],
    mutualConnections: 5,
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=3",
    description: "Sed do eiusmod tempor incididunt.",
    researchInterests: ["Blockchain", "Cryptography"],
    mutualConnections: 8,
  },
  {
    id: "4",
    name: "Bob Brown",
    avatarUrl: "https://i.pravatar.cc/150?u=4",
    description: "Ut labore et dolore magna aliqua.",
    researchInterests: ["Quantum Computing", "Cryptography"],
    mutualConnections: 10,
  },
  {
    id: "5",
    name: "Charlie White",
    avatarUrl: "https://i.pravatar.cc/150?u=5",
    description: "Ut enim ad minim veniam.",
    researchInterests: ["Machine Learning", "Data Science"],
    mutualConnections: 6,
  },
  {
    id: "6",
    name: "David Black",
    avatarUrl: "https://i.pravatar.cc/150?u=6",
    description: "Quis nostrud exercitation ullamco laboris.",
    researchInterests: ["Quantum Computing", "Cryptography"],
    mutualConnections: 9,
  },
  // Add more users as needed
];

const CHARACTER_LIMIT = 150; // Adjust this number as needed

const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + "...";
};

const MyMatches: React.FC = () => {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-center mb-2">
            Your Research Matches
          </h1>
          <p className="text-center text-default-500">
            Connect with researchers who share your interests
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <AnimatePresence>
            {likedUsers.map((user) => (
              <Card
                key={user.id}
                as={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="border-none bg-background/60 dark:bg-default-100/50 w-full"
                shadow="sm"
              >
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Left Column - Avatar and Basic Info */}
                    <div className="flex flex-col items-center md:items-start space-y-4 md:w-48">
                      <div className="relative">
                        <Avatar
                          src={user.avatarUrl}
                          size="lg"
                          isBordered
                          className="w-24 h-24 text-large"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full ring-2 ring-white" />
                      </div>
                      <div className="text-center md:text-left">
                        <h2 className="font-semibold text-xl">{user.name}</h2>
                        <p className="text-sm text-default-500">
                          {user.mutualConnections} mutual connections
                        </p>
                      </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="flex-1 space-y-4">
                      {/* Research Interests */}
                      <div className="flex flex-wrap gap-2">
                        {user.researchInterests?.map((interest, index) => (
                          <Chip
                            key={index}
                            color="primary"
                            variant="flat"
                          >
                            {interest}
                          </Chip>
                        ))}
                      </div>

                      {/* Description */}
                      <motion.div layout>
                        <p className="text-default-500 text-sm">
                          {expandedIds.has(user.id)
                            ? user.description
                            : truncateText(user.description, CHARACTER_LIMIT)}
                        </p>
                        {user.description.length > CHARACTER_LIMIT && (
                          <button
                            onClick={() => toggleExpand(user.id)}
                            className="text-primary text-sm font-medium mt-2 hover:underline"
                          >
                            {expandedIds.has(user.id)
                              ? "Show less"
                              : "Show more"}
                          </button>
                        )}
                      </motion.div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap justify-between gap-3 pt-4 border-t border-default-200">
                        <Button
                          className="flex items-center gap-2"
                          color="primary"
                          variant="light"
                          startContent={<MessageCircle className="w-4 h-4" />}
                        >
                          Contact
                        </Button>
                        <Button
                          className="flex items-center gap-2"
                          color="danger"
                          variant="light"
                          startContent={<Trash2 className="w-4 h-4" />}
                          isIconOnly
                        ></Button>
                        {/* <Button
                          className="flex items-center gap-2"
                          color="secondary"
                          variant="light"
                          startContent={<Share2 className="w-4 h-4" />}
                        >
                          Share
                        </Button> */}
                      </div>
                    </div>

                    {/* Options Button */}
                    <Button
                      isIconOnly
                      variant="light"
                      className="text-default-600"
                      size="sm"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MyMatches;

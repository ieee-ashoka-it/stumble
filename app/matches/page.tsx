// MyMatches.tsx
"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { MessageCircle, Heart, Share2, MoreHorizontal } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
  description: string;
  interests?: string[];
  mutualConnections?: number;
}

const likedUsers: UserProfile[] = [
  {
    id: "1",
    name: "John Doe",
    avatarUrl: "https://i.pravatar.cc/150?u=1",
    description: "Researching quantum computing and its applications in cryptography. Always excited to collaborate on innovative projects!",
    interests: ["Quantum Computing", "Cryptography", "AI"],
    mutualConnections: 12,
  },
  {
    id: "2",
    name: "Jane Smith",
    avatarUrl: "https://i.pravatar.cc/150?u=2",
    description: "Consectetur adipiscing elit.",
    interests: ["Machine Learning", "Data Science"],
    mutualConnections: 5,
  },
  {
    id: "3",
    name: "Alice Johnson",
    avatarUrl: "https://i.pravatar.cc/150?u=3",
    description: "Sed do eiusmod tempor incididunt.",
    interests: ["Blockchain", "Cryptography"],
    mutualConnections: 8,
  },
  {
    id: "4",
    name: "Bob Brown",
    avatarUrl: "https://i.pravatar.cc/150?u=4",
    description: "Ut labore et dolore magna aliqua.",
    interests: ["Quantum Computing", "Cryptography"],
    mutualConnections: 10,
  },
  {
    id: "5",
    name: "Charlie White",
    avatarUrl: "https://i.pravatar.cc/150?u=5",
    description: "Ut enim ad minim veniam.",
    interests: ["Machine Learning", "Data Science"],
    mutualConnections: 6,
  },
  {
    id: "6",
    name: "David Black",
    avatarUrl: "https://i.pravatar.cc/150?u=6",
    description: "Quis nostrud exercitation ullamco laboris.",
    interests: ["Quantum Computing", "Cryptography"],
    mutualConnections: 9,
  },
  // Add more users as needed
];

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
    <div className="min-h-screen md:pt-12 bg-gradient-to-b from-background to-gray-50 dark:from-background dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-center mb-2">Your Likes</h1>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {likedUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src={user.avatarUrl}
                          alt={user.name}
                          width={60}
                          height={60}
                          className="rounded-full ring-2 ring-primary/20"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                      </div>
                      <div>
                        <h2 className="font-semibold text-xl">{user.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.mutualConnections} mutual connections
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Research Interests */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {user.interests?.map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <motion.div layout className="mb-4">
                    <p
                      className={`text-gray-600 dark:text-gray-300 text-sm ${
                        expandedIds.has(user.id) ? "" : "line-clamp-2"
                      }`}
                    >
                      {user.description}
                    </p>
                    <button
                      onClick={() => toggleExpand(user.id)}
                      className="text-primary text-sm font-medium mt-1 hover:underline"
                    >
                      {expandedIds.has(user.id) ? "Show less" : "Show more"}
                    </button>
                  </motion.div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">Message</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm">Connect</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm">Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default MyMatches;

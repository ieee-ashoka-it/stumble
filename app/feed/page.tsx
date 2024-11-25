// pages/feeds.tsx
"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import { Avatar } from '@nextui-org/react';
import { useSwipeable } from 'react-swipeable';

const sampleFeeds = [
  {
    username: 'johndoe',
    avatarUrl: 'https://i.pravatar.cc/150?u=johndoe',
    feedImageUrl: 'https://via.placeholder.com/600',
    caption: 'Loving this view!',
  },
  {
    username: 'janedoe',
    avatarUrl: 'https://i.pravatar.cc/150?u=janedoe',
    feedImageUrl: 'https://via.placeholder.com/600',
    caption: 'Beautiful sunset!',
  },
  {
    username: 'alexdoe',
    avatarUrl: 'https://i.pravatar.cc/150?u=alexdoe',
    feedImageUrl: 'https://via.placeholder.com/600',
    caption: 'A wonderful day at the beach!',
  },
  // Add more sample feeds here
];

const Feeds: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedUp: () => {
      if (currentIndex < sampleFeeds.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    },
    onSwipedDown: () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    // preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 p-6">
      <Head>
        <title>Feeds</title>
        <meta name="description" content="Latest feeds from users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-4xl font-bold text-center mb-8 text-yellow-500 dark:text-yellow-300">
        Feeds
      </h1>
      <div className="w-full max-w-md">
        <div className="flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-6 w-full transition-transform duration-500 ease-in-out transform">
          <div className="flex items-center mb-4">
            <Avatar
              src={sampleFeeds[currentIndex].avatarUrl}
              name={sampleFeeds[currentIndex].username}
              size="md"
              className="mr-3"
            />
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">{sampleFeeds[currentIndex].username}</p>
          </div>
          <img src={sampleFeeds[currentIndex].feedImageUrl} alt="Feed" className="rounded-lg mb-4" />
          <p className="text-base text-gray-700 dark:text-gray-400">{sampleFeeds[currentIndex].caption}</p>
        </div>
      </div>
    </div>
  );
};

export default Feeds;

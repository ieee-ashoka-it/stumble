import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Shuffle } from "lucide-react";
import { avatarOptions } from "./avatarOptions";
import { AvatarOptions } from "./avatarTypes";
import { Avatar, Button, ScrollShadow } from "@nextui-org/react";

const generateDiceBearURL = (options: AvatarOptions) => {
  // Base URL for DiceBear Avataaars API
  const baseUrl = "https://api.dicebear.com/9.x/avataaars/svg";

  // Convert options object to URL parameters
  const params = new URLSearchParams();

  if (options.facialHair && options.facialHair[0] !== "none") {
    params.append("facialHairProbability", "100");
  } else {
    params.append("facialHairProbability", "0");
  }

  if (options.accessories && options.accessories[0] !== "none") {
    params.append("accessoriesProbability", "100");
  } else {
    params.append("accessoriesProbability", "0");
  }

  // Add each option to the URL parameters if it exists
  Object.entries(options).forEach(([key, value]) => {
    if ((key === "facialHair" || key === "accessories") && value[0] === "none")
      return;
    if (value && value[0]) {
      params.append(key, value[0]);
    }
  });
  params.append("style", "circle");

  // Return the complete URL
  return `${baseUrl}?${params.toString()}`;
};

const AvatarBuilder = ({
  setAvatarUrl,
}: {
  setAvatarUrl: (url: string) => void;
}) => {
  const [options, setOptions] = useState<AvatarOptions>({});
  const [localUrl, setLocalUrl] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<keyof AvatarOptions>("eyes");
  const isInitialMount = useRef(true);

  // Initialize options only once
  useEffect(() => {
    if (isInitialMount.current) {
      const initialOptions = {
        accessories: [
          avatarOptions.accessories[
            Math.floor(Math.random() * avatarOptions.accessories.length)
          ],
        ],
        accessoriesColor: [
          avatarOptions.accessoriesColor[
            Math.floor(Math.random() * avatarOptions.accessoriesColor.length)
          ],
        ],
        facialHair: [
          avatarOptions.facialHair[
            Math.floor(Math.random() * avatarOptions.facialHair.length)
          ],
        ],
        facialHairColor: [
          avatarOptions.facialHairColor[
            Math.floor(Math.random() * avatarOptions.facialHairColor.length)
          ],
        ],
        hairColor: [
          avatarOptions.hairColor[
            Math.floor(Math.random() * avatarOptions.hairColor.length)
          ],
        ],
        hatColor: [
          avatarOptions.hatColor[
            Math.floor(Math.random() * avatarOptions.hatColor.length)
          ],
        ],
        mouth: [
          avatarOptions.mouth[
            Math.floor(Math.random() * avatarOptions.mouth.length)
          ],
        ],
      };
      const url = generateDiceBearURL(initialOptions);
      setOptions(initialOptions);
      setLocalUrl(url);
      setAvatarUrl(url);
      isInitialMount.current = false;
    }
  }, [setAvatarUrl]);

  const handleOptionChange = (
    key: keyof AvatarOptions,
    direction: "next" | "prev"
  ) => {
    if (!options[key]) return;

    const currentValue = options[key][0];
    const optionsArray = avatarOptions[key] as unknown as string[];
    const currentIndex = optionsArray.indexOf(currentValue);

    let newIndex;
    if (direction === "next") {
      newIndex =
        currentIndex === optionsArray.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? optionsArray.length - 1 : currentIndex - 1;
    }

    const newOptions = {
      ...options,
      [key]: [optionsArray[newIndex]],
    };

    const newUrl = generateDiceBearURL(newOptions);
    setOptions(newOptions);
    setLocalUrl(newUrl);
    setAvatarUrl(newUrl);
  };

  const handleRandomize = () => {
    const newOptions = {
      accessories: [
        avatarOptions.accessories[
          Math.floor(Math.random() * avatarOptions.accessories.length)
        ],
      ],
      accessoriesColor: [
        avatarOptions.accessoriesColor[
          Math.floor(Math.random() * avatarOptions.accessoriesColor.length)
        ],
      ],
      clothing: [
        avatarOptions.clothing[
          Math.floor(Math.random() * avatarOptions.clothing.length)
        ],
      ],
      clothingGraphic: [
        avatarOptions.clothingGraphic[
          Math.floor(Math.random() * avatarOptions.clothingGraphic.length)
        ],
      ],
      clothesColor: [
        avatarOptions.clothesColor[
          Math.floor(Math.random() * avatarOptions.clothesColor.length)
        ],
      ],
      eyebrows: [
        avatarOptions.eyebrows[
          Math.floor(Math.random() * avatarOptions.eyebrows.length)
        ],
      ],
      eyes: [
        avatarOptions.eyes[
          Math.floor(Math.random() * avatarOptions.eyes.length)
        ],
      ],
      facialHair: [
        avatarOptions.facialHair[
          Math.floor(Math.random() * avatarOptions.facialHair.length)
        ],
      ],
      facialHairColor: [
        avatarOptions.facialHairColor[
          Math.floor(Math.random() * avatarOptions.facialHairColor.length)
        ],
      ],
      hairColor: [
        avatarOptions.hairColor[
          Math.floor(Math.random() * avatarOptions.hairColor.length)
        ],
      ],
      hatColor: [
        avatarOptions.hatColor[
          Math.floor(Math.random() * avatarOptions.hatColor.length)
        ],
      ],
      mouth: [
        avatarOptions.mouth[
          Math.floor(Math.random() * avatarOptions.mouth.length)
        ],
      ],
      skinColor: [
        avatarOptions.skinColor[
          Math.floor(Math.random() * avatarOptions.skinColor.length)
        ],
      ],
      top: [
        avatarOptions.top[Math.floor(Math.random() * avatarOptions.top.length)],
      ],
      backgroundColor: [
        avatarOptions.backgroundColor[
          Math.floor(Math.random() * avatarOptions.backgroundColor.length)
        ],
      ],
    };

    const newUrl = generateDiceBearURL(newOptions);
    setOptions(newOptions);
    setLocalUrl(newUrl);
    setAvatarUrl(newUrl);
  };

  const categories: { key: keyof AvatarOptions; label: string }[] = [
    { key: "eyes", label: "Eyes" },
    { key: "eyebrows", label: "Eyebrows" },
    { key: "mouth", label: "Mouth" },
    { key: "facialHair", label: "Facial Hair" },
    { key: "facialHairColor", label: "Facial Hair Color" },
    { key: "top", label: "Hair Style" },
    { key: "hairColor", label: "Hair Color" },
    { key: "accessories", label: "Accessories" },
    { key: "accessoriesColor", label: "Accessories Color" },
    { key: "clothing", label: "Clothing" },
    { key: "clothesColor", label: "Clothes Color" },
    { key: "clothingGraphic", label: "Clothing Graphic" },
    { key: "skinColor", label: "Skin Color" },
    { key: "hatColor", label: "Hat Color" },
    { key: "backgroundColor", label: "Background" },
  ];

  return (
    <div className="flex gap-4 text-white w-full h-full">
      {/* Left side - Avatar Preview */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full p-2 mx-auto"
        >
          {localUrl && (
            <Avatar
              src={localUrl}
              alt="avatar"
              className="rounded-full w-full h-full bg-transparent"
              imgProps={{
                loading: "eager",
                crossOrigin: "anonymous",
                fetchPriority: "high",
              }}
            />
          )}
        </motion.div>

        {/* Option Selector below avatar */}
        <div className="flex flex-col items-center mt-4 space-y-3">
          <div className="flex items-center justify-center gap-2 p-2 sm:p-4 md:px-16 w-full rounded-lg">
            <Button
              isIconOnly
              onClick={() => handleOptionChange(selectedCategory, "prev")}
              className="p-1 sm:p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <div className="flex-1 text-center min-w-0">
              <div className="text-xs sm:text-sm text-gray-400 mb-1">
                {categories.find((c) => c.key === selectedCategory)?.label}
              </div>
              <div className="font-medium text-sm sm:text-base truncate px-1">
                {options[selectedCategory]?.[0]}
              </div>
            </div>

            <Button
              isIconOnly
              onClick={() => handleOptionChange(selectedCategory, "next")}
              className="p-1 sm:p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Random Button */}
          <Button
            onClick={handleRandomize}
            className="mx-auto"
            startContent={<Shuffle className="w-5 h-5" />}
            color="warning"
            variant="light"
          ></Button>
        </div>
      </div>

      {/* Right side - Categories */}
      <div className="w-36 sm:w-44 md:w-72 space-y-1 sm:space-y-2">
        <h3 className="text-sm sm:text-base font-semibold mb-2 sm:mb-4">
          Categories
        </h3>
        <ScrollShadow
          className="space-y-1 sm:space-y-2 h-[400px] sm:h-[500px] pr-1 sm:pr-2 "
          size={20}
        >
          {categories.map(({ key, label }) => (
            <Button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`w-full text-left px-2 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm`}
              variant={selectedCategory === key ? "flat" : "light"}
              color="primary"
            >
              {label}
            </Button>
          ))}
        </ScrollShadow>
      </div>
    </div>
  );
};

export default AvatarBuilder;

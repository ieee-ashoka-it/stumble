"use client";
import { useState } from "react";
import AvatarBuilder from "@/components/avatar/avatar_builder";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Textarea,
  Chip,
  SelectedItems,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { interests, majors, minors } from "./options";
import { Check } from "lucide-react";

interface OnboardingData {
  username: string;
  firstName: string;
  lastName: string;
  major: string;
  minor: string;
  avatar_url: string;
  areasOfInterest: string[];
  description: string;
}

const STEPS = ["Create Avatar", "Basic Info", "Interests"];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OnboardingData>({
    username: "",
    firstName: "",
    lastName: "",
    major: "",
    minor: "",
    avatar_url: "",
    areasOfInterest: [],
    description: "",
  });

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const setInputFormData = (
    key: keyof OnboardingData,
    value: string | string[]
  ) => {
    console.log(key, value);
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isStepComplete = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return !!formData.avatar_url;
      case 1:
        return !!(
          formData.username &&
          formData.firstName &&
          formData.lastName &&
          formData.major
        );
      case 2:
        return !!(formData.areasOfInterest.length && formData.description);
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <AvatarBuilder
            setAvatarUrl={(url) =>
              setFormData({ ...formData, avatar_url: url })
            }
          />
        );
      case 1:
        return (
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <Input
              label="Username"
              value={formData.username}
              onChange={(e) => setInputFormData("username", e.target.value)}
              isRequired
              variant="bordered"
            />
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => setInputFormData("firstName", e.target.value)}
              isRequired
              variant="bordered"
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => setInputFormData("lastName", e.target.value)}
              isRequired
              variant="bordered"
            />
            <Autocomplete
              label="Major"
              defaultItems={majors.map((major) => ({
                label: major,
                value: major,
              }))}
              selectedKey={formData.major}
              onSelectionChange={(key) =>
                setInputFormData("major", key as string)
              }
              className="max-w-md"
              isRequired
              variant="bordered"
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <Autocomplete
              label="Minor"
              defaultItems={minors.map((minor) => ({
                label: minor,
                value: minor,
              }))}
              selectedKey={formData.minor}
              onSelectionChange={(key) =>
                setInputFormData("minor", key as string)
              }
              className="max-w-md"
              variant="bordered"
            >
              {(item) => (
                <AutocompleteItem key={item.value}>
                  {item.label}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4 w-full max-w-md mx-auto">
            <Select
              label="Areas of Interest (Select them in order of preference)"
              selectionMode="multiple"
              selectedKeys={formData.areasOfInterest}
              isMultiline
              onSelectionChange={(keys) =>
                setInputFormData(
                  "areasOfInterest",
                  Array.from(keys) as string[]
                )
              }
              className="max-w-md"
              variant="bordered"
              renderValue={(items: SelectedItems<object>) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <Chip key={item.key}>{item.textValue}</Chip>
                    ))}
                  </div>
                );
              }}
            >
              {interests.map((interest) => (
                <SelectItem key={interest} value={interest}>
                  {interest}
                </SelectItem>
              ))}
            </Select>
            <Textarea
              label="Bio"
              value={formData.description}
              onChange={(e) => setInputFormData("description", e.target.value)}
              isRequired
              minRows={3}
              maxRows={6}
              className="max-w-md"
              variant="bordered"
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background w-full h-full p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center md:mx-16">
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-col items-center relative">
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 transition-colors
                    ${
                      currentStep === index
                        ? "border-primary bg-primary text-white"
                        : currentStep > index || isStepComplete(index)
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-gray-100 text-gray-400"
                    }`}
                >
                  {currentStep > index || isStepComplete(index) ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-2 text-center">
                  <span
                    className={`text-sm font-medium ${
                      currentStep === index
                        ? "text-primary"
                        : currentStep > index || isStepComplete(index)
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 md:mx-16">
          <Button
            onClick={handleBack}
            isDisabled={currentStep === 0}
            variant="flat"
            color="danger"
            className="min-w-[100px]"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            isDisabled={
              currentStep === STEPS.length - 1 || !isStepComplete(currentStep)
            }
            variant="flat"
            color="success"
            className="min-w-[100px]"
          >
            {currentStep === STEPS.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}

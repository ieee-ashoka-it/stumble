import React from "react";
import Link from "next/link";
import Image from "next/image";

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  category: string;
  content: string;
  src: string;
  register: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  category,
  content,
  src,
  register,
}) => {
  return (
    <div className="border rounded-lg p-6 md:p-10 mb-4 shadow-md flex flex-col md:flex-row">
      <div className="flex-grow mb-6 md:mb-0 md:pr-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="mb-2">{date}</p>
        <p className="mb-2">{category}</p>
        <p className="mb-4">{content}</p>
        <Link href={`/events/${id}`} className="text-blue-500 hover:underline">
          Learn More
        </Link>
      </div>
      <div className="w-full md:w-1/3 flex-shrink-0 md:p-2 rounded-lg">
        <div className="rounded-xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:scale-[1.02]">
          <Image
            src={src}
            alt={title}
            width={300}
            height={300}
            className="object-cover w-full h-full hover:scale-105 transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import React from 'react';
import { motion } from 'framer-motion';

const CoachCards = ({coachesList, setSelectedCoach}) => {
  return (
    <>
    {coachesList?.map((coach, index) => (
        <motion.button
        initial={{
            opacity: 0, 
        }}
        animate={{
            opacity: [0, 1]
        }}
        transition={{
            duration: 0.5, 
            delay: index/9
        }}
        //drag={true}
         onClick={() => setSelectedCoach(coach)} key={index} className="bg-white h-80 rounded-lg shadow-md pt-7">
        <img
          className="w-32 h-32 rounded-full mx-auto"
          src={coach.picture.large}
          alt="coach"
        />
        <figcaption className="text-center mt-5">
          <p className="text-gray-700 font-semibold text-xl mb-2">
            {coach.name.first} {coach.name.last}
          </p>
          <p className="text-gray-500">
            <span className="font-medium">Email:</span> {coach.email}
          </p>
          <p className="text-gray-500">
            <span className="font-medium">Tel:</span> {coach.cell}
          </p>
          <p className="text-gray-500">
            <span className="font-medium">Ville:</span> {coach.location.city}
          </p>
        </figcaption>
      </motion.button>
    ))
        
    }
      
    </>
  );
};

export default CoachCards;

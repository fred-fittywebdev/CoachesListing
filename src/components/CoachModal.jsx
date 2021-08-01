import React from 'react'
import { motion } from 'framer-motion'

function CoachModal({coach, setSelectedCoach}) {
    const closeModal = event => {
        if(event.keyCode === 27) setSelectedCoach(null)
        if (event.currentTarget === event.target) setSelectedCoach(null)
      }
    
      window.addEventListener('keydown', event => closeModal(event))
    
      return (
        <div className={style.overlay}>
          <div className={style.container} onClick={event => closeModal(event)}>
            <motion.div
             initial={{scale:0.7}}
             animate={{scale: [0.7, 1.5, 1]}}
             exit={{scale: 0}}
             className={style.modal}>
              <p className={style.title}>
                {coach.name.title} {coach.name.first} {coach.name.last}
              </p>
              <div className={style.content}>
                <p className="font-medium">Pseudo:</p>
                <p>{coach.login.username}</p>
                <p className="font-medium">Genre:</p>
                <p>{coach.gender}</p>
                <p className="font-medium">Ville:</p>
                <p>{coach.location.city}, {coach.location.state}</p>
                <p className="font-medium">Pays:</p>
                <p>{coach.location.country}</p>
                <p className="font-medium">Code Postal:</p>
                <p>{coach.location.postcode}</p>
                <p className="font-medium">Téléphone:</p>
                <p>{coach.cell}</p>
                <p className="font-medium">Email:</p>
                <p>{coach.email}</p>
                <p className="font-medium">Age:</p>
                <p>{coach.dob.age}</p>
              </div>
            </motion.div>
          </div>
        </div>
      )
}
const style = {
    overlay: 'fixed top-0 h-screen w-screen bg-black bg-opacity-50',
    container: 'flex h-screen',
    modal: 'm-auto bg-white rounded-lg shadow-lg px-14 pt-5 pb-10',
    title: 'text-center mb-5 text-gray-700 font-semibold text-xl',
    content: 'grid grid-cols-2 text-gray-600 gap-x-0'
  }
  

export default CoachModal

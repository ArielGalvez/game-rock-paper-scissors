import React, { useState } from "react";
import { useGameStore } from "../../Store";
import { ModalPortal } from "../Modal/Modal";
import { Rules } from "../Rules/Rules";
import "./Layout.css";
export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { score } = useGameStore((state) => ({
    score: state.score,
  }));
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      <main>
        <header>
          <div className="header_box">
            <div className="options">
              <p>ROCK</p>
              <p>PAPPER</p>
              <p>SCISSORS</p>
            </div>
            <div className="score">
              <p>SCORE</p>
              <h3>{score}</h3>
            </div>
          </div>
        </header>
        {children}
        <div className="rules">
          <button onClick={handleOpenModal}>RULES</button>
          {
            <ModalPortal isOpen={isOpen} onClose={handleCloseModal}>
              <Rules />
            </ModalPortal>
          }
        </div>
      </main>
    </div>
  );
};

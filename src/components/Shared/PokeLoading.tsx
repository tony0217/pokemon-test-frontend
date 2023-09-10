import React from 'react'
import Pokeball from '@assets/icons/Pokeball.png'

import { styled, keyframes } from '@mui/system';

const pulseAnimation = keyframes`
  0% {
    transform: scale(0.8);
  }

  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(0.8);
  }
`;


const PulsatingImage = styled('img')`
  animation: ${pulseAnimation} 1s infinite; // Aplica la animación
`;

const PokeLoading = () => {


  return (

    <div>
      <PulsatingImage
        src={Pokeball}
        alt="Imagen"
        width="200px"
      />
    </div>
  );
}

export default PokeLoading
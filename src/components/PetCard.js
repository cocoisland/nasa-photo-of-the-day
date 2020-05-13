import React from 'react';
import styled from 'styled-components';

const DogCard = styled.div`
    background:#99f3eb;
    color:black;
    width: 200px;
    max-height: 300px;
    display: flex;
    flex-flow: row wrap ;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const DogImage = styled.img` 
    width: 200px;
    height: 200px;
    object-fit: scale;
    flex-shrink: 2;
`;

const PetCard = props => {
    return (
        <DogCard>
            <DogImage alt="random dog" src={props.imgUrl} />
            <h2>{props.petBreed}</h2>
        </DogCard>
    )
}

export default PetCard;
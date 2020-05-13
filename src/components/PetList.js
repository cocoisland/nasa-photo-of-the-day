import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import PetCard from './PetCard';

const DogContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-flow: column wrap;
width: 100%;
text-align: center;
margin: 10% 0;
min-height: 200px;
background-color: rgba(33, 33, 33, .3);
align-items: center;
`;

const DogButton = styled.button`
    width: 100px;
    height: ${props => props.selected ? '50px' : '30px' };
    background: ${props => props.selected ? 'hotpink' : '#2a2223'};
    color: #ffffff;
    border: 0;
    margin: 5px, 10px;
    &:hover {
        background: #ffffff;
        color: #2a2223;
    } 
`;

const DogButton2 = styled(DogButton)`
    color: white;
    background: #17a2b8;
`;

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [breeds, setBreeds] = useState("hound")

    useEffect( () => {
        axios
            .get(`https://dog.ceo/api/breed/${breeds}/images/random/15`)
            .then(response => {
                console.log('hello ',response);
                setPets(response.data.message) // message contains lists of urls.
            })
            .catch(err => console.log('Error : ', err));

    }, [breeds]); 

    return (
        <DogContainer>
            {<DogButton selected onClick={()=>setBreeds('mastiff')} >Mastiff</DogButton> }
            {<DogButton2 onClick={()=>setBreeds('labrador')} >Labrador</DogButton2> }
        
        { pets.map(url=>(<PetCard key={url} petBreed={breeds} imgUrl={url} />))}
        
        </DogContainer>
    );
};

export default PetList;
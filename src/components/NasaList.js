import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NasaPhotoCard from './NasaPhotoCard'



const NasaList = () => {
    const [nasaPhoto, setNasaPhoto] = useState([]);

    useEffect( () => {
        axios
            .get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
            .then(response => {
                console.log('hello ',response);
                setNasaPhoto(response.data)
            })
            .catch(err => console.log('Error : ', err));

        /* Clean up Effect
        window.addEventListener('mouseEvent', setEventFunction);
        return () => { window.removeEventListener('mouseEvent', setEventFunction);};
        */

    }, []);
 

    return (
        <div className="container" >
         <div className="entry">
             {/* nasaPhoto is a single photo of the day. Not an array, no map. */}
            { <NasaPhotoCard  entry={nasaPhoto}  /> }
     
        </div>
        </div>
    );
};

export default NasaList;
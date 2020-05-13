/* ICE - import, component, export */

import React from 'react';

// destructure () - (props) - ({photo})
const NasaPhotoCard = ({entry}) => {    

    return (
        <div className='photo-header'>
            <h2>{entry.title}</h2>
            <p>{entry.date}</p>
            <p>{entry.explanation}</p>

            <div className='photo-image'>
                <img alt='photo of the day' src={entry.url} />
            </div>
        </div>
    )
};

export default NasaPhotoCard;
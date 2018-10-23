import React from 'react';

const Card = ({ url, image_url, name, rating, price }) => {
  return (
    <div
      className='bg-white dib br3 pa2 ma2 grow bw2 shadow-5'
      width='288px'
      height='380px'>
      <a href={url} target='_blank' rel="noopener noreferrer">
        <img
          alt='restaurant'
          src={image_url}
          width='288px'
          height='288px'
        />
        <h4
          className='ma1 tl'
          style={{wordWrap: 'break-word',
                  width:'288px',
                  color:'black',
                  textDecoration:'none'}}>
          {name}
        </h4>
        <ul
          className='ma1 tl'
          style={{color:'black', textDecoration:'none'}} >
          <li>Rating: {rating}</li>
          <li>Price: {price}</li>
        </ul>
      </a>
    </div>
  )
}

export default Card;

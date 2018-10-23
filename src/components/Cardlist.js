import React from 'react';
import Card from './Card';

const Cardlist = ({restaurants}) => {
  return (
    <div>
      {
        restaurants.map((e, i) => {
          return <Card key={i} url={e.url} image_url={e.image_url} name={e.name} rating={e.rating} price={e.price}/>
        })
      }
    </div>
  )
}

export default Cardlist;

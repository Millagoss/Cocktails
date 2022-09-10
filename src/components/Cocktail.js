import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cocktail = ({ cocktail }) => {
  const { image, id, name, info, glass } = cocktail;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cocktail/${id}`);
  };

  return (
    <article className='cocktail' onClick={handleClick}>
      <div className='img-container'>
        <img src={image} alt={name} />
      </div>
      <div className='cocktail-footer'>
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
      </div>
    </article>
  );
};

export default Cocktail;

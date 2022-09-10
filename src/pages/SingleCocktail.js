import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams();
  const [singleDrink, setSingleDrink] = useState(null);
  const [isLoading, setIsLoadng] = useState(false);

  useEffect(() => {
    setIsLoadng(true);
    const fetchSingleDrink = async () => {
      try {
        const resp = await fetch(`${url}${id}`);
        const { drinks } = await resp.json();

        if (drinks) {
          const {
            idDrink: id,
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1: ingredient1,
            strIngredient2: ingredient2,
            strIngredient3: ingredient3,
            strIngredient4: ingredient4,
          } = drinks[0];
          const newDrink = {
            id,
            name,
            image,
            info,
            category,
            instructions,
            glass,
            ingredient1,
            ingredient2,
            ingredient3,
            ingredient4,
          };
          setIsLoadng(false);
          setSingleDrink(newDrink);
        } else {
          setSingleDrink(null);
          setIsLoadng(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleDrink();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  if (!singleDrink) {
    return <h2 className='section-title'>no coktail to display</h2>;
  }

  const {
    name,
    image,
    info,
    glass,
    instructions,
    category,
    ingredient1,
    ingredient2,
    ingredient3,
    ingredient4,
  } = singleDrink;
  const ingredients = [ingredient1, ingredient2, ingredient3, ingredient4];
  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back to home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name :</span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category :</span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info :</span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass :</span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions :</span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients:</span>
            {ingredients.map((ing, index) => {
              return ing ? <span key={index}>{ing}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;

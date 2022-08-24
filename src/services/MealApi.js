const FIRST_LETTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const CATEGORY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const NAME_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const INGREDIENT_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const FILTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const RECIPE_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

const filterEndpoint = (type, endpoint) => {
  switch (type) {
  case 'firstLetter':
    return (FIRST_LETTER_ENDPOINT + endpoint);
  case 'name':
    return (NAME_ENDPOINT + endpoint);
  case 'filter':
    return (FILTER_ENDPOINT + endpoint);
  case 'ingredient':
    return (INGREDIENT_ENDPOINT + endpoint);
  case 'recipe':
    return (RECIPE_ENDPOINT + endpoint);
  default:
    return ('');
  }
};
const getMealApi = async (type, endpoint) => {
  const URL = filterEndpoint(type, endpoint);
  try {
    const recipeResponse = await fetch(URL);
    const recipeJson = await recipeResponse.json();
    const categoryResponse = await fetch(CATEGORY_ENDPOINT);
    const categoryJson = await categoryResponse.json();
    const apiResponse = {
      meals: recipeJson.meals,
      categoryMeals: categoryJson.meals,
    };
    return apiResponse;
  } catch (error) {
    return error;
  }
};

export default getMealApi;

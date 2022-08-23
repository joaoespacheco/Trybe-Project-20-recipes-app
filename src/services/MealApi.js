const FIRST_LETTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const CATEGORY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const NAME_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const INGREDIENT_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

const filterEndpoint = (type, enpoint) => {
  switch (type) {
  case 'firstLetter':
    return (FIRST_LETTER_ENDPOINT + enpoint);
  case 'name':
    return (NAME_ENDPOINT + enpoint);
  case 'category':
    return (CATEGORY_ENDPOINT);
  case 'ingredient':
    return (INGREDIENT_ENDPOINT + enpoint);
  default:
    return ('');
  }
};
const getMealApi = async (type, enpoint) => {
  const URL = filterEndpoint(type, enpoint);
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

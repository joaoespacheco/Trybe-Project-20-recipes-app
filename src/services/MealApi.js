const FIRST_LETTER_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const CATEGORY_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/categories.php';
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
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
};

export default getMealApi;

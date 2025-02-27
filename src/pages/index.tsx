import { Search2Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RECIPES } from '../constants/recipes';
import { Recipe } from '../types/recipe';

const Index = () => {
  const [filter, setFilter] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES);

  useEffect(() => {
    // To filter by category
    if (filter == '') {
      setRecipes(RECIPES);
    } else {
      setRecipes(RECIPES.filter((recipe) => filter.includes(recipe.category)));
    }
  }, [filter]);

  useEffect(() => {
    // To search by name or ingredients
    if (search == '') {
      setRecipes(RECIPES);
    } else {
      setRecipes(
        RECIPES.filter((recipe) =>
          recipe.name.toLowerCase().includes(search.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.name.toLowerCase().includes(search.toLowerCase())
          )
            ? true
            : false
        )
      );
    }
  }, [search]);

  return (
    <Stack justifyContent={'center'}>
      <Heading my={3} textAlign={'center'}>
        Recipes Book
      </Heading>

      <Stack width={'70%'} mx={'auto'} my={5} gap={5}>
        {/* search input */}
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          {/* TODO: add functionality */}
          <Input
            placeholder="Search recipe name/ingredients"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        {/* filter */}
        <Stack direction="row" gap={2} alignItems="center">
          <Text mr={3}>Filter: </Text>
          <Button
            onClick={() => {
              filter == '' ? setFilter('Breakfast') : setFilter('');
            }}
            colorScheme={filter == 'Breakfast' ? 'orange' : 'gray'}
          >
            Breakfast
          </Button>
          <Button
            onClick={() => {
              filter == '' ? setFilter('Lunch') : setFilter('');
            }}
            colorScheme={filter == 'Lunch' ? 'orange' : 'gray'}
          >
            Lunch
          </Button>
          <Button
            onClick={() => {
              filter == '' ? setFilter('Dinner') : setFilter('');
            }}
            colorScheme={filter == 'Dinner' ? 'orange' : 'gray'}
          >
            Dinner
          </Button>
          <Button
            onClick={() => {
              filter == '' ? setFilter('Dessert') : setFilter('');
            }}
            colorScheme={filter == 'Dessert' ? 'orange' : 'gray'}
          >
            Dessert
          </Button>
        </Stack>

        {/* recipe list */}
        {recipes.map((recipe) => (
          <Link to={`/detail/${recipe.id}`}>
            <Stack
              direction={{ base: 'column-reverse', lg: 'row' }}
              key={recipe.id}
              justifyContent={'space-between'}
              gap={2}
              _hover={{ cursor: 'pointer', backgroundColor: 'gray.100' }}
            >
              <Box>
                <Heading as="h2" size="lg">
                  {recipe.name}
                </Heading>
                <Tag>{recipe.category}</Tag>
                <Text>
                  Waktu memasak: {recipe.cookingTime.amount}{' '}
                  {recipe.cookingTime.unit}
                </Text>
                <Text>
                  Bahan:{' '}
                  {recipe.ingredients.map((ingredient, i) => (
                    <span>
                      {ingredient.name}
                      {i < recipe.ingredients.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </Text>
              </Box>
              <Image
                src={recipe.image}
                alt={recipe.name}
                width={{ lg: '20vw' }}
              />
            </Stack>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default Index;

import { ChartNoAxesCombined, Compass, Library, Settings2, TrendingUp, Shuffle } from 'lucide-react';

export const nav = [
  ['explore', 'Explore', Compass],
  ['concepts', 'Concepts', Library],
  ['risk', 'Launch Risk', ChartNoAxesCombined],
  ['commodity', 'Commodity Price Trend', TrendingUp],
  ['reformulation', 'Reformulation Tool', Shuffle],
  ['configure', 'Configure', Settings2]
];
export const filtersConfig = {
  'Product Category': ['Composite foods', 'Fat and sauces', 'Fish Meat Eggs', 'Prepared meals', 'Snacks'],
  'Food Group': ['Dressings and sauces', 'Eggs', 'Pizza pies and quiches', 'Processed meat', 'Sandwiches', 'Soups', 'Sweet bakery products'],
  'Labelling/Claims': ['Fat Free', 'High Fibre', 'High Protein', 'Keto-friendly', 'Low Carb', 'Low Sugar', 'No Added Sugar', 'Organic', 'Vegan', 'Gluten Free', 'Clean Label'],
  Allergens: ['allergen free', 'celery', 'eggs', 'fish', 'gluten', 'milk', 'mustard', 'nuts', 'soy'],
  Flavour: ['bbq', 'cheesy/creamy', 'citrus', 'fruity', 'garlic/onion', 'herby', 'mediterranean style', 'salty', 'sour/tangy', 'spicy', 'sweet/savoury'],
  Ingredient: ['almond', 'apple', 'barley', 'beef', 'calcium carbonate', 'citric acid', 'garlic', 'mozzarella', 'paprika', 'yeast']
};

export function item(name, category, group, claims, allergens, flavours, ingredients, brand, list) {
  return { name, category, group, claims, allergens, flavours, ingredients, brand, list };
}
export const products = [
  item('Apple Pie','Composite foods','Sweet bakery products',['Clean Label'],['eggs','gluten','milk','nuts'],['sweet/savoury','fruity'],['apple','almond'],'3 Fellers','Apples, sugar, white rice flour, walnuts, butter, eggs, tapioca flour, cornstarch.'),
  item('Pumpkin Pie','Composite foods','Sweet bakery products',['Clean Label'],['eggs','gluten','milk'],['sweet/savoury','spicy'],['calcium carbonate'],'3 Fellers','Pumpkin, condensed milk, butter, eggs, white rice flour, tapioca powder, sugar.'),
  item('365 everyday value, chicken & bbq sauce mini pizzas','Composite foods','Pizza pies and quiches',['Organic'],['gluten','milk'],['bbq','garlic/onion'],['garlic','paprika','yeast'],'365 Everyday Value','Organic crust, wheat flour, organic wheat germ, evaporated cane sugar, olive oil.'),
  item('365 everyday value, mini pizzas, three cheese','Composite foods','Pizza pies and quiches',['Organic'],['gluten','milk'],['cheesy/creamy','garlic/onion'],['mozzarella','yeast'],'365 Everyday Value','Unbleached wheat flour, water, canola oil, yeast, salt, mozzarella, tomato sauce.'),
  item('Mediterranean Style Pizza','Composite foods','Pizza pies and quiches',['High Fibre'],['gluten','milk'],['mediterranean style','herby'],['garlic','paprika'],'365 Whole Foods Market','Whole grain wheat flour, filtered water, flax, olive oil, sunflower oil, sea salt.'),
  item('Thin Crust Pepperoni Pizza','Composite foods','Pizza pies and quiches',['High Protein'],['gluten','milk'],['spicy','garlic/onion'],['beef','paprika','yeast'],'365 Whole Foods Market','Wheat flour, tomato sauce, mozzarella, pepperoni, yeast, paprika, garlic.'),
  item('Cauliflower crust cheese pizza','Composite foods','Pizza pies and quiches',['Gluten Free','Low Carb'],['milk'],['cheesy/creamy'],['mozzarella'],'365 Whole Foods Market','Cauliflower crust, chickpea flour, mozzarella, tomato sauce, rice flour, basil.'),
  item('BBQ chicken pizza','Composite foods','Pizza pies and quiches',['High Protein'],['gluten','milk'],['bbq','spicy'],['paprika','garlic'],"By Sainsbury's",'Fortified wheat flour, BBQ chicken, tomato puree, vinegar, onion powder, paprika.'),
  item('Chipotle Salsa','Fat and sauces','Dressings and sauces',['Vegan','Low Sugar'],['allergen free'],['spicy','garlic/onion'],['garlic','citric acid'],'100% Salsa','Chipotle peppers, tomatoes, onions, garlic cloves, kosher salt, citric acid.'),
  item('Vegan Garlic Aioli','Fat and sauces','Dressings and sauces',['Vegan','Clean Label'],['mustard'],['garlic/onion','cheesy/creamy'],['garlic'],'Plant Pantry','Rapeseed oil, aquafaba, garlic puree, mustard, lemon juice, sea salt.'),
  item('Tuna Sandwich','Composite foods','Sandwiches',['High Protein'],['fish','gluten','eggs'],['salty','sour/tangy'],['barley'],'18th Street Deli','Wheat bread, tuna, mayonnaise, celery, lemon juice, salt, black pepper.'),
  item('Organic Lentil Soup','Prepared meals','Soups',['Organic','Vegan','High Fibre'],['celery'],['herby','mediterranean style'],['garlic'],'365 Everyday Value','Water, green lentils, celery, onion, garlic, tomato puree, olive oil, parsley.'),
  item('Keto Egg Bites','Fish Meat Eggs','Eggs',['Keto-friendly','Low Carb','High Protein'],['eggs','milk'],['cheesy/creamy'],['mozzarella'],'Morning Kitchen','Whole eggs, cottage cheese, mozzarella, cream, sea salt, black pepper.')
];

export const commodityForecasts = [
  {
    ingredient: 'Paprika',
    direction: 'Up',
    outlook: '+12-18%',
    drivers: ['Dry weather in source markets', 'Tight spice inventories', 'Higher freight rates'],
    alternatives: ['Smoked chili', 'Annatto blend', 'Red pepper concentrate']
  },
  {
    ingredient: 'Soy',
    direction: 'Flat',
    outlook: '-1-3%',
    drivers: ['Stable global demand', 'Improved crush capacity', 'Balanced feed use'],
    alternatives: ['Miso', 'Tamari', 'Mushroom umami']
  },
  {
    ingredient: 'Garlic',
    direction: 'Up',
    outlook: '+8-10%',
    drivers: ['Longer planting cycle', 'Regional supply tightening', 'Convenience demand growth'],
    alternatives: ['Garlic powder', 'Onion + sulfur note blend', 'Natural flavour system']
  },
  {
    ingredient: 'Citric acid',
    direction: 'Down',
    outlook: '-2-4%',
    drivers: ['Softening industrial demand', 'Improved fermentation output', 'Strong bulk availability'],
    alternatives: ['Vinegar powder', 'Malic acid blend', 'Lemon concentrate']
  }
];

export const reformulationIdeas = [
  {
    product: 'Retail BBQ Sauce',
    ingredient: 'Paprika',
    replacement: 'Smoked chili + tomato concentrate',
    reason: 'Cuts cost volatility while holding red colour and round heat.',
    effects: 'Slightly deeper colour, more smokiness, minor sweetness lift.'
  },
  {
    product: 'Snack seasoning',
    ingredient: 'Yeast extract',
    replacement: 'Mushroom powder + soy hydrolysate',
    reason: 'Reduces dependency on one supply stream and widens sourcing options.',
    effects: 'Comparable umami, slightly earthier aroma, better label flexibility.'
  },
  {
    product: 'Chilled sauce',
    ingredient: 'Garlic',
    replacement: 'Garlic powder + onion base',
    reason: 'Improves supply resilience and helps with heat stability in process.',
    effects: 'Less fresh pungency, smoother texture, more consistent batch colour.'
  }
];

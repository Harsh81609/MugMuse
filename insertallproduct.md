# Code to insert all products

```
db.products.insertMany([
    {
        "name": "Americano",
        "price": 99,
        "description": "What is an Americano? This smooth yet bold espresso-based beverage is a drink with a rich history and unique flavor profile.",
        "image": "/imgs/Americano.jpeg",
        "category": "coffee"
    },
    {
        "name": "Macchiato",
        "price": 89,
        "description": "A hot macchiato is a coffee drink made with espresso and a small amount of steamed or foamed milk.",
        "image": "/imgs/macchiato.jpeg",
        "category": "coffee"
    },
    {
        "name": "Hot Chocolate",
        "price": 99,
        "description": "Whip up a batch of decadent hot chocolate that's been energized with a blast of coffee for those chilly winter days.",
        "image": "/imgs/hotchocolate.jpeg",
        "category": "coffee"
    },
    {
        "name": "Filter Coffee",
        "price": 105,
        "description": "A tasty South Indian filter coffee recipe that will have you coming back for more! Add hot milk to this coffee and serve it with tiffin breakfast items.",
        "image": "/imgs/Filtercoffee.jpeg",
        "category": "coffee"
    },
    {
        "name": "Cappuccino",
        "price": 110,
        "description": "It has antioxidant properties that help to prevent skin problems and memory loss. Cappuccino also lowers the chances of cardiovascular ailments.",
        "image": "/imgs/Cappuccino.jpeg",
        "category": "coffee"
    },
    {
        "name": "Iced coffee",
        "price": 149,
        "description": "Iced coffee is a coffee beverage served cold. It may be prepared by brewing coffee normally and then serving it over ice or cold milk.",
        "image": "/imgs/Iced coffee.jpeg",
        "category": "coffee"
    },
    {
        "name": "Irish coffee",
        "price": 159,
        "description": "Irish coffee is a drink that combines Irish whiskey, coffee, and cream. The amount of whiskey and sugar used varies.",
        "image": "/imgs/Irish coffee.jpeg",
        "category": "coffee"
    },
    {
        "name": "Coffee Milkshake",
        "price": 129,
        "description": "This coffee milkshake is all your sweet coffee dreams come true. It’s thick and creamy with a rich coffee and chocolate flavor.",
        "image": "/imgs/coffee milkshake.jpeg",
        "category": "coffee"
    },
    {
        "name": "Masala tea",
        "price": 59,
        "description": "Masala tea is Indian spiced milk tea with cinnamon, cardamom, and cloves with black tea and milk.",
        "image": "/imgs/Masala tea.jpeg",
        "category": "Tea"
    },
    {
        "name": "Green tea",
        "price": 79,
        "description": "Green tea may positively affect skin health, help with weight loss, and reduce the risk of cardiovascular disease.",
        "image": "/imgs/green tea.jpeg",
        "category": "Tea"
    },
    {
        "name": "Black tea",
        "price": 79,
        "description": "Black tea is rich in antioxidants and may provide health benefits, including improved heart and gut health.",
        "image": "/imgs/Black tea.jpeg",
        "category": "Tea"
    },
    {
        "name": "Hibiscus",
        "price": 99,
        "description": "Hibiscus is high in antioxidants and offers many potential benefits like promoting weight loss and reducing the growth of bacteria.",
        "image": "/imgs/Hibiscus.jpeg",
        "category": "Tea"
    },
    {
        "name": "Peppermint tea",
        "price": 109,
        "description": "Peppermint tea is naturally sweet and caffeine-free. It may help with digestion, boosting focus, and relieving migraine.",
        "image": "/imgs/Peppermint tea.jpeg",
        "category": "Tea"
    },
    {
        "name": "Blueberry Mojito",
        "price": 89,
        "description": "A spectacular twist on the original mojito, with blueberries adding sweetness to the refreshing combination of lime, mint, and rum.",
        "image": "/imgs/Blueberry Mojito.jpeg",
        "category": "mojito"
    },
    {
        "name": "Limeade Mojito",
        "price": 89,
        "description": "A traditional Cuban punch with white rum, sugar, lime juice, soda water, and mint. A popular summer drink.",
        "image": "/imgs/Limeade Mojito.jpeg",
        "category": "mojito"
    },
    {
        "name": "Coconut Lime Mojito",
        "price": 99,
        "description": "A tropical Creamy Coconut Lime Mojito with white and coconut rum, fresh lime and mint, and a gingery kick of ginger beer.",
        "image": "/imgs/Coconut Lime Mojito.jpeg",
        "category": "mojito"
    },
    {
        "name": "Apple Mojito",
        "price": 89,
        "description": "A combination of fall-flavored apple cider mixed with bright lime and mint flavors of a classic mojito.",
        "image": "/imgs/Apple Mojito.jpeg",
        "category": "mojito"
    },
    {
        "name": "Blue Mojito",
        "price": 89,
        "description": "The blue mojito is a refreshing, minty cocktail with a brilliant blue color. Perfect as a party drink!",
        "image": "/imgs/Blue Mojito.jpeg",
        "category": "mojito"
    },
    {
        "name": "Strawberry Smoothie",
        "price": 109,
        "description": "A strawberry smoothie is a great source of protein, fiber, vitamins, and minerals, and helps with hydration.",
        "image": "/imgs/strawberry smoothie.jpeg",
        "category": "Smoothie"
    },
    {
        "name": "Kiwi Smoothie",
        "price": 119,
        "description": "Sweet and tangy, and quick and easy to make, kiwi smoothies are a healthy treat that everyone will love.",
        "image": "/imgs/kiwi smoothies.jpeg",
        "category": "Smoothie"
    },
    {
        "name": "Mango Smoothie",
        "price": 119,
        "description": "Mango smoothies help promote regularity, prevent constipation, and support the growth of beneficial gut bacteria.",
        "image": "/imgs/mango smoothies.jpeg",
        "category": "Smoothie"
    },
    {
        "name": "Chocolate Milkshake",
        "price": 159,
        "description": "Cold Coco is an Indian chocolate milkshake sold during summer, served semi-chilled to beat the heat.",
        "image": "/imgs/Chocolate Milkshake.jpeg",
        "category": "Milkshake"
    },
    {
        "name": "Doughnut",
        "price": 499,
        "description": "A doughnut is a small ring of sweet leavened dough, fried or baked, often served as a dessert or snack.",
        "image": "/imgs/doughnut.jpeg",
        "category": "Dessert"
    },
    {
        "name": "Molten Chocolate Cake",
        "price": 99,
        "description": "Molten chocolate cake is a French dessert with a liquid chocolate core, also known as a lava cake.",
        "image": "/imgs/Molten chocolate cake.jpeg",
        "category": "Dessert"
    },
    {
        "name": "Salt Fries",
        "price": 99,
        "description": "A classic side dish of fried potato strips, lightly salted for the perfect balance of flavor.",
        "image": "/imgs/salt Fries.jpeg",
        "category": "fries"
    },
    {
        "name": "Peri Peri Fries",
        "price": 159,
        "description": "French fries tossed in a flavorful spice mix of paprika, ground ginger, cardamom, garlic, onion, and cayenne pepper.",
        "image": "/imgs/Peri Peri Fries.jpeg",
        "category": "fries"
    },
    {
        "name": "Veggie Burger",
        "price": 129,
        "description": "A veggie burger made with a patty that does not contain meat, made from beans, nuts, grains, seeds, or fungi.",
        "image": "/imgs/veggie burger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Black Bean Burger",
        "price": 159,
        "description": "A black bean burger, rich in protein, zinc, and iron, is a solid choice for a healthy meal.",
        "image": "/imgs/Black bean burger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Hamburger",
        "price": 169,
        "description": "A hamburger is a dish consisting of a beef patty inside a bun, often served with cheese, lettuce, tomato, onion, and condiments.",
        "image": "/imgs/hamburger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Cheeseburger",
        "price": 199,
        "description": "A cheeseburger is a hamburger with a slice of melted cheese on top of the meat patty, served with various condiments and toppings.",
        "image": "/imgs/cheeseburger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Rice Burger",
        "price": 219,
        "description": "This Japanese Rice Burger uses sticky rice patties instead of buns, filled with beef patties, crispy lettuce, and savory sauce.",
        "image": "/imgs/Rice Burger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Slugburger",
        "price": 179,
        "description": "A slugburger is a traditional Southern food made from a mixture of beef or pork and soybeans, deep-fried in oil.",
        "image": "/imgs/slugburger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Great Chili Burger",
        "price": 189,
        "description": "The key to a great chili burger is flavorful chili with just the right consistency, complementing the burger patty.",
        "image": "/imgs/great chili burger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Ramen Burger",
        "price": 259,
        "description": "Ramen Burger, a Japanese noodle dish, replaces the burger bun with crispy ramen noodles, creating a unique flavor combination.",
        "image": "/imgs/Ramen burger.jpeg",
        "category": "Burger"
    },
    {
        "name": "Margherita Pizza",
        "price": 199,
        "description": "A classic Margherita pizza topped with fresh basil, tomatoes, olive oil, garlic, and mozzarella cheese.",
        "image": "/imgs/Margherita pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Paneer Tikka Pizza",
        "price": 259,
        "description": "Paneer Tikka Pizza is a fusion of Italian and Indian flavors, combining the rich essence of paneer with traditional tikka spices.",
        "image": "/imgs/Paneer Tikka Pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Pepperoni Pizza",
        "price": 219,
        "description": "A popular pizza topped with crispy, salty rounds of pepperoni for a flavorful bite.",
        "image": "/imgs/pepperoni pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Meat Pizza",
        "price": 229,
        "description": "A hearty pizza topped with ground beef and sausage, perfect for those looking for a meat-heavy meal.",
        "image": "/imgs/Meat Pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Kebab Pizza",
        "price": 269,
        "description": "Kebab Pizza is a Swedish creation combining Italian and Middle Eastern flavors, topped with kebab meat.",
        "image": "/imgs/Kebab pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Roman Pizza",
        "price": 299,
        "description": "Roman pizza is a style originating in Rome, known for its thin and crispy crust, often topped with simple, fresh ingredients.",
        "image": "/imgs/Roman pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Pizza Napoletana Salsicca",
        "price": 249,
        "description": "Neapolitan pizza made with San Marzano tomatoes and mozzarella cheese, a traditional Italian dish.",
        "image": "/imgs/Pizza Napoletana Salsicca.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Greek Pizza",
        "price": 269,
        "description": "Greek pizza features a crust proofed and cooked in a metal pan, with a spongy, airy texture, reminiscent of focaccia.",
        "image": "/imgs/Greek pizza.jpeg",
        "category": "Pizza"
    },
    {
        "name": "Vegetarian Sandwich",
        "price": 159,
        "description": "Our best vegetarian sandwich recipes and ideas, perfect for any meal or snack.",
        "image": "/imgs/Vegetarian Sandwich.jpeg",
        "category": "Sandwich"
    },
    {
        "name": "Grilled Sandwich",
        "price": 199,
        "description": "A sandwich with grilled bread, often filled with meat, cheese, or vegetables.",
        "image": "/imgs/Grilled Sandwich.jpeg",
        "category": "Sandwich"
    },
    {
        "name": "Cheese Sandwich",
        "price": 189,
        "description": "A cheese sandwich made with semi-hard cheeses like Cheddar or Red Leicester, served between slices of bread.",
        "image": "/imgs/cheese sandwich.jpeg",
        "category": "Sandwich"
    },
    {
        "name": "Hot Dog",
        "price": 149,
        "description": "A hot dog is a sausage served in a sliced bun, commonly topped with condiments like mustard, ketchup, and onions.",
        "image": "/imgs/hot dog.jpeg",
        "category": "hot dog"
    }
]);
```
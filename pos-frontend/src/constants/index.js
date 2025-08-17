import { LuSalad } from "react-icons/lu";
import { MdOutlineNoDrinks } from "react-icons/md";
import { FaPizzaSlice } from "react-icons/fa6";
import { LuDessert } from "react-icons/lu";
import { TbSoup } from "react-icons/tb";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { SiConcourse } from "react-icons/si";
import { FaRegFaceGrinStars } from "react-icons/fa6";


export const StartersItem = [
    {
        id: 1,
        name: 'startersItem1',
        price: 200,
        category: 'starters'
    },
    {
       id: 2,
       name: 'startersItem2',
       price: 150,
       category: 'starters'
    },
    {
        id: 3,
        name: 'startersItem3',
        price: 110,
        category: 'starters'
    },
    {
        id: 4,
        name: 'startersItem4',
        price: 100,
        category: 'starters'
    },   
    {
        id: 5,
        name: 'startersItem5',
        price: 120,
        category: 'starters'
    }
]

export const mainCourse = [
    {
        id: 1,
        name: 'mainCourse1',
        price: 200,
        category: 'main'
    },
    {
       id: 2,
       name: 'mainCourse2',
       price: 150,
       category: 'main'
    },
    {
        id: 3,
        name: 'mainCourse3',
        price: 110,
        category: 'main'
    },
    {
        id: 4,
        name: 'mainCourse4',
        price: 100,
        category: 'main'
    },   
    {
        id: 5,
        name: 'mainCourse5',
        price: 120,
        category: 'main'
    }
]

export const Beverages = [
    {
        id: 1,
        name: 'Beverages1',
        price: 200,
        category: 'beverages'
    },
    {
       id: 2,
       name: 'Beverages2',
       price: 150,
       category: 'beverages'
    },
    {
        id: 3,
        name: 'Beverages3',
        price: 110,
        category: 'beverages'
    },
    {
        id: 4,
        name: 'Beverages4',
        price: 100,
        category: 'beverages'
    },   
    {
        id: 5,
        name: 'Beverages5',
        price: 120,
        category: 'beverages'
    }
]


export const Soups = [
    {
        id: 1,
        name: 'Soups1',
        price: 200,
        category: 'soups'
    },
    {
       id: 2,
       name: 'Soups2',
       price: 150,
       category: 'soups'
    },
    {
        id: 3,
        name: 'Soups3',
        price: 110,
        category: 'soups'
    },
    {
        id: 4,
        name: 'Soups4',
        price: 100,
        category: 'soups'
    },   
    {
        id: 5,
        name: 'Soups5',
        price: 120,
        category: 'soups'
    }
]

export const Desserts = [
    {
        id: 1,
        name: 'Desserts1',
        price: 200,
        category: 'desserts'
    },
    {
       id: 2,
       name: 'Desserts2',
       price: 150,
       category: 'desserts'
    },
    {
        id: 3,
        name: 'Desserts3',
        price: 110,
        category: 'desserts'
    },
    {
        id: 4,
        name: 'Desserts4',
        price: 100,
        category: 'desserts'
    },   
    {
        id: 5,
        name: 'Desserts5',
        price: 120,
        category: 'desserts'
    }
]


export const Pizzas = [
    {
        id: 1,
        name: 'Pizzas1',
        price: 200,
        category: 'pizzas'
    },
    {
       id: 2,
       name: 'Pizzas2',
       price: 150,
       category: 'pizzas'
    },
    {
        id: 3,
        name: 'Pizzas3',
        price: 110,
        category: 'pizzas'
    },
    {
        id: 4,
        name: 'Pizzas4',
        price: 100,
        category: 'pizzas'
    },   
    {
        id: 5,
        name: 'Pizzas5',
        price: 120,
        category: 'pizzas'
    }
]


export const AlcoholicDrinks = [
    {
        id: 1,
        name: 'Drinks 1',
        price: 200,
        category: 'Alcoholic Drinks'
    },
    {
       id: 2,
       name: 'Drinks 2',
       price: 150,
       category: 'Alcoholic Drinks'
    },
    {
        id: 3,
        name: 'Drinks 3',
        price: 110,
        category: 'Alcoholic Drinks'
    },
    {
        id: 4,
        name: 'Drinks 4',
        price: 100,
        category: 'Alcoholic Drinks'
    },   
    {
        id: 5,
        name: 'Drink 5',
        price: 120,
        category: 'Alcoholic Drinks'
    }
]


export const Salads = [
    {
        id: 1,
        name: 'Caeser Salad',
        price: 200,
        category: 'Vegetarian'
    },
    {
       id: 2,
       name: 'Greak Salad',
       price: 150,
       category: 'Vegetarian'
    },
    {
        id: 3,
        name: 'Fruit Salad',
        price: 110,
        category: 'Fruits'
    },

]



export const menus = [
    { id: 1, name: 'Starters', icon: '' , items: StartersItem },
    { id: 2, name: 'Main Course', icon: '', items: mainCourse },

    { id: 3, name: 'Beverages', icon: '', items: Beverages },
    { id: 4, name: 'Soups', icon: '', items: Soups },
    { id: 5, name: 'Desserts', icon: '', items: Desserts },
    { id: 6, name: 'Pizzas', icon: '', items: Pizzas },
    { id: 7, name: 'Alcoholic Drinks', icon : '', items: AlcoholicDrinks },
    { id: 8, name: 'Salads', icon: '' , items: Salads },
];



export const popularDishes = [
    {
        id: 1,
        image: 'butterChicken',
        name: 'Butter Chicken',
        numberOfOrders: 250,
    },
    {
        id: 2,
        image: 'palakPaneer',
        name: 'Palak Panner',
        numberOfOrders: 190,
    },
    {
        id: 3,
        image: 'biryani',
        name: 'Hyderabadi Biryani',
        numberOfOrders: 300,
    },
    {
        id: 4,
        image: 'masalaDose',
        name: 'Masala Dose',
        numberOfOrders: 220,
    },
    {
        id: 5,
        image: 'choleBhature',
        name: 'Chole Bhature',
        numberOdOrders: 180,
    },
    {
        id: 6,
        image: 'rajmaChawal',
        name: 'Ragma Chawal',
        numberOfOrders: 180,
    },
    {
        id: 7,
        image: 'paneerTikka',
        name: 'Panner Tikka',
        numberOfOrders: 210,
    },
    {
        id: 8,
        image: 'gulabjamun',
        name: 'Julab Jamun',
        numberOfOrders: 120,
    },
    {
       id: 9,
       image: 'pooriSabji',
       name: "Poori Sabji",
       numberOfOrders: 160, 
    },
    {
        id: 10,
        image: 'roganJosh',
        name: 'Rogan Josh',
        numberOfOrders: 140,
    },


];


export const tables = [

    { id: 1, name: 'Table 1', status: 'Booked', initial: 'AM', seats:0},
    { id: 2, name: 'Table 2', status: 'Available', initial: 'MB', seats:4},
    { id: 3, name: 'Table 3', status: 'Booked', initial: 'JS', seats:0},
    { id: 4, name: 'Table 4', status: 'Available', initial: 'HR', seats:4},
    { id: 5, name: 'Table 5', status: 'Booked', initial: 'PL', seats:0},
    { id: 6, name: 'Table 6', status: 'Available', initial: 'RT', seats:3},
    { id: 7, name: 'Table 7', status: 'Booked', initial: 'LC', seats:0},
    { id: 8, name: 'Table 8', status: 'Available', initial: 'DP', seats:1},
    { id: 9, name: 'Table 9', status: 'Booked', initial: 'NK', seats:0},
    { id: 10, name: 'Table 10', status: 'Available', initial: 'SB', seats:2},
    

    { id: 1, name: 'Table 1', status: 'Booked', initial: 'AM', seats:0},
    { id: 2, name: 'Table 2', status: 'Available', initial: 'MB', seats:2},
    { id: 3, name: 'Table 3', status: 'Booked', initial: 'JS', seats:0},
    { id: 4, name: 'Table 4', status: 'Available', initial: 'HR'},
    { id: 5, name: 'Table 5', status: 'Booked', initial: 'PL'},
    { id: 6, name: 'Table 6', status: 'Available', initial: 'RT'},
    { id: 7, name: 'Table 7', status: 'Booked', initial: 'LC'},
    { id: 8, name: 'Table 8', status: 'Available', initial: 'DP'},
    { id: 9, name: 'Table 9', status: 'Booked', initial: 'NK'},
    { id: 10, name: 'Table 10', status: 'Available', initial: 'SB'},
    
]



export const metricsData = [
    { percentage: '12%', value: 50846.90 , title: "Revenue", color: 'blue' },
    { percentage: '20%', value: 50846.90 , title: "Revenue", color: 'yellow' },
    { percentage: '85%', value: 50846.90 , title: "Revenue", color: 'green' },
    { percentage: '75%', value: 50846.90 , title: "Revenue", color: 'orange' },

];



const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const Category = require('./models/Category'); 
const Product = require('./models/Product');
const Attribute=require('./models/Attribute');
const AttributeSet=require('./models/AttributeSet') ;
const Price=require('./models/Price');
const cors = require('cors'); 

const app = express();

const data =
    {
        "categories": [
            { "name": "all" },
            { "name": "clothes" },
            { "name": "tech" }
        ],
        "products": [
            {
                "id": "huarache-x-stussy-le",
                "name": "Nike Air Huarache Le",
                "inStock": true,
                "gallery": [
                    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
                    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
                    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
                    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
                    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
                ],
                "description": "Great sneakers for everyday use!",
                "category": "clothes",
                "attributes": [
                    {
                        "name": "Size",
                        "type": "text",
                        "items": [
                            { "displayValue": "40", "value": "40" },
                            { "displayValue": "41", "value": "41" },
                            { "displayValue": "42", "value": "42" },
                            { "displayValue": "43", "value": "43" }
                        ]
                    }
                ],
                "prices": [
                    {
                        "amount": 144.69,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Nike x Stussy"
            },
            {
                "id": "jacket-canada-goosee",
                "name": "Jacket",
                "inStock": true,
                "gallery": [
                    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
                    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
                    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
                    "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
                    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
                    "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png"
                ],
                "description": "Awesome winter jacket",
                "category": "clothes",
                "attributes": [
                    {
                        "name": "Size",
                        "type": "text",
                        "items": [
                            { "displayValue": "Small", "value": "S" },
                            { "displayValue": "Medium", "value": "M" },
                            { "displayValue": "Large", "value": "L" },
                            { "displayValue": "Extra Large", "value": "XL" }
                        ]
                    }
                ],
                "prices": [
                    {
                        "amount": 518.47,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Canada Goose"
            },
            {
                "id": "ps-5",
                "name": "PlayStation 5",
                "inStock": false,
                "gallery": [
                    "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg"
                ],
                "description": "A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha",
                "category": "tech",
                "attributes": [
                    {
                        "name": "Color",
                        "type": "swatch",
                        "items": [
                            { "displayValue": "Green", "value": "#44FF03" },
                            { "displayValue": "Cyan", "value": "#03FFF7" },
                            { "displayValue": "Blue", "value": "#030BFF" },
                            { "displayValue": "Black", "value": "#000000" },
                            { "displayValue": "White", "value": "#FFFFFF" }
                        ]
                    },
                    {
                        "name": "Capacity",
                        "type": "text",
                        "items": [
                            { "displayValue": "512G", "value": "512G" },
                            { "displayValue": "1T", "value": "1T" }
                        ]
                    }
                ],
                "prices": [
                    {
                        "amount": 844.02,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Sony"
            },
            {
                "id": "xbox-series-s",
                "name": "Xbox Series S 512GB",
                "inStock": false,
                "gallery": [
                    "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
                    "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg"
                ],
                "description": "Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer Spiele Games mit bis zu 120 Bilder pro Sekunde Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen. Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen. Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies & TV und mehr",
                "category": "tech",
                "attributes": [
                    {
                        "name": "Color",
                        "type": "swatch",
                        "items": [
                            { "displayValue": "Green", "value": "#44FF03" },
                            { "displayValue": "Cyan", "value": "#03FFF7" },
                            { "displayValue": "Blue", "value": "#030BFF" },
                            { "displayValue": "Black", "value": "#000000" },
                            { "displayValue": "White", "value": "#FFFFFF" }
                        ]
                    },
                    {
                        "name": "Capacity",
                        "type": "text",
                        "items": [
                            { "displayValue": "512G", "value": "512G" },
                            { "displayValue": "1T", "value": "1T" }
                        ]
                    }
                ],
                "prices": [
                    {
                        "amount": 333.99,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Microsoft"
            },
            {
                "id": "apple-imac-2021",
                "name": "iMac 2021",
                "inStock": true,
                "gallery": [
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000"
                ],
                "description": "The new iMac!",
                "category": "tech",
                "attributes": [
                    {
                        "name": "Capacity",
                        "type": "text",
                        "items": [
                            { "displayValue": "256GB", "value": "256GB" },
                            { "displayValue": "512GB", "value": "512GB" }
                        ]
                    },
                    {
                        "name": "With USB 3 ports",
                        "type": "text",
                        "items": [
                            { "displayValue": "Yes", "value": "Yes" },
                            { "displayValue": "No", "value": "No" }
                        ]
                    },
                    {
                        "name": "Touch ID in keyboard",
                        "type": "text",
                        "items": [
                            { "displayValue": "Yes", "value": "Yes" },
                            { "displayValue": "No", "value": "No" }
                        ]
                    }
                ],
                "prices": [
                    {
                        "amount": 1688.03,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Apple"
            },
            {
                "id": "apple-iphone-12-pro",
                "name": "iPhone 12 Pro",
                "inStock": true,
                "gallery": [
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&hei=1112&fmt=jpeg&qlt=80&.v=1604021663000"
                ],
                "description": "This is iPhone 12. Nothing else to say.",
                "category": "tech",
                "attributes": [
                    {
                        "name": "Capacity",
                        "type": "text",
                        "items": [
                            { "displayValue": "512G", "value": "512G" },
                            { "displayValue": "1T", "value": "1T" }
                        ]
                    },
                    {
                        "name": "Color",
                        "type": "swatch",
                        "items": [
                            { "displayValue": "Green", "value": "#44FF03" },
                            { "displayValue": "Cyan", "value": "#03FFF7" },
                            { "displayValue": "Blue", "value": "#030BFF" },
                            { "displayValue": "Black", "value": "#000000" },
                            { "displayValue": "White", "value": "#FFFFFF" }
                        ]
                    }
                ],
                "prices": [
                    {
                        "amount": 1000.76,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Apple"
            },
            {
                "id": "apple-airpods-pro",
                "name": "AirPods Pro",
                "inStock": false,
                "gallery": [
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000"
                ],
                "description": "Magic like you’ve never heard AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case. Active Noise CancellationIncredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.Transparency mode Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Proto undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you. All-new design AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.Amazing audio quality A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.",
                "category": "tech",
                "attributes": [],
                "prices": [
                    {
                        "amount": 300.23,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Apple"
            },
            {
                "id": "apple-airtag",
                "name": "AirTag",
                "inStock": true,
                "gallery": [
                    "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000"
                ],
                "description": "Lose your knack for losing things.AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.",
                "category": "tech",
                "attributes": [],
                "prices": [
                    {
                        "amount": 120.57,
                        "currency_label": "USD",
                        "currency_symbol": "$"
                    }
                ],
                "brand": "Apple"
            }
        ]
    }


app.use(cors())
  

mongoose.connect('mongodb+srv://hussein:dBRMZRAaXK4NEpOt@cluster0.ofbcz8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(async () => {
        console.log('Connected to MongoDB');

        // Clear existing data
        await Category.deleteMany({});
        await Product.deleteMany({});

        const categoryDocs = await Category.insertMany(data.categories);
        const productDocs = await Product.insertMany(data.products);
        // const attributes = await Attribute.insertMany(data.attributes);
        // const Price = await Attribute.insertMany(data.prices);

    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

    const schema = require('./server');

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));
// const functions = require('firebase-functions');
// exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

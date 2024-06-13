const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Order = require('./models/Order');
const { ObjectId } = require('mongoose').Types; // Import ObjectId from mongoose
const OrderService = require('./services/OrderService'); // Adjust the path accordingly
const orderService = new OrderService();

// Define the Price Type
const PriceType = new GraphQLObjectType({
    name: 'Price',
    fields: () => ({
        amount: { type: GraphQLFloat },
        currency_label: { type: GraphQLString },
        currency_symbol: { type: GraphQLString }
    })
});


// Define the Attribute Item Type
const AttributeItemType = new GraphQLObjectType({
    name: 'AttributeItem',
    fields: () => ({
        displayValue: { type: GraphQLString },
        value: { type: GraphQLString }
    })
});

// Define the Attribute Set Type
const AttributeSetType = new GraphQLObjectType({
    name: 'AttributeSet',
    fields: () => ({
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        items: { type: GraphQLList(AttributeItemType) }
    })
});

// Define the Category Type
const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString }
    })
});

// Define the Product Type
const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        inStock: { type: GraphQLBoolean },
        gallery: { type: GraphQLList(GraphQLString) },
        description: { type: GraphQLString },
        category: { type: GraphQLString },
        brand: { type: GraphQLString },
        prices: { type: GraphQLList(PriceType) },
        attributes: { type: GraphQLList(AttributeSetType) }
    })
});

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
      id: { type: GraphQLInt },
      products: { type: new GraphQLList(ProductType) }, // Assuming you have a ProductType defined
      totalAmount: { type: GraphQLFloat },
    },
  });

 
// Define the Query Type
const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        product: {
            type: ProductType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                return await Product.findOne({ id: args.id });
            }
        },
        categories: {
            type: GraphQLList(CategoryType),
            resolve: async () => {
                return await Category.find();
            }
        },
        productsByCategory: {
            type: GraphQLList(ProductType),
            args: {
                category: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (parent, args) => {
                return await Product.find({ category: args.category });
            }
        },
        products: {
            type: GraphQLList(ProductType),
            resolve: async () => {
                return await Product.find();
            }
        }
    })
});

// Define the Mutation Type
// const MutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: () => ({
//         createOrder: {
//             type: OrderType,
//             args: {
//                 products: { type: GraphQLNonNull(GraphQLList(GraphQLString)) }
//             },
//             resolve: async (parent, args) => {
//                 try {
//                     // Calculate the total amount based on the provided product IDs

//                     // Create a new order instance with the provided data
//                     const order = new Order(){
//                         products: args.products,
//                         totalAmount: totalAmount
//                     });

//                     // Save the order to the database
//                     const savedOrder = await order.save();

//                     return savedOrder;
//                 } catch (error) {
//                     console.error('Order creation failed:', error.message);
//                     throw new Error('Failed to create order');
//                 }
//             }
//         }
//     })
// });

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createOrder: {
            type: OrderType,
            args: {
                products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve: async (root, args) => {
                try {
                    const order = await orderService.create(args.products);
                    return order;
                } catch (error) {
                    console.error("Order creation failed: ", error.message);
                    return {
                        errors: [
                            { message: error.message }
                        ]
                    };
                }
            }
        }
    }
});


// Create the schema
const schema = new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
});

module.exports = schema;

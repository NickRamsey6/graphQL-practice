// const express = require('express');
// const PORT = 3500;

// const app = express();

// app.use('/graphql', (req, res) => {
//     res.send('Welcome to our authors app');
// });

// app.listen(PORT, ()=>{
//     console.log('Server running on port:', PORT);
// });

const express = require('express');
const { ApolloServer } = require('apollo-server-express');


//Fake Data
const authors = [
    {
        id: "1",
        info: {
            name: "Joe Kelly",
            age: 32,
            gender: "M",
        }
    },
    {
        id:"2",
        info: {
            name: "Mary Jane",
            age: 27,
            gender: "F"
        }    
    }
];


//GraphQL schema in string form
const typeDefs = `
    type Author {
        id: ID!
        info: Person
    }
    type Person{
        name: String!
        age: Int
        gender: String
    }
    type Query {
        getAuthors: [Author]
        retrieveAuthor(id: ID!): Author
    }
`;


//The resolvers
const resolvers = {
    Query: {
        getAuthors: () => authors,
        retrieveAuthor: (obj, { id }) => authors.find(author => author.id === id)
    }
};

const PORT = 3600;

// Put together a schema
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();

server.applyMiddleware({
    app,
    path: '/graphql'
});

app.listen(PORT, ()=> {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});

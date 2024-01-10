const typeDefs = `
type User {
    id: ID!
    username: String!
    password: String!
    userscore: Int!
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addScore(username: String!, score: Int!): User
}
`
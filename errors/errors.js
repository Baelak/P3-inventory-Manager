const { GraphQLError } = require('graphql');

const AuthenticationError = new GraphQLError(
  'You are not authorized to perform this action.',
  {
    extensions: {
      code: 'FORBIDDEN',
    },
  }
);
const UserInputError = new GraphQLError('User input was not valid.', {
  extensions: {
    code: 'BAD_USER_INPUT',
  },
});

module.exports = {
    AuthenticationError,
    UserInputError
};
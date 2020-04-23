const isAuthenticated = async (resolve: any, parent: any, args: any, context: any, info: any): Promise<any> => {
  if (!context.session.userId) {
    throw new Error('not authenticated.. Please login');
  }

  return resolve(parent, args, context, info);
};

export default {
  Mutation: {
    createListing: isAuthenticated,
    deleteListing: isAuthenticated
  }
};

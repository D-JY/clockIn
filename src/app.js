export const dva = {
  config: {
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

export function patchRoutes(routes) {
  // console.log(routes, 123)
}

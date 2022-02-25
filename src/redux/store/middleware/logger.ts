export default function loggerMiddleware() {
  return (next) => (action) => {

    console.log("$$LOGGER ", action);

    return next(action);
  };
}
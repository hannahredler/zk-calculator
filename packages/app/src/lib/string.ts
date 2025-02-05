export const truncate = (str: string) => {
  return str.slice(0, 3) + "..." + str.slice(-3);
};

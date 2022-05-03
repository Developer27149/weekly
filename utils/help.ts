export const isEmptyObject = (obj: any) => {
  return (
    typeof obj === "object" &&
    Object.keys(obj).length === 0 &&
    !Array.isArray(obj)
  );
};

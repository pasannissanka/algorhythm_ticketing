export const nameConverter = (name: string) => {
  const nameArr = name.split(" ");
  const capitalizeName = nameArr
    .map((ele) => ele.trim().charAt(0).toUpperCase() + ele.substring(1))
    .join(" ");

  return capitalizeName;
};

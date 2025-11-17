export default function cn(...classes: string[]) {
  let result = '';
  classes.forEach((classe) => {
    result += classe + ' ';
  });
  return result.trim();
}

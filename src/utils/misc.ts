export const resolvePath = (base: string, path: string) => {
  if(path.trim() !== ''){
    base += '/';
  }
  return (base += path);
}

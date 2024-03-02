const generateToken = () => {
  const token = Date.now();
  return token;
}

export default generateToken;
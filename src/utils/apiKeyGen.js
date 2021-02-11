 const genKey = () => {
    //create a base-36 string that is always 30 chars long a-z0-9
    return [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join('');
}

export default genKey;
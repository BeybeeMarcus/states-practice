const axios = require("axios");

const selectRandom = () => {
  const userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
  ];
  var randomNumber = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomNumber];
};

const getAPIs = async (query) => {

  const searchString = query;
  const encodedString = encodeURI(searchString);
  
  let user_agent = selectRandom();
  let header = {
    "User-Agent": `${user_agent}`,
  };

  const url = `https://api.publicapis.org/entries?description=${encodedString}`;
  
  let results = await axios(url, header)
    .then(function ({ data }) {
       let res = [];
        if(data.count > 0)
        {
          const items = data.entries;
          for (let i = 0; i < items.length; i++) {
            res.push(
              {
                label: items[i].API,
                detail: items[i].Description,
                link: items[i].Link
              }
            )
          }
        }
      return res;
    });
    
  return results;
}

module.exports = { getAPIs }
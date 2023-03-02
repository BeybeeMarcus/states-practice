const axios = require("axios");
const cheerio = require("cheerio");

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

const getStackOverflowQuestions = async (query) => {

  const searchString = query;
  const encodedString = encodeURI(searchString);
  console.log(encodedString);
  let user_agent = selectRandom();
  let header = {
    "User-Agent": `${user_agent}`,
  };

  const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=votes&q=${encodedString}&title=${encodedString}&site=stackoverflow`;
  
  let results = await axios(url, header)
    .then(function ({ data }) {
       let res = [];
       const items = data.items;
      for (let i = 0; i < items.length; i++) {
        res.push(
          {
            label: items[i].title,
						detail: items[i].tags.join(', '),
						link: items[i].question_id
          }
        )
      }
      return res;
    });
    console.log(results);
  return results;
}

const getStackOverflowResult = async (question_id) => {

  let user_agent = selectRandom();
  let header = {
    "User-Agent": `${user_agent}`,
  };

  const url = `https://stackoverflow.com/questions/${question_id}`;
  let r = [];
  await axios(url, header)
      .then((response) => {
        const html = response.data;
        
        const $ = cheerio.load(html);
        const title = $(".fs-headline1").text();
        const post_html = $(".question .post-layout .js-post-body").html();
        const post = $(".question .post-layout .js-post-body").text();
        
        //take first answer
        const answer_html = $("#answers .answer").first().find('.js-post-body').html();
        const answer = $("#answers .answer").first().find('.js-post-body').text();
        const score = $("#answers .answer").first().attr('data-score');
        
        r = [url, title, post, post_html, answer, answer_html, score]
        console.log(r);
    });

  return r;
};

module.exports = { getStackOverflowResult, getStackOverflowQuestions }
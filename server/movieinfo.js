import axios from 'axios'
import * as cheerio from 'cheerio'
// const axios = request('axios')
// const cheerio = request('cheerio')

const Html = async (a) => {
  try {
    return await axios.get(a);
  } catch (error) {
    console.error(error);
  }
};

const getHtml = async (url) => {
  const html=await Html('https://www.rottentomatoes.com/m/' + url)
  var a
  try{
	   a = cheerio.load(html.data);
  }catch(error){
	  return -1
  }
  //페이지 소스 얻기

  const movieinfo = JSON.parse(a('#scoreDetails').text())
  const dire = a('#info > li:nth-child(4) > p > span > a').attr('href')
  const dhtml=await Html("https://www.rottentomatoes.com"+dire)
  var b = cheerio.load(dhtml.data);
  // selector로 정보 얻기
  
	function setScore(month) {
		if (month<41) return 1
		else if (month<61) return 2
		else if (month<81) return 3
		else if (month<91) return 4
		else if (month<101) return 5
		else return 0
	}

  const info = {
	url : url,
    title : movieinfo.scoreboard.title+'('+movieinfo.scoreboard.info.split(',', 1).toString()+')',
    // genre : a('#info > li:nth-child(2) > p > span').text().replace(/(\n| )/g, '').split('&', 1).toString(),
    director : a('#info > li:nth-child(4) > p > span > a').text(),
    fleshRating : setScore(Number(movieinfo.scoreboard.tomatometerScore.value)),
    dHighRating : Number(b('#celebrity > article > section:nth-child(1) > div > div > div > p:nth-child(1) > span').text().replace(/(\n| )/g, '').split('%', 1).toString()),
    imgUrl : movieinfo.primaryImageUrl
  }
  // selector으로 정보 얻엣
  return info
}

export default getHtml